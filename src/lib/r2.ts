import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

function getR2Client() {
  const accountId = requireEnv('R2_ACCOUNT_ID');
  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv('R2_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('R2_SECRET_ACCESS_KEY'),
    },
  });
}

function publicUrlForKey(key: string): string {
  const base = requireEnv('R2_PUBLIC_URL').replace(/\/$/, '');
  return `${base}/${key}`;
}

export async function uploadToR2(params: {
  buffer: Buffer;
  contentType: string;
  folder?: string;
  filename?: string;
}): Promise<{ key: string; url: string }> {
  const bucket = requireEnv('R2_BUCKET_NAME');
  const folder = (params.folder || 'uploads').replace(/^\/|\/$/g, '');
  const safeName = (params.filename || 'file')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .slice(0, 80);
  const key = `${folder}/${Date.now()}-${randomUUID().slice(0, 8)}-${safeName}`;

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: params.buffer,
      ContentType: params.contentType,
    })
  );

  return { key, url: publicUrlForKey(key) };
}

export async function deleteFromR2(keyOrUrl: string): Promise<void> {
  const bucket = requireEnv('R2_BUCKET_NAME');
  const publicBase = requireEnv('R2_PUBLIC_URL').replace(/\/$/, '');
  let key = keyOrUrl;
  if (keyOrUrl.startsWith(publicBase)) {
    key = keyOrUrl.slice(publicBase.length + 1);
  }

  const client = getR2Client();
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
}

export async function downloadUrlToBuffer(url: string): Promise<{
  buffer: Buffer;
  contentType: string;
  filename: string;
}> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url} (${res.status})`);
  }
  const contentType =
    res.headers.get('content-type') || 'application/octet-stream';
  const buffer = Buffer.from(await res.arrayBuffer());
  const pathname = new URL(url).pathname;
  const filename = pathname.split('/').pop() || 'file.bin';
  return { buffer, contentType, filename };
}
