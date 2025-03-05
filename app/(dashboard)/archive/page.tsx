import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';
import React from 'react';
import CreateNewNoteButton from '../../components/CreateNewNoteButton';
import NoteItem from '../../components/NoteItem';

export const metadata: Metadata = {
  title: 'Notes Taking | Archive',
};

const getNotes = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('isArchived', true)
    .order('lastEdited', { ascending: false });

  if (error) console.log(error);
  return data;
};

export default async function Home() {
  const notes = await getNotes();

  return (
    <main className="z-50 min-h-[calc(100vh-108px)] rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950">
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
          Archived Notes
        </h1>
        <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
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
          <>
            <p className="rounded-lg border border-solid border-neutral-200 bg-neutral-100 p-2 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-0">
              You don’t have any notes yet. Start a new note to capture your
              thoughts and ideas.
            </p>
          </>
        )}
      </div>

      <CreateNewNoteButton />
    </main>
  );
}
