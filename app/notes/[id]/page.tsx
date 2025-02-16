import Link from 'next/link';
import NoteHeaderControl from '../../components/NoteHeaderControl';
import ThemeButton from '../../components/ThemeButton';

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
  return res.json();
};

const Note = async ({ params }: NoteProps) => {
  const { id } = await params;
  const note = await getNote(id);

  return (
    <main className="flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 dark:bg-neutral-950">
      <NoteHeaderControl id={id} />
      <h1>{note.title}</h1>
      <p>Note ID: {note.id}</p>
      <Link href={`/edit/${id}`}>Edit note</Link>
      <ThemeButton />
    </main>
  );
};

export default Note;
