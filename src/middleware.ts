import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { SITE_HOST } from '@/lib/seo';

const AUTH_COOKIE = 'rf_admin_token';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get('host')?.split(':')[0] ?? '';

  // Production *.vercel.app → canonical custom domain (previews keep working).
  if (
    process.env.VERCEL_ENV === 'production' &&
    host.endsWith('.vercel.app') &&
    host !== SITE_HOST
  ) {
    const url = req.nextUrl.clone();
    url.protocol = 'https';
    url.host = SITE_HOST;
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL('/admin/login', req.url));
    res.cookies.set(AUTH_COOKIE, '', { path: '/', maxAge: 0 });
    return res;
  }
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    // Host canonicalization for HTML routes (skip static assets)
    '/((?!_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|txt|xml|webmanifest)$).*)',
  ],
};
