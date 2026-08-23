'use client';

import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Chrome, Github, UserPlus, LogIn, LogOut } from 'lucide-react';
import { auth, googleProvider, githubProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from '../../lib/firebase';
import UserAvatarComponent from './UserAvatar';

// Errors that are user-initiated (not real errors) — silently ignore them
const SILENT_ERROR_CODES = new Set([
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
]);

const getFriendlyErrorMessage = (error: any) => {
  const code = error.code;
  switch (code) {
    case 'auth/invalid-email': return 'The email format is invalid. Please double-check and try again.';
    case 'auth/user-not-found':
    case 'auth/wrong-password': return 'Incorrect email or password. Please verify your credentials.';
    case 'auth/email-already-in-use': return 'This email is already registered. Please login instead.';
    case 'auth/weak-password': return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/network-request-failed': return 'Network connection issue detected. Please check your internet.';
    default: return 'A system error occurred. Please try again in a few moments.';
  }
};

interface AuthCardProps {
  user: User | null;
  isAuthLoading: boolean;
  onAuthStateChange: (user: User | null) => void;
  onLogout: () => void;
  children?: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ user, isAuthLoading, onAuthStateChange, onLogout, children }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
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
      await signInWithPopup(auth, authProvider);
    } catch (error: any) {
      // Silently ignore user-initiated cancellations (popup closed, etc.)
      if (!SILENT_ERROR_CODES.has(error.code)) {
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
        const generatedAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || 'User')}&background=0891b2&color=fff&bold=true`;
        await updateProfile(userCredential.user, { displayName: displayName, photoURL: generatedAvatar });
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
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Processing...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-white">{isSignUpMode ? 'Create Account' : 'Welcome Back'}</h3>
          <p className="text-slate-500 text-xs">Access the community forum</p>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignUpMode && (
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-xs focus:outline-none focus:border-cyan-500/50" placeholder="Your Name" required />
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setAuthError(''); }}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-xs focus:outline-none focus:border-cyan-500/50" placeholder="name@example.com" required />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-xs focus:outline-none focus:border-cyan-500/50" placeholder="Min. 6 characters" required />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-xl text-[10px] hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
            {isSignUpMode ? <UserPlus size={14} /> : <LogIn size={14} />}
            {isSignUpMode ? 'Initialize Account' : 'Authenticate'}
          </button>

          {authError && <p className="text-[10px] text-red-400 text-center font-medium bg-red-400/10 border border-red-400/20 py-2.5 px-3 rounded-lg" role="alert">{authError}</p>}
        </form>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">Or social auth</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={!!socialLoading}
            className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {socialLoading === 'google'
              ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <Chrome size={16} />}
            Google
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            disabled={!!socialLoading}
            className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {socialLoading === 'github'
              ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <Github size={16} />}
            GitHub
          </button>
        </div>

        <button onClick={() => { setIsSignUpMode(!isSignUpMode); setAuthError(''); }}
          className="w-full text-[10px] text-cyan-400 uppercase tracking-widest font-bold hover:text-white transition-colors">
          {isSignUpMode ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <UserAvatarComponent src={user.photoURL || undefined} name={user.displayName || 'User'} className="w-10 h-10" />
          <div>
            <div className="text-white font-bold text-sm">{user.displayName || 'User'}</div>
            <div className="text-[10px] text-cyan-400 font-mono uppercase tracking-tighter">Authenticated</div>
          </div>
        </div>
        <button onClick={onLogout} className="p-2 text-slate-500 hover:text-red-400 transition-colors" title="Logout" aria-label="Logout">
          <LogOut size={18} />
        </button>
      </div>
      {children}
    </div>
  );
};

export default AuthCard;