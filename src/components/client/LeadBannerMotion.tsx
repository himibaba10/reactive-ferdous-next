'use client';

import * as m from 'motion/react-m';
import PrimaryButton from '@/ui/PrimaryButton';

type LeadBannerMotionProps = {
  text: string;
  buttonText: string;
  whatsappUrl: string;
};

export default function LeadBannerMotion({
  text,
  buttonText,
  whatsappUrl,
}: LeadBannerMotionProps) {
  return (
    <section className="w-full py-16 px-4 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden my-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-32 bg-secondary/10 filter blur-[100px] z-0 pointer-events-none" />

      <m.div
        className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
        initial={{ y: 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3, margin: '40px' }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center md:text-left leading-tight flex-1">
          {text}
        </h2>

        <div className="shrink-0">
          <PrimaryButton href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            {buttonText}
          </PrimaryButton>
        </div>
      </m.div>
    </section>
  );
}
