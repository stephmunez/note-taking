'use client';

import { useTheme } from 'next-themes';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import IconArrowLeft from '../IconArrowLeft';

const SettingsHeaderControl = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <Link
      href={'/settings'}
      className="flex w-full items-center gap-2 lg:hidden"
    >
      <IconArrowLeft
        theme={currentTheme}
        width={20}
        height={20}
        darkColor="#CACFD8"
        lightColor="#525866"
      />
      <span className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:text-neutral-300">
        Settings
      </span>
    </Link>
  );
};

export default SettingsHeaderControl;
