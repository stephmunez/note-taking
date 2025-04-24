'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArchiveNoteModal from '../ArchiveNoteModal';
import DeleteNoteModal from '../DeleteNoteModal';
import IconArchive from '../IconArchive';
import IconDelete from '../IconDelete';
import IconRestore from '../IconRestore';
import RestoreNoteModal from '../RestoreNoteModal';
import { Toast, ToastContainer } from '../Toast';

interface NoteHeaderControlProps {
  id: string;
  isArchived?: boolean;
  isEdit?: boolean;
}

const NoteHeaderControl = ({
  id,
  isArchived,
  isEdit,
}: NoteHeaderControlProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDeleteNoteModalOpen, setIsDeleteNoteModalOpen] = useState(false);
  const [isArchiveNoteModalOpen, setIsArchiveNoteModalOpen] = useState(false);
  const [isRestoreNoteModalOpen, setIsRestoreNoteModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    window.dispatchEvent(new CustomEvent('save-note'));
    setIsEdited(false);
    setSaving(false);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  useEffect(() => {
    setMounted(true);

    const handleNoteEdited = () => setIsEdited(true);
    const handleNoteNotEdited = () => setIsEdited(false);
    window.addEventListener('note-edited', handleNoteEdited);
    window.addEventListener('note-not-edited', handleNoteNotEdited);

    return () => {
      window.removeEventListener('note-edited', handleNoteEdited);
      window.removeEventListener('note-not-edited', handleNoteNotEdited);
    };
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <>
      <div className="hidden w-1/3 min-w-48 max-w-[258px] flex-col gap-3 border-l border-solid border-neutral-200 py-5 pb-3 pl-4 transition-colors duration-300 dark:border-neutral-800 md:pb-4 lg:flex">
        {isArchived ? (
          <button
            className="flex w-full items-center gap-2 rounded-lg border border-neutral-300 px-4 py-3 transition-colors duration-300 dark:border-neutral-600"
            onClick={() => setIsRestoreNoteModalOpen(true)}
          >
            <IconRestore
              lightColor="#0E121B"
              darkColor="#FFFFFF"
              width={20}
              height={20}
              theme={currentTheme}
            />
            <span className="text-sm font-bold leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
              Restore Note
            </span>
          </button>
        ) : (
          <button
            className="flex w-full items-center gap-2 rounded-lg border border-neutral-300 px-4 py-3 transition-colors duration-300 dark:border-neutral-600"
            onClick={() => setIsArchiveNoteModalOpen(true)}
          >
            <IconArchive
              lightColor="#0E121B"
              darkColor="#FFFFFF"
              width={20}
              height={20}
              theme={currentTheme}
            />
            <span className="text-sm font-bold leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
              Archive Note
            </span>
          </button>
        )}

        <button
          className="flex w-full items-center gap-2 rounded-lg border border-neutral-300 px-4 py-3 transition-colors duration-300 dark:border-neutral-600"
          onClick={() => setIsDeleteNoteModalOpen(true)}
        >
          <IconDelete
            lightColor="#0E121B"
            darkColor="#FFFFFF"
            width={20}
            height={20}
            theme={currentTheme}
          />
          <span className="text-sm font-bold leading-[1.2] tracking-[-0.2px] text-neutral-950 transition-colors duration-300 dark:text-neutral-0">
            Delete Note
          </span>
        </button>

        {isEdit ? (
          <button
            className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-0 transition-colors duration-300"
            onClick={handleSave}
            disabled={!isEdited}
          >
            {saving ? 'Saving...' : 'Save Note'}
          </button>
        ) : (
          <Link
            className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold leading-[1.2] tracking-[-0.3px] text-neutral-0 transition-colors duration-300"
            href={isArchived ? `/archive/edit/${id}` : `/notes/edit/${id}`}
          >
            Edit Note
          </Link>
        )}
      </div>

      {isDeleteNoteModalOpen && (
        <DeleteNoteModal
          onClose={() => setIsDeleteNoteModalOpen(false)}
          id={id}
          onActionComplete={(success) => {
            if (success) {
              showNotification('Note permanently deleted.', 'success');
              setTimeout(() => router.push('/'), 1500);
            } else {
              showNotification('Failed to delete note', 'error');
            }
          }}
        />
      )}

      {isArchiveNoteModalOpen && (
        <ArchiveNoteModal
          onClose={() => setIsArchiveNoteModalOpen(false)}
          id={id}
          onActionComplete={(success) => {
            if (success) {
              showNotification('Note archived.', 'success');
              setTimeout(() => router.push('/'), 1500);
            } else {
              showNotification('Failed to archive note', 'error');
            }
          }}
        />
      )}

      {isRestoreNoteModalOpen && (
        <RestoreNoteModal
          onClose={() => setIsRestoreNoteModalOpen(false)}
          id={id}
          onActionComplete={(success) => {
            if (success) {
              showNotification('Note restored to active notes.', 'success');
              setTimeout(() => router.push('/'), 1500);
            } else {
              showNotification('Failed to restore note', 'error');
            }
          }}
        />
      )}

      <ToastContainer>
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </ToastContainer>
    </>
  );
};

export default NoteHeaderControl;
