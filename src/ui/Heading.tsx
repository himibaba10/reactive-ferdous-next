import AnimatedHeading from '@/components/client/AnimatedHeading';
import type { ElementType } from 'react';

type HeadingProps = {
  children: string;
  className?: string;
  as?: ElementType;
};

export default function Heading(props: HeadingProps) {
  return <AnimatedHeading {...props} />;
}
