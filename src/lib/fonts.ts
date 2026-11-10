import localFont from 'next/font/local';

/** Same self-hosted files as the Vite app (`public/fonts/*.woff2`). */
export const inter = localFont({
  src: '../../public/fonts/inter-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '400 700',
});

export const bebasNeue = localFont({
  src: '../../public/fonts/bebas-neue-latin.woff2',
  variable: '--font-bebas',
  display: 'swap',
  weight: '400',
});
