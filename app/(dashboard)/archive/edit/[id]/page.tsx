import { notFound } from 'next/navigation';

interface generateMetadataProps {
  params: Promise<{ id: string }>;
}

interface EditArchivedNoteProps {
  params: Promise<{ id: string }>;
}

interface ArchivedNote {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

export const generateMetadata = async ({ params }: generateMetadataProps) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/notes/${id}`);
  const note = await res.json();
  return { title: `Note Taking | Edit ${note.title}` };
};

const getNote = async (id: string): Promise<ArchivedNote> => {
  const res = await fetch('http://localhost:4000/notes/' + id);

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

const EditArchivedNote = async ({ params }: EditArchivedNoteProps) => {
  const { id } = await params;
  const note = await getNote(id);

  return (
    <main>
      <h1>{note.title}</h1>
      <p>Note ID: {note.id}</p>
    </main>
  );
};

export default EditArchivedNote;
