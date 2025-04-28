import { Suspense } from 'react';
import NotesList from '../../components/NotesList';

const NotesPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full bg-neutral-0 transition-colors duration-300 dark:bg-neutral-950">
      <Suspense
        fallback={
          <p className="text-sm text-neutral-700 dark:text-neutral-300 lg:pl-8 lg:pt-5">
            Loading notes...
          </p>
        }
      >
        <NotesList />
      </Suspense>

      {children}
    </div>
  );
};

export default NotesPageLayout;
