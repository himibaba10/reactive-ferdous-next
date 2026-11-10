import type { MetadataRoute } from 'next';
import { caseStudies } from '@/data/caseStudies';
import { getPublishedPosts } from '@/data/posts';
import { pageUrl } from '@/lib/seo';

const hasPlaceholder = (study: (typeof caseStudies)[number]) =>
  JSON.stringify(study).includes('TODO');

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  {
    path: '/services/web-development',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/services/graphic-design',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/services/figma-design',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/services/logo-design',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  { path: '/work', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: pageUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const workPages: MetadataRoute.Sitemap = caseStudies
    .filter((study) => study.published && !hasPlaceholder(study))
    .map((study) => ({
      url: pageUrl(`/work/${study.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const blogPages: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: pageUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...pages, ...workPages, ...blogPages];
}
