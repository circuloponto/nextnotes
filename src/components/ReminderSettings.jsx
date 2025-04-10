'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DatePicker } from './ui/DatePicker';
import Button from './ui/Button';
import { getRelativeDate } from './ui/Calendar';

const ReminderSettings = ({ note, onSave }) => {
  const [dueDate, setDueDate] = useState(note?.dueDate ? new Date(note.dueDate) : undefined);
  const [reminderDate, setReminderDate] = useState(note?.reminderDate ? new Date(note.reminderDate) : undefined);
  const [reminderTime, setReminderTime] = useState(note?.reminderTime || '09:00');
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    const originalDueDate = note?.dueDate ? new Date(note.dueDate).toDateString() : undefined;
    const originalReminderDate = note?.reminderDate ? new Date(note.reminderDate).toDateString() : undefined;
    const originalReminderTime = note?.reminderTime || '09:00';

    const currentDueDate = dueDate ? dueDate.toDateString() : undefined;
    const currentReminderDate = reminderDate ? reminderDate.toDateString() : undefined;
    
    setHasChanges(
      originalDueDate !== currentDueDate || 
      originalReminderDate !== currentReminderDate ||
      originalReminderTime !== reminderTime
    );
  }, [dueDate, reminderDate, reminderTime, note]);

  const handleSave = () => {
    onSave({
      dueDate: dueDate ? dueDate.toISOString() : null,
      reminderDate: reminderDate ? reminderDate.toISOString() : null,
      reminderTime: reminderTime
    });
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setDueDate(undefined);
    setReminderDate(undefined);
    setReminderTime('09:00');
  };

  // Animation variants
  const panelVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-2">
        <Button
          variant="ghost"
          size="small"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-sm"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          {isOpen ? 'Hide Reminders & Due Date' : 'Set Reminders & Due Date'}
          {!isOpen && (dueDate || reminderDate) && (
            <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              {dueDate && reminderDate ? '2' : '1'} set
            </span>
          )}
        </Button>
      </div>

      {(dueDate || reminderDate) && !isOpen && (
        <div className="mb-3 text-sm text-muted-foreground">
          {dueDate && (
            <div className="flex items-center gap-1 mb-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 text-primary" 
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
              Due: <span className="font-medium">{getRelativeDate(dueDate)}</span>
            </div>
          )}
          {reminderDate && (
            <div className="flex items-center gap-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 text-primary" 
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
              Reminder: <span className="font-medium">{getRelativeDate(reminderDate)}</span> at {reminderTime}
            </div>
          )}
        </div>
      )}

      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className="overflow-hidden"
      >
        <div className="p-6 bg-card/50 rounded-md border border-border mb-4 max-h-[500px] overflow-y-auto touch-auto pointer-events-auto">
          <div className="mb-6 pb-2">
            <label className="block text-sm font-medium mb-2">Due Date</label>
            <DatePicker 
              date={dueDate} 
              setDate={setDueDate}
              className="w-full"
            />
          </div>
          
          <div className="mb-6 pb-2">
            <label className="block text-sm font-medium mb-2">Reminder Date</label>
            <DatePicker 
              date={reminderDate} 
              setDate={setReminderDate}
              className="w-full"
            />
          </div>
          
          {reminderDate && (
            <div className="mb-6 pb-2">
              <label className="block text-sm font-medium mb-2">Reminder Time</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          )}
          
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              size="small"
              onClick={handleClearAll}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
            <Button 
              variant="default" 
              size="small"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReminderSettings;
