import Link from 'next/link';
import { cacheLife } from 'next/cache';

async function Footer() {
  'use cache';
  cacheLife('days');

  const year = new Date().getFullYear();

  return (
    <footer className="text-sm sm:text-base text-center bg-secondary text-black py-3">
      Copyright©{year}, Made by{' '}
      <span className="font-semibold">Ferdous Ahmed</span>
      <span className="mx-2" aria-hidden="true">
        ·
      </span>
      <Link
        href="/privacy"
        className="underline underline-offset-2 hover:opacity-70 transition-opacity"
      >
        Privacy &amp; Cookies
      </Link>
    </footer>
  );
}

export default Footer;
