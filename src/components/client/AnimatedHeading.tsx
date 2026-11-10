import type { ElementType } from 'react';

type AnimatedHeadingProps = {
  children: string;
  className?: string;
  as?: ElementType;
};

/**
 * Whole-heading CSS entrance (no per-character Motion spans).
 * Avoids hydration cost and spaced-letter LCP text. Opacity stays readable
 * immediately (never 0) so content isn't blank before paint.
 */
export default function AnimatedHeading({
  children,
  className = '',
  as: Component = 'h2',
}: AnimatedHeadingProps) {
  return (
    <Component className={`uppercase font-bebas animate-heading-in ${className}`}>
      {children}
    </Component>
  );
}
