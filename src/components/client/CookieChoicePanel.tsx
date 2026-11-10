'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearConsent, getConsent } from '@/utils/analytics';

export default function CookieChoicePanel() {
  const [choice, setChoice] = useState<string | null>(null);

  useEffect(() => setChoice(getConsent()), []);

  const changeChoice = () => {
    clearConsent();
    window.location.reload();
  };

  return (
    <>
      <p className="text-zinc-300 leading-relaxed mb-4">
        {choice
          ? `You have ${choice === 'accepted' ? 'accepted' : 'declined'} analytics cookies on this device.`
          : 'You have not made a choice yet.'}{' '}
        You can change that whenever you like.
      </p>
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          type="button"
          onClick={changeChoice}
          className="bg-secondary text-black font-semibold rounded-full px-6 py-3 text-sm hover:opacity-90 transition-opacity"
        >
          Change cookie choice
        </button>
        <Link
          href="/"
          className="self-center text-zinc-300 underline underline-offset-4 hover:text-white transition-colors text-sm"
        >
          Back to home
        </Link>
      </div>
    </>
  );
}
