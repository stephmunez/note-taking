import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await fetch('http://localhost:4000/notes');

  const notes = await res.json();

  return NextResponse.json(notes, {
    status: 200,
  });
}
