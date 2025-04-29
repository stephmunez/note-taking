import NavigationTagsList from '../NavigationTagsList';

const NavigationTags = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="pl-2 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-500">
        Tags
      </h2>
      <nav>
        <NavigationTagsList />
      </nav>
    </div>
  );
};

export default NavigationTags;
