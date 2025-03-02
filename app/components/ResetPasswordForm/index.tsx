'use client';

import { useTheme } from 'next-themes';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import IconHidePassword from '../IconHidePassword';
import IconInfo from '../IconInfo';
import IconShowPassword from '../IconShowPassword';

const supabase = createClient();

const ResetPasswordForm = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password successfully reset. Redirecting to home...');
      setTimeout(() => {
        redirect('/');
      }, 2000);
    }
  };

  return (
    <form className="flex w-full flex-col gap-4 pt-6" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          htmlFor="new-password"
          className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
        >
          Password
        </label>

        <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="new-password"
            name="new-password"
            className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-[calc(50%-10px)]"
            type="button"
          >
            {showNewPassword ? (
              <IconHidePassword
                theme={currentTheme}
                width={20}
                height={20}
                lightColor="#717784"
                darkColor="#717784"
              />
            ) : (
              <IconShowPassword
                theme={currentTheme}
                width={20}
                height={20}
                lightColor="#717784"
                darkColor="#717784"
              />
            )}
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          htmlFor="confirm-new-password"
          className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
        >
          Confirm Password
        </label>

        <div className="relative">
          <input
            type={showConfirmNewPassword ? 'text' : 'password'}
            id="confirm-new-password"
            name="confirm-new-password"
            className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <button
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            className="absolute right-3 top-[calc(50%-10px)]"
            type="button"
          >
            {showConfirmNewPassword ? (
              <IconHidePassword
                theme={currentTheme}
                width={20}
                height={20}
                lightColor="#717784"
                darkColor="#717784"
              />
            ) : (
              <IconShowPassword
                theme={currentTheme}
                width={20}
                height={20}
                lightColor="#717784"
                darkColor="#717784"
              />
            )}
          </button>
        </div>
      </div>

      <button
        className="rounded-lg bg-blue-500 px-4 py-3 text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-0 transition-colors duration-300"
        type="submit"
      >
        Reset Password
      </button>

      {message && (
        <div className="flex items-center gap-2">
          <span className="min-w-5">
            <IconInfo
              theme={currentTheme}
              darkColor="#FB3748"
              lightColor="#FB3748"
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
              darkColor="#FB3748"
              lightColor="#FB3748"
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

export default ResetPasswordForm;
