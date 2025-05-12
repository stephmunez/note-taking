import React from 'react';

const NotesListLoading = () => {
  // Create an array of 3 skeletons
  const skeletons = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="hidden w-full max-w-[290px] flex-col gap-4 border-solid pb-9 pl-8 pr-5 pt-5 dark:border-r-neutral-800 lg:flex lg:w-1/3 lg:border-r">
      {/* Button Skeleton */}
      <div className="h-10 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>

      <ul className="flex flex-col gap-1">
        {skeletons.map((index) => (
          <React.Fragment key={index}>
            {/* Skeleton note item */}
            <li className="flex flex-col gap-1 rounded-lg p-3 transition-colors duration-300">
              {/* Title skeleton */}
              <div className="h-5 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>

              {/* Content skeleton */}
              <div className="h-4 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>

              {/* Date skeleton */}
              <div className="h-3 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
            </li>

            {/* Divider */}
            {index < skeletons.length - 1 && (
              <div className="pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800"></div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default NotesListLoading;
