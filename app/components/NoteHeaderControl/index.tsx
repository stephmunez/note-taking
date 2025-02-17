'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import IconArchive from '../IconArchive';
import IconArrowLeft from '../IconArrowLeft';
import IconDelete from '../IconDelete';

interface NoteHeaderControlProps {
  id: string;
}

const NoteHeaderControl = ({ id }: NoteHeaderControlProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <div className="flex w-full items-center justify-between border-b border-solid border-neutral-200 pb-3 transition-colors duration-300 dark:border-neutral-800">
      <Link className="flex w-max items-center gap-1" href={'/'}>
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
      </Link>
      <div className="flex items-center gap-4">
        <button>
          <IconDelete
            darkColor="#CACFD8"
            width={18}
            height={18}
            theme={currentTheme}
          />
        </button>
        <button>
          <IconArchive
            darkColor="#CACFD8"
            width={18}
            height={18}
            theme={currentTheme}
          />
        </button>
        <Link
          className="text-sm leading-[1.3] tracking-[-0.2px] text-blue-500"
          href={`/notes/edit/${id}`}
        >
          Edit Note
        </Link>
      </div>
    </div>
  );
};

export default NoteHeaderControl;
