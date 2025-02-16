interface EditNoteProps {
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

const EditNote = async ({ params }: EditNoteProps) => {
  const { id } = await params;
  const note = await getNote(id);

  return (
    <main>
      <h1>{note.title}</h1>
      <p>Note ID: {note.id}</p>
    </main>
  );
};

export default EditNote;
