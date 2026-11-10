'use client';

import { motion } from 'motion/react';
import numberBackground from '../assets/Numbers background.webp';
import Heading from '../ui/Heading';
import PrimaryButton from '../ui/PrimaryButton';

const ServiceHero = ({
  title,
  highlightedText,
  description,
  children,
}: {
  title: string;
  highlightedText: string;
  description: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      style={{
        backgroundImage: `url("${typeof numberBackground === "string" ? numberBackground : numberBackground.src}"), linear-gradient(to bottom, rgba(11,17,35,1), rgba(64, 140, 255, 0.2))`,
        backgroundPosition: 'top center',
        backgroundSize: 'auto',
      }}
      className='overflow-hidden bg-repeat pt-20 pb-32 mb-20 relative min-h-[600px] flex items-center justify-center'
    >
      {/* Additional gradient overlay to blend the background smoothly */}
      <div className='absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950 pointer-events-none'></div>

      <div className='text-center flex flex-col items-center px-4 max-w-5xl mx-auto relative z-10'>
        <span className='text-secondary font-bold tracking-wider uppercase text-sm mb-6 block'>
          Services
        </span>
        <h1 className='text-2xl sm:text-5xl lg:text-7xl leading-tight flex flex-col items-center'>
          <Heading
            as='span'
            className='text-5xl mb-3 sm:mb-0 sm:text-7xl text-white leading-snug max-w-4xl'
          >
            {title}
          </Heading>{' '}

          {highlightedText && (
            <motion.div
              className='text-nowrap mx-auto py-4 mt-2'
              initial={{ width: '0%', overflow: 'hidden' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <span
                className='px-6 py-1 rounded-xl text-black bg-secondary inline-block'
                style={{ boxShadow: '0.4px -0.4px 1.5px rgba(255,255,255,1)' }}
              >
                {highlightedText}
              </span>
            </motion.div>
          )}
        </h1>

        <p className='mt-8 max-w-2xl text-zinc-400 text-lg sm:text-xl leading-relaxed relative z-20'>
          {description}
        </p>

        <div className='mt-10 flex flex-col sm:flex-row gap-6 items-center justify-center relative z-20'>
          <PrimaryButton
            href='https://wa.me/8801997722621'
            target='_blank'
            rel='noopener noreferrer'
          >
            Start Your Project Today
          </PrimaryButton>
          <a
            href="https://wa.me/8801997722621?text=Hi%20Ferdous,%20I'd%20like%20to%20get%20a%20free%20consultation%20regarding%20my%20project!"
            target='_blank'
            rel='noopener noreferrer'
            className='text-zinc-300 hover:text-white underline underline-offset-4 transition-colors font-medium cursor-pointer'
          >
            Get a Free Consultation
          </a>
        </div>
      </div>

      {/* Container for floating images or extra content */}
      {children}
    </div>
  );
};

export default ServiceHero;
