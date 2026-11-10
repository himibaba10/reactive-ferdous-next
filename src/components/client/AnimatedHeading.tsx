'use client';

import type { ElementType } from 'react';
import { motion } from 'motion/react';

type AnimatedHeadingProps = {
  children: string;
  className?: string;
  as?: ElementType;
};

/**
 * Per-letter reveal. Uses compositor-friendly opacity/y only, and
 * viewport.once so observers don't keep firing on scroll (Motion perf guide).
 */
export default function AnimatedHeading({
  children,
  className = '',
  as: Component = 'h2',
}: AnimatedHeadingProps) {
  return (
    <Component className={`uppercase ${className}`}>
      {children.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            delay: index * 0.04,
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block font-bebas"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Component>
  );
}
