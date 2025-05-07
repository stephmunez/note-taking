'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import IconFont from '../IconFont';
import IconLock from '../IconLock';
import IconLogout from '../IconLogout';
import IconSun from '../IconSun';
import LogoutModal from '../LogoutModal';

const settingsOptions = [
  { href: '/settings/color', icon: IconSun, label: 'Color Theme' },
  { href: '/settings/font', icon: IconFont, label: 'Font Theme' },
  { href: '/settings/password', icon: IconLock, label: 'Change Password' },
];

export default function SettingsListMobile() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <>
      <ul className="flex w-full flex-col gap-2 lg:hidden">
        {settingsOptions.map(({ href, icon: Icon, label }, index) => (
          <li key={index}>
            <Link
              href={href}
              className={`flex items-center gap-2 ${index === settingsOptions.length - 1 ? 'border-b border-solid border-neutral-200 px-2 pb-4 transition-colors duration-300 dark:border-neutral-800' : 'p-2'}`}
            >
              <Icon
                width={20}
                height={20}
                theme={currentTheme}
                lightColor="#0E121B"
                darkColor="#E0E4EA"
              />
              <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-200">
                {label}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 p-2"
          >
            <IconLogout
              width={20}
              height={20}
              theme={currentTheme}
              lightColor="#0E121B"
              darkColor="#E0E4EA"
            />
            <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-200">
              Logout
            </span>
          </button>
        </li>
      </ul>
      {isModalOpen && <LogoutModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
