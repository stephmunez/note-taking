'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconChevronRight from '../IconChevronRight';
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

export default function SettingsList() {
  const { theme, systemTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const isActive = (route: string) => {
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  return (
    <>
      <ul className="hidden w-1/3 min-w-52 max-w-[260px] flex-col gap-2 border-r border-solid border-neutral-200 px-2 pb-4 pl-8 pr-4 pt-5 transition-colors duration-300 dark:border-neutral-800 lg:flex">
        {settingsOptions.map(({ href, icon: Icon, label }, index) => {
          const active = isActive(href);
          return (
            <li key={index}>
              <Link
                href={href}
                className={`flex items-center justify-between rounded-md p-2 transition-colors duration-300 ${
                  active ? 'rounded-lg bg-neutral-100 dark:bg-neutral-800' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <Icon
                    width={20}
                    height={20}
                    theme={currentTheme}
                    lightColor="#0E121B"
                    darkColor="#E0E4EA"
                    isActive={active}
                  />
                  <span className="text-sm leading-[1.2] tracking-[-0.2px]">
                    {label}
                  </span>
                </div>

                {active && <IconChevronRight theme={theme} />}
              </Link>
            </li>
          );
        })}
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
