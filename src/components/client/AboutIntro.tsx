'use client';

import * as m from 'motion/react-m';
import AnimatedHeading from '@/components/client/AnimatedHeading';
import PrimaryButton from '@/ui/PrimaryButton';

/**
 * Avoid opacity:0 + delayed whileInView — on Next that leaves this section
 * blank until hydration AND a deep scroll into view (margin: -100px).
 * Keep content readable immediately; only slide in.
 */
export default function AboutIntro() {
  return (
    <m.div
      initial={{ x: -32 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '80px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
    </m.div>
  );
}
