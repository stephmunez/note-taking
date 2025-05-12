import React from 'react';

interface NotesListMobileLoadingProps {
  isSearch?: boolean;
}

const NotesListMobileLoading = ({ isSearch }: NotesListMobileLoadingProps) => {
  const skeletons = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div
      className={`flex w-full flex-col gap-4 border-solid dark:border-r-neutral-800 ${isSearch ? '' : 'lg:hidden'}`}
    >
      <ul className="flex flex-col gap-1">
        {skeletons.map((index) => (
          <React.Fragment key={index}>
            <li className="flex flex-col gap-1 rounded-lg p-3 transition-colors duration-300">
              <div className="h-5 w-60 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
              <div className="h-4 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
              <div className="h-3 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
            </li>
            {index < skeletons.length - 1 && (
              <div className="pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800"></div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default NotesListMobileLoading;
