import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;

  try {
    // Parse the request body
    const body = await request.json();

    const supabase = await createClient();

    // Verify user is authenticated and owns the note
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    // First check if the note exists and belongs to the user
    const { data: noteData, error: noteError } = await supabase
      .from('notes')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (noteError || !noteData) {
      return NextResponse.json(
        { error: 'Note not found or not authorized' },
        { status: 404 },
      );
    }

    // Update the note
    const { data, error: updateError } = await supabase
      .from('notes')
      .update(body)
      .eq('id', id)
      .eq('user_id', user.id)
      .select();

    if (updateError) {
      return NextResponse.json(
        { error: `Failed to update note: ${updateError.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: 'Note updated successfully', note: data[0] },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in PATCH handler:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;

  try {
    const supabase = await createClient();

    // Verify user is authenticated and owns the note
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    // First check if the note exists and belongs to the user
    const { data: noteData, error: noteError } = await supabase
      .from('notes')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (noteError || !noteData) {
      return NextResponse.json(
        { error: 'Note not found or not authorized' },
        { status: 404 },
      );
    }

    // Delete the note
    const { error: deleteError } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (deleteError) {
      return NextResponse.json(
        { error: `Failed to delete note: ${deleteError.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: 'Note deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in DELETE handler:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 },
    );
  }
}
