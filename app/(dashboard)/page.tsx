import { Metadata } from 'next';
import { Suspense } from 'react';
import CreateNewNoteButton from '../components/CreateNewNoteButton';
import DesktopRedirect from '../components/DesktopRedirect';
import NotesListMobile from '../components/NotesListMobile';
import NotesListMobileLoading from '../components/NotesListMobileLoading';

export const metadata: Metadata = {
  title: 'Notes Taking | Home',
};

export default async function Home() {
  return (
    <>
      <main className="z-50 min-h-[calc(100vh-108px)] w-full rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:px-8 md:pb-24 md:pt-6 lg:min-h-[calc(100vh-89px)] lg:rounded-none lg:p-0">
        <div className="flex w-full flex-col gap-4 lg:h-full">
          <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px] lg:hidden">
            All Notes
          </h1>
          <Suspense fallback={<NotesListMobileLoading />}>
            <DesktopRedirect />
            <NotesListMobile />
          </Suspense>
        </div>

        <CreateNewNoteButton />
      </main>
    </>
  );
}
