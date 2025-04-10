'use client';

import { useState, useEffect } from 'react';
import { Calendar } from './ui/Calendar';
import { format, isSameDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CalendarView = ({ notes }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notesOnSelectedDate, setNotesOnSelectedDate] = useState([]);
  const [noteDates, setNoteDates] = useState([]);

  // Extract all dates that have notes with due dates or reminders
  useEffect(() => {
    if (!notes) return;
    
    const dates = notes.reduce((acc, note) => {
      if (note.dueDate) {
        acc.push(new Date(note.dueDate));
      }
      if (note.reminderDate) {
        acc.push(new Date(note.reminderDate));
      }
      return acc;
    }, []);
    
    setNoteDates(dates);
  }, [notes]);

  // Filter notes for the selected date
  useEffect(() => {
    if (!notes || !selectedDate) return;
    
    const filteredNotes = notes.filter(note => {
      const hasDueDate = note.dueDate && isSameDay(new Date(note.dueDate), selectedDate);
      const hasReminderDate = note.reminderDate && isSameDay(new Date(note.reminderDate), selectedDate);
      return hasDueDate || hasReminderDate;
    });
    
    setNotesOnSelectedDate(filteredNotes);
  }, [selectedDate, notes]);

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow-sm border border-border">
      <h2 className="text-xl font-semibold mb-4">Calendar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="md:col-span-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasNote: (date) => 
                noteDates.some(noteDate => isSameDay(noteDate, date))
            }}
            modifiersClassNames={{
              hasNote: "bg-primary/20 font-medium text-primary"
            }}
          />
        </div>
        
        <div className="md:col-span-3">
          <div className="p-4 bg-background rounded-md border border-border h-full">
            <h3 className="font-medium mb-3">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            
            {notesOnSelectedDate.length === 0 ? (
              <p className="text-muted-foreground text-sm">No notes scheduled for this date</p>
            ) : (
              <motion.ul 
                className="space-y-2"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {notesOnSelectedDate.map((note) => (
                    <motion.li 
                      key={note.id}
                      variants={itemVariants}
                      className="p-3 bg-card/50 rounded-md border border-border hover:border-primary/50 transition-colors"
                    >
                      <Link href={`/dashboard?noteId=${note.id}`} className="block">
                        <h4 className="font-medium text-sm line-clamp-1">{note.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {note.dueDate && isSameDay(new Date(note.dueDate), selectedDate) && (
                            <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full flex items-center gap-1">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-3 w-3" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                />
                              </svg>
                              Due Today
                            </span>
                          )}
                          {note.reminderDate && isSameDay(new Date(note.reminderDate), selectedDate) && (
                            <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-full flex items-center gap-1">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-3 w-3" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                                />
                              </svg>
                              Reminder at {note.reminderTime || '09:00'}
                            </span>
                          )}
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
