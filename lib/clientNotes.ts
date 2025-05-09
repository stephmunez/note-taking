// lib/clientNotes.ts
import { createClient } from '@/utils/supabase/client';

export interface Note {
  id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
  user_id: string;
}

export async function getClientNotes(
  isArchived?: boolean,
  tag?: string,
): Promise<Note[]> {
  try {
    const supabase = createClient();

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error(`Authentication error: ${userError.message}`);
      return [];
    }

    if (!user) {
      console.error('User not authenticated');
      return [];
    }

    let query = supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('lastEdited', { ascending: false });

    if (isArchived !== undefined) {
      query = query.eq('isArchived', isArchived);
    } else {
      // Default behavior: show non-archived notes
      query = query.eq('isArchived', false);
    }

    if (tag) {
      query = query.contains('tags', [
        tag.charAt(0).toUpperCase() + tag.slice(1),
      ]);
    }

    // Fetch notes for the authenticated user

    const { data, error } = await query;

    if (error) {
      console.error(`Database error: ${error.message}`);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return [];
  }
}

export async function getClientNote(id: string): Promise<Note | null> {
  try {
    const supabase = createClient();

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error(`Authentication error: ${userError.message}`);
      return null;
    }

    if (!user) {
      console.error('User not authenticated');
      return null;
    }

    // Fetch the note for the authenticated user
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Database error: ${error.message}`);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Failed to fetch note:', error);
    return null;
  }
}
