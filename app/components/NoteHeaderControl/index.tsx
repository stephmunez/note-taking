'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeleteNoteModal from '../DeleteNoteModal';
import IconArchive from '../IconArchive';
import IconArrowLeft from '../IconArrowLeft';
import IconDelete from '../IconDelete';

interface NoteHeaderControlProps {
  id: string;
  isArchived?: boolean;
}

const NoteHeaderControl = ({ id, isArchived }: NoteHeaderControlProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDeleteNoteModalOpen, setIsDeleteNoteModalOpen] = useState(false);

  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(isArchived ? '/archive' : '/');
    }
  };

  const handleDelete = async () => {};

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <>
      <div className="flex w-full items-center justify-between border-b border-solid border-neutral-200 pb-3 transition-colors duration-300 dark:border-neutral-800">
        <button
          className="flex w-max items-center gap-1"
          onClick={handleGoBack}
        >
          <span>
            <IconArrowLeft
              darkColor="#CACFD8"
              width={18}
              height={18}
              theme={currentTheme}
            />
          </span>

          <span className="text-sm leading-[1.3] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:text-neutral-300">
            Go Back
          </span>
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDeleteNoteModalOpen(true)}>
            <IconDelete
              darkColor="#CACFD8"
              width={18}
              height={18}
              theme={currentTheme}
            />
          </button>
          <button>
            <IconArchive
              darkColor="#CACFD8"
              width={18}
              height={18}
              theme={currentTheme}
            />
          </button>
          <Link
            className="text-sm leading-[1.3] tracking-[-0.2px] text-blue-500"
            href={isArchived ? `/archive/edit/${id}` : `/notes/edit/${id}`}
          >
            Edit Note
          </Link>
        </div>
      </div>
      {isDeleteNoteModalOpen && (
        <DeleteNoteModal
          onClose={() => setIsDeleteNoteModalOpen(false)}
          id={id}
        />
      )}
    </>
  );
};

export default NoteHeaderControl;
