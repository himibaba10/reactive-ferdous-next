/**
 * LCP image: serve the static WebP directly (no `/_next/image` round-trip).
 * The file is already ~31KB WebP — the optimizer only added cold-MISS latency.
 */
const HERO_IMG = '/hero-main.webp';

export default function HeroImage() {
  return (
    <div className="relative inline-block">
      {/* Preload hoists into <head> in the App Router */}
      <link
        rel="preload"
        as="image"
        href={HERO_IMG}
        type="image/webp"
        fetchPriority="high"
      />
      <div
        aria-hidden
        className="pointer-events-none w-[650px] aspect-square absolute bottom-[5px] -left-24 top-14 bg-secondary rounded-full blur-3xl opacity-25 animate-hero-glow will-change-transform"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- intentional: static LCP asset */}
      <img
        src={HERO_IMG}
        alt="Ferdous Ahmed - Freelance WordPress Developer"
        width={433}
        height={577}
        fetchPriority="high"
        decoding="async"
        className="mx-auto relative translate-y-3 w-[433px] max-w-none h-auto"
      />
    </div>
  );
}
