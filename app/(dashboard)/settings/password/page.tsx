import { Metadata } from 'next';
import ChangePasswordForm from '../../../components/ChangePasswordForm';
import SettingsHeaderControl from '../../../components/SettingsHeaderControl';

export const metadata: Metadata = {
  title: 'Notes Taking | Settings | Change Password',
};

const ChangePassword = () => {
  return (
    <main className="z-50 flex min-h-[calc(100vh-108px)] w-full flex-col gap-5 rounded-t-lg bg-neutral-0 px-4 pb-16 pt-5 transition-colors duration-300 dark:bg-neutral-950 md:min-h-[calc(100vh-148px)] md:gap-6 md:px-8 md:py-6 lg:max-w-[592px]">
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

export default ChangePassword;
