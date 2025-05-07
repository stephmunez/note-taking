'use client';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconSettings from '../IconSettings';

const PageHeader = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const headingTitle = pathname.startsWith('/archive')
    ? 'Archived Notes'
    : pathname.startsWith('/tags/')
      ? pathname.split('/')[2]
        ? `Notes Tagged: ${pathname.split('/')[2].charAt(0).toUpperCase() + pathname.split('/')[2].slice(1)}`
        : 'Tags'
      : pathname.startsWith('/settings')
        ? 'Settings'
        : 'All Notes';

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <header
      className={`hidden w-full items-center justify-between border-b border-solid border-neutral-200 bg-neutral-0 px-8 py-6 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950 ${pathname === '/search' ? 'lg:hidden' : 'lg:flex'}`}
    >
      <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
        {headingTitle}
      </h1>

      <Link
        className={`flex h-10 w-10 items-center justify-center ${pathname.startsWith('/settings') ? 'lg:hidden' : ''}`}
        href="/settings"
      >
        <IconSettings
          theme={currentTheme}
          lightColor="#717784"
          darkColor="#99A0AE"
        />
      </Link>
    </header>
  );
};

export default PageHeader;
