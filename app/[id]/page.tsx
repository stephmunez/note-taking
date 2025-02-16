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

const getNote = async (id: string): Promise<Note> => {
  const res = await fetch('http://localhost:4000/notes/' + id);
  return res.json();
};

const Note = async ({ params }: NoteProps) => {
  const { id } = await params;
  const note = await getNote(id);

  return (
    <main>
      <h1>{note.title}</h1>
      <p>Note ID: {note.id}</p>
    </main>
  );
};

export default Note;
