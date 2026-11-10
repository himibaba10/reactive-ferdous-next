'use client';

import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import PrimaryButton from '../ui/PrimaryButton';

const CALENDLY_URL = 'https://calendly.com/himibaba/new-meeting';

/** Deferred audit popup — CSS enter animation, no Motion. */
export default function Popup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenAuditPopup');
    if (hasSeenPopup) return;

    const timer = setTimeout(() => setIsVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenAuditPopup', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-popup-backdrop">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl text-center overflow-hidden animate-popup-panel">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-secondary filter blur-[80px] opacity-20 -z-10" />

        <button
          type="button"
          onClick={closePopup}
          aria-label="Close"
          className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full transition-colors"
        >
          <MdClose size={24} />
        </button>

        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
          Get a Free <span className="text-secondary">Website Audit</span>
        </h2>

        <p className="text-zinc-400 mb-8 leading-relaxed">
          We will look at your site&rsquo;s speed, SEO and conversion blockers, then walk you
          through exactly what we would change.{' '}
          <strong className="text-white">No cost, no obligation.</strong>
        </p>

        <PrimaryButton
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closePopup}
          className="inline-block"
        >
          Book a Free 30-Minute Call
        </PrimaryButton>

        <a
          href="https://wa.me/8801997722621?text=Hi%20Team%2C%20I%27d%20like%20a%20free%20website%20audit!"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closePopup}
          className="block w-full text-center mt-4 text-sm text-zinc-300 hover:text-white underline underline-offset-4 transition-colors"
        >
          Or message us on WhatsApp
        </a>

        <button
          type="button"
          onClick={closePopup}
          className="block w-full text-center mt-6 text-sm text-zinc-500 hover:text-zinc-300 underline underline-offset-4 transition-colors"
        >
          No thanks, maybe later
        </button>
      </div>
    </div>
  );
}
