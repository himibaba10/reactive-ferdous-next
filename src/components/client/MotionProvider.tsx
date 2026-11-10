'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Sync `domAnimation` (not async import): async features left `initial`
 * styles stuck (e.g. opacity:0 headings) until the chunk loaded.
 * Sync still uses slim `m` components (~5kb + features) vs full `motion` (~43kb).
 * @see https://motion.dev/docs/react-reduce-bundle-size
 * @see https://motion.dev/docs/performance
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
