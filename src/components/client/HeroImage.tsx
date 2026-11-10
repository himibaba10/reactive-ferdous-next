'use client';

import Image from 'next/image';
import * as m from 'motion/react-m';

const HERO_IMG = '/hero-main.webp';

export default function HeroImage() {
  return (
    <div className="relative inline-block">
      <m.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="w-[650px] aspect-square absolute bottom-[5px] -left-24 top-14 bg-secondary rounded-full blur-3xl opacity-25 will-change-transform"
      />
      <div className="min-h-[410px] sm:min-h-[577px]">
        <Image
          src={HERO_IMG}
          alt="Ferdous Ahmed - Freelance WordPress Developer"
          width={433}
          height={577}
          priority
          fetchPriority="high"
          className="mx-auto relative translate-y-3"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </div>
  );
}
