import DesktopRedirect from '@/app/components/DesktopRedirect';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import NotesListMobileLoading from '../..//components/NotesListMobileLoading';
import CreateNewNoteButton from '../../components/CreateNewNoteButton';
import NotesListMobile from '../../components/NotesListMobile';

export const metadata: Metadata = {
  title: 'Notes Taking | Archive',
};

export default async function Home() {
  return (
    <main className="z-50 min-h-[calc(100vh-108px)] w-full rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:px-8 md:py-6">
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
          Archived Notes
        </h1>
        <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>

        <Suspense fallback={<NotesListMobileLoading />}>
          <DesktopRedirect isArchived={true} />
          <NotesListMobile isArchived={true} />
        </Suspense>
      </div>

      <CreateNewNoteButton />
    </main>
  );
}
