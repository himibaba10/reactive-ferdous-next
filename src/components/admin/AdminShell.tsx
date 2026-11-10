'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MdBrush,
  MdDashboard,
  MdDraw,
  MdLogout,
  MdOutlineImage,
  MdOutlineWorkspacePremium,
  MdRateReview,
  MdWeb,
} from 'react-icons/md';

const nav = [
  { href: '/admin', label: 'Overview', icon: MdDashboard, exact: true },
  { href: '/admin/projects', label: 'Web Projects', icon: MdWeb },
  { href: '/admin/graphic', label: 'Graphic Portfolio', icon: MdBrush },
  { href: '/admin/figma', label: 'Figma Designs', icon: MdOutlineImage },
  {
    href: '/admin/logo-portfolio',
    label: 'Logo Portfolio',
    icon: MdOutlineWorkspacePremium,
  },
  { href: '/admin/logos', label: 'Partner Logos', icon: MdDraw },
  { href: '/admin/reviews', label: 'Reviews', icon: MdRateReview },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-100 flex'>
      <aside className='w-64 shrink-0 border-r border-zinc-800 bg-zinc-950/80 p-5 flex flex-col gap-6 sticky top-0 h-screen'>
        <div>
          <p className='text-xs uppercase tracking-[0.2em] text-secondary/80'>
            Reactive Ferdous
          </p>
          <h1 className='text-xl font-semibold mt-1'>Admin</h1>
        </div>

        <nav className='flex flex-col gap-1 flex-1'>
          {nav.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? 'bg-secondary/15 text-secondary border border-secondary/30'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon className='text-lg' />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className='space-y-2'>
          <Link
            href='/'
            className='block text-sm text-zinc-500 hover:text-white px-3'
          >
            ← View site
          </Link>
          <button
            type='button'
            onClick={logout}
            className='w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-red-300'
          >
            <MdLogout />
            Log out
          </button>
        </div>
      </aside>

      <main className='flex-1 min-w-0 p-6 md:p-10'>{children}</main>
    </div>
  );
}
