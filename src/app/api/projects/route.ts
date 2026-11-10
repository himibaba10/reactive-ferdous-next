import { NextRequest, NextResponse } from 'next/server';
import { AuthError, jsonError, requireAdmin } from '@/lib/auth';
import { COLLECTIONS, getDb } from '@/lib/mongodb';
import { serializeDocs } from '@/lib/serialize';

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category');
    const db = await getDb();
    const filter = category ? { category } : {};
    const docs = await db
      .collection(COLLECTIONS.projects)
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ data: serializeDocs(docs) });
  } catch (error) {
    console.error('GET /api/projects', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const title = String(body.title || '').trim();
    const category = String(body.category || '').trim();
    const img = String(body.img || '').trim();

    if (!title || !category || !img) {
      return NextResponse.json(
        { error: 'title, category, and img are required' },
        { status: 400 }
      );
    }

    const technologies = Array.isArray(body.technologies)
      ? body.technologies.map((t: unknown) => String(t).trim()).filter(Boolean)
      : String(body.technologies || '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);

    const now = new Date().toISOString();
    const doc = {
      title,
      category,
      img,
      live: String(body.live || '').trim(),
      frontendCodeLink: String(body.frontendCodeLink || '').trim(),
      backendCodeLink: String(body.backendCodeLink || '').trim(),
      technologies,
      createdAt: now,
      updatedAt: now,
    };

    const db = await getDb();
    const result = await db.collection(COLLECTIONS.projects).insertOne(doc);
    return NextResponse.json({
      data: { _id: result.insertedId.toHexString(), ...doc },
    });
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error);
    console.error('POST /api/projects', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
