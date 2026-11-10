'use client';

import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/logo.webp';
import { useNavbar } from '../hooks/useNavbar';
import ContactButton from '../ui/ContactButton';
import Hamburger from '../ui/Hamburger';
import NavLinks from './NavLinks';

const Navbar = () => {
  const { active, setActive, showMenu, setShowMenu } = useNavbar();
  return (
    <nav className='z-50 sticky top-0 backdrop-blur-xl py-3.5'>
      <div className='flex items-center section justify-between'>
        <div className='sm:w-1/4'>
          <Link
            href='/'
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
          >
            <Image
              className='w-32 sm:w-44'
              src={logo}
              alt='Ferdous Ahmed logo'
              width={450}
              height={129}
              priority
              fetchPriority='high'
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
        </div>

        <div className='flex items-center gap-10'>
          <NavLinks
            active={active}
            setActive={setActive}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
          <div className='max-sm:hidden'>
            <ContactButton>Contact</ContactButton>
          </div>
        </div>
        <Hamburger showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
