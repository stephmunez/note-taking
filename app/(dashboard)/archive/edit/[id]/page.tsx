import { createClient } from '@/utils/supabase/server';
import EditNote from '../../../../components/EditNote';
import NoteHeaderControl from '../../../../components/NoteHeaderControl';

interface generateMetadataProps {
  params: Promise<{ id: string }>;
}

interface EditArchiveNotePageProps {
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

const EditArchiveNotePage = async ({ params }: EditArchiveNotePageProps) => {
  const { id } = await params;

  return (
    <main className="flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 dark:bg-neutral-950">
      <NoteHeaderControl id={id} isEdit={true} isArchived={true} />
      <EditNote id={id} isArchive={true} />
    </main>
  );
};

export default EditArchiveNotePage;
