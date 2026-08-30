'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import { User, auth, onAuthStateChanged, signOut } from '../../lib/firebase';
import AuthCard from './AuthCard';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const Forum: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.08), transparent 80%)`;

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

  return (
    <section id="forum" className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          07 / COMMUNITY FORUM &amp; GUESTBOOK
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Guestbook &amp; Community Space
        </h2>
        <p className="text-sm text-[#8e9192] mt-2 max-w-xl">
          An open space to leave feedback, inquiries, or greetings. Authenticate securely with Google, GitHub, or Email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Auth & Submission Dock (Span 5) */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div
            onMouseMove={handleMouseMove}
            className="glass-card p-6 sm:p-8 relative overflow-hidden isolate"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
              style={{ background: spotlight }}
            />

            <AuthCard
              user={user}
              isAuthLoading={isAuthLoading}
              onAuthStateChange={setUser}
              onLogout={handleLogout}
            >
              {user && <CommentForm user={user} />}
            </AuthCard>

            {/* Security Badge */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8e9192] font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <ShieldCheck size={14} />
                <span>Multi-layer XSS Sanitized</span>
              </span>
              <span>Rate Limited (IP Isolated)</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Comment Stream (Span 7) */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 glass-card p-6 sm:p-8 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-cyan-400" />
              <span>Community Messages</span>
            </h3>
            <span className="text-xs text-cyan-400 font-mono">Real-time Polling (15s)</span>
          </div>

          <div
            className="space-y-4 max-h-[680px] overflow-y-auto pr-2 custom-scrollbar"
            role="region"
            aria-label="Guestbook comments"
            aria-live="polite"
          >
            <CommentList currentUserId={user?.uid} />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default React.memo(Forum);