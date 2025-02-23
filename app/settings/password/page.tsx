import ChangePasswordForm from '@/app/components/ChangePasswordForm';
import SettingsHeaderControl from '../../components/SettingsHeaderControl';

const ColorTheme = () => {
  return (
    <main className="z-50 flex min-h-[calc(100vh-108px)] flex-col gap-5 rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950">
      <div className="flex w-full flex-col gap-3">
        <SettingsHeaderControl />
        <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
          Change Password
        </h1>
      </div>
      <ChangePasswordForm />
    </main>
  );
};

export default ColorTheme;
