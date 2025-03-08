'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconDelete from '../IconDelete';

interface DeleteNoteModalProps {
  onClose: () => void;
  id: string;
}

const DeleteNoteModal = ({ onClose, id }: DeleteNoteModalProps) => {
  const { theme, systemTheme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.replace('/'); // Redirect to login after logout
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="rounded-xl border border-solid border-neutral-200 bg-neutral-0 transition-colors duration-300 dark:border-neutral-600 dark:bg-neutral-700">
        <div className="flex gap-4 border-b border-solid border-neutral-200 p-5 transition-colors duration-300 dark:border-neutral-600">
          <div className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-neutral-100 transition-colors duration-300 dark:bg-neutral-600">
            <IconDelete
              theme={currentTheme}
              darkColor="#FFFFFF"
              lightColor="#0E121B"
            />
          </div>
          <div className="flex flex-col gap-[0.375rem]">
            <h2 className="text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
              Delete Note
            </h2>
            <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200">
              Are you sure you want to permanently delete this note? This action
              cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-100 px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:bg-neutral-500 dark:text-neutral-200"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="rounded-lg bg-red-500 px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-0 transition-colors duration-300"
          >
            {loading ? 'Deleting note...' : 'Delete Note'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteModal;
