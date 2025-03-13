'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import IconCheckmark from '../IconCheckmark';
import IconCross from '../IconCross';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  isArchived?: boolean;
}

export const Toast = ({ message, type, onClose, isArchived }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div
      className={`flex min-w-72 items-center justify-between gap-2 rounded border border-solid border-neutral-200 p-2 transition-opacity duration-300 dark:border-neutral-700 dark:bg-neutral-800 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {type === 'success' ? (
        <div className="flex h-6 w-6 items-center justify-center">
          <IconCheckmark width={20} height={20} />
        </div>
      ) : (
        ''
      )}

      <div className="flex w-full items-center justify-between gap-2">
        <span className="w-full text-xs leading-[1.2] tracking-[-0.2px] text-neutral-950 dark:text-neutral-0">
          {message}
        </span>
        {isArchived && (
          <Link
            href={'/archive'}
            className="w-full text-xs leading-[1.2] tracking-[-0.2px] text-neutral-950 underline dark:text-neutral-0"
          >
            Archived Notes
          </Link>
        )}
      </div>

      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="flex h-6 w-6 items-center justify-center"
      >
        <IconCross width={20} height={20} theme={currentTheme} />
      </button>
    </div>
  );
};

export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2">
      {children}
    </div>
  );
};
