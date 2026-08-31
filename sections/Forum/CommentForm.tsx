'use client';

import React, { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { User } from '../../lib/firebase';

interface CommentFormProps {
  user: User;
  onCommentPosted?: () => void;
}

const MAX_CHARS = 500;

const CommentForm: React.FC<CommentFormProps> = ({ user, onCommentPosted }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'User',
          userImage: user.photoURL || '',
          message: trimmed,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to post message');
      }

      setMessage('');
      if (onCommentPosted) onCommentPosted();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('comment-refresh'));
      }
    } catch (err: any) {
      console.error('Error adding comment: ', err);
      setError(err.message || 'Failed to post message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 pt-2">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <label htmlFor="comment-input" className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono font-bold flex items-center gap-1.5">
            <Sparkles size={11} className="text-cyan-400" />
            Leave a Message
          </label>
          <span className={`text-[10px] font-mono ${message.length > MAX_CHARS - 50 ? 'text-amber-400' : 'text-neutral-500'}`}>
            {message.length}/{MAX_CHARS}
          </span>
        </div>

        <div className="relative rounded-xl bg-neutral-900/60 border border-neutral-800 focus-within:border-cyan-500/50 focus-within:bg-neutral-900 transition-all p-3">
          <textarea
            id="comment-input"
            rows={3}
            value={message}
            maxLength={MAX_CHARS}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share your feedback, thoughts, or greetings..."
            className="w-full bg-transparent text-white text-xs placeholder:text-neutral-500 focus:outline-none resize-none leading-relaxed custom-scrollbar"
            required
            disabled={isSubmitting}
          />
          <div className="flex items-center justify-between pt-2 mt-1 border-t border-neutral-800">
            <span className="text-[9px] text-neutral-500 font-mono hidden sm:inline-block">
              Press <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-300">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-300">Enter</kbd> to send
            </span>
            <button
              type="submit"
              disabled={!message.trim() || isSubmitting}
              className={`ml-auto px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all duration-200 ${
                message.trim() && !isSubmitting
                  ? 'bg-cyan-400 hover:bg-cyan-300 text-neutral-950 shadow-[0_0_15px_rgba(34,211,238,0.25)] cursor-pointer active:scale-95'
                  : 'bg-neutral-800/60 text-neutral-500 cursor-not-allowed border border-neutral-800'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <Send size={12} />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-lg font-medium">
          {error}
        </p>
      )}
    </form>
  );
};

export default CommentForm;
