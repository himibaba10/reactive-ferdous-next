import Image from "next/image";
import Link from "next/link";
import Heading from "@/ui/Heading";
import PrimaryButton from "@/ui/PrimaryButton";

export type CaseStudyData = {
  slug: string;
  published?: boolean;
  client?: string;
  date?: string;
  title?: string;
  metaDescription?: string;
  ogImage?: string;
  h1?: string;
  summary?: string;
  stack?: string[];
  timeline?: string;
  service?: { label: string; path: string };
  heroImage?: { src: string; alt: string; width: number; height: number };
  context?: string;
  problem?: string;
  constraints?: string[];
  approach?: { title: string; body: string }[];
  results?: { label: string; value: string; note?: string }[];
  proof?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  }[];
  testimonial?: { quote: string; author: string; role?: string };
  pdf?: string;
};

export function CaseStudyNotFound() {
  return (
    <section className="section my-32 text-center">
      <Heading className="text-4xl sm:text-6xl mb-6">Not Found</Heading>
      <p className="text-zinc-400 mb-10 text-lg">
        That case study does not exist or has not been published yet.
      </p>
      <Link
        href="/"
        className="text-zinc-300 hover:text-white underline underline-offset-4 transition-colors"
      >
        Back to home
      </Link>
    </section>
  );
}

export default function CaseStudyArticle({ study }: { study: CaseStudyData }) {
  return (
    <article>
      <header className="section max-w-4xl mx-auto pt-16 pb-12">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-400 mb-8">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/work" className="hover:text-white transition-colors">
                Case Studies
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-500">{study.client}</li>
          </ol>
        </nav>

        <p className="text-secondary font-bold tracking-wider uppercase text-sm mb-4">
          {study.client}
          {study.date ? ` · ${study.date}` : ""}
        </p>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-tight text-white">{study.h1}</h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed">{study.summary}</p>

        {study.stack && study.stack.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {study.stack.map((tech) => (
              <li
                key={tech}
                className="bg-zinc-800/60 border border-zinc-700/50 rounded-full px-4 py-1 text-sm text-zinc-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          {study.timeline && (
            <div>
              <dt className="text-zinc-500">Timeline</dt>
              <dd className="text-zinc-200">{study.timeline}</dd>
            </div>
          )}
          {study.service && (
            <div>
              <dt className="text-zinc-500">Service</dt>
              <dd>
                <Link
                  href={study.service.path}
                  className="text-zinc-200 underline underline-offset-4 hover:text-white transition-colors"
                >
                  {study.service.label}
                </Link>
              </dd>
            </div>
          )}
        </dl>
      </header>

      {study.heroImage && (
        <div className="section max-w-6xl mx-auto">
          <Image
            src={study.heroImage.src}
            alt={study.heroImage.alt}
            width={study.heroImage.width}
            height={study.heroImage.height}
            priority
            fetchPriority="high"
            sizes="(max-width: 1152px) 92vw, 1152px"
            quality={70}
            className="w-full rounded-3xl border border-zinc-800"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}

      <div className="section max-w-4xl mx-auto my-20 grid gap-14">
        <div>
          <Heading className="text-3xl sm:text-5xl mb-6">The Context</Heading>
          <p className="text-zinc-300 text-lg leading-relaxed">{study.context}</p>
        </div>
        <div>
          <Heading className="text-3xl sm:text-5xl mb-6">The Problem</Heading>
          <p className="text-zinc-300 text-lg leading-relaxed">{study.problem}</p>
        </div>
        {study.constraints && study.constraints.length > 0 && (
          <div>
            <Heading className="text-3xl sm:text-5xl mb-6">Constraints</Heading>
            <ul className="grid gap-3">
              {study.constraints.map((item) => (
                <li key={item} className="flex gap-3 text-zinc-300">
                  <span aria-hidden="true" className="text-secondary">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {study.approach && study.approach.length > 0 && (
        <section className="section max-w-6xl mx-auto my-20">
          <Heading className="text-3xl sm:text-5xl mb-10 text-center">The Approach</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {study.approach.map((step) => (
              <div
                key={step.title}
                className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50"
              >
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400">{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {study.results && study.results.length > 0 && (
        <section className="section max-w-6xl mx-auto my-20">
          <Heading className="text-3xl sm:text-5xl mb-10 text-center">The Result</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {study.results.map((result) => (
              <div
                key={result.label}
                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
                  {result.value}
                </p>
                <p className="text-zinc-400">{result.label}</p>
                {result.note && <p className="mt-2 text-xs text-zinc-500">{result.note}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {study.proof && study.proof.length > 0 && (
        <section className="section max-w-6xl mx-auto my-20">
          <Heading className="text-3xl sm:text-5xl mb-10 text-center">The Work</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {study.proof.map((img) => (
              <figure key={img.src}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  sizes="(max-width: 768px) 92vw, 560px"
                  quality={60}
                  className="w-full rounded-2xl border border-zinc-800"
                  style={{ width: '100%', height: 'auto' }}
                />
                {img.caption && (
                  <figcaption className="mt-3 text-sm text-zinc-500">{img.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {study.testimonial?.quote && (
        <section className="section max-w-4xl mx-auto my-20">
          <blockquote className="bg-zinc-900/30 rounded-3xl border border-zinc-800 p-10">
            <p className="text-xl sm:text-2xl text-zinc-200 leading-relaxed">
              &ldquo;{study.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6 text-zinc-400">
              <span className="text-white font-semibold">{study.testimonial.author}</span>
              {study.testimonial.role ? ` — ${study.testimonial.role}` : ""}
            </footer>
          </blockquote>
        </section>
      )}

      <section className="section max-w-4xl mx-auto my-24 text-center">
        <Heading className="text-3xl sm:text-5xl mb-6">Want results like this?</Heading>
        <div className="mt-10 flex flex-col sm:flex-row gap-6 items-center justify-center">
          <PrimaryButton
            href="https://wa.me/8801997722621"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start Your Project Today
          </PrimaryButton>
          {study.service && (
            <Link
              href={study.service.path}
              className="text-zinc-300 hover:text-white underline underline-offset-4 transition-colors font-medium"
            >
              See all {study.service.label} services
            </Link>
          )}
        </div>
        <p className="mt-8 text-zinc-400">
          Prefer to talk it through?{" "}
          <a
            href="https://calendly.com/himibaba/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary underline underline-offset-4"
          >
            Book a free 30-minute call
          </a>
          .
        </p>
        {study.pdf && (
          <p className="mt-4 text-zinc-400">
            <a
              href={study.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline underline-offset-4"
            >
              Read this case study as a PDF
            </a>
          </p>
        )}
      </section>
    </article>
  );
}
