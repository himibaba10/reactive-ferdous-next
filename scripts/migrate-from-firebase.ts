/**
 * Migrate Firestore collections → MongoDB Atlas, and media → Cloudflare R2.
 *
 * Reads public Firestore REST documents (same as the old site), downloads each
 * image URL (Cloudinary / other), uploads to R2, and inserts Mongo docs with
 * the new R2 URLs. Preserves original Firestore document ids in `legacyId`.
 *
 * Usage:
 *   bun run migrate:firebase
 *
 * Required env:
 *   MONGODB_URI
 *   FIREBASE_PROJECT_ID
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
 *   R2_BUCKET_NAME, R2_PUBLIC_URL
 *
 * Flags (optional):
 *   --dry-run          Print actions without writing
 *   --skip-media       Keep original image URLs (no R2 upload)
 *   --collections=a,b  Only migrate listed collections (projects,reviews,logos)
 *
 * Env file: prefer `.env.local` (falls back to `.env`)
 */

import { MongoClient } from 'mongodb';
import {
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { createHash } from 'crypto';
import { loadEnv } from './load-env';

loadEnv();

type FirestoreValue = Record<string, unknown>;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipMedia = args.includes('--skip-media');
const collectionsArg = args.find((a) => a.startsWith('--collections='));
const only = collectionsArg
  ? collectionsArg.replace('--collections=', '').split(',').map((s) => s.trim())
  : ['projects', 'reviews', 'logos'];

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

function parseValue(value: FirestoreValue): unknown {
  if (value == null) return null;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('nullValue' in value) return null;
  if ('timestampValue' in value) return value.timestampValue;
  if ('arrayValue' in value) {
    const arr = (value.arrayValue as { values?: FirestoreValue[] }).values || [];
    return arr.map(parseValue);
  }
  if ('mapValue' in value) {
    return parseFields(
      ((value.mapValue as { fields?: Record<string, FirestoreValue> }).fields ||
        {}) as Record<string, FirestoreValue>
    );
  }
  return null;
}

function parseFields(fields: Record<string, FirestoreValue> = {}) {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    out[key] = parseValue(value);
  }
  return out;
}

async function listFirestore(collectionId: string) {
  const projectId = requireEnv('FIREBASE_PROJECT_ID');
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionId}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Firestore list ${collectionId} failed (${res.status})`);
  }
  const data = (await res.json()) as {
    documents?: { name: string; fields?: Record<string, FirestoreValue> }[];
  };
  return (data.documents || []).map((doc) => {
    const id = doc.name.split('/').pop() || randomUUID();
    return { id, ...parseFields(doc.fields || {}) };
  });
}

function getR2() {
  const accountId = requireEnv('R2_ACCOUNT_ID');
  return {
    client: new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: requireEnv('R2_ACCESS_KEY_ID'),
        secretAccessKey: requireEnv('R2_SECRET_ACCESS_KEY'),
      },
    }),
    bucket: requireEnv('R2_BUCKET_NAME'),
    publicBase: requireEnv('R2_PUBLIC_URL').replace(/\/$/, ''),
  };
}

async function migrateUrl(
  url: string | undefined,
  folder: string,
  r2: ReturnType<typeof getR2>
): Promise<string | undefined> {
  if (!url || typeof url !== 'string') return url;
  if (skipMedia) return url;
  if (url.startsWith(r2.publicBase)) return url;

  console.log(`  ↓ download ${url.slice(0, 80)}…`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${url} (${res.status})`);
  const contentType = res.headers.get('content-type') || 'application/octet-stream';
  const buffer = Buffer.from(await res.arrayBuffer());
  const extFromType = contentType.includes('png')
    ? 'png'
    : contentType.includes('webp')
      ? 'webp'
      : contentType.includes('gif')
        ? 'gif'
        : 'jpg';
  const hash = createHash('sha1').update(buffer).digest('hex').slice(0, 12);
  const key = `${folder}/${hash}-${randomUUID().slice(0, 6)}.${extFromType}`;

  if (dryRun) {
    console.log(`  (dry-run) would upload → ${key}`);
    return `${r2.publicBase}/${key}`;
  }

  await r2.client.send(
    new PutObjectCommand({
      Bucket: r2.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );
  const publicUrl = `${r2.publicBase}/${key}`;
  console.log(`  ↑ uploaded ${publicUrl}`);
  return publicUrl;
}

async function migrateCollection(
  name: string,
  mongo: MongoClient,
  r2: ReturnType<typeof getR2>
) {
  console.log(`\n=== ${name} ===`);
  const docs = await listFirestore(name);
  console.log(`Found ${docs.length} documents`);

  const col = mongo.db().collection(name);
  let written = 0;

  for (const doc of docs) {
    const { id, ...rest } = doc as Record<string, unknown> & { id: string };
    const next: Record<string, unknown> = {
      ...rest,
      legacyId: id,
      migratedAt: new Date().toISOString(),
    };

    if (name === 'projects' && typeof next.img === 'string') {
      next.img = await migrateUrl(next.img, 'projects', r2);
    }
    if (name === 'reviews' && typeof next.img === 'string') {
      next.img = await migrateUrl(next.img, 'reviews', r2);
    }
    if (name === 'logos' && typeof next.imgUrl === 'string') {
      next.imgUrl = await migrateUrl(next.imgUrl, 'logos', r2);
    }

    if (!next.createdAt) next.createdAt = new Date().toISOString();

    if (dryRun) {
      console.log(`  (dry-run) would upsert legacyId=${id}`);
      written += 1;
      continue;
    }

    await col.updateOne(
      { legacyId: id },
      { $set: next },
      { upsert: true }
    );
    written += 1;
    console.log(`  ✓ ${id}`);
  }

  console.log(`Done ${name}: ${written} docs`);
}

async function main() {
  requireEnv('MONGODB_URI');
  requireEnv('FIREBASE_PROJECT_ID');
  const r2 = skipMedia
    ? ({
        client: null as unknown as S3Client,
        bucket: '',
        publicBase: process.env.R2_PUBLIC_URL || '',
      } as ReturnType<typeof getR2>)
    : getR2();

  const client = new MongoClient(requireEnv('MONGODB_URI'));
  await client.connect();

  console.log(
    `Migration starting${dryRun ? ' (DRY RUN)' : ''}${skipMedia ? ' (skip media)' : ''}`
  );

  for (const name of only) {
    await migrateCollection(name, client, r2);
  }

  await client.close();
  console.log('\nAll done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
