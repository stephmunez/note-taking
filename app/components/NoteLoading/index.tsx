const NoteLoading = () => {
  return (
    <div className="flex w-full flex-col gap-4 lg:py-5">
      {/* Title skeleton */}
      <div className="h-8 w-72 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800 lg:w-96"></div>

      {/* Details skeleton */}
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full items-center gap-2">
          <div className="flex w-1/3 items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
          </div>

          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        </div>

        <div className="flex w-full items-center gap-2">
          <div className="flex w-1/3 items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
          </div>

          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        </div>
      </div>

      {/* Divider */}
      <div className="pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800"></div>

      {/* Content Skeleton */}
      <div className="flex w-full flex-col gap-3 md:gap-4">
        <div className="h-4 w-56 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <br />
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-4 w-52 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-4 w-52 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <br />
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-4 w-52 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-4 w-52 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <br />
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-4 w-72 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-4 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
    </div>
  );
};

export default NoteLoading;
