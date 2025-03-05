import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import Search from '../../components/Search';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

const getNotes = async (): Promise<Note[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('isArchived', false)
    .order('lastEdited', { ascending: false });

  if (error) {
    console.error('Error fetching notes:', error.message);
    return [];
  }

  return data;
};

export const metadata: Metadata = {
  title: 'Notes Taking | Search',
};

export default async function SearchPage() {
  const notes = await getNotes();

  return <Search notes={notes} />;
}
