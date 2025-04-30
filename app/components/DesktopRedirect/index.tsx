'use client';
import { getClientNotes } from '@/lib/clientNotes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DesktopRedirectProps {
  isArchived?: boolean;
  tag?: string;
}

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

const DesktopRedirect = ({ isArchived, tag }: DesktopRedirectProps) => {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getClientNotes(isArchived, tag);
      setNotes(fetchedNotes);
    };
    fetchNotes();
  }, [isArchived, tag]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const isDesktop = windowWidth >= 1024;
    if (isDesktop && notes && notes.length > 0) {
      const latestNoteId = notes[0].id;
      const redirectPath = isArchived
        ? `/archive/${latestNoteId}`
        : tag
          ? `/tags/${tag}/${latestNoteId}`
          : `/notes/${latestNoteId}`;
      router.push(redirectPath);
    }
  }, [notes, router, windowWidth, isArchived, tag]);

  return null;
};

export default DesktopRedirect;
