'use client';

import { getClientNote } from '@/lib/clientNotes';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconClock from '../IconClock';
import IconTag from '../IconTag';
import { Toast, ToastContainer } from '../Toast';

interface EditNoteProps {
  id: string;
  isArchive?: boolean;
}

const EditNote = ({ id, isArchive }: EditNoteProps) => {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const [note, setNote] = useState<{
    title: string;
    content: string;
    tags: string[];
    lastEdited: string;
    isArchived: boolean;
  } | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [initialTags, setInitialTags] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    checkIfEdited(newTitle, content, tags);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    checkIfEdited(title, newContent, tags);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTags = e.target.value;
    setTags(newTags);
    checkIfEdited(title, content, newTags);
  };

  const checkIfEdited = (
    newTitle: string,
    newContent: string,
    newTags: string,
  ) => {
    setIsEdited(
      newTitle !== initialTitle ||
        newContent !== initialContent ||
        newTags !== initialTags,
    );
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const data = await getClientNote(id);
        if (data) {
          setNote(data);
          setTitle(data.title);
          setContent(data.content.replace(/\\n/g, '\n'));
          setTags(data.tags.join(', '));
        }
      } catch (err) {
        setError('Failed to fetch note');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  useEffect(() => {
    const handleEditNote = async (
      e: Event | React.FormEvent<HTMLFormElement>,
    ) => {
      e.preventDefault();

      const updatedNote = {
        title,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        content,
        isArchived: note?.isArchived ?? false,
        lastEdited: new Date().toISOString(),
      };

      try {
        const res = await fetch(`/api/notes/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        });

        if (res.ok) {
          if (isArchive) {
            showNotification('Note saved successfully!', 'success');
            setTimeout(() => router.push(`/archive/${id}`), 1500);
          } else {
            showNotification('Note saved successfully!', 'success');
            setTimeout(() => router.push(`/notes/${id}`), 1500);
          }
        } else {
          showNotification('Failed to edit note', 'error');
          console.error('Update failed');
        }
      } catch (error) {
        console.error('Error updating note:', error);
      }
    };

    window.addEventListener('save-note', handleEditNote);

    return () => {
      window.removeEventListener('save-note', handleEditNote);
    };
  }, [id, title, content, tags, router, isArchive, note?.isArchived]);

  useEffect(() => {
    if (note) {
      setInitialTitle(note.title);
      setInitialContent(note.content);
      setInitialTags(note.tags.join(', '));
    }
  }, [note]);

  useEffect(() => {
    if (isEdited) {
      const handler = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('note-edited'));
      }, 300);

      return () => clearTimeout(handler);
    } else {
      const handler = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('note-not-edited'));
      }, 300);

      return () => clearTimeout(handler);
    }
  }, [isEdited]);

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
  const formattedDate = note
    ? new Date(note.lastEdited).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  if (loading) {
    return (
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        Loading note...
      </p>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!note) {
    return <p className="text-sm text-red-500">Note not found</p>;
  }

  return (
    <>
      <form className="flex h-full w-full flex-col gap-3" id="create-note">
        <textarea
          id="title"
          name="title"
          className="bg-transparent text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 placeholder:text-neutral-950 placeholder:opacity-100 focus:outline-none dark:text-white dark:placeholder:text-neutral-0"
          placeholder="Enter a title..."
          value={title}
          onChange={handleTitleChange}
        />

        <div className="flex w-full flex-col gap-1 border-b border-solid border-neutral-200 pb-3 transition-colors duration-300 dark:border-neutral-800">
          <div className="flex items-start gap-2">
            <div className="flex w-1/3 items-center gap-[0.375rem]">
              <IconTag
                darkColor="#CACFD8"
                lightColor="#2B303B"
                width={18}
                height={18}
                theme={currentTheme}
              />
              <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
                Tags
              </span>
            </div>

            <textarea
              rows={2}
              id="tags"
              name="tags"
              className="w-[64%] resize-none bg-transparent text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 placeholder:text-neutral-400 focus:outline-none dark:text-neutral-300"
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              onChange={handleTagsChange}
              value={tags}
              onBlur={() => {
                setTags(
                  tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag)
                    .map(
                      (tag) =>
                        tag.charAt(0).toUpperCase() +
                        tag.slice(1).toLowerCase(),
                    )
                    .join(', '),
                );
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex w-1/3 items-center gap-[0.375rem]">
              <IconClock
                darkColor="#CACFD8"
                lightColor="#2B303B"
                width={18}
                height={18}
                theme={currentTheme}
              />
              <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
                Last edited
              </span>
            </div>

            <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 dark:text-neutral-300">
              {formattedDate}
            </span>
          </div>
        </div>

        <textarea
          name="content"
          id="content"
          rows={28}
          className="w-full flex-1 resize-none bg-transparent text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 focus:outline-none dark:text-neutral-300"
          placeholder="Start typing your note here…"
          value={content}
          onChange={handleContentChange}
        />
      </form>

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

export default EditNote;
