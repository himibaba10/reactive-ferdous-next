import { NextRequest, NextResponse } from 'next/server';
import {
  createToken,
  setAuthCookie,
  verifyPassword,
} from '@/lib/auth';
import { COLLECTIONS, getDb } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || '')
      .trim()
      .toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const user = await db.collection(COLLECTIONS.users).findOne({ email });
    if (!user?.passwordHash) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = await createToken({
      sub: user._id.toHexString(),
      email: user.email,
    });

    const res = NextResponse.json({
      ok: true,
      user: { id: user._id.toHexString(), email: user.email },
    });
    return setAuthCookie(res, token);
  } catch (error) {
    console.error('login error', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
