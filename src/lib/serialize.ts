import { ObjectId } from 'mongodb';

export function serializeDoc<T extends Record<string, unknown>>(
  doc: T | null
): (Omit<T, '_id'> & { _id: string; id: string }) | null {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  const id = _id instanceof ObjectId ? _id.toHexString() : String(_id);
  return {
    ...rest,
    _id: id,
    id, // frontend compatibility with old Firestore docs
  } as Omit<T, '_id'> & { _id: string; id: string };
}

export function serializeDocs<T extends Record<string, unknown>>(docs: T[]) {
  return docs.map((doc) => serializeDoc(doc)!);
}
