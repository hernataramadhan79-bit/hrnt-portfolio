'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { User, auth, onAuthStateChanged, signOut } from '../../lib/firebase';
import AuthCard from './AuthCard';
import CommentList from './CommentList';

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

    const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.1), transparent 80%)`;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try { await signOut(auth); } catch (error) { console.error("Logout Error: ", error); }
    };

    return (
        <section id="forum" className="relative z-10 min-h-[calc(100vh-6rem)] flex flex-col justify-center w-full py-12 lg:py-16 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-5xl mx-auto relative w-full">
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
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
                        Public <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Space.</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-light leading-relaxed">
                        {user ? `Hi, ${user.displayName?.split(' ')[0] || 'User'}! Feel free to leave a trace or a greeting here.` : 'An open space to leave messages, feedback, or just to say hello.'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4"
                    >
                        <div onMouseMove={handleMouseMove} className="relative group p-6 rounded-[2rem] bg-[#050508] border border-white/5 shadow-2xl overflow-hidden isolate">
                            <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                                style={{ background: spotlight }} />

                            <AuthCard
                                user={user}
                                isAuthLoading={isAuthLoading}
                                onAuthStateChange={setUser}
                                onLogout={handleLogout}
                            />
                        </div>
                    </motion.div>

                    <div className="lg:col-span-8 space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar" role="region" aria-label="Guestbook comments" aria-live="polite">
                        <CommentList currentUserId={user?.uid} />
                    </div>
                </div>
            </div>
        </section >
    );
};

export default React.memo(Forum);