/**
 * Create (or reset) the single admin user in MongoDB.
 *
 * Usage:
 *   bun run seed:admin
 *
 * Requires MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD in .env.local (or .env)
 */

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { loadEnv } from './load-env';

loadEnv();

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!uri || !email || !password) {
    throw new Error(
      'Set MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in .env.local'
    );
  }

  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD should be at least 8 characters');
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();
  const users = db.collection('users');

  const passwordHash = await bcrypt.hash(password, 12);
  const now = new Date().toISOString();

  const existing = await users.findOne({ email });
  if (existing) {
    await users.updateOne(
      { _id: existing._id },
      { $set: { passwordHash, updatedAt: now } }
    );
    console.log(`Updated admin password for ${email}`);
  } else {
    // Keep only one admin: remove any other users
    await users.deleteMany({});
    await users.insertOne({
      email,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`Created admin user ${email}`);
  }

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
