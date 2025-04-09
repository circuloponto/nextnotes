'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function ViewNote() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      // This is a placeholder - we'll implement with Supabase later
      // Mock data for now based on the id
      const mockNotes = {
        '1': {
          id: '1',
          title: 'Welcome to NextNotes',
          content: 'This is your first note. You can edit or delete it, or create new notes!\n\nNextNotes is a simple app that lets you create, edit, and manage your notes from anywhere.',
          createdAt: new Date().toISOString(),
        },
        '2': {
          id: '2',
          title: 'Meeting Notes',
          content: 'Discussed project timeline and deliverables. Need to follow up with team on design decisions.\n\n- Project kickoff: Next Monday\n- Design review: Following Friday\n- Initial prototype: In two weeks',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        '3': {
          id: '3',
          title: 'Ideas for New Features',
          content: '1. Add tags to notes\n2. Implement dark mode\n3. Add collaboration features\n4. Create mobile app\n\nPriority should be on tags and dark mode first, then we can look at collaboration.',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        }
      };

      setTimeout(() => {
        if (mockNotes[id]) {
          setNote(mockNotes[id]);
        }
        setIsLoading(false);
      }, 1000);
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      try {
        // This is a placeholder - we'll implement with Supabase later
        console.log('Deleting note:', id);
        
        // Simulate successful deletion
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note');
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Note not found</h2>
        <p className="mt-2 text-gray-600">The note you're looking for doesn't exist or has been deleted.</p>
        <div className="mt-6">
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Notes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{note.title}</h1>
          <p className="text-sm text-gray-500 mt-2">
            Created: {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href={`/notes/edit/${note.id}`}>
            <Button variant="outline">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit
              </span>
            </Button>
          </Link>
          <Button 
            variant="danger" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </span>
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 whitespace-pre-wrap">
        {note.content}
      </div>
    </div>
  );
}
