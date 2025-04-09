import { supabase } from './supabase';

/**
 * Get all notes for the current user
 * @returns {Promise} - Promise with the notes data or error
 */
export const getNotes = async () => {
  try {
    const { data: notes, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { notes, error: null };
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    return { notes: [], error };
  }
};

/**
 * Create a new note
 * @param {Object} note - Note object with title, content, and tags
 * @returns {Promise} - Promise with the created note data or error
 */
export const createNote = async (note) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          user_id: user.id,
          title: note.title,
          content: note.content,
          tags: note.tags
        }
      ])
      .select();
    
    if (error) throw error;
    return { note: data[0], error: null };
  } catch (error) {
    console.error('Error creating note:', error.message);
    return { note: null, error };
  }
};

/**
 * Update an existing note
 * @param {string} id - Note ID
 * @param {Object} updates - Object with fields to update
 * @returns {Promise} - Promise with the updated note data or error
 */
export const updateNote = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return { note: data[0], error: null };
  } catch (error) {
    console.error('Error updating note:', error.message);
    return { note: null, error };
  }
};

/**
 * Delete a note
 * @param {string} id - Note ID
 * @returns {Promise} - Promise with the deletion result or error
 */
export const deleteNote = async (id) => {
  try {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting note:', error.message);
    return { error };
  }
};
