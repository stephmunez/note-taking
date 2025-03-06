import { getNotes } from '@/lib/notes';
import React from 'react';
import NoteItem from '../NoteItem';

const NotesList = async () => {
  const notes = await getNotes();

  return (
    <>
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
          You don’t have any notes yet. Start a new note to capture your
          thoughts and ideas.
        </p>
      )}
    </>
  );
};

export default NotesList;
