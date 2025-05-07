import SettingsList from '@/app/components/SettingsList';

const SettingsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full bg-neutral-0 transition-colors duration-300 dark:bg-neutral-950">
      <SettingsList />
      {children}
    </div>
  );
};

export default SettingsPageLayout;
