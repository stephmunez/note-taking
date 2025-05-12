import React from 'react';

const TagsListLoading = () => {
  // Create an array of 5 skeleton tags
  const skeletons = Array.from({ length: 5 }, (_, i) => i);

  return (
    <ul className="flex flex-col gap-1">
      {skeletons.map((index) => (
        <React.Fragment key={index}>
          {/* Skeleton tag item */}
          <li className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-300">
            <div className="flex items-center gap-2">
              {/* Tag icon skeleton */}
              <div className="h-5 w-5 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800"></div>

              {/* Tag name skeleton */}
              <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
            </div>
          </li>

          {/* Divider */}
          {index < skeletons.length - 1 && (
            <div className="pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800 lg:hidden"></div>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default TagsListLoading;
