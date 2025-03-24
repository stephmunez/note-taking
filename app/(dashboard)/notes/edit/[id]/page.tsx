import { createClient } from '@/utils/supabase/server';
import EditNote from '../../../../components/EditNote';
import NoteHeaderControl from '../../../../components/NoteHeaderControl';

interface generateMetadataProps {
  params: Promise<{ id: string }>;
}

interface EditNotePageProps {
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

const EditNotePage = async ({ params }: EditNotePageProps) => {
  const { id } = await params;

  return (
    <main className="dark:bg-neutral-95 flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 md:min-h-[calc(100vh-148px)] md:gap-4 md:px-6">
      <NoteHeaderControl id={id} isEdit={true} />
      <EditNote id={id} />
    </main>
  );
};

export default EditNotePage;
