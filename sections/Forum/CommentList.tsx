'use client';

import React from 'react';
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { MessageSquare, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UserAvatar from './UserAvatar';

interface Comment {
  id: string;
  name: string;
  userId: string;
  userImage: string;
  message: string;
  createdAt: Timestamp | null;
}

const formatDate = (timestamp: Timestamp | null) => {
  if (!timestamp) return 'Just now';
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(date);
};

// Module-level in-memory cache untuk comments agar tidak re-hydrate saat ganti tab
let cachedComments: Comment[] = [];
let hasInitiallyLoaded = false;

const CommentList: React.FC<{ currentUserId?: string }> = ({ currentUserId }) => {
  const [comments, setComments] = React.useState<Comment[]>(cachedComments);
  const [isLoading, setIsLoading] = React.useState(!hasInitiallyLoaded && cachedComments.length === 0);

  React.useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData: Comment[] = [];
      snapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() } as Comment);
      });
      cachedComments = commentsData;
      hasInitiallyLoaded = true;
      setComments(commentsData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching comments: ", error);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">Hydrating data...</span>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.02]">
        <MessageSquare size={32} className="text-slate-700 mb-4" />
        <p className="text-slate-500 font-medium">No messages yet. Be the first!</p>
      </div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {comments.map((comment, index) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <UserAvatar src={comment.userImage} name={comment.name} className="w-10 h-10" />
              <div>
                <div className="text-white font-bold tracking-tight">{comment.name}</div>
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                  <Calendar size={10} /> {formatDate(comment.createdAt)}
                </div>
              </div>
            </div>
            {currentUserId === comment.userId && (
              <div className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[8px] text-cyan-400 font-bold uppercase tracking-widest">
                You
              </div>
            )}
          </div>
          <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
            {comment.message}
          </p>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default CommentList;