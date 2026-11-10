'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export type LogoMarqueeItem = {
  id: string;
  imgUrl: string;
  name?: string;
};

/**
 * SSR renders each logo once. After mount we clone the track for a seamless
 * CSS marquee (-50%) without shipping 4× markup in the HTML document.
 */
export default function LogoMarquee({ logos }: { logos: LogoMarqueeItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || track.dataset.cloned === '1') return;

    const clones = Array.from(track.children).map((child) =>
      child.cloneNode(true)
    );
    track.append(...clones);
    track.dataset.cloned = '1';
  }, []);

  return (
    <div className="flex relative overflow-hidden w-full">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[rgba(11,17,35,1)] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[rgba(11,17,35,1)] to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className="flex animate-logo-marquee hover:[animation-play-state:paused] items-center"
      >
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="flex items-center justify-center min-w-[200px] px-8"
          >
            <div className="relative h-12 w-40">
              <Image
                src={logo.imgUrl}
                alt={
                  logo.name
                    ? `${logo.name} — client of Ferdous Ahmed`
                    : 'Client company logo of Ferdous Ahmed'
                }
                fill
                sizes="160px"
                loading="lazy"
                unoptimized
                className="object-contain filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
