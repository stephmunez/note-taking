import CreateNewNote from '../../components/CreateNewNote';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

export const generateMetadata = () => {
  return { title: `Note Taking | Create Note` };
};

const Note = () => {
  return (
    <main className="flex min-h-[calc(100vh-108px)] w-full flex-col gap-3 rounded-t-lg bg-neutral-0 px-4 py-5 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:gap-4 md:px-6 lg:max-h-[calc(100vh-102px)] lg:min-h-[calc(100vh-102px)] lg:flex-row-reverse lg:rounded-none lg:py-0">
      <CreateNewNote />
    </main>
  );
};

export default Note;
