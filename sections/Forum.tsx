'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { MessageSquare, Send, User as UserIcon, Calendar, LogOut, Github, Chrome, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import {
    db,
    auth,
    googleProvider,
    githubProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    User
} from '../lib/firebase';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';

interface Comment {
    id: string;
    name: string;
    userId: string;
    userImage: string;
    message: string;
    createdAt: Timestamp | null;
}

const Forum: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState<User | null>(null);

    // Auth States
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [authError, setAuthError] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // Setup motion values for spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.1), transparent 80%)`;

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthLoading(false);
        });

        const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
        const unsubscribeComments = onSnapshot(q, (snapshot) => {
            const commentsData: Comment[] = [];
            snapshot.forEach((doc) => {
                commentsData.push({ id: doc.id, ...doc.data() } as Comment);
            });
            setComments(commentsData);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching comments: ", error);
            setIsLoading(false);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeComments();
        };
    }, []);

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        setAuthError('');
        try {
            const authProvider = provider === 'google' ? googleProvider : githubProvider;
            await signInWithPopup(auth, authProvider);
        } catch (error: any) {
            setAuthError(error.message);
            console.error("Login Error: ", error);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        setIsAuthLoading(true);

        try {
            if (isSignUpMode) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, {
                    displayName: displayName
                });
                setUser({ ...userCredential.user, displayName });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error: any) {
            setAuthError(error.message);
        } finally {
            setIsAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error: ", error);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !message.trim()) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "comments"), {
                name: user.displayName || 'Anonymous',
                userId: user.uid,
                userImage: user.photoURL || '',
                message: message,
                createdAt: serverTimestamp(),
            });
            setMessage('');
        } catch (error) {
            console.error("Error adding comment: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (timestamp: Timestamp | null) => {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <section id="forum" className="relative z-10 py-24 md:py-32 px-4 sm:px-6 overflow-visible">
            <div className="max-w-5xl mx-auto relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
                        <MessageSquare size={14} className="text-cyan-400" />
                        <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
                            Guestbook & Comments
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                        Public <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Space.</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-light leading-relaxed">
                        {user ? `Hi, ${user.displayName?.split(' ')[0] || 'User'}! Feel free to leave a trace or a greeting here.` : 'An open space to leave messages, feedback, or just to say hello.'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Auth Card / Post Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5"
                    >
                        <div
                            onMouseMove={handleMouseMove}
                            className="relative group p-8 rounded-[2.5rem] bg-[#050508] border border-white/10 shadow-2xl overflow-hidden isolate"
                        >
                            <motion.div
                                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                                style={{ background: spotlight }}
                            />

                            {isAuthLoading ? (
                                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                    <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Processing...</span>
                                </div>
                            ) : !user ? (
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
                                                    <input
                                                        type="text"
                                                        value={displayName}
                                                        onChange={(e) => setDisplayName(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                                        placeholder="Your Name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                                    placeholder="name@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                                                    placeholder="Min. 6 characters"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-xl text-[10px] hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                                        >
                                            {isSignUpMode ? <UserPlus size={14} /> : <LogIn size={14} />}
                                            {isSignUpMode ? 'Initialize Account' : 'Authenticate'}
                                        </button>

                                        {authError && <p className="text-[10px] text-red-400 text-center font-mono">{authError}</p>}
                                    </form>

                                    <div className="flex items-center gap-4 py-2">
                                        <div className="h-px bg-white/10 flex-1" />
                                        <span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">Or social auth</span>
                                        <div className="h-px bg-white/10 flex-1" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleSocialLogin('google')}
                                            className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs text-white"
                                        >
                                            <Chrome size={16} /> Google
                                        </button>
                                        <button
                                            onClick={() => handleSocialLogin('github')}
                                            className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs text-white"
                                        >
                                            <Github size={16} /> GitHub
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setIsSignUpMode(!isSignUpMode);
                                            setAuthError('');
                                        }}
                                        className="w-full text-[10px] text-cyan-400 uppercase tracking-widest font-bold hover:text-white transition-colors"
                                    >
                                        {isSignUpMode ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 font-bold">
                                                {user.photoURL ? (
                                                    <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    user.displayName?.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-sm">{user.displayName}</div>
                                                <div className="text-[10px] text-cyan-400 font-mono uppercase tracking-tighter">Authenticated</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                                            title="Logout"
                                        >
                                            <LogOut size={18} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmitComment} className="space-y-4">
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors flex items-center gap-2">
                                                <MessageSquare size={12} /> Message
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all resize-none"
                                                placeholder="Say something..."
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                {isSubmitting ? 'Syncing...' : 'Broadcast Message'}
                                                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Comments List */}
                    <div className="lg:col-span-7 space-y-6 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">Hydrating data...</span>
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.02]">
                                <MessageSquare size={32} className="text-slate-700 mb-4" />
                                <p className="text-slate-500 font-medium">No messages yet. Be the first!</p>
                            </div>
                        ) : (
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
                                                <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    {comment.userImage ? (
                                                        <img src={comment.userImage} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="text-cyan-400 font-bold">{comment.name.charAt(0).toUpperCase()}</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold tracking-tight">{comment.name}</div>
                                                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                                                        <Calendar size={10} /> {formatDate(comment.createdAt)}
                                                    </div>
                                                </div>
                                            </div>
                                            {user?.uid === comment.userId && (
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
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }
      `}</style>
        </section>
    );
};

export default React.memo(Forum);
