'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar, formatDate } from './Calendar';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export function DatePicker({ date, setDate, className }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef(null);

  // Close the calendar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation variants
  const calendarVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      <Button
        variant="outline"
        size="small"
        className={`w-full justify-start text-left font-normal ${!date ? 'text-muted-foreground' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
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
        {date ? format(date, 'PPP') : 'Pick a date'}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full mt-2 z-50 bg-card rounded-md shadow-lg border border-border max-h-[350px] overflow-y-auto"
            variants={calendarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setIsOpen(false);
              }}
              initialFocus
              fromDate={new Date()}
            />
            {date && (
              <div className="p-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="small"
                  className="text-destructive hover:text-destructive"
                  onClick={() => {
                    setDate(undefined);
                    setIsOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove date
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
