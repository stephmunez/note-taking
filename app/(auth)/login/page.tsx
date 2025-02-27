import { Metadata } from 'next';
import Link from 'next/link';
import GoogleLogin from '../../components/GoogleLogin';
import Logo from '../../components/IconLogo';
import LoginForm from '../../components/LoginForm';

export const metadata: Metadata = {
  title: 'Notes Taking | Login',
};

const Login = () => {
  return (
    <main className="h-screen w-full px-4 py-24">
      <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-solid border-neutral-200 bg-neutral-0 px-4 py-10 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950">
        <Logo />
        <div className="cl flex w-full flex-col items-center gap-2">
          <h1 className="text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
            Welcome to Note
          </h1>
          <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:text-neutral-300">
            Please log in to continue
          </p>
        </div>
        <LoginForm />
        <GoogleLogin />
        <div className="pointer-events-none h-px w-full bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800"></div>
        <span className="text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:text-neutral-300">
          No account yet?{' '}
          <Link
            href={'/signup'}
            className="text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Login;
