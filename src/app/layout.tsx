import type { Metadata } from 'next';
import './globals.css';
import { createPageMetadata, SITE_DESCRIPTION, SITE_URL } from '@/lib/seo';
import { bebasNeue, inter } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: 'Ferdous Ahmed | Web Developer & Designer',
    description: SITE_DESCRIPTION,
    path: '/',
  }),
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full ${inter.variable} ${bebasNeue.variable}`}
    >
      <body className={`font-inter ${inter.className}`}>{children}</body>
    </html>
  );
}
