'use client';

import React, { forwardRef } from 'react';

const Input = forwardRef(({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  error = '',
  className = ''
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground ${
          error ? 'border-destructive' : 'border-input'
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
});

// Add display name for debugging purposes
Input.displayName = 'Input';

export default Input;
