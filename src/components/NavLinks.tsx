'use client';

import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavLinks = ({ active, setActive, showMenu, setShowMenu }) => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const serviceLinks = [
    { name: 'Web Dev', url: '/services/web-development' },
    { name: 'Graphic Design', url: '/services/graphic-design' },
    { name: 'Figma Design', url: '/services/figma-design' },
    { name: 'Logo Design', url: '/services/logo-design' },
  ];

  const mainLinks = [
    { name: 'Case Studies', url: '/work' },
    { name: 'Blog', url: '/blog' },
    { name: 'About', url: '/#about' },
  ];

  const renderLink = (link) => {
    const isHash = link.url.includes('#');

    // For hash links
    if (isHash) {
      if (pathname === '/') {
        // We are on home page, use smooth scroll standard anchor
        return (
          <a
            onClick={() => {
              setActive(link.name);
              setShowMenu(false);
              setDropdownOpen(false);
            }}
            className={`${active === link.name ? 'text-secondary' : 'text-white'} hover:text-secondary transition-colors`}
            key={link.url}
            href={link.url.replace('/', '')} // Just '#about'
          >
            {link.name}
          </a>
        );
      } else {
        // We are on a different page, use standard link to navigate to home and scroll to hash natively
        return (
          <a
            onClick={() => {
              setActive(link.name);
              setShowMenu(false);
              setDropdownOpen(false);
            }}
            className={`${active === link.name ? 'text-secondary' : 'text-white'} hover:text-secondary transition-colors`}
            key={link.url}
            href={link.url} // '/#about'
          >
            {link.name}
          </a>
        );
      }
    }

    // Prefetch primary routes (Blog/Work); service dropdown stays false below.
    return (
      <Link
        onClick={() => {
          setActive(link.name);
          setShowMenu(false);
          setDropdownOpen(false);
          window.scrollTo(0, 0);
        }}
        className={`${active === link.name ? 'text-secondary' : 'text-white'} hover:text-secondary transition-colors`}
        key={link.url}
        href={link.url}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop navigation */}
      <div className='hidden sm:flex flex-1 w-1/2 justify-center items-center space-x-6 lg:space-x-10 uppercase text-sm lg:text-base font-medium relative'>
        {/* Services Dropdown */}
        <div className='relative group'>
          <button className='flex items-center text-white hover:text-secondary transition-colors uppercase'>
            Services{' '}
            <MdKeyboardArrowDown className='ml-1 text-lg group-hover:rotate-180 transition-transform duration-300' />
          </button>

          <div className='absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 flex flex-col gap-3 text-left'>
            {/* Invisible bridge to keep hover active */}
            <div className='absolute -top-4 left-0 w-full h-4 bg-transparent'></div>

            {serviceLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                prefetch={false}
                onClick={() => {
                  setActive(link.name);
                  window.scrollTo(0, 0);
                }}
                className='px-4 py-2 text-sm text-zinc-300 hover:text-secondary hover:bg-zinc-800/50 transition-colors uppercase w-full block'
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {mainLinks.map(renderLink)}
      </div>

      {/* Mobile navigation */}
      <div
        className={`${
          showMenu ? 'flex' : 'hidden'
        } absolute top-0 left-0 z-10 w-full min-h-screen bg-zinc-950 flex-col justify-center sm:hidden text-center space-y-6 uppercase text-xl`}
      >
        {/* Mobile Services Accordion */}
        <div className='flex flex-col items-center'>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className='flex items-center text-white hover:text-secondary transition-colors uppercase mb-4'
          >
            Services{' '}
            <MdKeyboardArrowDown
              className={`ml-1 text-2xl transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-secondary' : ''}`}
            />
          </button>

          {dropdownOpen && (
            <div className='flex flex-col space-y-4 mb-4 border-l-2 border-zinc-800 pl-4'>
              {serviceLinks.map(renderLink)}
            </div>
          )}
        </div>

        {mainLinks.map(renderLink)}
      </div>
    </>
  );
};

export default NavLinks;
