import ArchiveNotesList from '@/app/components/ArchiveNotesList';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import CreateNewNoteButton from '../../components/CreateNewNoteButton';

export const metadata: Metadata = {
  title: 'Notes Taking | Archive',
};

export default async function Home() {
  return (
    <main className="z-50 min-h-[calc(100vh-108px)] rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950">
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
          Archived Notes
        </h1>
        <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
        <Suspense
          fallback={
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Loading notes...
            </p>
          }
        >
          <ArchiveNotesList />
        </Suspense>
      </div>

      <CreateNewNoteButton />
    </main>
  );
}
