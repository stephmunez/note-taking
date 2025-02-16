'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
const ThemeButton = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className='p-2 border fixed bottom-[4.5rem] left-4 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white'
    >
      {currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeButton;
