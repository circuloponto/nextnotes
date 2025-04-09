import { supabase } from './supabase';

/**
 * Sign up a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} name - User's full name
 * @returns {Promise} - Promise with the user data or error
 */
export const signUp = async (email, password, name) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing up:', error.message);
    return { data: null, error };
  }
};

/**
 * Sign in a user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise with the user data or error
 */
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error.message);
    return { data: null, error };
  }
};

/**
 * Sign out the current user
 * @returns {Promise} - Promise with the sign out result or error
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error.message);
    return { error };
  }
};

/**
 * Get the current user session
 * @returns {Promise} - Promise with the session data or null
 */
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session: data.session, error: null };
  } catch (error) {
    console.error('Error getting session:', error.message);
    return { session: null, error };
  }
};

/**
 * Get the current user
 * @returns {Promise} - Promise with the user data or null
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error getting user:', error.message);
    return { user: null, error };
  }
};

/**
 * Reset password
 * @param {string} email - User's email
 * @returns {Promise} - Promise with the reset result or error
 */
export const resetPassword = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error resetting password:', error.message);
    return { data: null, error };
  }
};
