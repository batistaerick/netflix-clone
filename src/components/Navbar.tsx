import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu: () => void = useCallback((): void => {
    setShowMobileMenu((current: boolean): boolean => !current);
  }, []);

  const toggleAccountMenu: () => void = useCallback((): void => {
    setShowAccountMenu((current: boolean): boolean => !current);
  }, []);

  useEffect((): (() => void) => {
    const handleScroll: () => void = (): void => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div
        className={`flex flex-row items-center px-4 py-6 transition duration-500 md:px-16 ${showBackground ? 'bg-zinc-900/90' : ''}`}
      >
        <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
        <div className="ml-8 hidden flex-row gap-7 lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <button
          className="relative ml-8 flex cursor-pointer flex-row items-center gap-2 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <p className="text-sm text-white">Browse</p>
          <BsChevronDown
            className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}
          />
          <MobileMenu visible={showMobileMenu} />
        </button>
        <div className="ml-auto flex flex-row items-center gap-7">
          <div className="cursor-pointer text-gray-300 transition hover:text-gray-300">
            <BsSearch />
          </div>
          <div className="cursor-pointer text-gray-300 transition hover:text-gray-300">
            <BsBell />
          </div>
          <button
            className="relative flex cursor-pointer flex-row items-center gap-2"
            onClick={toggleAccountMenu}
          >
            <div className="h-6 w-6 overflow-hidden rounded-md lg:h-10 lg:w-10">
              <Image
                src="/images/default-blue.png"
                alt="default-blue"
                width={100}
                height={100}
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
          <AccountMenu visible={showAccountMenu} />
        </div>
      </div>
    </nav>
  );
}
