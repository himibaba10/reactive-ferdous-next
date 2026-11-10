import type { ReactNode } from 'react';
import { MdArrowOutward } from 'react-icons/md';

type PrimaryButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: () => void;
};

const baseClass =
  'group uppercase bg-secondary border border-black text-black px-3 sm:px-10 py-3 rounded-full font-medium inline-flex items-center justify-center relative shadow-[0_0_0_rgba(232,248,139,1)] transition-shadow duration-300 hover:shadow-[2px_2px_0_rgba(232,248,139,1)]';

/**
 * CSS hover affordance — no Motion on the critical path (hero CTA).
 */
const PrimaryButton = ({
  children,
  type = 'button',
  width = 'w-auto',
  disabled = false,
  href,
  target,
  rel,
  className = '',
  onClick,
}: PrimaryButtonProps) => {
  const content = (
    <>
      <span className="bg-primary p-2 rounded-full absolute left-1 text-white scale-0 group-hover:scale-100 transition-transform duration-300">
        <MdArrowOutward size={25} />
      </span>
      <span className="relative transition-transform duration-300 group-hover:translate-x-4">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${width} ${baseClass} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${width} ${baseClass} ${className}`}
    >
      {content}
    </button>
  );
};

export default PrimaryButton;
