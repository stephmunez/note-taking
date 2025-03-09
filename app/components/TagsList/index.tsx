import { getNotes } from '@/lib/notes';
import Link from 'next/link';
import React from 'react';
import TagItem from '../TagItem';

const TagsList = async () => {
  const notes = await getNotes();

  const uniqueTags = notes
    .reduce<string[]>((acc, note) => {
      note.tags.forEach((tag: string) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, [])
    .sort((a, b) => a.localeCompare(b));

  return (
    <>
      {uniqueTags.length ? (
        <ul className="flex flex-col gap-1">
          {uniqueTags.map((tag, i) => (
            <React.Fragment key={tag}>
              <TagItem tag={tag} />
              <div
                key={`divider-${i}`}
                className={`pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800 ${
                  i === uniqueTags.length - 1 ? 'hidden' : ''
                }`}
              ></div>
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-solid border-neutral-200 bg-neutral-100 p-2 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-0">
          You don’t have any notes with tags yet.{' '}
          <Link href={'/create'} className="underline">
            Start a new note
          </Link>{' '}
          to capture your thoughts and ideas.
        </p>
      )}
    </>
  );
};

export default TagsList;
