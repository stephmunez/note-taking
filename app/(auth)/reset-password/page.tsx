import { Metadata } from 'next';
import Logo from '../../components/Logo';
import ResetPasswordForm from '../../components/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Notes Taking | Reset Password',
};

const ResetPassword = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-24 md:px-32 md:py-64">
      <div className="flex w-full max-w-[522px] flex-col items-center gap-4 rounded-xl border border-solid border-neutral-200 bg-neutral-0 px-4 py-10 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950 md:px-8 md:py-12">
        <Logo />
        <div className="cl flex w-full flex-col items-center gap-2">
          <h1 className="text-center text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
            Reset Your Password
          </h1>
          <p className="text-center text-sm leading-[1.3] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:text-neutral-300">
            Choose a new password to secure your account.
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </main>
  );
};

export default ResetPassword;
