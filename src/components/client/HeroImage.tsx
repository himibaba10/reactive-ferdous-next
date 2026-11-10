import Image from 'next/image';

const HERO_IMG = '/hero-main.webp';

export default function HeroImage() {
  return (
    <div className="relative inline-block">
      <div
        aria-hidden
        className="pointer-events-none w-[650px] aspect-square absolute bottom-[5px] -left-24 top-14 bg-secondary rounded-full blur-3xl opacity-25 animate-hero-glow will-change-transform"
      />
      <Image
        src={HERO_IMG}
        alt="Ferdous Ahmed - Freelance WordPress Developer"
        width={433}
        height={577}
        priority
        fetchPriority="high"
        sizes="433px"
        className="mx-auto relative translate-y-3 w-[433px] max-w-none h-auto"
      />
    </div>
  );
}
