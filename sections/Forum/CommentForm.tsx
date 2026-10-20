'use client';

import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
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
          Authorization: `Bearer ${token}`,
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
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-end gap-2 bg-[var(--surface-1)] rounded-[20px] p-2.5">
        <label htmlFor="comment-input" className="sr-only">
          Write a message
        </label>
        <textarea
          id="comment-input"
          rows={2}
          value={message}
          maxLength={MAX_CHARS}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message the community thread... (Ctrl+Enter to send)"
          className="flex-1 bg-transparent text-[#F1F5F9] text-xs placeholder:text-[var(--text-muted)] focus:outline-none resize-none leading-relaxed px-2 py-1"
          required
          disabled={isSubmitting}
        />

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-[var(--text-muted)] tabular-nums hidden sm:inline">
            {message.length}/{MAX_CHARS}
          </span>
          <button
            type="submit"
            disabled={!message.trim() || isSubmitting}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all duration-200 ${
              message.trim() && !isSubmitting
                ? 'bg-[var(--accent-pixel)] hover:bg-[var(--accent-pixel-bright)] text-[var(--on-accent-pixel)] cursor-pointer active:scale-95'
                : 'bg-[var(--surface-2)] text-[var(--text-muted)] cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Sending</span>
              </>
            ) : (
              <>
                <span>Send</span>
                <Send size={12} />
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-[11px] text-rose-300 bg-rose-500/15 py-2 px-3 rounded-[12px] font-medium">
          {error}
        </p>
      )}
    </form>
  );
};

export default CommentForm;
