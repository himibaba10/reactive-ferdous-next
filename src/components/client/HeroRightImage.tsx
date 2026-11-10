import Image from 'next/image';
import expertiseImg from '@/assets/My expertise image.webp';

export default function HeroRightImage() {
  return (
    <div className="absolute right-[-3rem] top-64 sm:top-20 animate-hero-slide-right">
      <Image
        src={expertiseImg}
        alt="Ferdous Ahmed web development and design expertise"
        width={405}
        height={238}
        sizes="405px"
        loading="lazy"
        fetchPriority="low"
        className="w-[405px] max-w-none h-auto"
      />
    </div>
  );
}
