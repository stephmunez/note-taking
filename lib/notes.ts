import { createClient } from '@/utils/supabase/server';

export const getNotes = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError)
      throw new Error(`Authentication error: ${userError.message}`);
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .eq('isArchived', false)
      .order('lastEdited', { ascending: false });

    if (error) throw new Error(`Database error: ${error.message}`);

    return data || [];
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return [];
  }
};
