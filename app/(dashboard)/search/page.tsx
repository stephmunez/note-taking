'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import CreateNewNoteButton from '../../components/CreateNewNoteButton';
import IconSearch from '../../components/IconSearch';
import NoteItem from '../../components/NoteItem';
import ThemeButton from '../../components/ThemeButton';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

const getNotes = async (): Promise<Note[]> => {
  const res = await fetch('http://localhost:4000/notes');
  return res.json();
};

export default function SearchPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    };
    fetchNotes();
    setMounted(true);
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      !note.isArchived &&
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        )),
  );

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <main className="z-50 flex min-h-[calc(100vh-108px)] w-full flex-col gap-4 rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950">
      <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
        Search
      </h1>
      <div className="relative w-full">
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
          placeholder="Search by title or tag"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-solid border-neutral-300 bg-neutral-50 py-4 pl-11 pr-4 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 placeholder:text-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-0"
        />
      </div>

      {searchTerm && (
        <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200">
          All notes matching ”{searchTerm}” are displayed below.
        </p>
      )}
      {filteredNotes.length ? (
        <ul className="flex flex-col gap-1">
          {filteredNotes.map((note, i) => (
            <React.Fragment key={note.id}>
              <NoteItem note={note} />
              <div
                key={i}
                className={`pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800 ${
                  i === filteredNotes.length - 1 ? 'hidden' : ''
                }`}
              ></div>
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-solid border-neutral-200 bg-neutral-100 p-2 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-0">
          No notes match your search. Try a different keyword or{' '}
          <button className="underline">create a new note.</button>
        </p>
      )}

      <ThemeButton />
      <CreateNewNoteButton />
    </main>
  );
}
