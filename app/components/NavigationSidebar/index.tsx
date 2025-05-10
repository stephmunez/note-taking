'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconArchive from '../IconArchive';
import IconChevronRight from '../IconChevronRight';
import IconHome from '../IconHome';
import IconSearch from '../IconSearch';
import Logo from '../Logo';
import NavigationTags from '../NavigationTags';

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  theme: string;
}

const NavigationItem = ({
  href,
  icon,
  label,
  isActive,
  theme,
}: MenuItemProps) => (
  <Link
    className={`flex w-full items-center gap-2 rounded-lg px-3 py-[0.625rem] hover:bg-neutral-100 active:bg-neutral-100 hover:dark:bg-neutral-800 active:dark:bg-neutral-800 ${
      isActive ? 'bg-neutral-100 dark:bg-neutral-800' : ''
    }`}
    href={href}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    <span
      className={`flex-1 text-sm font-medium leading-[1.2] tracking-[-0.2px] transition-colors duration-300 ${
        isActive
          ? 'text-neutral-950 dark:text-neutral-0'
          : 'text-neutral-700 dark:text-neutral-200'
      }`}
    >
      {label}
    </span>
    {isActive && <IconChevronRight theme={theme} />}
  </Link>
);

const Divider = () => (
  <div className="pointer-events-none hidden h-px w-full bg-neutral-100 transition-colors duration-300 dark:bg-neutral-800 md:block"></div>
);

const NavigationSidebar = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme =
    theme === 'system' ? (systemTheme ?? 'light') : (theme ?? 'light');
  const isActive = (route: string) => {
    if (route === '/') {
      return (
        pathname === '/' ||
        pathname === '/notes' ||
        pathname.startsWith('/notes/')
      );
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  };

  const navigationItems = [
    {
      href: '/',
      icon: (
        <IconHome
          theme={currentTheme}
          isActive={isActive('/')}
          lightColor="#2B303B"
          darkColor="#E0E4EA"
        />
      ),
      label: 'All Notes',
    },
    {
      href: '/search',
      icon: (
        <IconSearch
          theme={currentTheme}
          isActive={isActive('/search')}
          lightColor="#2B303B"
          darkColor="#E0E4EA"
        />
      ),
      label: 'Search',
    },
    {
      href: '/archive',
      icon: (
        <IconArchive theme={currentTheme} isActive={isActive('/archive')} />
      ),
      label: 'Archived',
    },
  ];

  return (
    <nav
      className="hidden min-h-screen w-[272px] flex-col gap-4 border-r border-solid border-neutral-200 bg-neutral-0 px-4 py-3 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950 lg:flex"
      aria-label="Main navigation"
    >
      <div className="h-max w-full py-3">
        <Logo />
      </div>
      <div className="flex w-full flex-col gap-2">
        <ul className="flex w-full flex-col gap-1">
          {navigationItems.map((item) => (
            <li className="w-full" key={item.href}>
              <NavigationItem
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={isActive(item.href)}
                theme={currentTheme}
              />
            </li>
          ))}
        </ul>
        <Divider />
        <NavigationTags />
      </div>
    </nav>
  );
};

export default NavigationSidebar;
