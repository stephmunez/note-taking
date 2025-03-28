import { Metadata } from 'next';
import SettingsList from '../../components/SettingsList';

export const metadata: Metadata = {
  title: 'Notes Taking | Settings',
};

const Settings = () => {
  return (
    <main className="z-50 flex min-h-[calc(100vh-108px)] flex-col gap-4 rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:px-8 md:py-6">
      <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
        Settings
      </h1>
      <SettingsList />
    </main>
  );
};

export default Settings;
