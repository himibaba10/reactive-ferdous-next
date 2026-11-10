import Image from 'next/image';
import clientReviewImage from '@/assets/Client Review.webp';

export default function HeroLeftImage() {
  return (
    <div className="absolute left-[-2rem] top-0 animate-hero-slide-left">
      <Image
        src={clientReviewImage}
        alt="Client review screenshot from a recent web development project"
        width={404}
        height={238}
        sizes="404px"
        loading="lazy"
        fetchPriority="low"
        className="w-[404px] max-w-none h-auto"
      />
    </div>
  );
}
