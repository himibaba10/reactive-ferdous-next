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
    const imgUrl = String(body.imgUrl || '').trim();
    if (!imgUrl) {
      return NextResponse.json({ error: 'imgUrl is required' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db
      .collection(COLLECTIONS.logos)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { imgUrl } },
        { returnDocument: 'after' }
      );

    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    revalidateContent(CACHE_TAGS.logos);
    return NextResponse.json({ data: serializeDoc(result) });
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error);
    console.error('PATCH /api/logos/[id]', error);
    return NextResponse.json({ error: 'Failed to update logo' }, { status: 500 });
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
      .collection(COLLECTIONS.logos)
      .deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    revalidateContent(CACHE_TAGS.logos);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error);
    console.error('DELETE /api/logos/[id]', error);
    return NextResponse.json({ error: 'Failed to delete logo' }, { status: 500 });
  }
}
