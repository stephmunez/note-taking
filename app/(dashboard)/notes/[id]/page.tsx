import { createClient } from '@/utils/supabase/server';
import NoteHead from '../../../components/NoteHead';
import NoteHeaderControl from '../../../components/NoteHeaderControl';

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

interface Params {
  id: string;
}

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('notes')
    .select('title')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching note:', error?.message || 'Note not found');
    return { title: 'Note Taking | Not Found' }; // Ensure valid metadata
  }

  return { title: `Note Taking | ${data.title}` };
};

const getNote = async (id: string): Promise<Note | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notes')
    .select('id, title, tags, content, lastEdited, isArchived')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching note:', error?.message || 'Note not found');
    return null;
  }

  return data;
};

const Note = async ({ params }: NoteProps) => {
  const { id } = await params;
  const note = await getNote(id);
  console.log(typeof note?.content);

  if (!note) {
    return (
      <main className="flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 dark:bg-neutral-950">
        <h1 className="text-2xl font-bold text-red-500">Note not found</h1>
      </main>
    );
  }

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
          {note.content
            .replaceAll('\\n', '\n')
            .split('\n')
            .map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Note;
