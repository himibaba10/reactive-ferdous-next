import Image from 'next/image';
import Link from 'next/link';
import { cacheLife } from 'next/cache';
import { getPublishedPosts } from '@/data/posts';
import { createPageMetadata } from '@/lib/seo';
import Heading from '@/ui/Heading';

export const metadata = createPageMetadata({
  title: 'Blog | Web Development, WordPress & SEO Insights | Ferdous',
  description:
    'Practical articles on WordPress performance, custom vs CMS builds, SEO basics, Figma handoff, and website audits from Ferdous Ahmed.',
  path: '/blog',
});

/** Static posts in repo — cache until next deploy (no admin CMS). */
export default async function BlogIndexPage() {
  'use cache';
  cacheLife('max');

  const posts = getPublishedPosts();

  return (
    <section className="section my-16 sm:my-24 w-full">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <Heading className="text-5xl sm:text-7xl mb-4">Blog</Heading>
        <p className="text-zinc-400 text-lg">
          Practical notes on WordPress, performance, SEO, and shipping websites that convert —
          written from real client work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className="group flex flex-col border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/30 hover:border-zinc-600 transition-colors"
          >
            <Link href={`/blog/${post.slug}`} className="relative aspect-video block overflow-hidden">
              <Image
                src={post.thumbnail.src}
                alt={post.thumbnail.alt}
                fill
                sizes="(max-width: 768px) 92vw, 560px"
                quality={60}
                priority={index < 2}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
            <div className="flex flex-col flex-1 p-6">
              <p className="text-secondary text-xs font-semibold uppercase tracking-wider mb-3">
                {post.category}
                <span className="text-zinc-500"> · </span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </p>
              <h2 className="text-2xl font-bold text-white mb-3 leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-secondary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-zinc-400 flex-1 mb-6">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-semibold text-secondary hover:underline underline-offset-4"
              >
                Read article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
