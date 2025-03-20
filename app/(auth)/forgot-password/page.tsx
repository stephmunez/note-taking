import { Metadata } from 'next';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import Logo from '../../components/Logo';

export const metadata: Metadata = {
  title: 'Notes Taking | Forgot Password',
};

const Login = () => {
  return (
    <main className="flex min-h-screen w-full items-center px-4 py-24 md:px-32 md:py-80">
      <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-solid border-neutral-200 bg-neutral-0 px-4 py-10 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950 md:max-w-[522px] md:px-8 md:py-12">
        <Logo />
        <div className="cl flex w-full flex-col items-center gap-2">
          <h1 className="text-center text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
            Forgotten your password?
          </h1>
          <p className="text-center text-sm leading-[1.3] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:text-neutral-300">
            Enter your email below, and we’ll send you a link to reset it.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  );
};

export default Login;
