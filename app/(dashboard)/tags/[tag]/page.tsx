import React from 'react';
import CreateNewNoteButton from '../../components/CreateNewNoteButton';
import NoteItem from '../../components/NoteItem';
import TagHeaderControl from '../../components/TagHeaderControl';
import ThemeButton from '../../components/ThemeButton';

interface TagProps {
  params: {
    tag: string;
  };
}

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

export default async function Tag({ params }: TagProps) {
  const { tag } = await params;
  const notes = await getNotes();
  const activeNotes = notes.filter((note) => !note.isArchived);
  const taggedNotes = activeNotes.filter((note) =>
    note.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );

  return (
    <main className="z-50 flex min-h-[calc(100vh-108px)] w-full flex-col gap-4 rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950">
      <TagHeaderControl />
      <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
        Notes Tagged: {tag.charAt(0).toUpperCase() + tag.slice(1)}
      </h1>
      <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200">
        All notes with the ”{tag.charAt(0).toUpperCase() + tag.slice(1)}” tag
        are shown here.
      </p>
      {taggedNotes.length ? (
        <ul className="flex flex-col gap-1">
          {taggedNotes.map((note, i) => (
            <React.Fragment key={note.id}>
              <NoteItem note={note} />
              <div
                key={i}
                className={`pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800 ${
                  i === taggedNotes.length - 1 ? 'hidden' : ''
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

      <ThemeButton />
      <CreateNewNoteButton />
    </main>
  );
}
