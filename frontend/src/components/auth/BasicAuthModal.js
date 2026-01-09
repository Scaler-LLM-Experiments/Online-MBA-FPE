import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const AuthModal = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-radius: 12px;
  padding: 40px;
  min-width: 420px;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(199, 31, 105, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 480px) {
    min-width: 90%;
    padding: 32px 24px;
  }
`;

const AuthTitle = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
`;

const AuthUrl = styled.div`
  color: #cbd5e1;
  font-size: 0.875rem;
  margin-bottom: 32px;
  font-family: 'Monaco', 'Menlo', monospace;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  display: inline-block;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AuthField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AuthLabel = styled.label`
  color: #e2e8f0;
  font-size: 0.875rem;
  font-weight: 600;
  display: block;
  letter-spacing: 0.3px;
`;

const AuthInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: #ffffff !important;
  font-size: 0.9375rem;
  color: #1e293b;
  box-sizing: border-box;
  transition: all 0.2s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #c71f69;
    background: #ffffff !important;
    box-shadow: 0 0 0 3px rgba(199, 31, 105, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const AuthError = styled.div`
  color: #fca5a5;
  font-size: 0.875rem;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.15);
  border-left: 3px solid #ef4444;
  border-radius: 6px;
  margin-top: -8px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${shake} 0.4s ease-in-out;
  
  &::before {
    content: "⚠";
    font-size: 1rem;
  }
`;

const AuthInputError = styled(AuthInput)`
  border-color: #ef4444 !important;
  background: #ffffff !important;
  
  &:focus {
    border-color: #ef4444 !important;
    background: #ffffff !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
  }
`;

const PasswordFieldWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: color 0.2s ease;
  
  &:hover {
    color: #334155;
  }
  
  &:focus {
    outline: none;
    color: #c71f69;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const AuthButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
  
  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

const AuthButton = styled.button`
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  min-width: 100px;
  
  ${props => props.primary 
    ? `
      background: linear-gradient(135deg, #c71f69 0%, #a01855 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(199, 31, 105, 0.3);
      
      &:hover {
        background: linear-gradient(135deg, #a01855 0%, #c71f69 100%);
        box-shadow: 0 6px 16px rgba(199, 31, 105, 0.4);
        transform: translateY(-1px);
      }
      
      &:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(199, 31, 105, 0.3);
      }
    `
    : `
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.2);
      
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
      }
      
      &:active {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/**
 * Reusable Basic Authentication Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the modal
 * @param {Function} props.onSubmit - Callback when form is submitted with (username, password)
 * @param {Function} props.onCancel - Callback when cancel button is clicked
 * @param {string} props.title - Modal title (default: "Sign in")
 * @param {string} props.origin - Origin URL to display (default: window.location.origin)
 * @param {string} props.error - Error message to display
 * @param {boolean} props.loading - Whether authentication is in progress
 */
const BasicAuthModal = ({
  show,
  onSubmit,
  onCancel,
  title = "Sign in",
  origin,
  error,
  loading = false
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const displayError = error || localError;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!username || !password) {
      setLocalError('Please enter both username and password');
      return;
    }
    
    onSubmit(username, password);
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setLocalError('');
    setShowPassword(false);
    onCancel();
  };

  if (!show) {
    return null;
  }

  return (
    <ModalOverlay>
      <AuthModal>
        <AuthTitle>{title}</AuthTitle>
        <AuthUrl>{origin || window.location.origin}</AuthUrl>
        <AuthForm onSubmit={handleSubmit}>
          <AuthField>
            <AuthLabel htmlFor="username">Username</AuthLabel>
            {displayError ? (
              <AuthInputError
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setLocalError('');
                }}
                autoFocus
                autoComplete="username"
                placeholder="Enter your username"
              />
            ) : (
              <AuthInput
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setLocalError('');
                }}
                autoFocus
                autoComplete="username"
                placeholder="Enter your username"
              />
            )}
          </AuthField>
          <AuthField>
            <AuthLabel htmlFor="password">Password</AuthLabel>
            <PasswordFieldWrapper>
              {displayError ? (
                <AuthInputError
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError('');
                  }}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  style={{ paddingRight: '40px' }}
                />
              ) : (
                <AuthInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError('');
                  }}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  style={{ paddingRight: '40px' }}
                />
              )}
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </PasswordToggle>
            </PasswordFieldWrapper>
          </AuthField>
          {displayError && (
            <AuthError>
              {displayError}
            </AuthError>
          )}
          <AuthButtonGroup>
            <AuthButton type="button" onClick={handleCancel}>
              Cancel
            </AuthButton>
            <AuthButton type="submit" primary disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </AuthButton>
          </AuthButtonGroup>
        </AuthForm>
      </AuthModal>
    </ModalOverlay>
  );
};

export default BasicAuthModal;

