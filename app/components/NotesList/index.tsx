import { getNotes } from '@/lib/notes';
import Link from 'next/link';
import React from 'react';
import NoteItem from '../NoteItem';

interface NotesListProps {
  tag?: string;
  isArchived?: boolean;
}

const NotesList = async ({ tag, isArchived }: NotesListProps) => {
  const notes = await getNotes(tag, isArchived);

  return (
    <div className="hidden max-h-[calc(100vh-102px)] min-h-[calc(100vh-102px)] w-1/3 min-w-52 max-w-[290px] flex-col gap-4 overflow-auto border-r border-solid bg-neutral-0 pb-9 pl-8 pr-5 pt-5 dark:border-r-neutral-800 dark:bg-neutral-950 lg:flex">
      <Link
        className="hidden items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-0 transition-colors duration-300 lg:flex"
        href={'/create'}
      >
        + Create New Note
      </Link>
      {notes && notes.length ? (
        <ul className="flex flex-col gap-1">
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
        <p className="rounded-lg border border-solid border-neutral-200 bg-neutral-100 p-2 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-0">
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
    </div>
  );
};

export default NotesList;
