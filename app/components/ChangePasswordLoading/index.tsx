const ChangePasswordLoading = () => {
  return (
    <div className="flex w-full flex-col gap-4 lg:py-5">
      {/* Inputs skeleton */}
      <div className="flex w-full flex-col gap-[0.375rem]">
        <div className="h-4 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-11 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
      </div>

      <div className="flex w-full flex-col gap-[0.375rem]">
        <div className="h-4 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-11 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
      </div>

      <div className="flex w-full flex-col gap-[0.375rem]">
        <div className="h-4 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="h-11 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
    </div>
  );
};

export default ChangePasswordLoading;
