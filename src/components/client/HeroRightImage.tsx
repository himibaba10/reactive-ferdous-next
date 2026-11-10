'use client';

import Image from 'next/image';
import * as m from 'motion/react-m';
import expertiseImg from '@/assets/My expertise image.webp';

/** Animate `x` (transform), not `right` — avoids layout thrashing. */
export default function HeroRightImage() {
  return (
    <m.div
      className="absolute right-[-3rem] top-64 sm:top-20"
      initial={{ x: '22rem', rotate: 7 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <Image
        src={expertiseImg}
        alt="Ferdous Ahmed web development and design expertise"
        width={405}
        height={238}
        loading="lazy"
        fetchPriority="low"
        style={{ width: 'auto', height: 'auto' }}
      />
    </m.div>
  );
}
