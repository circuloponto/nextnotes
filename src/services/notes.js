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
    
    // Create note object without reminder fields to avoid schema errors
    const noteData = {
      user_id: user.id,
      title: note.title,
      content: note.content,
      tags: note.tags || []
    };
    
    const { data, error } = await supabase
      .from('notes')
      .insert([noteData])
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

/**
 * Update reminder and due date for a note
 * @param {string} id - Note ID
 * @param {Object} reminderData - Object with dueDate, reminderDate, and reminderTime
 * @returns {Promise} - Promise with the updated note data or error
 */
export const updateNoteReminders = async (id, reminderData) => {
  try {
    // First check if the columns exist by getting the current note
    const { data: currentNote, error: fetchError } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Store reminder data in a temporary field until schema is updated
    const updatedNote = {
      ...currentNote,
      metadata: {
        ...(currentNote.metadata || {}),
        dueDate: reminderData.dueDate,
        reminderDate: reminderData.reminderDate,
        reminderTime: reminderData.reminderTime || '09:00'
      }
    };
    
    // Update the note with the metadata field
    const { data, error } = await supabase
      .from('notes')
      .update({
        metadata: updatedNote.metadata
      })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    // Add the reminder fields to the returned object for the UI
    const noteWithReminders = {
      ...data[0],
      dueDate: reminderData.dueDate,
      reminderDate: reminderData.reminderDate,
      reminderTime: reminderData.reminderTime || '09:00'
    };
    
    return { note: noteWithReminders, error: null };
  } catch (error) {
    console.error('Error updating note reminders:', error.message);
    return { note: null, error };
  }
};

/**
 * Get notes with due dates or reminders
 * @returns {Promise} - Promise with the notes data or error
 */
export const getNotesWithReminders = async () => {
  try {
    // Since we don't have the columns yet, we'll get all notes and filter in memory
    const { data: notes, error } = await supabase
      .from('notes')
      .select('*');
    
    if (error) throw error;
    
    // Filter notes that have reminder data in metadata
    const notesWithReminders = notes.filter(note => {
      const metadata = note.metadata || {};
      return metadata.dueDate || metadata.reminderDate;
    }).map(note => {
      // Add reminder fields directly to the note object for the UI
      const metadata = note.metadata || {};
      return {
        ...note,
        dueDate: metadata.dueDate || null,
        reminderDate: metadata.reminderDate || null,
        reminderTime: metadata.reminderTime || '09:00'
      };
    });
    
    // Sort by due date
    notesWithReminders.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    
    return { notes: notesWithReminders, error: null };
  } catch (error) {
    console.error('Error fetching notes with reminders:', error.message);
    return { notes: [], error };
  }
};

/**
 * Get notes due today
 * @returns {Promise} - Promise with the notes data or error
 */
export const getNotesDueToday = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    
    // Get all notes since we can't filter by dueDate directly
    const { data: notes, error } = await supabase
      .from('notes')
      .select('*');
    
    if (error) throw error;
    
    // Filter notes that are due today based on metadata
    const dueToday = notes.filter(note => {
      const metadata = note.metadata || {};
      if (!metadata.dueDate) return false;
      
      const dueDate = new Date(metadata.dueDate);
      return dueDate.toISOString().split('T')[0] === todayStr;
    }).map(note => {
      // Add reminder fields directly to the note object for the UI
      const metadata = note.metadata || {};
      return {
        ...note,
        dueDate: metadata.dueDate || null,
        reminderDate: metadata.reminderDate || null,
        reminderTime: metadata.reminderTime || '09:00'
      };
    });
    
    return { notes: dueToday, error: null };
  } catch (error) {
    console.error('Error fetching notes due today:', error.message);
    return { notes: [], error };
  }
};
