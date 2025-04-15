import { getNotes } from '@/lib/notes';
import Link from 'next/link';
import React from 'react';
import NoteItem from '../NoteItem';

interface NotesListMobileProps {
  tag?: string;
  isArchived?: boolean;
}

const NotesListMobile = async ({ tag, isArchived }: NotesListMobileProps) => {
  const notes = await getNotes(tag, isArchived);

  return (
    <>
      {notes && notes.length ? (
        <ul className="flex flex-col gap-1 lg:hidden">
          {notes.map((note, i) => (
            <React.Fragment key={note.id}>
              <NoteItem note={note} />
              <div
                key={i}
                className={`pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800 ${
                  i === notes.length - 1 ? 'hidden' : ''
                }`}
              ></div>
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-solid border-neutral-200 bg-neutral-100 p-2 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-0 lg:hidden">
          {isArchived ? (
            <>
              No notes have been archived yet. Move notes here for safekeeping,
              or{' '}
              <Link href={'/create'} className="underline">
                create a new note
              </Link>
              .
            </>
          ) : (
            <>
              You don&apos;t have any
              {tag && tag.charAt(0).toUpperCase() + tag.slice(1)} notes yet.{' '}
              <Link href={'/create'} className="underline">
                Start a new note
              </Link>{' '}
              to capture your thoughts and ideas.
            </>
          )}
        </p>
      )}
    </>
  );
};

export default NotesListMobile;
