import Image from 'next/image';
import Heading from '@/ui/Heading';
import JsonLd from '@/components/JsonLd';
import { MdFormatQuote } from 'react-icons/md';
import { getReviews, type ReviewDoc } from '@/lib/data';
import { SITE_URL } from '@/lib/seo';

const Stars = ({ rating }: { rating: number }) => (
  <span className="text-secondary" aria-label={`Rated ${rating} out of 5`}>
    {'★'.repeat(Math.round(rating))}
    {'☆'.repeat(Math.max(0, 5 - Math.round(rating)))}
  </span>
);

type ReviewItem = ReviewDoc & { featured?: boolean };

export default async function Reviews() {
  const reviewList = (await getReviews()) as ReviewItem[];

  if (reviewList.length === 0) return null;

  const textReviews = reviewList
    .filter((r) => r.quote && r.author)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  const imageOnly = reviewList.filter((r) => !r.quote && r.img);

  const ratings = textReviews
    .map((r) => Number(r.rating))
    .filter((n) => Number.isFinite(n) && n > 0);
  const averageRating = ratings.length
    ? (ratings.reduce((sum, n) => sum + n, 0) / ratings.length).toFixed(1)
    : null;

  const reviewSchema = textReviews.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ferdous Ahmed',
        url: SITE_URL,
        areaServed: 'Worldwide',
        review: textReviews.map((r) => ({
          '@type': 'Review',
          reviewBody: r.quote,
          author: { '@type': 'Person', name: r.author },
          ...(Number(r.rating)
            ? {
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: Number(r.rating),
                  bestRating: 5,
                  worstRating: 1,
                },
              }
            : {}),
        })),
        ...(averageRating
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: Number(averageRating),
                // Count only reviews that contributed a numeric rating
                reviewCount: ratings.length,
                ratingCount: ratings.length,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : {}),
      }
    : null;

  return (
    <section
      id="reviews"
      className="section my-20 py-20 w-full bg-zinc-900/30 rounded-3xl relative overflow-hidden"
    >
      {reviewSchema ? <JsonLd data={reviewSchema} /> : null}

      <div className="absolute top-10 left-10 text-zinc-800 opacity-20">
        <MdFormatQuote size={120} />
      </div>

      <div className="text-center mb-16 relative z-10">
        <Heading className="text-4xl sm:text-6xl mb-4">Client Success Stories</Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Don&apos;t just take our word for it. Check out what our clients have to say about the
          results we&apos;ve achieved together.
        </p>
      </div>

      {textReviews.length > 0 && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {textReviews.map((review) => (
            <figure
              key={review.id || review.author}
              className="flex flex-col bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6"
            >
              {Number(review.rating) > 0 && (
                <div className="mb-3">
                  <Stars rating={Number(review.rating)} />
                </div>
              )}
              <blockquote className="flex-grow text-zinc-300 leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="text-white font-semibold">{review.author}</span>
                {review.role ? (
                  <span className="text-zinc-500"> · {review.role}</span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {imageOnly.length > 0 && (
        <div className="relative z-10 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageOnly.map((review) => (
            <Image
              key={review.id}
              src={review.img!}
              alt="Client feedback for Ferdous Ahmed"
              width={800}
              height={600}
              loading="lazy"
              className="w-full rounded-2xl border border-zinc-800"
              style={{ width: '100%', height: 'auto' }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
