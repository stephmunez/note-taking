import TagsList from '@/app/components/TagsList';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CreateNewNoteButton from '../../components/CreateNewNoteButton';

export const metadata: Metadata = {
  title: 'Notes Taking | Tags',
};

export default async function Home() {
  return (
    <main className="z-50 min-h-[calc(100vh-108px)] rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950">
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
          Tags
        </h1>
        <Suspense
          fallback={
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Loading tags...
            </p>
          }
        >
          <TagsList />
        </Suspense>
      </div>

      <CreateNewNoteButton />
    </main>
  );
}
