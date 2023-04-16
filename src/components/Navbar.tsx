import { useCallback, useEffect, useState } from 'react';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';
import AccountMenu from './AccountMenu';
import MobileMenu from './MobileMenu';
import NavbarItem from './NavbarItem';

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
          px-4 py-6 flex flex-row items-center
          transition duration-500
          md:px-16
          ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
        `}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
        <div
          className={`
            flex-row ml-8 gap-7 hidden
            lg:flex
          `}
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          className="flex flex-row items-center gap-2 ml-8 cursor-pointer relative lg:hidden"
          onClick={toggleMobileMenu}
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`
              text-white transition
              ${showMobileMenu ? 'rotate-180' : 'rotate-0'}
            `}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-300 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-300 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            className="flex flex-row items-center gap-2 cursor-pointer relative"
            onClick={toggleAccountMenu}
          >
            <div className="w-6 h-6 rounded-md overflow-hidden lg:w-10 lg:h-10">
              <img src="/images/default-blue.png" alt="default-blue" />
            </div>
            <BsChevronDown
              className={`
                text-white transition
                ${showAccountMenu ? 'rotate-180' : 'rotate-0'}
              `}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
