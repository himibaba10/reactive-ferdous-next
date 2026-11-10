'use client';

import type { ElementType } from 'react';
import * as m from 'motion/react-m';

type AnimatedHeadingProps = {
  children: string;
  className?: string;
  as?: ElementType;
};

/**
 * IMPORTANT (LazyMotion async): never use initial opacity: 0 on text.
 * `initial` styles apply before features load, so opacity:0 stays invisible
 * until domAnimation chunks arrive — felt like a multi-second blank heading.
 * @see https://motion.dev/docs/react-lazy-motion
 */
export default function AnimatedHeading({
  children,
  className = '',
  as: Component = 'h2',
}: AnimatedHeadingProps) {
  return (
    <Component className={`uppercase ${className}`}>
      {children.split('').map((char, index) => (
        <m.span
          key={`${char}-${index}`}
          initial={{ y: 10 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '80px' }}
          transition={{
            delay: Math.min(index * 0.025, 0.35),
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block font-bebas"
        >
          {char === ' ' ? '\u00A0' : char}
        </m.span>
      ))}
    </Component>
  );
}
