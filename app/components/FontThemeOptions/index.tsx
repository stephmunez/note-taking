'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconFontMonospace from '../IconFontMonospace';
import IconFontSansSerif from '../IconFontSansSerif';
import IconFontSerif from '../IconFontSerif';
import { Toast, ToastContainer } from '../Toast';

const colorThemeOptions = [
  {
    theme: 'sans-serif',
    icon: IconFontSansSerif,
    label: 'Sans-serif',
    description: 'Clean and modern, easy to read.',
  },
  {
    theme: 'serif',
    icon: IconFontSerif,
    label: 'Serif',
    description: 'Classic and elegant for a timeless feel.',
  },
  {
    theme: 'monospace',
    icon: IconFontMonospace,
    label: 'Monospace',
    description: 'Code-like, great for a technical vibe.',
  },
];

const ColorThemeOptions = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('sans-serif');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Load saved theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('font-theme');
    if (storedTheme) {
      setSelectedTheme(storedTheme);
      applyTheme(storedTheme);
    }
    setMounted(true);
  }, []);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTheme(event.target.value);
  };

  const applyTheme = (theme: string) => {
    document.body.classList.remove('font-sans', 'font-serif', 'font-mono');
    switch (theme) {
      case 'sans-serif':
        document.body.classList.add('font-sans');
        break;
      case 'serif':
        document.body.classList.add('font-serif');
        break;
      case 'monospace':
        document.body.classList.add('font-mono');
        break;
      default:
        break;
    }
  };

  const applyChanges = () => {
    applyTheme(selectedTheme);
    setTimeout(() => {
      setToastMessage('Settings updated successfully!');
      setToastType('success');
      setShowToast(true);
    }, 300);
    localStorage.setItem('font-theme', selectedTheme);
  };

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <>
      <div className="f-full flex flex-col gap-5">
        <ul className="flex flex-col gap-4">
          {colorThemeOptions.map(
            ({ theme, icon: Icon, label, description }) => (
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
            ),
          )}
        </ul>
        <button
          className="self-end rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-0 transition-colors duration-300"
          onClick={applyChanges}
        >
          Apply Changes
        </button>
      </div>

      <ToastContainer>
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </ToastContainer>
    </>
  );
};

export default ColorThemeOptions;
