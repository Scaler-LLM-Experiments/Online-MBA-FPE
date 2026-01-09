// ========================================
// LOCAL DEV MOCK: @vectord/ui
// ========================================
// This is a mock implementation for local development
// TODO: Remove this file when deploying to production with NPM_TOKEN
// ========================================

import React from 'react';

// Mock View component (acts like a div)
export const View = ({ children, className, style, ...props }) => (
  <div className={className} style={style} {...props}>
    {children}
  </div>
);

// Mock Text component (acts like a span)
export const Text = ({ children, className, style, ...props }) => (
  <span className={className} style={style} {...props}>
    {children}
  </span>
);

// Mock Icon component
export const Icon = ({ name, size = 24, color, className, style, ...props }) => (
  <span
    className={className}
    style={{
      fontSize: size,
      color,
      display: 'inline-block',
      ...style
    }}
    {...props}
  >
    {/* Mock icon - just show the icon name */}
    {name || '🔲'}
  </span>
);

// Mock Button component
export const Button = ({ children, onClick, className, style, disabled, ...props }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={className}
    style={{
      padding: '8px 16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: disabled ? '#f5f5f5' : '#fff',
      ...style
    }}
    {...props}
  >
    {children}
  </button>
);

// Mock cx utility (classnames concatenation)
export const cx = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default {
  View,
  Text,
  Icon,
  Button,
  cx
};
