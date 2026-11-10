'use client';

import Image from 'next/image';
import * as m from 'motion/react-m';
import { useAboutSlider } from '@/hooks/useAboutSlider';

export type AboutSlideImage = { src: string; alt: string };

/** Only animate opacity/scale/y (compositor). Position via CSS, not top/right. */
export default function AboutSlider({ images }: { images: AboutSlideImage[] }) {
  const ordered = useAboutSlider(images);

  return (
    <m.div
      initial={{ x: 32 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '80px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[300px] sm:h-[450px] w-full hidden md:block"
    >
      {ordered.map((img, idx) => {
        const isFront = idx === 0;
        const isMid = idx === 1;
        const isBack = idx === 2;
        const isHidden = idx > 2;

        const right = isFront ? '30%' : isMid ? '15%' : isBack ? '0%' : '30%';
        const top = isFront ? '7rem' : isMid ? '3rem' : isBack ? '0' : '7rem';

        return (
          <m.div
            key={img.src}
            initial={false}
            animate={{
              opacity: isFront ? 1 : isMid ? 0.7 : isBack ? 0.4 : 0,
              scale: isFront ? 1 : isMid ? 0.95 : isBack ? 0.9 : 1.1,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top,
              right,
              zIndex: isFront ? 20 : isMid ? 10 : isBack ? 0 : 30,
            }}
            className={`w-3/5 aspect-[5/6] will-change-transform ${
              isHidden ? 'pointer-events-none' : ''
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 60vw, 360px"
              loading="lazy"
              className={`object-cover object-top rounded-xl shadow-2xl border ${
                isFront ? 'border-2 border-secondary/70' : 'border-zinc-700/50'
              }`}
            />
          </m.div>
        );
      })}
    </m.div>
  );
}
