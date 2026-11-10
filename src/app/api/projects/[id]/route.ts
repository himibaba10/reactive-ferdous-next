import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { AuthError, jsonError, requireAdmin } from '@/lib/auth';
import { CACHE_TAGS, revalidateContent } from '@/lib/cache';
import { COLLECTIONS, getDb } from '@/lib/mongodb';
import { serializeDoc } from '@/lib/serialize';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  try {
    await requireAdmin(req);
    const { id } = await ctx.params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const body = await req.json();
    const update: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    for (const key of [
      'title',
      'category',
      'img',
      'live',
      'frontendCodeLink',
      'backendCodeLink',
    ] as const) {
      if (body[key] !== undefined) update[key] = String(body[key] || '').trim();
    }

    if (body.technologies !== undefined) {
      update.technologies = Array.isArray(body.technologies)
        ? body.technologies.map((t: unknown) => String(t).trim()).filter(Boolean)
        : String(body.technologies || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
    }

    const db = await getDb();
    const result = await db
      .collection(COLLECTIONS.projects)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        { returnDocument: 'after' }
      );

    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    revalidateContent(CACHE_TAGS.projects);
    return NextResponse.json({ data: serializeDoc(result) });
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error);
    console.error('PATCH /api/projects/[id]', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  try {
    await requireAdmin(req);
    const { id } = await ctx.params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db
      .collection(COLLECTIONS.projects)
      .deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    revalidateContent(CACHE_TAGS.projects);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error);
    console.error('DELETE /api/projects/[id]', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
