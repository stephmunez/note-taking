'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconRestore from '../IconRestore';

interface RestoreNoteModalProps {
  onClose: () => void;
  id: string;
  onActionComplete?: (success: boolean) => void;
}

const RestoreNoteModal = ({
  onClose,
  id,
  onActionComplete,
}: RestoreNoteModalProps) => {
  const { theme, systemTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleRestore = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isArchived: false,
        }),
      });

      if (res.ok) {
        if (onActionComplete) onActionComplete(true);
        onClose();
      } else {
        if (onActionComplete) onActionComplete(false);
      }
    } catch (error) {
      console.error('Error archiving note:', error);
      if (onActionComplete) onActionComplete(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 px-4">
      <div className="rounded-xl border border-solid border-neutral-200 bg-neutral-0 transition-colors duration-300 dark:border-neutral-600 dark:bg-neutral-700">
        <div className="flex gap-4 border-b border-solid border-neutral-200 p-5 transition-colors duration-300 dark:border-neutral-600">
          <div className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-neutral-100 transition-colors duration-300 dark:bg-neutral-600">
            <IconRestore
              theme={currentTheme}
              darkColor="#FFFFFF"
              lightColor="#0E121B"
            />
          </div>
          <div className="flex flex-col gap-[0.375rem]">
            <h2 className="text-base font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
              Restore Note
            </h2>
            <p className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-200">
              Are you sure you want to restore this note? You can find it in the
              Home Page after restoring.
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
            onClick={() => handleRestore(id)}
            className="rounded-lg bg-red-500 px-4 py-3 text-sm font-medium leading-[1.2] tracking-[-0.2px] text-neutral-0 transition-colors duration-300"
          >
            {loading ? 'Restoring note...' : 'Restore Note'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreNoteModal;
