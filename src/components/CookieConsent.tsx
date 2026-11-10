'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConsent, loadAnalytics, setConsent } from '../utils/analytics';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = getConsent();

    if (choice === 'accepted') {
      // Returning visitor who already agreed — load analytics without asking.
      loadAnalytics();
    } else if (choice !== 'declined') {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const decide = (value) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role='dialog'
      aria-label='Cookie consent'
      className='fixed bottom-24 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md z-[60] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-6'
    >
      <p className='text-sm font-bold text-white mb-2'>Cookies</p>

      <p className='text-sm text-zinc-400 leading-relaxed mb-5'>
        We would like to use analytics cookies to see which pages are useful.
        Nothing loads until you choose, and you can change your mind at any time.{' '}
        <Link
          href='/privacy'
          className='text-secondary underline underline-offset-2 hover:opacity-80'
        >
          Privacy &amp; Cookies
        </Link>
      </p>

      <div className='flex gap-3'>
        <button
          type='button'
          onClick={() => decide('accepted')}
          className='flex-1 bg-secondary text-black font-semibold rounded-full px-4 py-2 text-sm hover:opacity-90 transition-opacity'
        >
          Accept
        </button>
        <button
          type='button'
          onClick={() => decide('declined')}
          className='flex-1 border border-zinc-600 text-zinc-300 font-semibold rounded-full px-4 py-2 text-sm hover:bg-zinc-800 transition-colors'
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
