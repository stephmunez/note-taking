'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconMoon from '../IconMoon';
import IconSun from '../IconSun';
import IconSystemTheme from '../IconSystemTheme';

const colorThemeOptions = [
  {
    theme: 'light',
    icon: IconSun,
    label: 'Light Mode',
    description: 'Pick a clean and classic light theme',
  },
  {
    theme: 'dark',
    icon: IconMoon,
    label: 'Dark Mode',
    description: 'Select a sleek and modern dark theme',
  },
  {
    theme: 'system',
    icon: IconSystemTheme,
    label: 'System',
    description: 'Adapts to your device’s theme',
  },
];

const ColorThemeOptions = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('system');

  useEffect(() => {
    setMounted(true);
    setSelectedTheme(theme || 'system');
  }, [theme]);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTheme(event.target.value);
  };

  const applyChanges = () => {
    setTheme(selectedTheme);
  };

  return (
    <div className="f-full flex flex-col gap-5">
      <ul className="flex flex-col gap-4">
        {colorThemeOptions.map(({ theme, icon: Icon, label, description }) => (
          <li key={theme}>
            <input
              type="radio"
              id={theme}
              name="theme"
              value={theme}
              checked={selectedTheme === theme}
              onChange={handleThemeChange}
              className="hidden"
            />
            <label
              htmlFor={theme}
              className={`flex cursor-pointer items-center gap-4 rounded-lg border border-solid border-neutral-200 p-4 transition-colors duration-300 dark:border-neutral-700 ${
                selectedTheme === theme
                  ? 'bg-neutral-100 dark:bg-neutral-700'
                  : 'bg-neutral-0 dark:bg-neutral-950'
              }`}
            >
              <div className="flex w-full items-center gap-4">
                <div className="flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-xl border border-solid border-neutral-200 bg-neutral-0 transition-colors duration-300 dark:border-neutral-700 dark:bg-neutral-950">
                  <Icon
                    theme={currentTheme}
                    lightColor="#0E121B"
                    darkColor="#FFF"
                  />
                </div>

                <div className="flex flex-col gap-[0.375rem]">
                  <span className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
                    {label}
                  </span>
                  <p className="text-xs font-normal leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
                    {description}
                  </p>
                </div>
              </div>
              <div
                className={`h-4 min-h-4 w-4 min-w-4 rounded-full border-solid transition-colors duration-300 ${
                  selectedTheme === theme
                    ? 'border-4 border-blue-500'
                    : 'border-2 border-neutral-200 dark:border-neutral-600'
                }`}
              ></div>
            </label>
          </li>
        ))}
      </ul>
      <button
        className="self-end rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-0 transition-colors duration-300"
        onClick={applyChanges}
      >
        Apply Changes
      </button>
    </div>
  );
};

export default ColorThemeOptions;
