'use client';

import * as m from 'motion/react-m';
import AnimatedHeading from '@/components/client/AnimatedHeading';
import PrimaryButton from '@/ui/PrimaryButton';

export default function HeroInfo() {
  return (
    <div className="text-center flex flex-col items-center px-4">
      <h1 className="text-2xl sm:text-5xl lg:text-7xl leading-tight flex flex-col items-center">
        <AnimatedHeading
          as="span"
          className="text-5xl mb-3 sm:mb-0 sm:text-7xl text-secondary leading-snug max-w-4xl"
        >
          We Build Web Apps That
        </AnimatedHeading>{' '}
        {/* scaleX instead of width — compositor-friendly (Motion perf docs) */}
        <m.div
          className="text-nowrap mx-auto py-3 origin-left overflow-hidden"
          initial={{ scaleX: 0, opacity: 0.6 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Drive{' '}
          <span
            className="px-5 rounded-xl text-black bg-secondary"
            style={{ boxShadow: '0.4px -0.4px 1.5px rgba(255,255,255,1)' }}
          >
            Business
          </span>{' '}
          Growth
        </m.div>
      </h1>

      <p className="mt-6 max-w-2xl text-zinc-400 text-lg sm:text-xl">
        Stop losing customers to slow, outdated websites. We specialize in crafting modern,
        high-performance web solutions designed to convert visitors into paying clients.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-6 items-center justify-center">
        <PrimaryButton href="https://wa.me/8801997722621" target="_blank" rel="noopener noreferrer">
          Start Your Project Today
        </PrimaryButton>
        <a
          href="https://wa.me/8801997722621?text=Hi%20Ferdous,%20I'd%20like%20to%20get%20a%20free%20website%20audit!"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 hover:text-white underline underline-offset-4 transition-colors font-medium"
        >
          Get a Free Website Audit
        </a>
      </div>
    </div>
  );
}
