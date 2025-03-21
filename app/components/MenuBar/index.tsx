'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import IconArchive from '../IconArchive';
import IconHome from '../IconHome';
import IconSearch from '../IconSearch';
import IconSettings from '../IconSettings';
import IconTag from '../IconTag';

type MenuItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const MenuItem = ({ href, icon, label, isActive }: MenuItemProps) => (
  <Link
    className={`flex h-8 w-full items-center justify-center rounded-[4px] transition-colors duration-300 md:h-auto md:flex-col md:gap-1 md:py-1 ${
      isActive ? 'bg-blue-50 dark:bg-neutral-700' : ''
    }`}
    href={href}
  >
    {icon}
    <span
      className={`text-xs font-normal leading-[1.2] tracking-[-0.2px] transition-colors duration-300 ${
        isActive ? 'text-blue-500' : 'text-neutral-600 dark:text-neutral-400'
      }`}
    >
      {label}
    </span>
  </Link>
);

const Divider = () => (
  <div className="†ransition-colors pointer-events-none h-[50px] min-w-px bg-neutral-100 duration-300 dark:bg-neutral-800"></div>
);

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

  const menuItems = [
    {
      href: '/',
      icon: <IconHome theme={currentTheme} isActive={isActive('/')} />,
      label: 'Home',
    },
    {
      href: '/search',
      icon: <IconSearch theme={currentTheme} isActive={isActive('/search')} />,
      label: 'Search',
    },
    {
      href: '/archive',
      icon: (
        <IconArchive theme={currentTheme} isActive={isActive('/archive')} />
      ),
      label: 'Archive',
    },
    {
      href: '/tags',
      icon: <IconTag theme={currentTheme} isActive={isActive('/tags')} />,
      label: 'Tags',
    },
    {
      href: '/settings',
      icon: (
        <IconSettings theme={currentTheme} isActive={isActive('/settings')} />
      ),
      label: 'Settings',
    },
  ];

  return (
    <footer className="fixed bottom-0 w-full border-t border-solid border-neutral-100 bg-neutral-0 px-8 py-3 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950">
      <nav>
        <ul className="flex w-full items-center justify-center md:gap-8">
          {menuItems.map((item, index) => (
            <Fragment key={item.href}>
              <li className="w-full">
                <MenuItem
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={isActive(item.href)}
                />
              </li>
              {index < menuItems.length - 1 && <Divider />}
            </Fragment>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default MenuBar;
