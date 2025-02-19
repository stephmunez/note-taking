'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconClock from '../../components/IconClock';
import IconTag from '../../components/IconTag';
import IconStatus from '../IconStatus';

interface NoteHeadProps {
  title: string;
  tags: string[];
  lastEdited: string;
  isArchived?: boolean;
}

const NoteHead = ({ title, tags, lastEdited, isArchived }: NoteHeadProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const formattedDate = new Date(lastEdited).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 dark:text-white">
        {title}
      </h1>
      <div className="flex w-full flex-col gap-1 border-b border-solid border-neutral-200 pb-3 transition-colors duration-300 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="flex w-1/3 items-center gap-[0.375rem]">
            <IconTag
              darkColor="#CACFD8"
              lightColor="#2B303B"
              width={18}
              height={18}
              theme={currentTheme}
            />
            <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
              Tags
            </span>
          </div>

          <ul className="w-[64%]">
            {tags.map((tag, i) => (
              <li
                className="inline text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300"
                key={tag}
              >
                {tag}
                {i !== tags.length - 1 && ', '}
              </li>
            ))}
          </ul>
        </div>
        {isArchived && (
          <div className="flex items-center gap-2">
            <div className="flex w-1/3 items-center gap-[0.375rem]">
              <IconStatus
                darkColor="#CACFD8"
                lightColor="#2B303B"
                width={18}
                height={18}
                theme={currentTheme}
              />
              <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
                Status
              </span>
            </div>

            <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
              Archived
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="flex w-1/3 items-center gap-[0.375rem]">
            <IconClock
              darkColor="#CACFD8"
              lightColor="#2B303B"
              width={18}
              height={18}
              theme={currentTheme}
            />
            <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
              Last edited
            </span>
          </div>

          <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
            {formattedDate}
          </span>
        </div>
      </div>
    </>
  );
};

export default NoteHead;
