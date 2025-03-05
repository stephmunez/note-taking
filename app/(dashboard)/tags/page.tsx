import { Metadata } from 'next';
import React from 'react';
import CreateNewNoteButton from '../../components/CreateNewNoteButton';
import TagItem from '../../components/TagItem';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

export const metadata: Metadata = {
  title: 'Notes Taking | Tags',
};

const getNotes = async (): Promise<Note[]> => {
  const res = await fetch('http://localhost:4000/notes');
  return res.json();
};

export default async function Home() {
  const notes = await getNotes();
  const activeNotes = notes.filter((note) => !note.isArchived);
  const uniqueTags = activeNotes
    .reduce<string[]>((acc, note) => {
      note.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, [])
    .sort((a, b) => a.localeCompare(b));

  return (
    <main className="z-50 min-h-[calc(100vh-108px)] rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950">
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
          Tags
        </h1>
        {uniqueTags.length ? (
          <ul className="flex flex-col gap-1">
            {uniqueTags.map((tag, i) => (
              <React.Fragment key={tag}>
                <TagItem tag={tag} key={tag} />
                <div
                  key={i}
                  className={`pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800 ${
                    i === uniqueTags.length - 1 ? 'hidden' : ''
                  }`}
                ></div>
              </React.Fragment>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border border-solid border-neutral-200 bg-neutral-100 p-2 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-0">
            You don’t have any notes with tags yet. Start a new note to capture
            your thoughts and ideas.
          </p>
        )}
      </div>

      <CreateNewNoteButton />
    </main>
  );
}
