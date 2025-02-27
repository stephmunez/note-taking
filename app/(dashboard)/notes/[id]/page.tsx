import { notFound } from 'next/navigation';
import NoteHead from '../../../components/NoteHead';
import NoteHeaderControl from '../../../components/NoteHeaderControl';
import ThemeButton from '../../../components/ThemeButton';

interface NoteProps {
  params: {
    id: string;
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

const getNote = async (id: string): Promise<Note> => {
  const res = await fetch('http://localhost:4000/notes/' + id);

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

const Note = async ({ params }: NoteProps) => {
  const { id } = await params;
  const note = await getNote(id);

  return (
    <main className="flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 dark:bg-neutral-950">
      <NoteHeaderControl id={id} />
      <NoteHead
        title={note.title}
        tags={note.tags}
        lastEdited={note.lastEdited}
      />
      <div className="flex w-full flex-col gap-3">
        <div className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-800 transition-colors duration-300 dark:text-neutral-100">
          {note.content.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>

      <ThemeButton />
    </main>
  );
};

export default Note;
