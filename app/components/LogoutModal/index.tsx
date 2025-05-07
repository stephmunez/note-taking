'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconLogout from '../IconLogout';
interface LogoutModalProps {
  onClose: () => void;
}

export default function LogoutModal({ onClose }: LogoutModalProps) {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });

      if (res.ok) {
        router.replace('/login'); // Redirect to login after logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/50 bg-opacity-50 px-4">
      <div className="max-w-[440px] rounded-xl border border-solid border-neutral-200 bg-neutral-0 transition-colors duration-300 dark:border-neutral-600 dark:bg-neutral-700">
        <div className="flex gap-4 border-b border-solid border-neutral-200 p-5 transition-colors duration-300 dark:border-neutral-600">
          <div className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-neutral-100 transition-colors duration-300 dark:bg-neutral-600">
            <IconLogout
              theme={currentTheme}
              darkColor="#FFFFFF"
              lightColor="#0E121B"
            />
          </div>
          <div className="flex flex-col gap-[0.375rem]">
            <h2 className="text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
              Confirm Logout
            </h2>
            <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200">
              Are you sure you want to log out?
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-4 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-100 px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:bg-neutral-500 dark:text-neutral-200"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-0 transition-colors duration-300"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
