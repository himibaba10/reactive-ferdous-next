'use client';

import Image, { type StaticImageData } from 'next/image';
import * as m from 'motion/react-m';

type Skill = { name: string; image: StaticImageData };

export default function SkillCard({ skill }: { skill: Skill }) {
  const { name, image } = skill;
  return (
    <m.div
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ boxShadow: '-1px -1px 0px rgba(255,255,255,0.3)' }}
      className="bg-gray rounded-md p-4 relative overflow-hidden flex flex-col will-change-transform"
    >
      <Image
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        className="w-20 absolute -top-5 -right-5 scale-150 grayscale opacity-20 rotate-12"
        style={{ width: 'auto', height: 'auto' }}
      />
      <Image
        src={image}
        alt={name}
        loading="lazy"
        className="w-20"
        style={{ width: 'auto', height: 'auto' }}
      />
      <h3 className="text-secondary font-bebas text-3xl pt-5 mt-auto">{name}</h3>
    </m.div>
  );
}
