'use client';

import { createClient } from '@/utils/supabase/client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconHidePassword from '../IconHidePassword';
import IconInfo from '../IconInfo';
import IconShowPassword from '../IconShowPassword';
import { Toast, ToastContainer } from '../Toast';

interface UserData {
  email?: string;
  password?: string;
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
  const [verifyingPassword, setVerifyingPassword] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
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
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        showErrorToast('Failed to fetch user data');
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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
  };

  const validateCurrentPassword = async () => {
    if (oldPassword.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        oldPassword: 'Please enter your current password',
      }));
      return false;
    }

    setVerifyingPassword(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userData?.email || '',
        password: oldPassword,
      });

      if (signInError) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          oldPassword: 'Current password is not correct',
        }));

        return false;
      }

      setFormErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.oldPassword;
        return updatedErrors;
      });
      return true;
    } catch (error) {
      console.error('Error verifying current password:', error);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        oldPassword: 'Failed to verify current password',
      }));
      return false;
    } finally {
      setVerifyingPassword(false);
    }
  };

  const validateNewPasswords = () => {
    const errors: { [key: string]: string } = { ...formErrors };

    if (newPassword === '') {
      errors.newPassword = 'New password should not be empty';
    } else if (newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else {
      delete errors.newPassword;
    }

    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = 'New passwords do not match';
    } else {
      delete errors.confirmNewPassword;
    }

    setFormErrors(errors);
    return !errors.newPassword && !errors.confirmNewPassword;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // First verify current password
    const isCurrentPasswordValid = await validateCurrentPassword();
    if (!isCurrentPasswordValid) {
      return;
    }

    // Then validate new passwords
    const areNewPasswordsValid = validateNewPasswords();
    if (!areNewPasswordsValid) {
      return;
    }

    // If all validations pass, update the password
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
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setFormErrors({});

      // Show success toast
      showSuccessToast('Password updated successfully!');
    } catch (error: unknown) {
      console.error('Error updating password:', error);

      let errorMessage = 'Failed to update password';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getInputErrorClass = (fieldName: string) => {
    return formErrors[fieldName]
      ? 'border-red-500 dark:border-red-500'
      : 'border-neutral-300 dark:border-neutral-600';
  };

  return (
    <div className="flex w-full flex-col gap-5 md:gap-6">
      {fetchingUser ? (
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Loading user...
        </p>
      ) : (
        <>
          <form
            id="change-password"
            className="flex w-full flex-col gap-6"
            onSubmit={handleSubmit}
            noValidate
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
                  className={`w-full rounded-lg border border-solid bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:text-neutral-0 ${getInputErrorClass('oldPassword')}`}
                  onChange={(e) => setOldPassword(e.target.value)}
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
              {formErrors.oldPassword && (
                <span className="flex items-center gap-2">
                  <IconInfo
                    theme={currentTheme}
                    darkColor="#FB3748"
                    lightColor="#FB3748"
                    width={18}
                    height={18}
                  />
                  <p className="text-xs text-red-500">
                    {formErrors.oldPassword}
                  </p>
                </span>
              )}
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
                  className={`w-full rounded-lg border border-solid bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:text-neutral-0 ${getInputErrorClass('newPassword')}`}
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
              {formErrors.newPassword ? (
                <span className="flex items-center gap-2">
                  <IconInfo
                    theme={currentTheme}
                    darkColor="#FB3748"
                    lightColor="#FB3748"
                    width={18}
                    height={18}
                  />
                  <p className="text-xs text-red-500">
                    {formErrors.newPassword}
                  </p>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <IconInfo
                    theme={currentTheme}
                    width={18}
                    height={18}
                    lightColor="#717784"
                    darkColor="#99A0AE"
                  />
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Password must be at least 8 characters
                  </p>
                </span>
              )}
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
                  className={`w-full rounded-lg border border-solid bg-transparent px-4 py-3 pr-11 text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 focus:outline-none dark:text-neutral-0 ${getInputErrorClass('confirmNewPassword')}`}
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
              {formErrors.confirmNewPassword && (
                <span className="flex items-center gap-2">
                  <IconInfo
                    theme={currentTheme}
                    darkColor="#FB3748"
                    lightColor="#FB3748"
                    width={18}
                    height={18}
                  />
                  <p className="text-xs text-red-500">
                    {formErrors.confirmNewPassword}
                  </p>
                </span>
              )}
            </div>
          </form>
          <button
            className={`self-end rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-0 transition-colors duration-300 ${
              loading || verifyingPassword ? 'cursor-not-allowed' : ''
            }`}
            form="change-password"
            disabled={loading || verifyingPassword}
          >
            {loading
              ? 'Updating...'
              : verifyingPassword
                ? 'Verifying...'
                : 'Save Password'}
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
