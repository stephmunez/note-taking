import SettingsList from '../components/SettingsList';
import ThemeButton from '../components/ThemeButton';

const Settings = () => {
  return (
    <main className="z-50 flex min-h-[calc(100vh-108px)] flex-col gap-4 rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950">
      <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
        Settings
      </h1>
      <SettingsList />
      <ThemeButton />
    </main>
  );
};

export default Settings;
