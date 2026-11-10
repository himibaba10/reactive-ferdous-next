import type { Metadata } from 'next';
import BlogArticle, { BlogNotFound } from '@/components/BlogArticle';
import JsonLd from '@/components/JsonLd';
import { getPostBySlug, getPublishedPosts } from '@/data/posts';
import {
  absoluteUrl,
  createPageMetadata,
  pageUrl,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: 'Post Not Found | Ferdous Ahmed',
      description: 'This blog post does not exist or has not been published.',
      noindex: true,
    });
  }

  return createPageMetadata({
    title: `${post.title} | Ferdous Ahmed`,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image: absoluteUrl(post.thumbnail.src),
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return <BlogNotFound />;
  }

  const url = pageUrl(`/blog/${post.slug}`);
  const image = absoluteUrl(post.thumbnail.src);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.h1,
    description: post.metaDescription,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.tags.join(', '),
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: pageUrl('/blog') },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbs} />
      <BlogArticle post={post} />
    </>
  );
}
