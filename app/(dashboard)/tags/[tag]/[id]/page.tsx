import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';
import Note from '../../../../components/Note';
import NoteHeaderControl from '../../../../components/NoteHeaderControl';
import NoteHeaderControlMobile from '../../../../components/NoteHeaderControlMobile';
import NoteLoading from '../../../../components/NoteLoading';

interface generateMetadataProps {
  params: Promise<{ id: string; tag: string }>;
}

interface TagNotePageProps {
  params: Promise<{ id: string; tag: string }>;
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

const TagNotePage = async ({ params }: TagNotePageProps) => {
  const { id, tag } = await params;

  return (
    <main className="flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:gap-4 md:px-6 lg:max-h-[calc(100vh-89px)] lg:min-h-[calc(100vh-89px)] lg:flex-row-reverse lg:rounded-none lg:py-0">
      <NoteHeaderControlMobile id={id} tag={tag} />
      <NoteHeaderControl id={id} tag={tag} />

      <Suspense fallback={<NoteLoading />}>
        <Note id={id} />
      </Suspense>
    </main>
  );
};

export default TagNotePage;
