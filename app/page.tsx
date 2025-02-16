import CreateNewNoteButton from './components/CreateNewNoteButton';
import NoteItem from './components/NoteItem';
import ThemeButton from './components/ThemeButton';

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

export default async function Home() {
  const notes = await getNotes();
  return (
    <main className='font-sans px-4 pt-5 pb-16 z-50'>
      <div className='flex flex-col w-full gap-4'>
        <h1 className='font-bold text-2xl leading-[1.2] tracking-[-0.5px]'>
          All Notes
        </h1>
        {notes.length ? (
          <ul className='flex flex-col gap-1'>
            {notes.map((note, i) => (
              <>
                <NoteItem note={note} key={note.id} />
                <div
                  className={`w-full h-px bg-neutral-200 dark:bg-neutral-800 pointer-events-none transition-colors duration-300 ${
                    i === notes.length - 1 ? 'hidden' : ''
                  }`}
                ></div>
              </>
            ))}
          </ul>
        ) : (
          <p className='bg-neutral-100 border-neutral-200 rounded-lg p-2 text-sm leading-[1.3] tracking-[-0.2px] text-neutral-950 border-solid border dark:text-neutral-0 dark:bg-neutral-800 dark:border-neutral-700'>
            You don’t have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </p>
        )}
      </div>

      <ThemeButton />
      <CreateNewNoteButton />
    </main>
  );
}
