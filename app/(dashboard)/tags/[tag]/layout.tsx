import { Suspense } from 'react';
import NotesList from '../../../components/NotesList';
import NotesListLoading from '../../../components/NotesListLoading';

interface TagLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tag: string }>;
}

const TagLayout = async ({ children, params }: TagLayoutProps) => {
  const { tag } = await params;

  return (
    <div className="flex w-full bg-neutral-0 transition-colors duration-300 dark:bg-neutral-950">
      <Suspense fallback={<NotesListLoading />}>
        <NotesList tag={tag} />
      </Suspense>

      {children}
    </div>
  );
};

export default TagLayout;
