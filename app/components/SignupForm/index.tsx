'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconHidePassword from '../IconHidePassword';
import IconInfo from '../IconInfo';
import IconShowPassword from '../IconShowPassword';
interface SignupFormProps {
  signup: (formData: FormData) => Promise<void>;
}

const SignupForm = ({ signup }: SignupFormProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <form className="flex w-full flex-col gap-4 pt-6">
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
            className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 placeholder:text-neutral-500 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
            placeholder="email@example.com"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          htmlFor="password"
          className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
        >
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[calc(50%-10px)]"
            type="button"
          >
            {showPassword ? (
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

        <div className="flex items-center gap-2">
          <IconInfo theme={currentTheme} width={16} height={16} />
          <span className="text-normal text-xs leading-[1.4] tracking-normal text-neutral-600 transition-colors duration-300 dark:text-neutral-400">
            At least 8 characters
          </span>
        </div>
      </div>
      <button
        className="rounded-lg bg-blue-500 px-4 py-3 text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-0 transition-colors duration-300"
        formAction={signup}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
