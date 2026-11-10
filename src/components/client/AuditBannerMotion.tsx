'use client';

import PrimaryButton from '@/ui/PrimaryButton';
import * as m from 'motion/react-m';
import { MdSearch } from 'react-icons/md';

const CALENDLY_URL = 'https://calendly.com/himibaba/new-meeting';

type AuditBannerMotionProps = {
  serviceName: string;
  whatsappUrl: string;
};

export default function AuditBannerMotion({
  serviceName,
  whatsappUrl,
}: AuditBannerMotionProps) {
  return (
    <section className="w-full py-16 px-4 bg-zinc-900 border-y border-secondary/30 relative overflow-hidden my-10 shadow-[0_0_50px_rgba(64,140,255,0.1)]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-secondary/20 filter blur-[120px] z-0 pointer-events-none" />

      <m.div
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
        initial={{ scale: 0.98, y: 12 }}
        whileInView={{ scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3, margin: '40px' }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex-1 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
          <div className="bg-secondary text-black p-4 rounded-full hidden md:block shadow-[0_0_20px_rgba(64,140,255,0.5)]">
            <MdSearch size={48} />
          </div>
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-2">
              Get a Free <span className="text-secondary">{serviceName} Audit</span>
            </h2>
            <p className="text-zinc-300 text-lg">
              We will review what you have and tell you exactly what we would change. No cost, no
              obligation.
            </p>
          </div>
        </div>

        <div className="shrink-0 mt-6 md:mt-0 flex flex-col items-center gap-3">
          <PrimaryButton href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Book a Free 30-Minute Call
          </PrimaryButton>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 hover:text-zinc-200 underline underline-offset-4 transition-colors"
          >
            Or message us on WhatsApp
          </a>
        </div>
      </m.div>
    </section>
  );
}
