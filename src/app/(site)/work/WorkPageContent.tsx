import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/ui/Heading';
import PrimaryButton from '@/ui/PrimaryButton';
import { caseStudies } from '@/data/caseStudies';

export default function Work() {
  const published = caseStudies.filter((study) => study.published);

  return (
    <>

      <header className='section max-w-4xl mx-auto pt-16 pb-12 text-center'>
        <h1 className='text-4xl sm:text-6xl mb-6 leading-tight'>
          <Heading as='span' className='text-4xl sm:text-6xl text-white'>
            Case Studies
          </Heading>
        </h1>
        <p className='text-zinc-400 text-lg sm:text-xl leading-relaxed'>
          The problem, the approach and the result — with the numbers where they
          exist, and an honest note when a figure came from the client rather
          than from measurement.
        </p>
      </header>

      <section className='section max-w-6xl mx-auto pb-20'>
        {published.length === 0 ? (
          <p className='text-center text-zinc-400'>
            Case studies are on the way — check back soon.
          </p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {published.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className='group flex flex-col bg-zinc-900/40 border border-zinc-800 hover:border-secondary/60 rounded-3xl overflow-hidden transition-colors'
              >
                {study.heroImage && (
                  <div className='relative h-56 w-full border-b border-zinc-800'>
                    <Image
                      src={study.heroImage.src}
                      alt={study.heroImage.alt}
                      fill
                      sizes='(max-width: 768px) 100vw, 50vw'
                      loading='lazy'
                      className='object-cover object-top'
                    />
                  </div>
                )}

                <div className='p-8 flex flex-col flex-grow'>
                  <p className='text-secondary font-bold tracking-wider uppercase text-xs mb-3'>
                    {study.client}
                    {study.date ? ` · ${study.date}` : ''}
                  </p>

                  <h2 className='text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors'>
                    {study.h1}
                  </h2>

                  <p className='text-zinc-400 leading-relaxed flex-grow'>
                    {study.summary}
                  </p>

                  {study.results?.length > 0 && (
                    <>
                      <ul className='mt-6 flex flex-wrap gap-2'>
                        {study.results.map((result) => (
                          <li
                            key={result.label}
                            className='bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold rounded-full px-3 py-1'
                          >
                            <span className='text-zinc-400 font-normal'>
                              {result.label}:
                            </span>{' '}
                            {result.value}
                          </li>
                        ))}
                      </ul>

                      {study.results.some((result) => result.note) && (
                        <p className='mt-3 text-xs text-zinc-500'>
                          {study.results
                            .filter((result) => result.note)
                            .map((result) => `${result.value}: ${result.note?.toLowerCase() ?? ''}`)
                            .join(' · ')}
                        </p>
                      )}
                    </>
                  )}

                  <span className='inline-block mt-6 text-zinc-300 underline underline-offset-4'>
                    Read the case study →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className='mt-20 text-center'>
          <PrimaryButton
            href='https://wa.me/8801997722621'
            target='_blank'
            rel='noopener noreferrer'
          >
            Start Your Project Today
          </PrimaryButton>
          <p className='mt-6 text-zinc-400'>
            Prefer to talk it through?{' '}
            <a
              href='https://calendly.com/himibaba/new-meeting'
              target='_blank'
              rel='noopener noreferrer'
              className='text-secondary underline underline-offset-4'
            >
              Book a free 30-minute call
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
