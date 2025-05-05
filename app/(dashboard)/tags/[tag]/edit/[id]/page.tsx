import { createClient } from '@/utils/supabase/server';
import EditNote from '../../../../../components/EditNote';
import NoteHeaderControl from '../../../../../components/NoteHeaderControl';
import NoteHeaderControlMobile from '../../../../../components/NoteHeaderControlMobile';

interface generateMetadataProps {
  params: Promise<{ id: string }>;
}

interface TagEditNotePageProps {
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
  return { title: `Note Taking | Edit | ${data.title}` };
};

const TagEditNotePage = async ({ params }: TagEditNotePageProps) => {
  const { id } = await params;

  return (
    <main className="flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:gap-4 md:px-6 lg:max-h-[calc(100vh-102px)] lg:min-h-[calc(100vh-102px)] lg:flex-row-reverse lg:rounded-none lg:py-0">
      <NoteHeaderControlMobile id={id} isEdit={true} />
      <NoteHeaderControl id={id} isEdit={true} />

      <EditNote id={id} />
    </main>
  );
};

export default TagEditNotePage;
