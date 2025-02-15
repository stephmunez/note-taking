'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme, setTheme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <main className='font-sans'>
      <h1>Note Taking App</h1>
      <button
        onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
        className='p-2 border rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white'
      >
        {currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </main>
  );
}
