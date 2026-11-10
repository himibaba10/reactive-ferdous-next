import Image from 'next/image';
import Heading from '@/ui/Heading';
import Bootstrap from '@/assets/Bootstrap 1.png';
import Axios from '@/assets/Axios 1.png';
import Redux from '@/assets/redux-icon 1.png';
import MUI from '@/assets/Material ui 1.png';
import Firebase from '@/assets/Firebase 1.png';
import WordPress from '@/assets/Wordpress 1.png';
import FramerMotion from '@/assets/framer-motion 1.png';

const icons = [
  { src: Bootstrap, alt: 'Bootstrap' },
  { src: Axios, alt: 'Axios' },
  { src: Redux, alt: 'Redux' },
  { src: MUI, alt: 'MUI' },
  { src: Firebase, alt: 'Firebase' },
  { src: WordPress, alt: 'WordPress' },
  { src: FramerMotion, alt: 'Framer Motion' },
];

export default function AdditionalSkills() {
  return (
    <section className="bg-gray px-2.5 lg:px-20 xl:px-32 py-10 rounded-xl text-center">
      <Heading className="text-5xl text-secondary mb-10">Additional skills</Heading>
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-5 md:gap-2">
        {icons.map(({ src, alt }) => (
          <Image
            key={alt}
            src={src}
            alt={alt}
            loading="lazy"
            className="w-12 md:w-auto"
            style={{ width: 'auto', height: 'auto' }}
          />
        ))}
      </div>
    </section>
  );
}
