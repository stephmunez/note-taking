import { NextResponse } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: Params) {
  const { id } = params;

  const res = await fetch(`http://localhost:4000/notes/${id}`);
  const note = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: 'Cannot find note' }, { status: 404 });
  }

  return NextResponse.json(note, { status: 200 });
}
