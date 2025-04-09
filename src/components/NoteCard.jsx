'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { scaleAnimation, deleteAnimation } from '@/utils/animations';
import Link from 'next/link';
import Button from './ui/Button';

const NoteCard = ({ note, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const truncatedContent = note.content.length > 150 
    ? note.content.substring(0, 150) + '...' 
    : note.content;
  
  const formattedDate = new Date(note.createdAt).toLocaleDateString();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      try {
        // We'll implement this with Supabase later
        await onDelete(note.id);
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note');
      }
      setIsDeleting(false);
    }
  };

  return (
    <motion.div 
      className="bg-card text-card-foreground border border-border shadow rounded-lg p-6 hover:shadow-md transition-shadow"
      layout
      {...scaleAnimation}
      exit={deleteAnimation.exit}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg">{note.title}</h3>
        <span className="text-sm text-muted-foreground">{formattedDate}</span>
      </div>
      <p className="text-foreground mb-4">{truncatedContent}</p>
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {note.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <Link href={`/notes/${note.id}`}>
          <Button variant="ghost" size="small">
            View
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Link href={`/notes/edit/${note.id}`}>
            <Button variant="outline" size="small">
              Edit
            </Button>
          </Link>
          <Button 
            variant="danger" 
            size="small" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
