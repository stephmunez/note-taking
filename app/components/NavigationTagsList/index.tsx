'use client';

import { getClientNotes } from '@/lib/clientNotes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TagItem from '../TagItem';

const NavigationTagsList = () => {
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const notes = await getClientNotes();
        const tags = notes
          .reduce<string[]>((acc, note) => {
            note.tags.forEach((tag: string) => {
              if (!acc.includes(tag)) {
                acc.push(tag);
              }
            });
            return acc;
          }, [])
          .sort((a, b) => a.localeCompare(b));
        setUniqueTags(tags);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  if (loading)
    return (
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        Loading tags...
      </p>
    );

  return (
    <>
      {uniqueTags.length ? (
        <ul className="flex flex-col gap-1 px-1">
          {uniqueTags.map((tag) => (
            <TagItem tag={tag} key={tag} />
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-solid border-neutral-200 bg-neutral-100 p-2 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-0">
          You dont have any notes with tags yet.{' '}
          <Link href={'/create'} className="underline">
            Start a new note
          </Link>{' '}
          to capture your thoughts and ideas.
        </p>
      )}
    </>
  );
};

export default NavigationTagsList;
