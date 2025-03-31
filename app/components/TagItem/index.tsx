'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import IconTag from '../IconTag';

import { useTheme } from 'next-themes';

interface TagItemProps {
  tag: string;
}

const TagItem = ({ tag }: TagItemProps) => {
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
    <Link
      href={`/tags/${tag.toLowerCase()}`}
      className="flex items-center gap-2 py-[0.625rem] text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300"
      key={tag}
    >
      <IconTag
        width={20}
        height={20}
        lightColor="#2B303B"
        darkColor="#CACFD8"
        theme={currentTheme}
      />
      <span>{tag}</span>
    </Link>
  );
};

export default TagItem;
