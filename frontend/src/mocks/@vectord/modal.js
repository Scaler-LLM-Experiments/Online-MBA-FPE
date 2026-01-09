// ========================================
// LOCAL DEV MOCK: @vectord/modal
// ========================================
// This is a mock implementation for local development
// TODO: Remove this file when deploying to production with NPM_TOKEN
// ========================================

import React from 'react';

// Mock Modal component
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
  style,
  ...props
}) => {
  React.useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        ...style
      }}
      onClick={closeOnOverlayClick ? onClose : undefined}
      {...props}
    >
      <div
        className={className}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '90%',
          maxHeight: '90%',
          overflow: 'auto',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold' }}>
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
