'use client';

import React, { forwardRef } from 'react';

const Textarea = forwardRef(({
  id,
  label,
  placeholder = '',
  value,
  onChange,
  rows = 4,
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
      <textarea
        id={id}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
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
Textarea.displayName = 'Textarea';

export default Textarea;
