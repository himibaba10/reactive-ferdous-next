import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { AuthError, jsonError, requireAdmin } from '@/lib/auth';
import { COLLECTIONS, getDb } from '@/lib/mongodb';

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, ctx: Ctx) {
  try {
    await requireAdmin(req);
    const { id } = await ctx.params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db
      .collection(COLLECTIONS.reviews)
      .deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error);
    console.error('DELETE /api/reviews/[id]', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
