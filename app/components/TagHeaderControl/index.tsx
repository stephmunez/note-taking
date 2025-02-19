'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconArrowLeft from '../IconArrowLeft';

const NoteHeaderControl = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/tags');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <div className="flex w-full items-center justify-between pb-3">
      <button className="flex w-max items-center gap-1" onClick={handleGoBack}>
        <span>
          <IconArrowLeft
            darkColor="#CACFD8"
            width={18}
            height={18}
            theme={currentTheme}
          />
        </span>

        <span className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:text-neutral-300">
          Go Back
        </span>
      </button>
    </div>
  );
};

export default NoteHeaderControl;
