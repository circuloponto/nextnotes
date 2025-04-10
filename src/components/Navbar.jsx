'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/services/supabase';
import { useRouter } from 'next/navigation';

// Custom NavLink component with hover animation
const NavLink = ({ href, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={href} 
      className="relative px-3 py-2 inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-6 overflow-hidden flex items-center">
        {/* Static text */}
        <motion.span 
          style={{ color: 'var(--color-text)' }} 
          className="block font-semibold"
          animate={{ 
            y: isHovered ? -30 : 0,
            opacity: isHovered ? 0 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
        
        {/* Hover text */}
        <motion.span 
          style={{ color: 'var(--color-highlight)' }} 
          className="absolute inset-0 block font-semibold"
          initial={{ y: 30, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 30,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      </div>
    </Link>
  );
};

// Custom MobileNavLink component with hover animation
const MobileNavLink = ({ href, text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={href} 
      className="relative block px-3 py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-6 overflow-hidden flex items-center">
        {/* Static text */}
        <motion.span 
          className="block text-base font-semibold text-gray-800 dark:text-white"
          animate={{ 
            y: isHovered ? -30 : 0,
            opacity: isHovered ? 0 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
        
        {/* Hover text */}
        <motion.span 
          className="absolute inset-0 block text-base font-semibold text-blue-600 dark:text-blue-300"
          initial={{ y: 30, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 30,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      </div>
    </Link>
  );
};

// Custom MobileNavButton component with hover animation (for buttons that aren't links)
const MobileNavButton = ({ text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button 
      className="relative block w-full text-left px-3 py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-6 overflow-hidden flex items-center">
        {/* Static text */}
        <motion.span 
          className="block text-base font-semibold text-gray-800 dark:text-white"
          animate={{ 
            y: isHovered ? -30 : 0,
            opacity: isHovered ? 0 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
        
        {/* Hover text */}
        <motion.span 
          className="absolute inset-0 block text-base font-semibold text-blue-600 dark:text-blue-300"
          initial={{ y: 30, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 30,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      </div>
    </button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Only run client-side
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // First, get the session directly from Supabase
        const { data: sessionData } = await supabase.auth.getSession();
        
        // If we have a session, get the user
        if (sessionData?.session) {
          const { data } = await supabase.auth.getUser();
          console.log('User found in Navbar:', data.user);
          setUser(data.user);
        } else {
          console.log('No session found in Navbar');
          setUser(null);
        }
      } catch (error) {
        console.error('Error in Navbar auth:', error);
        setUser(null);
      } finally {
        setMounted(true);
      }
    };
    
    fetchUser();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      if (event === 'SIGNED_IN') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    // Clean up the listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Mobile menu animation variants
  const menuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Mobile menu item variants
  const menuItemVariants = {
    hidden: { 
      opacity: 0,
      y: -5,
    },
    visible: (i) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    exit: { 
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Prevent hydration errors by not rendering user-specific content until client-side
  if (!mounted) {
    return (
      <nav className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                NextNotes
              </Link>
            </div>
            <div className="flex items-center">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              NextNotes
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex sm:items-center">
            {user ? (
              <>
                {user.email && (
                  <span className="ml-4 text-muted-foreground">
                    {user.email}
                  </span>
                )}
                <Button 
                  variant="outline" 
                  className="ml-4"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
                <div className="ml-4">
                  <ThemeToggle />
                </div>
              </>
            ) : (
              <>
                <NavLink href="/login" text="Login" />
                <Link href="/signup" className="ml-4">
                  <Button>Sign Up</Button>
                </Link>
                <div className="ml-4">
                  <ThemeToggle />
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <ThemeToggle />
            <motion.button
              type="button"
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="sm:hidden overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className="pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  {user.email && (
                    <motion.div
                      custom={0}
                      variants={menuItemVariants}
                      className="px-3 py-2 text-sm text-muted-foreground"
                    >
                      {user.email}
                    </motion.div>
                  )}
                  <motion.div
                    custom={1}
                    variants={menuItemVariants}
                  >
                    <MobileNavButton 
                      text="Sign Out" 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                    />
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    custom={0}
                    variants={menuItemVariants}
                  >
                    <MobileNavLink 
                      href="/login" 
                      text="Login" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </motion.div>
                  <motion.div
                    custom={1}
                    variants={menuItemVariants}
                  >
                    <MobileNavLink 
                      href="/signup" 
                      text="Sign Up" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
