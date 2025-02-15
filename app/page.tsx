'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import CreateNewNoteButton from './components/CreateNewNoteButton';

export default function Home() {
  const { theme, setTheme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <main className='font-sans px-4 py-5 z-50'>
      <div className='flex flex-col w-full gap-4'>
        <h1 className='font-bold text-2xl leading-[1.2] tracking-[-0.5px]'>
          All Notes
        </h1>
        <div className='flex flex-col gap-4 w-full'>
          <p className='bg-neutral-100 border-neutral-200 rounded-lg p-2 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 border-solid border dark:text-neutral-0 dark:bg-neutral-800 dark:border-neutral-700'>
            You don’t have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </p>
        </div>
      </div>

      <button
        onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
        className='p-2 border rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white'
      >
        {currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <CreateNewNoteButton />
    </main>
  );
}
