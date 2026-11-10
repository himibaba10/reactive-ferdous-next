import localFont from 'next/font/local';

/**
 * Body face: do not preload — frees the critical path for LCP (hero image +
 * Bebas). System UI shows first via CSS fallbacks; Inter swaps in when ready.
 * File is already latin-only; further glyph subsetting needs a rebuilt woff2.
 */
export const inter = localFont({
  src: '../../public/fonts/inter-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
  preload: false,
  weight: '400 700',
  adjustFontFallback: 'Arial',
});

/** Display face for headings — keep preloaded (small + brand-critical). */
export const bebasNeue = localFont({
  src: '../../public/fonts/bebas-neue-latin.woff2',
  variable: '--font-bebas',
  display: 'swap',
  preload: true,
  weight: '400',
  adjustFontFallback: 'Arial',
});
