'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  MdWeb,
  MdOutlineDesignServices,
  MdOutlineBrush,
  MdArrowForward,
  MdOutlineFormatShapes,
} from 'react-icons/md';
import type { ReactNode } from 'react';

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  url: string;
};

const services: ServiceItem[] = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'We build lightning-fast, high-converting websites and applications tailored to solve your specific business challenges and rank higher on Google.',
    icon: <MdWeb size={40} className="text-secondary" />,
    url: '/services/web-development',
  },
  {
    id: 2,
    title: 'Graphic Design',
    description:
      'Stand out from the crowd with premium, eye-catching visual identities and marketing assets designed to elevate your brand.',
    icon: <MdOutlineBrush size={40} className="text-secondary" />,
    url: '/services/graphic-design',
  },
  {
    id: 3,
    title: 'Figma UI/UX Design',
    description:
      'We craft beautiful, user-centric interfaces in Figma that provide seamless experiences, micro-animations, and high conversion rates.',
    icon: <MdOutlineDesignServices size={40} className="text-secondary" />,
    url: '/services/figma-design',
  },
  {
    id: 4,
    title: 'Logo Design',
    description:
      'We create distinctive, memorable logos that capture the essence of your business and serve as the cornerstone of your brand identity.',
    icon: <MdOutlineFormatShapes size={40} className="text-secondary" />,
    url: '/services/logo-design',
  },
];

export default function ServicesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {services.map((service) => (
        <motion.div
          key={service.id}
          variants={itemVariants}
          className="bg-zinc-800/50 border border-zinc-700/50 p-6 rounded-2xl hover:bg-zinc-800 transition-colors duration-300 group flex flex-col"
        >
          <div className="bg-zinc-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
            {service.description}
          </p>
          <Link
            href={service.url}
            className="inline-flex items-center text-secondary text-sm font-semibold group/link mt-auto w-fit"
          >
            Explore {service.title}
            <MdArrowForward
              className="ml-2 group-hover/link:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
