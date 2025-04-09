'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function EditNote() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          setFormData({
            title: mockNotes[id].title,
            content: mockNotes[id].content
          });
        }
        setIsLoading(false);
      }, 1000);
    };

    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This is a placeholder - we'll implement with Supabase later
      console.log('Updating note:', { id, ...formData });
      
      // Simulate successful note update
      setTimeout(() => {
        router.push(`/notes/${id}`);
      }, 1000);
    } catch (error) {
      console.error('Error updating note:', error);
      setErrors({ form: 'Failed to update note. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link href={`/notes/${id}`} className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Note
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Note</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.form && (
          <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm">
            {errors.form}
          </div>
        )}
        
        <Input
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          required
          error={errors.title}
          placeholder="Enter note title"
        />
        
        <Textarea
          id="content"
          label="Content"
          value={formData.content}
          onChange={handleChange}
          required
          error={errors.content}
          rows={8}
          placeholder="Write your note here..."
        />
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
