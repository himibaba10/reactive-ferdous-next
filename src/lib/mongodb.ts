import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri && process.env.NODE_ENV !== 'production') {
  console.warn('MONGODB_URI is not set');
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  const client = new MongoClient(uri);
  return client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}

export const COLLECTIONS = {
  users: 'users',
  projects: 'projects',
  reviews: 'reviews',
  logos: 'logos',
} as const;
