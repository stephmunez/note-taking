'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import IconInfo from '../IconInfo';

const supabase = createClient();

const ForgotPasswordForm = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('A password reset link has been sent to your email.');
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-4 pt-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
        >
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 placeholder:text-neutral-500 hover:bg-neutral-50 focus:border-neutral-950 focus:bg-neutral-0 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-neutral-500 dark:border-neutral-600 dark:text-neutral-0 dark:hover:bg-neutral-800 dark:focus:bg-neutral-950 dark:focus:outline-neutral-600"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
      </div>

      <button
        className="rounded-lg bg-blue-500 px-4 py-3 text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-0 transition-colors duration-300 hover:bg-blue-700 focus:outline-2 focus:outline-offset-2 focus:outline-neutral-500 active:bg-blue-700 dark:focus:outline-neutral-600"
        type="submit"
      >
        Send Reset Link
      </button>

      {message && (
        <div className="flex items-center gap-2">
          <span className="min-w-5">
            <IconInfo
              theme={currentTheme}
              darkColor="#21C16B"
              lightColor="#21C16B"
              width={20}
              height={20}
            />
          </span>
          <span className="text-xs font-medium leading-[1.2] tracking-[-0.2px] text-green-500">
            {message}
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2">
          <span className="min-w-5">
            <IconInfo
              theme={currentTheme}
              darkColor="#21C16B"
              lightColor="#21C16B"
              width={20}
              height={20}
            />
          </span>
          <span className="text-xs font-medium leading-[1.2] tracking-[-0.2px] text-red-500">
            {error}
          </span>
        </div>
      )}
    </form>
  );
};

export default ForgotPasswordForm;
