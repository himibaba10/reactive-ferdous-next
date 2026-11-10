'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useAboutSlider } from '@/hooks/useAboutSlider';

export type AboutSlideImage = { src: string; alt: string };

export default function AboutSlider({ images }: { images: AboutSlideImage[] }) {
  const ordered = useAboutSlider(images);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative h-[300px] sm:h-[450px] w-full hidden md:block"
    >
      {ordered.map((img, idx) => {
        const isFront = idx === 0;
        const isMid = idx === 1;
        const isBack = idx === 2;
        const isHidden = idx > 2;

        return (
          <motion.div
            key={img.src}
            initial={false}
            animate={{
              top: isFront ? '7rem' : isMid ? '3rem' : isBack ? '0rem' : '7rem',
              right: isFront ? '30%' : isMid ? '15%' : isBack ? '0%' : '30%',
              zIndex: isFront ? 20 : isMid ? 10 : isBack ? 0 : 30,
              opacity: isFront ? 1 : isMid ? 0.7 : isBack ? 0.4 : 0,
              scale: isFront ? 1 : isMid ? 0.95 : isBack ? 0.9 : 1.1,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ position: 'absolute' }}
            className={`w-3/5 aspect-[5/6] ${isHidden ? 'pointer-events-none' : ''}`}
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
          </motion.div>
        );
      })}
    </motion.div>
  );
}
