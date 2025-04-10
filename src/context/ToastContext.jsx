'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastContainer } from '@/components/ui/Toast';
import { v4 as uuidv4 } from 'uuid';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, options = {}) => {
    const id = uuidv4();
    console.log("Adding toast with options:", options);
    const toast = {
      id,
      message,
      ...options
    };
    
    setToasts(prev => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer>
        {toasts.map(toast => {
          console.log("Rendering toast:", toast);
          return (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              action={toast.action}
              onClose={() => removeToast(toast.id)}
            />
          );
        })}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export default ToastContext;
