import { revalidatePath, revalidateTag } from 'next/cache';

/** Tags for `'use cache'` data loaders in `lib/data.ts`. */
export const CACHE_TAGS = {
  projects: 'projects',
  reviews: 'reviews',
  logos: 'logos',
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

/** Public pages that embed Mongo-backed content. */
const PROJECT_PATHS = [
  '/',
  '/services/web-development',
  '/services/graphic-design',
  '/services/figma-design',
  '/services/logo-design',
] as const;

/**
 * Invalidate tagged data + affected pages after admin writes.
 * Profile `'max'` = expire the tag entry immediately (Next 16 two-arg API).
 */
export function revalidateContent(tag: CacheTag) {
  revalidateTag(tag, 'max');

  if (tag === CACHE_TAGS.projects) {
    for (const path of PROJECT_PATHS) {
      revalidatePath(path);
    }
    return;
  }

  // Reviews + logos only feed the homepage today.
  revalidatePath('/');
}
