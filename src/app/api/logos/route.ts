import { NextRequest, NextResponse } from 'next/server';
import { AuthError, jsonError, requireAdmin } from '@/lib/auth';
import { COLLECTIONS, getDb } from '@/lib/mongodb';
import { serializeDocs } from '@/lib/serialize';

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db
      .collection(COLLECTIONS.logos)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ data: serializeDocs(docs) });
  } catch (error) {
    console.error('GET /api/logos', error);
    return NextResponse.json({ error: 'Failed to load logos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const imgUrl = String(body.imgUrl || '').trim();
    if (!imgUrl) {
      return NextResponse.json({ error: 'imgUrl is required' }, { status: 400 });
    }

    const doc = {
      imgUrl,
      createdAt: new Date().toISOString(),
    };

    const db = await getDb();
    const result = await db.collection(COLLECTIONS.logos).insertOne(doc);
    return NextResponse.json({
      data: { _id: result.insertedId.toHexString(), ...doc },
    });
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error);
    console.error('POST /api/logos', error);
    return NextResponse.json({ error: 'Failed to create logo' }, { status: 500 });
  }
}
