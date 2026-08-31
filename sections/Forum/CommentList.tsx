'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { auth } from '../../lib/firebase';
import { MessageSquare, Calendar, Trash2, Loader2, Check, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UserAvatar from './UserAvatar';
import { CommentListSkeleton } from '../../components/Skeletons';

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
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(date);
};

// Module-level in-memory cache untuk comments agar tidak re-hydrate saat ganti tab
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

const CommentList: React.FC<{ currentUserId?: string }> = ({ currentUserId }) => {
  const [comments, setComments] = useState<Comment[]>(() => getInitialComments());
  const [isLoading, setIsLoading] = useState(!hasInitiallyLoaded && comments.length === 0);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchComments = useCallback(async (showLoading = false) => {
    if (showLoading && comments.length === 0) setIsLoading(true);
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
  }, [comments.length]);

  useEffect(() => {
    fetchComments(!hasInitiallyLoaded && cachedComments.length === 0);

    // Refresh ketika ada event posting komentar baru
    const handleRefresh = () => fetchComments(false);
    window.addEventListener('comment-refresh', handleRefresh);

    // Polling setiap 15 detik jika tab aktif
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
    setDeleteError(null);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error('You must be logged in to delete comments');

      const res = await fetch(`/api/comments?id=${encodeURIComponent(commentId)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to delete message');
      }

      setConfirmDeleteId(null);
      // Optimistic update local state
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      cachedComments = cachedComments.filter((c) => c.id !== commentId);
    } catch (error: any) {
      console.error('Error deleting comment: ', error);
      setDeleteError(error.message || 'Failed to delete message. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading && comments.length === 0) {
    return <CommentListSkeleton count={3} />;
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-neutral-800 rounded-3xl bg-neutral-900/20">
        <MessageSquare size={32} className="text-neutral-700 mb-4" />
        <p className="text-neutral-500 font-medium text-xs font-mono">No messages yet. Be the first to leave one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {deleteError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center justify-between"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <AlertCircle size={14} /> {deleteError}
          </span>
          <button onClick={() => setDeleteError(null)} className="p-1 hover:text-white">
            <X size={14} />
          </button>
        </motion.div>
      )}

      <AnimatePresence initial={false}>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            layout="position"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}
            transition={{
              layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2 },
              y: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
            }}
            className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/70 hover:border-neutral-700 transition-colors duration-150 group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <UserAvatar src={comment.userImage} name={comment.name} className="w-9 h-9" />
                <div>
                  <div className="text-white text-sm font-bold tracking-tight">{comment.name}</div>
                  <div className="text-[10px] text-neutral-500 font-mono flex items-center gap-1.5 mt-0.5">
                    <Calendar size={10} /> {formatDate(comment.createdAt)}
                  </div>
                </div>
              </div>
              {currentUserId === comment.userId && (
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {confirmDeleteId === comment.id ? (
                      <motion.div
                        key="confirm-delete"
                        initial={{ opacity: 0, scale: 0.9, x: 8 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 8 }}
                        className="flex items-center gap-1.5 p-1 bg-rose-500/10 border border-rose-500/30 rounded-xl backdrop-blur-md"
                      >
                        <span className="text-[10px] font-mono text-rose-300 font-bold px-1.5">Delete?</span>
                        <button
                          onClick={() => confirmDeleteComment(comment.id)}
                          disabled={deletingId === comment.id}
                          className="px-2 py-1 bg-rose-600 text-white rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider hover:bg-rose-500 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {deletingId === comment.id ? (
                            <Loader2 size={10} className="animate-spin" />
                          ) : (
                            <Check size={11} />
                          )}
                          <span>Yes</span>
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          disabled={deletingId === comment.id}
                          className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                          title="Cancel"
                          aria-label="Cancel delete"
                        >
                          <X size={12} />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default-delete"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2"
                      >
                        <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[8px] text-cyan-400 font-mono font-semibold uppercase tracking-wider">
                          Author
                        </span>
                        <button
                          onClick={() => setConfirmDeleteId(comment.id)}
                          title="Delete message"
                          aria-label="Delete message"
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
              {comment.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CommentList;