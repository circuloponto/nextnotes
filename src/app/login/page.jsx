'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { signIn } from '@/services/auth';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    
    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Sign in with Supabase
      const { data, error } = await signIn(formData.email, formData.password);
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        // Navigate to dashboard on success
        router.push('/dashboard');
      } else {
        throw new Error('No user data received');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ form: error.message || 'Failed to login. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 bg-background">
      <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-xl shadow-md text-card-foreground">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground">Sign in to your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Or{' '}
            <Link href="/signup" className="font-medium text-primary hover:text-primary/90">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.form && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {errors.form}
            </div>
          )}
          
          <div className="space-y-4">
            <Input
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />
            
            <Input
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={errors.password}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-input rounded bg-background"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                Remember me
              </label>
            </div>
            
            <Link href="/reset-password" className="text-sm font-medium text-primary hover:text-primary/90">
              Forgot your password?
            </Link>
          </div>
          
          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              variant="primary"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
