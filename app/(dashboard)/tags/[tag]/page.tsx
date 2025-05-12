import { Suspense } from 'react';
import CreateNewNoteButton from '../../../components/CreateNewNoteButton';
import DesktopRedirect from '../../../components/DesktopRedirect';
import NotesListMobile from '../../../components/NotesListMobile';
import NotesListMobileLoading from '../../../components/NotesListMobileLoading';
import TagHeaderControl from '../../../components/TagHeaderControl';

interface TagProps {
  params: Promise<{ tag: string }>;
}

interface generateMetadataProps {
  params: Promise<{ tag: string }>;
}

export const generateMetadata = async ({ params }: generateMetadataProps) => {
  const { tag } = await params;
  return {
    title: `Note Taking | Tags | ${tag.charAt(0).toUpperCase() + tag.slice(1)}`,
  };
};

export default async function Tag({ params }: TagProps) {
  const { tag } = await params;

  return (
    <main className="z-50 flex min-h-[calc(100vh-108px)] w-full flex-col gap-4 rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:gap-4 md:px-8 md:py-6 lg:max-h-[calc(100vh-89px)] lg:min-h-[calc(100vh-89px)] lg:rounded-none lg:p-0">
      <TagHeaderControl />
      <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px] lg:hidden">
        Notes Tagged: {tag.charAt(0).toUpperCase() + tag.slice(1)}
      </h1>
      <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200 lg:hidden">
        All notes with the ”{tag.charAt(0).toUpperCase() + tag.slice(1)}” tag
        are shown here.
      </p>

      <Suspense fallback={<NotesListMobileLoading />}>
        <DesktopRedirect tag={tag} />
        <NotesListMobile tag={tag} />
      </Suspense>

      <CreateNewNoteButton />
    </main>
  );
}
