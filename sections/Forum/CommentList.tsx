'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { auth } from '../../lib/firebase';
import { MessageSquare, Trash2, Loader2, Check, X } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { spatial } from '../../lib/motion';
import UserAvatar from './UserAvatar';
import { CommentListSkeleton } from '../../components/Skeletons';
import { toast } from '../../components/ui/Toaster';
import type { OutgoingComment } from './index';

interface Comment {
  id: string;
  name: string;
  userId: string;
  userImage: string;
  message: string;
  createdAt: string | null;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Just now';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

let cachedComments: Comment[] = [];
let hasInitiallyLoaded = false;

const getInitialComments = (): Comment[] => {
  if (cachedComments.length > 0) return cachedComments;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('hrnt_comments_cache');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cachedComments = parsed;
          return parsed;
        }
      }
    } catch {}
  }
  return [];
};

interface CommentListProps {
  currentUserId?: string;
  /** A just-posted message to show at the top until the server copy arrives. */
  outgoing?: OutgoingComment | null;
  onOutgoingSettled?: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ currentUserId, outgoing, onOutgoingSettled }) => {
  const [comments, setComments] = useState<Comment[]>(() => getInitialComments());
  const [isLoading, setIsLoading] = useState(!hasInitiallyLoaded && comments.length === 0);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchComments = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const res = await fetch('/api/comments', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load comments');
      const data = await res.json();
      const commentsData: Comment[] = data.comments || [];
      cachedComments = commentsData;
      hasInitiallyLoaded = true;
      setComments(commentsData);

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('hrnt_comments_cache', JSON.stringify(commentsData));
        } catch {}
      }
    } catch (error) {
      console.error('Error fetching comments: ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments(!hasInitiallyLoaded && cachedComments.length === 0);

    const handleRefresh = () => fetchComments(false);
    window.addEventListener('comment-refresh', handleRefresh);

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchComments(false);
      }
    }, 15000);

    return () => {
      window.removeEventListener('comment-refresh', handleRefresh);
      clearInterval(interval);
    };
  }, [fetchComments]);

  const confirmDeleteComment = async (commentId: string) => {
    setDeletingId(commentId);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error('You must be logged in to delete comments');

      const res = await fetch(`/api/comments?id=${encodeURIComponent(commentId)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to delete message');
      }

      setConfirmDeleteId(null);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      cachedComments = cachedComments.filter((c) => c.id !== commentId);
      toast('Message deleted', 'success');
    } catch (error: any) {
      console.error('Error deleting comment: ', error);
      toast(error.message || 'Failed to delete message. Please try again.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // The server copy of the outgoing message, once a refresh brings it in
  const landedMatch = outgoing
    ? comments.find((c) => c.userId === outgoing.userId && c.message === outgoing.message)
    : undefined;

  useEffect(() => {
    // Hand-off done in the same frame (shared layoutId), so the stand-in can go
    if (landedMatch) onOutgoingSettled?.();
  }, [landedMatch, onOutgoingSettled]);

  const visibleComments: Comment[] =
    outgoing && !landedMatch
      ? [
          {
            id: outgoing.tempId,
            name: outgoing.name,
            userId: outgoing.userId,
            userImage: outgoing.userImage,
            message: outgoing.message,
            createdAt: null,
          },
          ...comments,
        ]
      : comments;

  if (isLoading && visibleComments.length === 0) {
    return <CommentListSkeleton count={3} />;
  }

  if (visibleComments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 rounded-[20px] bg-[var(--surface-1)] text-center px-4">
        <MessageSquare size={26} className="text-[var(--accent-pixel)] mb-2.5" />
        <p className="text-[#F1F5F9] font-bold text-xs">No messages in the thread yet</p>
        <p className="text-[var(--text-secondary)] text-[11px] mt-1">
          Sign in below with Google, GitHub, or Email to start the conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {visibleComments.map((comment) => {
          const isOwnMessage = currentUserId && currentUserId === comment.userId;
          const isOutgoing = outgoing !== null && outgoing !== undefined && comment.id === outgoing.tempId;
          // The bubble that flew in from the composer keeps its id on the server copy
          const bubbleLayoutId =
            outgoing && (isOutgoing || comment.id === landedMatch?.id)
              ? `comment-${outgoing.tempId}`
              : undefined;

          return (
            <m.div
              key={comment.id}
              layout="position"
              initial={isOutgoing ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}
              transition={{
                layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
                y: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
              }}
              className="flex items-end gap-2.5 group"
            >
              <UserAvatar src={comment.userImage} name={comment.name} className="w-8 h-8 mb-0.5" />

              {/* Message Squircle Bubble */}
              <m.div
                layoutId={bubbleLayoutId}
                transition={spatial.slow}
                style={{ borderRadius: 22, borderBottomLeftRadius: 6 }}
                className={`flex-1 p-3.5 sm:p-4 transition-colors ${
                  isOwnMessage
                    ? 'bg-[var(--surface-pill)] text-[#F1F5F9]'
                    : 'bg-[var(--surface-1)] text-[#F1F5F9]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-[#F1F5F9] truncate">
                      {comment.name}
                    </span>
                    {isOwnMessage && (
                      <span className="px-2 py-0.5 rounded-full bg-[var(--accent-pixel)] text-[var(--on-accent-pixel)] text-[9px] font-semibold">
                        You
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-[var(--text-muted)] tabular-nums">
                      {formatDate(comment.createdAt)}
                    </span>

                    {isOwnMessage && !isOutgoing && (
                      <AnimatePresence mode="wait">
                        {confirmDeleteId === comment.id ? (
                          <m.div
                            key="confirm-delete"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            className="flex items-center gap-1 bg-[var(--surface-1)] px-2 py-0.5 rounded-full"
                          >
                            <button
                              type="button"
                              onClick={() => confirmDeleteComment(comment.id)}
                              disabled={deletingId === comment.id}
                              className="px-2 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              {deletingId === comment.id ? (
                                <Loader2 size={10} className="animate-spin" />
                              ) : (
                                <Check size={10} />
                              )}
                              <span>Delete</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              disabled={deletingId === comment.id}
                              className="p-0.5 text-[var(--text-secondary)] hover:text-white cursor-pointer"
                              aria-label="Cancel delete"
                            >
                              <X size={12} />
                            </button>
                          </m.div>
                        ) : (
                          <m.button
                            key="default-delete"
                            type="button"
                            onClick={() => setConfirmDeleteId(comment.id)}
                            title="Delete message"
                            aria-label="Delete message"
                            className="p-1 rounded-full text-[var(--text-muted)] hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </m.button>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {comment.message}
                </p>
              </m.div>
            </m.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CommentList;
