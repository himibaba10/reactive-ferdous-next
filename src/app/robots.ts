import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/** Replaces static public/robots.txt with the App Router convention. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
