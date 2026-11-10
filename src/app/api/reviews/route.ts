import { NextRequest, NextResponse } from 'next/server';
import { AuthError, jsonError, requireAdmin } from '@/lib/auth';
import { CACHE_TAGS, revalidateContent } from '@/lib/cache';
import { COLLECTIONS, getDb } from '@/lib/mongodb';
import { serializeDocs } from '@/lib/serialize';

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db
      .collection(COLLECTIONS.reviews)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ data: serializeDocs(docs) });
  } catch (error) {
    console.error('GET /api/reviews', error);
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const quote = String(body.quote || '').trim();
    const img = String(body.img || '').trim();

    if (!quote && !img) {
      return NextResponse.json(
        { error: 'Add a quote, an image, or both' },
        { status: 400 }
      );
    }

    const doc = {
      quote,
      author: String(body.author || '').trim(),
      role: String(body.role || '').trim(),
      rating: body.rating ? Number(body.rating) : null,
      ...(img ? { img } : {}),
      createdAt: new Date().toISOString(),
    };

    const db = await getDb();
    const result = await db.collection(COLLECTIONS.reviews).insertOne(doc);
    revalidateContent(CACHE_TAGS.reviews);
    return NextResponse.json({
      data: { _id: result.insertedId.toHexString(), ...doc },
    });
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error);
    console.error('POST /api/reviews', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
