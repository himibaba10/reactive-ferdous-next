'use client';

import { motion } from 'motion/react';
import AnimatedHeading from '@/components/client/AnimatedHeading';
import PrimaryButton from '@/ui/PrimaryButton';

export default function AboutIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <AnimatedHeading className="font-bebas text-5xl sm:text-7xl text-secondary mb-6 text-left">
        Who Are We?
      </AnimatedHeading>
      <p className="text-base sm:text-xl mb-10 text-zinc-300 leading-relaxed max-w-xl">
        We don&apos;t just write code; we build digital assets that generate revenue. With over 4
        years of experience specializing in WordPress and modern web infrastructure, we bridge the
        gap between stunning design and high-converting architecture.
        <br />
        <br />
        Our philosophy is simple: your website shouldn&apos;t be an expense—it should be your
        hardest-working sales engine. Whether you need a lead-optimized WordPress funnel or a custom
        React application, we engineer solutions focused entirely on maximizing your Return on
        Investment (ROI).
      </p>
      <a href="#portfolio">
        <PrimaryButton>SEE OUR PROJECTS</PrimaryButton>
      </a>
    </motion.div>
  );
}
