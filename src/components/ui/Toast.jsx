'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer = ({ children }) => {
  return (
    <div className="fixed top-4 right-4 left-4 md:left-auto z-50 flex flex-col gap-2 max-w-full md:max-w-md">
      {children}
    </div>
  );
};

export const Toast = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  action
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timer;
    if (duration !== Infinity) {
      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose && onClose();
        }, 300);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Determine icon and color based on type
  let icon;
  let bgColor;
  
  switch (type) {
    case 'success':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
      bgColor = `bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100`;
      break;
    case 'error':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
      bgColor = `bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100`;
      break;
    case 'warning':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
      bgColor = `bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100`;
      break;
    case 'reminder':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
      bgColor = isDarkMode 
        ? 'bg-black text-primary-foreground' 
        : 'bg-white text-primary';
      break;
    case 'info':
    default:
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
      bgColor = `bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100`;
  }
  
  // Prepare the border style based on dark mode and duration
  const borderStyle = duration === Infinity 
    ? isDarkMode 
      ? 'border-2 border-white shadow-xl' 
      : 'border-2 border-black shadow-xl'
    : '';
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`flex items-center p-4 rounded-md shadow-md ${bgColor} min-w-[300px] max-w-md ${borderStyle}`}
          style={type === 'reminder' && isDarkMode ? { backgroundColor: 'black' } : {}}
        >
          <div className="flex-shrink-0 mr-3">
            {icon}
          </div>
          <div className="flex-1">
            {typeof message === 'string' 
              ? <p className="text-sm font-medium">{message}</p>
              : message
            }
          </div>
          {action && (
            <div className="ml-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Action button clicked", action);
                  action.onClick();
                }}
                className="text-sm font-medium underline focus:outline-none"
              >
                {action.label}
              </button>
            </div>
          )}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                onClose && onClose();
              }, 300);
            }}
            className="ml-3 flex-shrink-0 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
