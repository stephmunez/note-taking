import { createClient } from '@/utils/supabase/server';

export const getNotes = async (tag?: string, isArchived?: boolean) => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError)
      throw new Error(`Authentication error: ${userError.message}`);
    if (!user) throw new Error('User not authenticated');

    let query = supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('lastEdited', { ascending: false });

    // Set isArchived filter based on parameter
    if (isArchived !== undefined) {
      query = query.eq('isArchived', isArchived);
    } else {
      // Default behavior: show non-archived notes
      query = query.eq('isArchived', false);
    }

    // Only apply the tag filter if a tag is provided
    if (tag) {
      query = query.contains('tags', [
        tag.charAt(0).toUpperCase() + tag.slice(1),
      ]);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Database error: ${error.message}`);
    return data || [];
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return [];
  }
};
