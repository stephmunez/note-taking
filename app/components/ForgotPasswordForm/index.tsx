'use client';

import { useState } from 'react';
import { createClient } from '../../../utils/supabase/client';

const supabase = createClient();

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('A password reset link has been sent to your email.');
    }
  };

  return (
    <form className="flex w-full flex-col gap-4 pt-6" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
        >
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 placeholder:text-neutral-500 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
        </div>
      </div>

      <button
        className="rounded-lg bg-blue-500 px-4 py-3 text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-0 transition-colors duration-300"
        type="submit"
      >
        Send Reset Link
      </button>

      {message && <p className="text-sm text-green-500">{message}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
};

export default ForgotPasswordForm;
