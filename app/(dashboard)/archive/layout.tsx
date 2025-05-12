import { Suspense } from 'react';
import NotesList from '../../components/NotesList';
import NotesListLoading from '../../components/NotesListLoading';

const ArchivedNotesPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full bg-neutral-0 transition-colors duration-300 dark:bg-neutral-950">
      <Suspense fallback={<NotesListLoading />}>
        <NotesList isArchived={true} />
      </Suspense>
      {children}
    </div>
  );
};

export default ArchivedNotesPageLayout;
