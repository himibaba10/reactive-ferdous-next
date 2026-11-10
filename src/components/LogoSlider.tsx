import Image from 'next/image';
import { getLogos } from '@/lib/data';

export default async function LogoSlider() {
  const logos = await getLogos();

  if (logos.length === 0) return null;

  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="w-full py-12 bg-zinc-900/10 border-y border-zinc-800/30 overflow-hidden relative">
      <div className="text-center mb-8">
        <p className="text-zinc-300 uppercase tracking-widest text-sm font-semibold">
          Trusted by innovative companies
        </p>
      </div>

      <div className="flex relative overflow-hidden w-full">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[rgba(11,17,35,1)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[rgba(11,17,35,1)] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-logo-marquee hover:[animation-play-state:paused] items-center">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex items-center justify-center min-w-[200px] px-8"
            >
              <div className="relative h-12 w-40">
                <Image
                  src={logo.imgUrl}
                  alt={
                    logo.name
                      ? `${logo.name} — client of Ferdous Ahmed`
                      : 'Client company logo of Ferdous Ahmed'
                  }
                  fill
                  sizes="160px"
                  loading="lazy"
                  className="object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
