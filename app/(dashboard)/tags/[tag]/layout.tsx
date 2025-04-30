import { Suspense } from 'react';
import NotesList from '../../../components/NotesList';

interface TagLayoutProps {
  children: React.ReactNode;
  params: { tag: string };
}

const TagLayout = async ({ children, params }: TagLayoutProps) => {
  const { tag } = await params;

  return (
    <div className="flex w-full bg-neutral-0 transition-colors duration-300 dark:bg-neutral-950">
      <Suspense
        fallback={
          <p className="hidden text-sm text-neutral-700 dark:text-neutral-300 lg:block lg:pl-8 lg:pt-5">
            Loading notes...
          </p>
        }
      >
        <NotesList tag={tag} />
      </Suspense>

      {children}
    </div>
  );
};

export default TagLayout;
