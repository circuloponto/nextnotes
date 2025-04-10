// Client-side only utilities for handling reminders and notifications
'use client';

// We'll use a simple event system for reminders
let reminderListeners = [];

/**
 * Register a listener for reminder events
 * @param {Function} callback - Function to call when a reminder is triggered
 * @returns {Function} - Function to unregister the listener
 */
export const onReminderTriggered = (callback) => {
  reminderListeners.push(callback);
  
  // Return a function to unregister the listener
  return () => {
    reminderListeners = reminderListeners.filter(cb => cb !== callback);
  };
};

/**
 * Trigger a reminder event
 * @param {Object} note - Note object with title and content
 */
export const triggerReminderEvent = (note) => {
  // Call all registered listeners
  reminderListeners.forEach(callback => {
    try {
      callback(note);
    } catch (error) {
      console.error('Error in reminder listener:', error);
    }
  });
};

/**
 * Request notification permission from the user
 * @returns {Promise<boolean>} Whether permission was granted
 */
export const requestNotificationPermission = async () => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return false;
  }
  
  // Always return true since we're using toast notifications now
  return true;
};

/**
 * Show a notification for a reminder
 * @param {Object} note - Note object with title and content
 */
export const showReminderNotification = (note) => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    // Get note title and content
    const title = note.title || 'Reminder';
    const content = note.content ? stripHtmlTags(note.content).substring(0, 100) : 'You have a reminder for this note';
    
    // Trigger the reminder event
    triggerReminderEvent({
      id: note.id,
      title,
      content,
      url: `/dashboard?note=${note.id}`
    });
    
    // Log notification
    console.log(`Triggered reminder for "${title}"`);
  } catch (error) {
    console.error('Error showing notification:', error);
  }
};

// Helper function to strip HTML tags
const stripHtmlTags = (html) => {
  if (!html) return '';
  if (typeof window === 'undefined') return '';
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  } catch (error) {
    // Fallback method if DOMParser fails
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
};

/**
 * Schedule reminders for all notes
 * @param {Array} notes - Array of note objects
 */
export const scheduleReminders = (notes) => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return;
  }
  
  // Clear any existing scheduled reminders
  clearAllScheduledReminders();
  
  // Filter notes that have reminders
  const notesWithReminders = notes.filter(note => {
    // Check if reminder data is in the note directly or in metadata
    const reminderDate = note.reminderDate || (note.metadata && note.metadata.reminderDate);
    return reminderDate;
  });
  
  console.log('Scheduling reminders for', notesWithReminders.length, 'notes');
  
  // Schedule reminders for each note
  notesWithReminders.forEach(note => {
    // Get reminder data from note or metadata
    const reminderDate = new Date(note.reminderDate || (note.metadata && note.metadata.reminderDate));
    const reminderTime = note.reminderTime || (note.metadata && note.metadata.reminderTime) || '09:00';
    const [hours, minutes] = reminderTime.split(':').map(Number);
    
    reminderDate.setHours(hours, minutes, 0, 0);
    
    // Only schedule if the reminder is in the future
    if (reminderDate > new Date()) {
      const timeUntilReminder = reminderDate.getTime() - Date.now();
      console.log(`Scheduling reminder for "${note.title}" in ${Math.round(timeUntilReminder / (1000 * 60))} minutes`);
      
      // Schedule the reminder
      const timerId = setTimeout(() => {
        showReminderNotification(note);
      }, timeUntilReminder);
      
      // Store the timer ID
      const scheduledReminders = JSON.parse(localStorage.getItem('scheduledReminders') || '{}');
      scheduledReminders[note.id] = timerId;
      localStorage.setItem('scheduledReminders', JSON.stringify(scheduledReminders));
    } else {
      console.log(`Reminder for "${note.title}" is in the past, not scheduling`);
    }
  });
  
  // Also check for reminders that are due soon (within the next 5 minutes)
  // This helps with page refreshes or if the user just opened the app
  const now = new Date();
  const soonReminders = notesWithReminders.filter(note => {
    const reminderDate = new Date(note.reminderDate || (note.metadata && note.metadata.reminderDate));
    const reminderTime = note.reminderTime || (note.metadata && note.metadata.reminderTime) || '09:00';
    const [hours, minutes] = reminderTime.split(':').map(Number);
    
    reminderDate.setHours(hours, minutes, 0, 0);
    
    // Check if reminder is due within the next 5 minutes
    const timeUntilReminder = reminderDate.getTime() - now.getTime();
    return timeUntilReminder > 0 && timeUntilReminder < 5 * 60 * 1000;
  });
  
  if (soonReminders.length > 0) {
    console.log(`Found ${soonReminders.length} reminders due soon`);
    soonReminders.forEach(note => {
      console.log(`Reminder for "${note.title}" is due soon`);
    });
  }
};

/**
 * Clear all scheduled reminders
 */
export const clearAllScheduledReminders = () => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return;
  }
  
  // Get all scheduled reminders
  const scheduledReminders = JSON.parse(localStorage.getItem('scheduledReminders') || '{}');
  
  // Clear each timeout
  Object.values(scheduledReminders).forEach(timerId => {
    clearTimeout(timerId);
  });
  
  // Clear the storage
  localStorage.setItem('scheduledReminders', '{}');
};

/**
 * Check for due notes and return them
 * @param {Array} notes - Array of note objects
 * @returns {Array} Notes that are due today
 */
export const getDueNotes = (notes) => {
  if (!notes || !Array.isArray(notes)) {
    return [];
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return notes.filter(note => {
    if (!note.dueDate) return false;
    
    const dueDate = new Date(note.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate.getTime() === today.getTime();
  });
};

/**
 * Check for upcoming reminders and return them
 * @param {Array} notes - Array of note objects
 * @param {number} daysAhead - Number of days to look ahead
 * @returns {Array} Notes with upcoming reminders
 */
export const getUpcomingReminders = (notes, daysAhead = 7) => {
  if (!notes || !Array.isArray(notes)) {
    return [];
  }
  
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysAhead);
  
  return notes.filter(note => {
    if (!note.reminderDate) return false;
    
    const reminderDate = new Date(note.reminderDate);
    
    return reminderDate >= now && reminderDate <= futureDate;
  });
};
