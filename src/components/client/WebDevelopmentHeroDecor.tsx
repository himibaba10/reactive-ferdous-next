'use client';

import Image from 'next/image';
import * as m from 'motion/react-m';

const decor = [
  {
    src: '/images/web-dashboard.webp',
    alt: 'Dashboard Project',
    className:
      'absolute w-[240px] h-[160px] object-cover rounded-xl shadow-2xl border-4 border-zinc-800/50 hidden lg:block',
    initial: { left: '-100%', top: '10%', rotate: -15, opacity: 0 },
    animate: { left: '3%', top: '15%', rotate: -8, opacity: 1 },
    transition: { duration: 1.2, ease: 'easeOut' as const },
  },
  {
    src: '/images/web-analytics.webp',
    alt: 'Analytics Project',
    className:
      'absolute w-[240px] h-[160px] object-cover rounded-xl shadow-2xl border-4 border-zinc-800/50 hidden lg:block',
    initial: { left: '-100%', bottom: '5%', rotate: -20, opacity: 0 },
    animate: { left: '5%', bottom: '10%', rotate: -14, opacity: 1 },
    transition: { duration: 1.4, ease: 'easeOut' as const, delay: 0.2 },
  },
  {
    src: '/images/web-ui.webp',
    alt: 'UI Project',
    className:
      'absolute w-[240px] h-[160px] object-cover rounded-xl shadow-2xl border-4 border-zinc-800/50 hidden lg:block',
    initial: { right: '-100%', top: '15%', rotate: 15, opacity: 0 },
    animate: { right: '3%', top: '18%', rotate: 8, opacity: 1 },
    transition: { duration: 1.2, ease: 'easeOut' as const, delay: 0.1 },
  },
  {
    src: '/images/web-mobile.webp',
    alt: 'Mobile Web Project',
    className:
      'absolute w-[240px] h-[160px] object-cover rounded-xl shadow-2xl border-4 border-zinc-800/50 hidden lg:block',
    initial: { right: '-100%', bottom: '5%', rotate: 20, opacity: 0 },
    animate: { right: '5%', bottom: '8%', rotate: 12, opacity: 1 },
    transition: { duration: 1.4, ease: 'easeOut' as const, delay: 0.3 },
  },
] as const;

export default function WebDevelopmentHeroDecor() {
  return (
    <>
      {decor.map((item) => (
        <m.div
          key={item.src}
          initial={item.initial}
          animate={item.animate}
          transition={item.transition}
          className={`${item.className} overflow-hidden`}
          style={{ position: 'absolute' }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="240px"
            loading="lazy"
            className="object-cover"
          />
        </m.div>
      ))}
    </>
  );
}
