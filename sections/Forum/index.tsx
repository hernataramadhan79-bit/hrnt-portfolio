'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import { User, auth, onAuthStateChanged, signOut } from '../../lib/firebase';
import AuthCard from './AuthCard';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface ForumProps {
  embedded?: boolean;
}

const Forum: React.FC<ForumProps> = ({ embedded = false }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout Error: ', error);
    }
  };

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
      <div
        className="bento-inner p-4 sm:p-5 flex-1 max-h-[420px] overflow-y-auto"
        role="region"
        aria-label="Guestbook comments"
        aria-live="polite"
      >
        <CommentList currentUserId={user?.uid} />
      </div>

      {/* Sticky Bottom Composer Bar Combining AuthCard & CommentForm */}
      <div className="bento-inner p-3 sm:p-4">
        <AuthCard
          user={user}
          isAuthLoading={isAuthLoading}
          onAuthStateChange={setUser}
          onLogout={handleLogout}
        >
          {user && <CommentForm user={user} />}
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
