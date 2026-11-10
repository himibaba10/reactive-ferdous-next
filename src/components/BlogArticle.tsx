import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/data/posts';
import PrimaryButton from '@/ui/PrimaryButton';

export function BlogNotFound() {
  return (
    <section className="section my-32 text-center">
      <h1 className="font-bebas text-4xl sm:text-6xl mb-6 text-secondary">Post Not Found</h1>
      <p className="text-zinc-400 mb-10 text-lg">
        That article does not exist or has not been published yet.
      </p>
      <Link
        href="/blog"
        className="text-zinc-300 hover:text-white underline underline-offset-4 transition-colors"
      >
        Back to blog
      </Link>
    </section>
  );
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article>
      <header className="section max-w-3xl mx-auto pt-16 pb-10">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-400 mb-8">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-500 line-clamp-1">{post.category}</li>
          </ol>
        </nav>

        <p className="text-secondary font-bold tracking-wider uppercase text-sm mb-4">
          {post.category}
          <span className="text-zinc-500"> · </span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="text-zinc-500"> · </span>
          {post.readingTime}
        </p>

        <h1 className="text-3xl sm:text-5xl leading-tight text-white mb-6">{post.h1}</h1>

        <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed">{post.excerpt}</p>
      </header>

      <div className="section max-w-4xl mx-auto mb-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800">
          <Image
            src={post.thumbnail.src}
            alt={post.thumbnail.alt}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="section max-w-3xl mx-auto pb-20">
        <div className="space-y-6 text-zinc-300 text-lg leading-relaxed mb-14">
          {post.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="space-y-12">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-bebas text-3xl sm:text-4xl text-secondary mb-4 tracking-wide">
                {section.heading}
              </h2>
              <div className="space-y-4 text-zinc-300 text-lg leading-relaxed">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {post.cta ? (
          <aside className="mt-16 rounded-2xl border border-zinc-700/60 bg-zinc-900/40 p-8 sm:p-10 text-center">
            <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-4">{post.cta.heading}</h2>
            <p className="text-zinc-300 text-lg mb-8 max-w-xl mx-auto">{post.cta.body}</p>
            <PrimaryButton
              href="https://wa.me/8801997722621?text=Hi%20Ferdous,%20I%20read%20your%20blog%20and%20want%20to%20talk."
              target="_blank"
              rel="noopener noreferrer"
            >
              Start a Conversation
            </PrimaryButton>
          </aside>
        ) : null}

        {post.tags.length > 0 ? (
          <ul className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-zinc-800 text-zinc-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
