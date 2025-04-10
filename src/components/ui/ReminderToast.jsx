'use client';

import React, { useState } from 'react';

/**
 * ReminderToast component for displaying reminder notifications with an animated button
 */
const ReminderToast = ({ title, onViewNote }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Style similar to the tag styling in the application
  const buttonStyle = {
    marginLeft: '0.5rem',
    padding: '0.25rem 0.75rem',
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    border: 'none',
    cursor: 'pointer',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
      <span className="text-sm font-medium truncate">{`Reminder: ${title}`}</span>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          console.log("View Note button clicked");
          onViewNote();
        }}
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="whitespace-nowrap"
      >
        View Note
      </button>
    </div>
  );
};

export default ReminderToast;
