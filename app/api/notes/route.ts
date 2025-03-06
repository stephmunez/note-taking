import { createClient } from '@/utils/supabase/server';
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
  const supabase = await createClient();
  const note: Note = await request.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('notes')
    .insert([
      {
        ...note,
        user_id: user?.id,
      },
    ])
    .select()
    .single();

  return NextResponse.json({ data, error });
}
