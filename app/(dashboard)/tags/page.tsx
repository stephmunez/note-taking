import { Metadata } from 'next';
import { Suspense } from 'react';
import CreateNewNoteButton from '../../components/CreateNewNoteButton';
import TagsList from '../../components/TagsList';
import TagsListLoading from '../../components/TagsListLoading';

export const metadata: Metadata = {
  title: 'Notes Taking | Tags',
};

export default async function Home() {
  return (
    <main className="z-50 min-h-[calc(100vh-108px)] w-full rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:gap-4 md:px-8 md:py-6">
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px]">
          Tags
        </h1>

        <Suspense fallback={<TagsListLoading />}>
          <TagsList />
        </Suspense>
      </div>

      <CreateNewNoteButton />
    </main>
  );
}
