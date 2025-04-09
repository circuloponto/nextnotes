'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import RichTextEditor from '@/components/RichTextEditor';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fadeIn, 
  slideUp, 
  slideFromLeft, 
  slideFromRight, 
  staggerContainer, 
  listItem,
  mobileViewTransition
} from '@/utils/animations';
import { getNotes, createNote, updateNote, deleteNote } from '@/services/notes';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/services/auth';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [currentSelectedNote, setCurrentSelectedNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', tags: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mobileView, setMobileView] = useState('list'); // 'list' or 'editor'
  const [user, setUser] = useState(null);
  const textareaRef = useRef(null);
  const titleRef = useRef(null);
  const router = useRouter();

  // Check if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false);

  // Helper function to strip HTML tags for display in note list
  const stripHtmlTags = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  // Add event listener for window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Check authentication and fetch notes
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const { user: currentUser, error } = await getCurrentUser();
        
        if (error || !currentUser) {
          // Redirect to login if not authenticated
          router.push('/login');
          return;
        }
        
        setUser(currentUser);
        
        // Fetch notes from Supabase
        const { notes: userNotes, error: notesError } = await getNotes();
        
        if (notesError) {
          console.error('Error fetching notes:', notesError);
          return;
        }
        
        setNotes(userNotes || []);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const handleSelectNote = (note) => {
    setCurrentSelectedNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      tags: note.tags || []
    });
    
    // On mobile, switch to editor view when a note is selected
    if (isMobile) {
      setMobileView('editor');
    }
  };

  const handleNewNote = async () => {
    try {
      const newNote = {
        title: 'Untitled Note',
        content: '',
        tags: [],
      };
      
      // Create note in Supabase
      const { note: createdNote, error } = await createNote(newNote);
      
      if (error) {
        console.error('Error creating note:', error);
        return;
      }
      
      // Add the new note to the state
      const updatedNotes = [createdNote, ...notes];
      setNotes(updatedNotes);
      setCurrentSelectedNote(createdNote);
      setFormData({
        title: createdNote.title,
        content: createdNote.content,
        tags: createdNote.tags || []
      });
      
      // Focus on title input
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.focus();
        }
      }, 0);
      
      // On mobile, switch to editor view when creating a new note
      if (isMobile) {
        setMobileView('editor');
      }
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        // Delete note from Supabase
        const { error } = await deleteNote(id);
        
        if (error) {
          console.error('Error deleting note:', error);
          return;
        }
        
        // Update local state
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        
        if (currentSelectedNote && currentSelectedNote.id === id) {
          setCurrentSelectedNote(updatedNotes[0] || null);
          if (updatedNotes[0]) {
            setFormData({
              title: updatedNotes[0].title,
              content: updatedNotes[0].content,
              tags: updatedNotes[0].tags || []
            });
          } else {
            setFormData({ title: '', content: '', tags: [] });
          }
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const saveChanges = useCallback(
    debounce(async () => {
      if (!currentSelectedNote) return;
      
      try {
        // Create the updated note object
        const updatedNote = {
          title: formData.title,
          content: formData.content,
          tags: formData.tags,
        };
        
        // Update note in Supabase
        const { note: savedNote, error } = await updateNote(currentSelectedNote.id, updatedNote);
        
        if (error) {
          console.error('Error updating note:', error);
          return;
        }
        
        // Update the notes array with the new note content
        setNotes(prevNotes => 
          prevNotes.map(note => 
            note.id === currentSelectedNote.id ? { ...note, ...updatedNote } : note
          )
        );
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    }, 500),
    [currentSelectedNote, formData]
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!tagInput.trim()) return;
    
    // Don't add duplicate tags
    if (formData.tags.includes(tagInput.trim())) {
      setTagInput('');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()]
    }));
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  useEffect(() => {
    if (currentSelectedNote) {
      saveChanges();
    }
  }, [formData, saveChanges]);

  return (
    <motion.div 
      className="flex flex-col md:flex-row h-[calc(100vh-130px)] bg-background rounded-lg shadow-sm overflow-hidden border border-border"
      {...fadeIn}
    >
      {/* Mobile navigation buttons */}
      {isMobile && (
        <motion.div 
          className="flex border-b border-border"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button 
            className={`flex-1 py-3 text-center font-medium ${mobileView === 'list' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setMobileView('list')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Notes List
            </motion.span>
          </motion.button>
          <motion.button 
            className={`flex-1 py-3 text-center font-medium ${mobileView === 'editor' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setMobileView('editor')}
            disabled={!currentSelectedNote}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Editor
            </motion.span>
          </motion.button>
        </motion.div>
      )}
      
      {/* Left sidebar - Notes list */}
      <AnimatePresence mode="wait">
        {(!isMobile || mobileView === 'list') && (
          <motion.div 
            key="notes-list"
            className={`${isMobile ? 'w-full' : 'w-full md:w-1/3'} border-r border-border flex flex-col`}
            {...(isMobile ? mobileViewTransition : slideFromLeft)}
            layout
          >
            <div className="p-4 border-b border-border">
              <div className="flex justify-between items-center mb-4">
                <motion.h1 
                  className="text-xl font-bold text-foreground"
                  {...slideUp}
                >
                  Notes
                </motion.h1>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleNewNote} size="small">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </motion.div>
              </div>
              
              <motion.div className="relative" {...fadeIn}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-input rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary text-sm bg-background text-foreground"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <motion.div 
                    className="rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                </div>
              ) : filteredNotes.length > 0 ? (
                <motion.ul 
                  className="divide-y divide-border"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <AnimatePresence>
                    {filteredNotes.map(note => (
                      <motion.li 
                        key={note.id}
                        className={`p-4 cursor-pointer hover:bg-secondary/50 ${
                          currentSelectedNote && currentSelectedNote.id === note.id ? 'bg-primary/10' : ''
                        }`}
                        onClick={() => handleSelectNote(note)}
                        variants={listItem}
                        layout
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="text-md font-medium text-foreground truncate">{note.title}</h3>
                        <p className="text-sm text-muted-foreground truncate mt-1">{stripHtmlTags(note.content)}</p>
                        {note.tags && note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {note.tags.map(tag => (
                              <motion.span 
                                key={tag} 
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground border border-primary/20 shadow-sm"
                                whileHover={{ scale: 1.05 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(note.created_at).toLocaleDateString()}
                        </p>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              ) : (
                <motion.div 
                  className="text-center py-8"
                  {...fadeIn}
                >
                  <p className="text-muted-foreground">
                    {searchQuery ? `No notes match "${searchQuery}"` : "No notes yet"}
                  </p>
                  {!searchQuery && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={handleNewNote} className="mt-4">
                        Create your first note
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side - Note editor */}
      <AnimatePresence mode="wait">
        {(!isMobile || mobileView === 'editor') && (
          <motion.div 
            key="note-editor"
            className={`${isMobile ? 'w-full' : 'w-full md:w-2/3'} flex flex-col`}
            initial={isMobile ? { x: 50, opacity: 0 } : { opacity: 0 }}
            animate={isMobile ? { x: 0, opacity: 1 } : { opacity: 1 }}
            exit={isMobile ? { x: 50, opacity: 0 } : { opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
            layout
          >
            {currentSelectedNote ? (
              <>
                <motion.div 
                  className="p-4 border-b border-border flex justify-between items-center"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="flex-1 mr-4">
                    <motion.input
                      id="title"
                      ref={titleRef}
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xl font-bold border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <div className="flex space-x-2">
                    {isMobile && (
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Button 
                          variant="outline" 
                          onClick={() => setMobileView('list')}
                        >
                          Back
                        </Button>
                      </motion.div>
                    )}
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button 
                        variant="danger" 
                        onClick={() => handleDeleteNote(currentSelectedNote.id)}
                      >
                        Delete
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div 
                  className="p-4 flex-1 overflow-y-auto flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <motion.div 
                    className="mb-4" 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <form onSubmit={handleAddTag} className="flex space-x-2">
                      <motion.input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag..."
                        className="flex-1 px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-background text-foreground"
                        whileFocus={{ scale: 1.01, borderColor: 'var(--primary)' }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button type="submit" size="small">Add</Button>
                      </motion.div>
                    </form>
                    <AnimatePresence>
                      {formData.tags && formData.tags.length > 0 && (
                        <motion.div 
                          className="flex flex-wrap gap-2 mt-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {formData.tags.map((tag, index) => (
                            <motion.span 
                              key={tag} 
                              className="inline-flex items-center px-2.5 py-1 rounded text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground border border-primary/20 shadow-sm"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              whileHover={{ 
                                scale: 1.05, 
                                backgroundColor: 'var(--primary-20)'
                              }}
                            >
                              {tag}
                              <motion.button
                                type="button"
                                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary/20"
                                onClick={() => handleRemoveTag(tag)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                              </motion.button>
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <RichTextEditor
                    content={formData.content}
                    onChange={handleChange}
                    rows={isMobile ? 15 : 20}
                    isMobile={isMobile}
                  />
                </motion.div>
              </>
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center h-full text-muted-foreground"
                {...fadeIn}
              >
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </motion.svg>
                <motion.p 
                  className="text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Select a note or create a new one
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={handleNewNote} className="mt-4">
                    Create New Note
                  </Button>
                </motion.div>
                {isMobile && currentSelectedNote && (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => setMobileView('list')}
                      className="mt-2"
                    >
                      Back to Notes
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
