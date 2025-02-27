import FontThemeOptions from '../../../components/FontThemeOptions';
import SettingsHeaderControl from '../../../components/SettingsHeaderControl';

const FontTheme = () => {
  return (
    <main className="z-50 flex min-h-[calc(100vh-108px)] flex-col gap-4 rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950">
      <div className="flex w-full flex-col gap-3">
        <SettingsHeaderControl />
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
            Font Theme
          </h1>
          <p className="text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
            Choose your font theme:
          </p>
        </div>
      </div>
      <FontThemeOptions />
    </main>
  );
};

export default FontTheme;
