'use client';

import { createClient } from '@/utils/supabase/client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconHidePassword from '../IconHidePassword';
import IconShowPassword from '../IconShowPassword';
import { Toast, ToastContainer } from '../Toast';

interface UserData {
  email?: string;
  updated_at?: string;
}

const ChangePasswordForm = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const supabase = createClient();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUserData({
            email: user.email,
            updated_at: user.updated_at,
          });

          // Set placeholder for current password
          setOldPassword('••••••••');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setFetchingUser(false);
      }
    };

    fetchUserData();
  }, [supabase.auth]);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  // Handle toast dismiss after timeout
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Password validation
  const validatePassword = () => {
    // Clear the placeholder when user starts typing
    if (oldPassword === '••••••••') {
      setError('Please enter your current password');
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return false;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setLoading(true);
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      // Reset form with new placeholder values
      setOldPassword('••••••••');
      setNewPassword('');
      setConfirmNewPassword('');

      // Show success toast
      setToastMessage('Password updated successfully!');
      setToastType('success');
      setShowToast(true);
    } catch (error: any) {
      console.error('Error updating password:', error);
      setError(error.message || 'Failed to update password');

      // Show error toast
      setToastMessage(error.message || 'Failed to update password');
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle field focus - clear placeholder
  const handleOldPasswordFocus = () => {
    if (oldPassword === '••••••••') {
      setOldPassword('');
    }
  };

  return (
    <div className="flex w-full flex-col gap-5">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {fetchingUser ? (
        <div className="flex items-center justify-center py-6">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <form
            id="change-password"
            className="flex w-full flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col gap-[0.375rem]">
              <label
                htmlFor="old-password"
                className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  id="old-password"
                  name="old-password"
                  value={oldPassword}
                  required
                  className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
                  onChange={(e) => setOldPassword(e.target.value)}
                  onFocus={handleOldPasswordFocus}
                />
                <button
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-[calc(50%-10px)]"
                  type="button"
                >
                  {showOldPassword ? (
                    <IconHidePassword
                      theme={currentTheme}
                      width={20}
                      height={20}
                      lightColor="#717784"
                      darkColor="#99A0AE"
                    />
                  ) : (
                    <IconShowPassword
                      theme={currentTheme}
                      width={20}
                      height={20}
                      lightColor="#717784"
                      darkColor="#99A0AE"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-[0.375rem]">
              <label
                htmlFor="new-password"
                className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="new-password"
                  name="new-password"
                  value={newPassword}
                  required
                  className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-[calc(50%-10px)]"
                  type="button"
                >
                  {showNewPassword ? (
                    <IconHidePassword
                      theme={currentTheme}
                      width={20}
                      height={20}
                      lightColor="#717784"
                      darkColor="#99A0AE"
                    />
                  ) : (
                    <IconShowPassword
                      theme={currentTheme}
                      width={20}
                      height={20}
                      lightColor="#717784"
                      darkColor="#99A0AE"
                    />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Password must be at least 8 characters
              </p>
            </div>
            <div className="flex w-full flex-col gap-[0.375rem]">
              <label
                htmlFor="confirm-new-password"
                className="text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  id="confirm-new-password"
                  name="confirm-new-password"
                  value={confirmNewPassword}
                  required
                  className="w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:border-neutral-600 dark:text-neutral-0"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                  className="absolute right-3 top-[calc(50%-10px)]"
                  type="button"
                >
                  {showConfirmNewPassword ? (
                    <IconHidePassword
                      theme={currentTheme}
                      width={20}
                      height={20}
                      lightColor="#717784"
                      darkColor="#99A0AE"
                    />
                  ) : (
                    <IconShowPassword
                      theme={currentTheme}
                      width={20}
                      height={20}
                      lightColor="#717784"
                      darkColor="#99A0AE"
                    />
                  )}
                </button>
              </div>
            </div>
          </form>
          <button
            className={`self-end rounded-lg px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-0 transition-colors duration-300 ${
              loading
                ? 'cursor-not-allowed bg-blue-400'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            form="change-password"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Save Password'}
          </button>
        </>
      )}

      {/* Toast notification */}
      <ToastContainer>
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </ToastContainer>
    </div>
  );
};

export default ChangePasswordForm;
