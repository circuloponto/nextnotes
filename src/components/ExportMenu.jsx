'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { exportAsPDF, exportAsMarkdown, exportAsText } from '@/utils/exportUtils';

/** @type {React.FC<{ note: any }>} */
const ExportMenu = ({ note }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation variants
  const menuVariants = {
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

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    })
  };

  const handleExport = (type) => {
    if (!note) return;
    
    switch (type) {
      case 'pdf':
        exportAsPDF(note);
        break;
      case 'markdown':
        exportAsMarkdown(note);
        break;
      case 'text':
        exportAsText(note);
        break;
      default:
        break;
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="outline"
        size="small"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1"
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
          />
        </svg>
        Export
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 ml-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-1 w-48 bg-card rounded-md shadow-lg border border-border z-50"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="py-1">
              <motion.button
                className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-primary/10 flex items-center gap-2"
                onClick={() => handleExport('pdf')}
                variants={itemVariants}
                custom={0}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-red-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                  />
                </svg>
                Export as PDF
              </motion.button>
              
              <motion.button
                className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-primary/10 flex items-center gap-2"
                onClick={() => handleExport('markdown')}
                variants={itemVariants}
                custom={1}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-blue-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                  />
                </svg>
                Export as Markdown
              </motion.button>
              
              <motion.button
                className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-primary/10 flex items-center gap-2"
                onClick={() => handleExport('text')}
                variants={itemVariants}
                custom={2}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-gray-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                  />
                </svg>
                Export as Text
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportMenu;
