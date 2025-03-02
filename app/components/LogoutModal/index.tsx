'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface LogoutModalProps {
  onClose: () => void;
}

export default function LogoutModal({ onClose }: LogoutModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });

      if (res.ok) {
        router.replace('/login'); // Redirect to login after logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-900">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Confirm Logout
        </h2>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          Are you sure you want to log out?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md bg-neutral-200 px-3 py-1 text-sm text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
