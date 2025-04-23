import { getNote } from '@/lib/notes';
import NoteHead from '../NoteHead';

interface NoteProps {
  id: string;
}

const Note = async ({ id }: NoteProps) => {
  const note = await getNote(id);

  if (!note) {
    return <h1 className="text-2xl font-bold text-red-500">Note not found</h1>;
  }

  return (
    <div className="flex w-full flex-col lg:py-5">
      <NoteHead
        title={note.title}
        tags={note.tags}
        lastEdited={note.lastEdited}
        isArchived={note.isArchived}
      />
      <div className="flex w-full flex-col gap-3 md:gap-4">
        <div className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-800 transition-colors duration-300 dark:text-neutral-100">
          {note.content
            .replaceAll('\\n', '\n')
            .split('\n')
            .map((line: string, index: number) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Note;
