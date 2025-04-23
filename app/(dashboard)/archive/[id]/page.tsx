import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';
import Note from '../../../components/Note';
import NoteHeaderControlMobile from '../../../components/NoteHeaderControlMobile';

interface generateMetadataProps {
  params: Promise<{ id: string }>;
}

interface ArchivedNoteProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: generateMetadataProps) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notes')
    .select('title')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching note:', error?.message || 'Note not found');
    return { title: 'Note Taking | Not Found' };
  }
  return { title: `Note Taking | ${data.title}` };
};

const ArchivedNote = async ({ params }: ArchivedNoteProps) => {
  const { id } = await params;

  return (
    <main className="flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 transition-colors duration-300 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:gap-4 md:px-6">
      <NoteHeaderControlMobile id={id} isArchived={true} />
      <Suspense
        fallback={
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            Loading note...
          </p>
        }
      >
        <Note id={id} />
      </Suspense>
    </main>
  );
};

export default ArchivedNote;
