'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import IconArrowLeft from '../IconArrowLeft';
import IconClock from '../IconClock';
import IconTag from '../IconTag';

const CreateNewNote = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleGoBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newNote = {
        title,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        content,
        isArchived: false,
        lastEdited: new Date().toISOString(),
      };

      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to create note');
      }

      router.push('/');

      // Optionally, redirect or update UI after success
    } catch (error) {
      console.error(error);
    }
  };

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
          <button
            onClick={handleGoBack}
            className="text-sm font-normal leading-[1.3] tracking-[-0.2px] text-neutral-600 transition-colors duration-300 dark:text-neutral-300"
          >
            Cancel
          </button>
          <button
            className="text-sm font-normal leading-[1.3] tracking-[-0.2px] text-blue-500 transition-colors duration-300"
            type="submit"
            form="create-note"
          >
            Save Note
          </button>
        </div>
      </div>

      <form
        className="flex w-full flex-col gap-3"
        id="create-note"
        onSubmit={handleCreateNote}
      >
        <input
          type="text"
          id="title"
          name="title"
          className="bg-transparent text-2xl font-bold leading-[1.2] tracking-[-0.5px] text-neutral-950 transition-colors duration-300 placeholder:text-neutral-950 placeholder:opacity-100 focus:outline-none dark:text-white dark:placeholder:text-neutral-0"
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex w-full flex-col gap-1 border-b border-solid border-neutral-200 pb-3 transition-colors duration-300 dark:border-neutral-800">
          <div className="flex items-center gap-2">
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
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onBlur={() => {
                setTags(
                  tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag)
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

            <span className="text-sm leading-[1.2] tracking-[-0.2px] text-neutral-400 transition-colors duration-300 dark:text-neutral-300">
              Not yet saved
            </span>
          </div>
        </div>

        <textarea
          name="content"
          id="content"
          className="h-44 w-full resize-none bg-transparent text-sm leading-[1.2] tracking-[-0.2px] text-neutral-700 transition-colors duration-300 focus:outline-none dark:text-neutral-300"
          placeholder="Start typing your note here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </>
  );
};

export default CreateNewNote;
