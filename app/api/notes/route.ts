import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

export async function GET() {
  const res = await fetch('http://localhost:4000/notes');
  const notes: Note[] = await res.json();

  return NextResponse.json(notes, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const note: Note = await request.json();

  const res = await fetch('http://localhost:4000/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });

  const newNote: Note = await res.json();

  return NextResponse.json(newNote, {
    status: 201,
  });
}
