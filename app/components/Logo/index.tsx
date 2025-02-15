'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconLogo from '../IconLogo';

const Logo = () => {
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
    <>
      <IconLogo theme={currentTheme} />
    </>
  );
};

export default Logo;
