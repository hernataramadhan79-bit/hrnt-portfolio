'use client';

import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Chrome, Github, UserPlus, LogIn, LogOut, ChevronDown } from 'lucide-react';
import {
  auth,
  googleProvider,
  githubProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from '../../lib/firebase';
import UserAvatarComponent from './UserAvatar';

const SILENT_ERROR_CODES = new Set([
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
]);

const getFriendlyErrorMessage = (error: any) => {
  const code = error?.code;
  switch (code) {
    case 'auth/invalid-email':
      return 'The email format is invalid. Please double-check and try again.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Incorrect email or password. Please verify your credentials.';
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please login instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/network-request-failed':
      return 'Network connection issue detected. Please check your internet.';
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by your browser. Please allow popups and try again.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email using a different sign-in provider.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Authentication settings.';
    case 'auth/operation-not-allowed':
      return 'This login provider is currently not enabled.';
    default:
      return error?.message && !error.message.includes('auth/')
        ? error.message
        : 'A system error occurred. Please try again in a few moments.';
  }
};

interface AuthCardProps {
  user: User | null;
  isAuthLoading: boolean;
  onAuthStateChange: (user: User | null) => void;
  onLogout: () => void;
  children?: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({
  user,
  isAuthLoading,
  onAuthStateChange,
  onLogout,
  children,
}) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(isAuthLoading);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      onAuthStateChange(currentUser);
      setLoading(false);
    });
    onAuthStateChange(auth.currentUser);
    return () => unsubscribe();
  }, [onAuthStateChange]);

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setAuthError('');
    setSocialLoading(provider);
    try {
      const authProvider = provider === 'google' ? googleProvider : githubProvider;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject({ code: 'auth/timeout', message: 'Authentication timed out. Please try again.' }),
          60000
        )
      );
      await Promise.race([signInWithPopup(auth, authProvider), timeoutPromise]);
    } catch (error: any) {
      if (!SILENT_ERROR_CODES.has(error?.code)) {
        setAuthError(getFriendlyErrorMessage(error));
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    try {
      if (isSignUpMode) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const generatedAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName || 'User'
        )}&background=262B38&color=A8C7FA&bold=true`;
        await updateProfile(userCredential.user, {
          displayName: displayName,
          photoURL: generatedAvatar,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setAuthError(getFriendlyErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4 gap-2.5 bg-[var(--surface-1)] rounded-[16px]">
        <div className="w-4 h-4 border-2 border-[var(--accent-pixel)] border-t-transparent rounded-full animate-spin" />
        <span className="text-[var(--text-secondary)] font-mono text-xs">Syncing session...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[var(--surface-1)] rounded-[16px] p-3.5 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#F1F5F9]">
              Join the Community Thread
            </h4>
            <p className="text-[11px] text-[var(--text-secondary)]">
              Authenticate with Google, GitHub, or Email to post a message.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={!!socialLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface-pill)] text-xs font-semibold text-[#F1F5F9] transition-colors cursor-pointer disabled:opacity-50"
            >
              {socialLoading === 'google' ? (
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Chrome size={14} className="text-[var(--accent-pixel)]" />
              )}
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              disabled={!!socialLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface-pill)] text-xs font-semibold text-[#F1F5F9] transition-colors cursor-pointer disabled:opacity-50"
            >
              {socialLoading === 'github' ? (
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Github size={14} className="text-[var(--accent-pixel)]" />
              )}
              <span>GitHub</span>
            </button>

            <button
              type="button"
              onClick={() => setShowEmailForm((prev) => !prev)}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface-pill)] text-xs font-medium text-[var(--text-secondary)] hover:text-[#F1F5F9] transition-colors cursor-pointer"
            >
              <Mail size={13} />
              <span>Email</span>
              <ChevronDown
                size={12}
                className={`transition-transform ${showEmailForm ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        {authError && (
          <p
            className="text-[11px] text-rose-300 bg-rose-500/15 py-2 px-3 rounded-[10px] font-medium"
            role="alert"
          >
            {authError}
          </p>
        )}

        {showEmailForm && (
          <form onSubmit={handleEmailAuth} className="pt-2 space-y-2.5 border-t border-white/[0.06]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {isSignUpMode && (
                <div className="relative">
                  <UserIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    size={13}
                  />
                  <input
                    id="auth-fullname"
                    name="name"
                    autoComplete="name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-[var(--surface-2)] rounded-full pl-8 pr-3 py-2 text-[#F1F5F9] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-pixel)]"
                    placeholder="Your Name"
                    required
                  />
                </div>
              )}
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  size={13}
                />
                <input
                  id="auth-email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setAuthError('');
                  }}
                  className="w-full bg-[var(--surface-2)] rounded-full pl-8 pr-3 py-2 text-[#F1F5F9] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-pixel)]"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  size={13}
                />
                <input
                  id="auth-password"
                  name="password"
                  autoComplete={isSignUpMode ? 'new-password' : 'current-password'}
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthError('');
                  }}
                  className="w-full bg-[var(--surface-2)] rounded-full pl-8 pr-3 py-2 text-[#F1F5F9] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-pixel)]"
                  placeholder="Min. 6 characters"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUpMode(!isSignUpMode);
                  setAuthError('');
                }}
                className="text-[11px] text-[var(--accent-pixel)] hover:underline font-mono"
              >
                {isSignUpMode ? 'Have an account? Sign In' : 'Need an account? Sign Up'}
              </button>

              <button
                type="submit"
                className="px-4 py-1.5 rounded-full bg-[var(--accent-pixel)] text-[var(--on-accent-pixel)] font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                {isSignUpMode ? <UserPlus size={13} /> : <LogIn size={13} />}
                <span>{isSignUpMode ? 'Create Account' : 'Sign In'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
          <UserAvatarComponent
            src={user.photoURL || undefined}
            name={user.displayName || 'User'}
            className="w-7 h-7"
          />
          <div className="flex items-center gap-2">
            <span className="text-[#F1F5F9] font-bold text-xs">
              {user.displayName || 'User'}
            </span>
            <span className="text-[10px] text-[var(--accent-pixel)] font-mono">
              • Authenticated
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--surface-1)] hover:bg-rose-500/20 text-[11px] text-[var(--text-secondary)] hover:text-rose-300 transition-colors"
          title="Logout"
          aria-label="Logout"
        >
          <LogOut size={12} />
          <span>Sign Out</span>
        </button>
      </div>
      {children}
    </div>
  );
};

export default AuthCard;
