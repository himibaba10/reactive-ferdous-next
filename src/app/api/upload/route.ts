import { NextRequest, NextResponse } from 'next/server';
import { AuthError, jsonError, requireAdmin } from '@/lib/auth';
import { uploadToR2 } from '@/lib/r2';

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    const form = await req.formData();
    const file = form.get('file');
    const folder = String(form.get('folder') || 'uploads');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image uploads are allowed' },
        { status: 400 }
      );
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Max file size is 8MB' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadToR2({
      buffer,
      contentType: file.type || 'application/octet-stream',
      folder,
      filename: file.name,
    });

    return NextResponse.json({ url: uploaded.url, key: uploaded.key });
  } catch (error) {
    if (error instanceof AuthError) return jsonError(error);
    console.error('POST /api/upload', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
