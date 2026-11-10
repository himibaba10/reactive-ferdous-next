import { NextRequest, NextResponse } from 'next/server';

const FROM = 'Ferdous Ahmed <contact@reactiveferdous.com>';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.reactiveferdous.com';
const WHATSAPP = 'https://wa.me/8801997722621';
const CALENDLY = 'https://calendly.com/himibaba/new-meeting';

function confirmationHtml(name: string) {
  const greeting = name ? `Hi ${name},` : 'Hi,';
  return `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;background:#0b1123;color:#e4e4e7;padding:32px">
  <div style="max-width:560px;margin:0 auto;background:#111827;border:1px solid #27272a;border-radius:16px;padding:28px">
    <p style="margin:0 0 16px">${greeting}</p>
    <p style="margin:0 0 16px;line-height:1.6;color:#a1a1aa">Thanks for reaching out via <a href="${SITE}" style="color:#e8f88b">portfolio.reactiveferdous.com</a>. We got your message and will reply soon.</p>
    <p style="margin:0 0 8px;color:#a1a1aa">Meanwhile:</p>
    <ul style="color:#a1a1aa;line-height:1.7">
      <li><a href="${WHATSAPP}" style="color:#e8f88b">Chat on WhatsApp</a></li>
      <li><a href="${CALENDLY}" style="color:#e8f88b">Book a call</a></li>
    </ul>
    <p style="margin:24px 0 0;color:#71717a;font-size:13px">— Ferdous Ahmed</p>
  </div></body></html>`;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    function: 'confirm-contact',
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Confirmation email is not configured' },
      { status: 503 }
    );
  }

  let payload: { name?: string; email?: string; company?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const name = String(payload.name || '').trim().slice(0, 100);
  const email = String(payload.email || '').trim().slice(0, 200);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      reply_to: 'contact@reactiveferdous.com',
      subject: 'We got your message — Ferdous Ahmed',
      html: confirmationHtml(name),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('Resend error', response.status, text);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
