'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import logoDark from '../../assets/images/logo-dark.svg';
import logo from '../../assets/images/logo.svg';

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
      <Image
        src={currentTheme === 'dark' ? logoDark : logo}
        width={96}
        height={28}
        alt='note taking logo'
        className='transition-opacity duration-300'
      />
    </>
  );
};

export default Logo;
