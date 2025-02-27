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
  const res = await fetch('http://localhost:4000/notes');
  return res.json();
};

export const metadata: Metadata = {
  title: 'Notes Taking | Search',
};

export default async function SearchPage() {
  const notes = await getNotes();

  return <Search notes={notes} />;
}
