'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import clientReviewImage from '@/assets/Client Review.webp';

/** Animate `x` (transform), not `left` — avoids layout thrashing. */
export default function HeroLeftImage() {
  return (
    <motion.div
      className="absolute left-[-2rem] top-0"
      initial={{ x: '-23rem', rotate: -5 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <Image
        src={clientReviewImage}
        alt="Client review screenshot from a recent web development project"
        width={404}
        height={238}
        loading="lazy"
        fetchPriority="low"
        style={{ width: 'auto', height: 'auto' }}
      />
    </motion.div>
  );
}
