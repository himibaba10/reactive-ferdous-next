'use client';

import { LazyMotion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Async `domAnimation` — home hero/headings/CTAs are CSS now, so we no longer
 * need sync features on the critical path. Below-fold Motion islands hydrate
 * when this chunk arrives.
 * @see https://motion.dev/docs/react-reduce-bundle-size
 */
const loadFeatures = () =>
  import('motion/react').then((mod) => mod.domAnimation);

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
