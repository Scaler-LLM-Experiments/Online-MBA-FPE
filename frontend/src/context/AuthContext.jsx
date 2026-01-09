import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $initialData } from '../store/initial-data';
import authService from '../api/authService';
import tracker from '../utils/tracker';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data, loading } = useStore($initialData);

  const [pendingAuth, setPendingAuth] = useState({
    phoneNumber: '',
    email: '',
    userData: null,
    flow: null // 'signup' | 'login'
  });

  const checkAuthStatus = useCallback(async () => {
    // Sync from initial-data store; no separate API call needed
    setIsLoggedIn(Boolean(data?.isLoggedIn));
    setUser(data?.userData || null);
    setIsLoading(Boolean(loading));
  }, [data, loading]);

  useEffect(() => {
    // Keep local auth state in sync whenever initial-data updates
    checkAuthStatus();
  }, [data, loading, checkAuthStatus]);

  const handleSignUp = useCallback(async (formData, intent = 'career_profile_signup') => {
    tracker.click({
      click_type: 'signup_form_submitted',
      click_source: 'auth_form'
    });

    const result = await authService.signUp(formData, intent);

    if (result.success) {
      setPendingAuth({
        phoneNumber: result.phone_number,
        email: result.email,
        userData: formData,
        flow: 'signup'
      });

      tracker.click({
        click_type: 'signup_otp_requested',
        click_source: 'auth_form'
      });
    }

    return result;
  }, []);

  const handleLogin = useCallback(async (phoneNumber) => {
    tracker.click({
      click_type: 'login_form_submitted',
      click_source: 'auth_form'
    });

    const result = await authService.login(phoneNumber);

    if (result.success) {
      setPendingAuth({
        phoneNumber: result.phone_number,
        email: '',
        userData: null,
        flow: 'login'
      });

      tracker.click({
        click_type: 'login_otp_requested',
        click_source: 'auth_form'
      });
    } else if (result.notFound) {
      tracker.click({
        click_type: 'login_user_not_found',
        click_source: 'auth_form'
      });
    }

    return result;
  }, []);

  const handleVerifyOtp = useCallback(async (otp) => {
    const { phoneNumber, email, flow } = pendingAuth;

    tracker.click({
      click_type: 'otp_submitted',
      click_source: 'auth_form',
      custom: { flow }
    });

    let result;

    if (flow === 'signup') {
      result = await authService.verifySignUpOtp(phoneNumber, otp, email);
    } else {
      result = await authService.verifyLoginOtp(phoneNumber, otp);
    }

    if (result.success) {
      tracker.click({
        click_type: flow === 'signup' ? 'signup_success' : 'login_success',
        click_source: 'auth_form'
      });

      setPendingAuth({
        phoneNumber: '',
        email: '',
        userData: null,
        flow: null
      });

      await checkAuthStatus();
    }

    return result;
  }, [pendingAuth, checkAuthStatus]);

  const handleResendOtp = useCallback(async () => {
    const { phoneNumber, flow } = pendingAuth;

    tracker.click({
      click_type: 'resend_otp_requested',
      click_source: 'auth_form',
      custom: { flow }
    });

    const result = await authService.resendOtp(phoneNumber, flow);

    if (result.success) {
      tracker.click({
        click_type: 'resend_otp_success',
        click_source: 'auth_form'
      });
    }

    return result;
  }, [pendingAuth]);

  const resetPendingAuth = useCallback(() => {
    setPendingAuth({
      phoneNumber: '',
      email: '',
      userData: null,
      flow: null
    });
  }, []);

  const reloadAfterAuth = useCallback(() => {
    window.location.reload();
  }, []);

  const logout = useCallback(async () => {
    tracker.click({
      click_type: 'logout',
      click_source: 'app'
    });

    setUser(null);
    setIsLoggedIn(false);
    window.location.reload();
  }, []);

  const value = {
    user,
    isLoggedIn,
    isLoading,
    pendingAuth,

    handleSignUp,
    handleLogin,
    handleVerifyOtp,
    handleResendOtp,
    resetPendingAuth,
    checkAuthStatus,
    reloadAfterAuth,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

