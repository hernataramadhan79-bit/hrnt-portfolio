'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m } from 'framer-motion';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import { User, auth, onAuthStateChanged, signOut } from '../../lib/firebase';
import AuthCard from './AuthCard';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { toast } from '../../components/ui/Toaster';

/**
 * A message on its way: shown as a bubble above the composer while it sends,
 * then flown into the thread (shared layoutId) once the server accepts it.
 */
export interface OutgoingComment {
  tempId: string;
  userId: string;
  name: string;
  userImage: string;
  message: string;
  phase: 'sending' | 'landed';
}

interface ForumProps {
  embedded?: boolean;
}

const Forum: React.FC<ForumProps> = ({ embedded = false }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [outgoing, setOutgoing] = useState<OutgoingComment | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let restored = false;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // The first callback only restores a saved session; later ones are the visitor's doing
      if (restored && currentUser) {
        toast(`Signed in as ${currentUser.displayName || currentUser.email?.split('@')[0] || 'you'}`, 'success');
      }
      restored = true;
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast('Signed out', 'info');
    } catch (error) {
      console.error('Logout Error: ', error);
      toast('Could not sign out. Please try again.', 'error');
    }
  };

  const handleOutgoingLanded = useCallback(() => {
    setOutgoing((prev) => (prev ? { ...prev, phase: 'landed' } : prev));
    // Bring the top of the thread into view so the message is seen arriving
    threadRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    toast('Message posted', 'success');
  }, []);

  const handleOutgoingFailed = useCallback((reason: string) => {
    setOutgoing(null);
    toast(reason, 'error');
  }, []);

  const handleOutgoingSettled = useCallback(() => setOutgoing(null), []);

  const innerThread = (
    <div id="forum" className="bento-outer h-full flex flex-col justify-between space-y-3">
      {/* Top Thread Header */}
      <div className="bento-inner p-4 sm:p-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[var(--surface-pill)] flex items-center justify-center text-[var(--accent-pixel)]">
            <MessageSquare size={16} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#F1F5F9] tracking-tight">
              Community Guestbook &amp; Discussion
            </h3>
            <p className="text-[11px] text-[var(--text-secondary)]">
              Real-time messages and discussion from visitors, engineers, and collaborators
            </p>
          </div>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-1)] text-[10px] font-medium text-[var(--accent-pixel)]">
          <ShieldCheck size={12} />
          <span>XSS Sanitized</span>
        </div>
      </div>

      {/* Scrollable Squircle Chat Bubbles Stream */}
      <m.div
        ref={threadRef}
        layoutScroll
        data-lenis-prevent
        data-scroll-chain
        className="bento-inner p-4 sm:p-5 flex-1 max-h-[420px] overflow-y-auto"
        role="region"
        aria-label="Guestbook comments"
        aria-live="polite"
      >
        <CommentList
          currentUserId={user?.uid}
          outgoing={outgoing?.phase === 'landed' ? outgoing : null}
          onOutgoingSettled={handleOutgoingSettled}
        />
      </m.div>

      {/* Sticky Bottom Composer Bar Combining AuthCard & CommentForm */}
      <div className="bento-inner p-3 sm:p-4">
        <AuthCard
          user={user}
          isAuthLoading={isAuthLoading}
          onAuthStateChange={setUser}
          onLogout={handleLogout}
        >
          {user && (
            <CommentForm
              user={user}
              outgoing={outgoing?.phase === 'sending' ? outgoing : null}
              onOutgoing={setOutgoing}
              onOutgoingLanded={handleOutgoingLanded}
              onOutgoingFailed={handleOutgoingFailed}
            />
          )}
        </AuthCard>
      </div>
    </div>
  );

  if (embedded) {
    return innerThread;
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {innerThread}
    </section>
  );
};

export default React.memo(Forum);
