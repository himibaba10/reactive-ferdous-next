import Link from 'next/link';
import {
  MdBrush,
  MdDraw,
  MdOutlineImage,
  MdOutlineWorkspacePremium,
  MdRateReview,
  MdWeb,
} from 'react-icons/md';

const cards = [
  {
    title: 'Web Projects',
    description: 'Portfolio projects on the homepage.',
    href: '/admin/projects',
    icon: MdWeb,
  },
  {
    title: 'Graphic Portfolio',
    description: 'Graphic Design service gallery.',
    href: '/admin/graphic',
    icon: MdBrush,
  },
  {
    title: 'Figma Designs',
    description: 'UI/UX pieces for the Figma page.',
    href: '/admin/figma',
    icon: MdOutlineImage,
  },
  {
    title: 'Logo Portfolio',
    description: 'Logo Design service gallery.',
    href: '/admin/logo-portfolio',
    icon: MdOutlineWorkspacePremium,
  },
  {
    title: 'Partner Logos',
    description: 'Trusted-by slider logos.',
    href: '/admin/logos',
    icon: MdDraw,
  },
  {
    title: 'Reviews',
    description: 'Client testimonials.',
    href: '/admin/reviews',
    icon: MdRateReview,
  },
];

export default function AdminHomePage() {
  return (
    <div className='max-w-5xl'>
      <header className='mb-10'>
        <p className='text-xs uppercase tracking-[0.2em] text-secondary mb-2'>
          Dashboard
        </p>
        <h2 className='text-4xl font-semibold'>Content control</h2>
        <p className='text-zinc-400 mt-2 max-w-2xl'>
          Manage portfolio media on Cloudflare R2 and content in MongoDB Atlas.
          Public pages read from the APIs automatically.
        </p>
      </header>

      <div className='grid sm:grid-cols-2 gap-4'>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className='rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-secondary/40 hover:bg-zinc-900 transition-colors'
            >
              <Icon className='text-3xl text-secondary mb-4' />
              <h3 className='text-xl font-medium'>{card.title}</h3>
              <p className='text-zinc-400 mt-1 text-sm'>{card.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
