'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArchiveNoteModal from '../ArchiveNoteModal';
import DeleteNoteModal from '../DeleteNoteModal';
import IconArchive from '../IconArchive';
import IconArrowLeft from '../IconArrowLeft';
import IconDelete from '../IconDelete';
import IconRestore from '../IconRestore';
import RestoreNoteModal from '../RestoreNoteModal';
import { Toast, ToastContainer } from '../Toast';

interface NoteHeaderControlMobileProps {
  id: string;
  isArchived?: boolean;
  isEdit?: boolean;
  tag?: string;
}

const NoteHeaderControlMobile = ({
  id,
  isArchived,
  isEdit,
  tag,
}: NoteHeaderControlMobileProps) => {
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

  const handleGoBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(isArchived ? '/archive' : '/');
    }
  };

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
      <div className="flex w-full items-center justify-between border-b border-solid border-neutral-200 pb-3 transition-colors duration-300 dark:border-neutral-800 md:pb-4 lg:hidden">
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
          {isArchived ? (
            <button onClick={() => setIsRestoreNoteModalOpen(true)}>
              <IconRestore
                darkColor="#CACFD8"
                width={18}
                height={18}
                theme={currentTheme}
              />
            </button>
          ) : (
            <button onClick={() => setIsArchiveNoteModalOpen(true)}>
              <IconArchive
                darkColor="#CACFD8"
                width={18}
                height={18}
                theme={currentTheme}
              />
            </button>
          )}

          {isEdit ? (
            <button
              className="text-sm leading-[1.3] tracking-[-0.2px] text-blue-500 transition-colors duration-300 disabled:text-blue-500/70"
              onClick={handleSave}
              disabled={!isEdited}
            >
              {saving ? 'Saving...' : 'Save Note'}
            </button>
          ) : (
            <Link
              className="text-sm leading-[1.3] tracking-[-0.2px] text-blue-500"
              href={
                isArchived
                  ? `/archive/edit/${id}`
                  : tag
                    ? `/tags/${tag}/edit/${id}`
                    : `/notes/edit/${id}`
              }
            >
              Edit Note
            </Link>
          )}
        </div>
      </div>

      {isDeleteNoteModalOpen && (
        <DeleteNoteModal
          onClose={() => setIsDeleteNoteModalOpen(false)}
          id={id}
          onActionComplete={(success) => {
            if (success) {
              showNotification('Note permanently deleted.', 'success');
              setTimeout(() => router.replace('/'), 1500);
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

export default NoteHeaderControlMobile;
