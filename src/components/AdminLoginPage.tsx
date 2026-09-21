import React, { useState } from 'react';
import {
  Shield,
  Mail,
  KeyRound,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  checkIsAdminUser,
} from '../lib/firebase';
import { BrandLogo } from './BrandLogo';

interface AdminLoginPageProps {
  onAuthSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onAuthSuccess,
  onNavigateHome,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 1. Google Sign-In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const isAdmin = await checkIsAdminUser(user);
      if (!isAdmin) {
        setErrorMessage(
          'Access restricted: This account is not authorized for administrator access.'
        );
        setIsLoading(false);
        return;
      }

      setSuccessMessage('Administrator verified. Loading dashboard...');
      setTimeout(() => {
        onAuthSuccess();
      }, 500);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-blocked') {
        setErrorMessage('Pop-up was blocked by the browser. Please allow popups or use email sign-in.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Sign-in cancelled. Please try again.');
      } else {
        setErrorMessage(err.message || 'Authentication failed. Please try again.');
      }
      setIsLoading(false);
    }
  };

  // 2. Email & Password Sign-In / Registration
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage('Please enter both your administrator email and password.');
      setIsLoading(false);
      return;
    }

    try {
      let userCred;
      if (authMode === 'signin') {
        userCred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      } else {
        userCred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      }

      const user = userCred.user;
      const isAdmin = await checkIsAdminUser(user);

      if (!isAdmin) {
        setErrorMessage(
          'Access restricted: This account is not authorized for administrator access.'
        );
        setIsLoading(false);
        return;
      }

      setSuccessMessage('Administrator verified. Loading dashboard...');
      setTimeout(() => {
        onAuthSuccess();
      }, 500);
    } catch (err: any) {
      console.error('Email Auth Error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setErrorMessage('Invalid credentials. Please verify your email and password.');
      } else if (err.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('An account already exists for this email. Switch to Sign In.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('Password must be at least 6 characters.');
      } else {
        setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#FFFFFF] font-sans selection:bg-[#FF6A00] selection:text-[#0B0B0F] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Return to website link */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onNavigateHome}
          id="admin-login-back-btn"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#71717A] hover:text-[#FFFFFF] transition-colors py-1.5 px-3 rounded-lg bg-[#14141A] border border-[#262626] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to website</span>
        </button>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand & Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <BrandLogo size="md" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141A] border border-[#262626] text-xs text-[#A1A1AA] mb-3">
            <Shield className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>Secure Admin Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
            Administrator Sign In
          </h1>
          <p className="text-xs text-[#71717A] mt-1">
            Restricted access. Only authorized administrators may proceed.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#14141A] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            id="admin-google-signin-btn"
            className="w-full py-2.5 px-4 rounded-xl bg-[#0B0B0F] hover:bg-[#1A1A22] border border-[#262626] hover:border-[#383838] text-xs sm:text-sm font-semibold text-[#FFFFFF] flex items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#262626] w-full" />
            <span className="bg-[#14141A] px-3 text-[11px] uppercase tracking-wider text-[#71717A] absolute">
              or email credentials
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-[#0B0B0F] p-1 rounded-xl border border-[#262626]">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMessage(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-[#FF6A00] text-[#0B0B0F]'
                  : 'text-[#A1A1AA] hover:text-[#FFFFFF]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMessage(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[#FF6A00] text-[#0B0B0F]'
                  : 'text-[#A1A1AA] hover:text-[#FFFFFF]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-xs text-[#FFFFFF] placeholder-[#52525B] focus:outline-none focus:border-[#FF6A00] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-xs text-[#FFFFFF] placeholder-[#52525B] focus:outline-none focus:border-[#FF6A00] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              id="admin-submit-credentials-btn"
              className="w-full bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#FF6A00]/20 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>
                    {authMode === 'signin' ? 'Sign In to Dashboard' : 'Register Administrator'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center text-[11px] text-[#52525B]">
          FounderAuthority Private Administrative System
        </div>
      </div>
    </div>
  );
};
