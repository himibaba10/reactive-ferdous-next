import AboutIntro from '@/components/client/AboutIntro';
import AboutSlider, { type AboutSlideImage } from '@/components/client/AboutSlider';

const projectImages: AboutSlideImage[] = [
  { src: '/projects/marvich-ai.webp', alt: 'Marvich AI website project by Ferdous Ahmed' },
  { src: '/projects/kamro.webp', alt: 'Kamro website project by Ferdous Ahmed' },
  { src: '/projects/electricallpro.webp', alt: 'Electrical Pro website project by Ferdous Ahmed' },
  { src: '/projects/claimcloud-cz.webp', alt: 'ClaimCloud CZ website project by Ferdous Ahmed' },
  { src: '/projects/zeplan.webp', alt: 'Zeplan website project by Ferdous Ahmed' },
];

export default function About() {
  return (
    <section id="about" className="my-16 sm:my-28 section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AboutIntro />
        <AboutSlider images={projectImages} />
      </div>
    </section>
  );
}
