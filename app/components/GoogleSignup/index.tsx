'use client';

import { createClient } from '@/utils/supabase/client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconGoogle from '../IconGoogle';

const GoogleSignup = () => {
  const supabase = createClient();

  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleGoogleSignUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 border-t border-solid border-neutral-200 pt-6 transition-colors duration-300 dark:border-neutral-800">
      <span className="text-sm leading-[1.3] tracking-[-0.px] text-neutral-600 transition-colors duration-300 dark:text-neutral-300">
        Or sign up with:
      </span>
      <button
        className="flex w-full items-center justify-center gap-4 rounded-lg border border-solid border-neutral-300 px-4 py-3 text-base font-medium leading-[1] tracking-[0.5px] text-neutral-950 transition-colors duration-300 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-0 dark:hover:bg-neutral-800"
        type="button"
        onClick={handleGoogleSignUp}
      >
        <IconGoogle
          lightColor="#0E121B"
          theme={currentTheme}
          darkColor="#FFFFFF"
        />
        Google
      </button>
    </div>
  );
};

export default GoogleSignup;
