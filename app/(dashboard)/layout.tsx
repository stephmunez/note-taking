import { Suspense } from 'react';
import MenuBar from '../components/MenuBar';
import NavigationSidebar from '../components/NavigationSidebar';
import NotesList from '../components/NotesList';
import PageHeader from '../components/PageHeader';
import PageHeaderMobile from '../components/PageHeaderMobile';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeaderMobile />
      <NavigationSidebar />
      <div className="flex w-full flex-col">
        <PageHeader />
        <div className="flex w-full">
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
      </div>
      <MenuBar />
    </>
  );
}
