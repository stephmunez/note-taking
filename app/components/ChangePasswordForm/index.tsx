'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconHidePassword from '../IconHidePassword';
import IconShowPassword from '../IconShowPassword';

const ChangePasswordForm = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      oldPassword,
      newPassword,
      confirmNewPassword,
    });
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <form
        id="change-password"
        className="flex w-full flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-[0.375rem]">
          <label
            htmlFor="old-password"
            className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
          >
            Old Password
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? 'text' : 'password'}
              id="old-password"
              name="old-password"
              className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-[calc(50%-10px)]"
              type="button"
            >
              {showOldPassword ? (
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
            htmlFor="new-password"
            className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="new-password"
              name="new-password"
              className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
              onChange={(e) => setNewPassword(e.target.value)}
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
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmNewPassword ? 'text' : 'password'}
              id="confirm-new-password"
              name="confirm-new-password"
              className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
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
      </form>
      <button
        className="self-end rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-0 transition-colors duration-300"
        form="change-password"
      >
        Save Password
      </button>
    </div>
  );
};

export default ChangePasswordForm;
