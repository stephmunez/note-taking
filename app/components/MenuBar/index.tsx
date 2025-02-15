'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconArchive from '../IconArchive';
import IconHome from '../IconHome';
import IconSearch from '../IconSearch';
import IconSettings from '../IconSettings';
import IconTag from '../IconTag';

const MenuBar = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);

  return (
    <footer className='fixed bottom-0 w-full bg-neutral-0 dark:bg-neutral-800 transition-colors duration-300 px-8 py-3'>
      <nav>
        <ul className='flex items-center justify-center w-full'>
          <li className='w-full'>
            <Link
              className={`w-full h-8 flex items-center rounded-[4px] justify-center ${
                isActive('/') ? 'bg-blue-50' : ''
              }`}
              href='/'
            >
              <IconHome theme={currentTheme} isActive={isActive('/')} />
            </Link>
          </li>
          <li className='w-full'>
            <Link
              className={`w-full h-8 flex items-center rounded-[4px] justify-center ${
                isActive('/search') ? 'bg-blue-50' : ''
              }`}
              href='/search'
            >
              <IconSearch theme={currentTheme} isActive={isActive('/search')} />
            </Link>
          </li>
          <li className='w-full'>
            <Link
              className={`w-full h-8 flex items-center rounded-[4px] justify-center ${
                isActive('/archive') ? 'bg-blue-50' : ''
              }`}
              href='/archive'
            >
              <IconArchive
                theme={currentTheme}
                isActive={isActive('/archive')}
              />
            </Link>
          </li>
          <li className='w-full'>
            <Link
              className={`w-full h-8 flex items-center rounded-[4px] justify-center ${
                isActive('/tags') ? 'bg-blue-50' : ''
              }`}
              href='/tags'
            >
              <IconTag theme={currentTheme} isActive={isActive('/tags')} />
            </Link>
          </li>
          <li className='w-full'>
            <Link
              className={`w-full h-8 flex items-center rounded-[4px] justify-center ${
                isActive('/settings') ? 'bg-blue-50' : ''
              }`}
              href='/settings'
            >
              <IconSettings
                theme={currentTheme}
                isActive={isActive('/settings')}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default MenuBar;
