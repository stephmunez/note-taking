'use client';
import { getClientNotes, Note } from '@/lib/clientNotes';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconSearch from '../IconSearch';
import IconSettings from '../IconSettings';

const PageHeader = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await getClientNotes();
      setNotes(data);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const headingTitle = pathname.startsWith('/archive')
    ? 'Archived Notes'
    : pathname.startsWith('/tags/')
      ? pathname.split('/')[2]
        ? `Notes Tagged: ${pathname.split('/')[2].charAt(0).toUpperCase() + pathname.split('/')[2].slice(1)}`
        : 'Tags'
      : 'All Notes';

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <header className="hidden w-full items-center justify-between border-b border-solid border-neutral-200 bg-neutral-0 px-8 py-6 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950 lg:flex">
      <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
        {headingTitle}
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative w-[300px]">
          <span className="pointer-events-none absolute left-4 top-4 z-10">
            <IconSearch
              width={20}
              height={20}
              theme={currentTheme}
              lightColor="#717784"
              darkColor="#717784"
            />
          </span>
          <input
            type="text"
            placeholder="Search by title, or tag"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-solid border-neutral-300 bg-neutral-50 py-4 pl-11 pr-4 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 placeholder:text-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-0"
          />
        </div>
        <Link
          className="flex h-10 w-10 items-center justify-center"
          href="/settings"
        >
          <IconSettings
            theme={currentTheme}
            lightColor="#717784"
            darkColor="#99A0AE"
          />
        </Link>
      </div>
    </header>
  );
};

export default PageHeader;
