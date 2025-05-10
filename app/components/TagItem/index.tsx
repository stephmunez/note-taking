'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconTag from '../IconTag';

import { useTheme } from 'next-themes';
import IconChevronRight from '../IconChevronRight';

interface TagItemProps {
  tag: string;
}

const TagItem = ({ tag }: TagItemProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isActive = pathname.startsWith(`/tags/${tag.toLowerCase()}`);
  return (
    <Link
      href={`/tags/${tag.toLowerCase()}`}
      className={`flex items-center justify-between rounded-lg px-3 py-[0.625rem] text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 hover:bg-neutral-100 active:bg-neutral-100 dark:text-neutral-300 hover:dark:bg-neutral-800 active:dark:bg-neutral-800 ${isActive ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
      key={tag}
    >
      <div className="flex items-center gap-2">
        <IconTag
          width={20}
          height={20}
          lightColor="#2B303B"
          darkColor="#CACFD8"
          theme={currentTheme}
          isActive={isActive}
        />
        <span>{tag}</span>
      </div>
      {isActive && <IconChevronRight theme={currentTheme} />}
    </Link>
  );
};

export default TagItem;
