import { notFound } from 'next/navigation';
import NoteHead from '../../../components/NoteHead';
import NoteHeaderControl from '../../../components/NoteHeaderControl';
import ThemeButton from '../../../components/ThemeButton';

interface ArchivedNoteProps {
  params: {
    id: string;
  };
}

interface ArchivedNote {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

const getArchivedNote = async (id: string): Promise<ArchivedNote> => {
  const res = await fetch('http://localhost:4000/notes/' + id);

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

const ArchivedNote = async ({ params }: ArchivedNoteProps) => {
  const { id } = await params;
  const { title, tags, lastEdited, isArchived, content } =
    await getArchivedNote(id);

  return (
    <main className="flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 transition-colors duration-300 dark:bg-neutral-950">
      <NoteHeaderControl id={id} isArchived={isArchived} />
      <NoteHead
        title={title}
        tags={tags}
        lastEdited={lastEdited}
        isArchived={isArchived}
      />
      <div className="flex w-full flex-col gap-3">
        <div className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-800 transition-colors duration-300 dark:text-neutral-100">
          {content.split('\n').map((line, index) => (
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

export default ArchivedNote;
