'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MainframeCardProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    icon: any;
    color?: 'cyan' | 'purple' | 'emerald' | 'yellow' | 'rose';
    className?: string;
    onClick?: () => void;
    isLoading?: boolean;
}

const accentColors = {
    cyan: 'from-cyan-500/10 to-transparent border-cyan-500/20 text-cyan-400',
    purple: 'from-purple-500/10 to-transparent border-purple-500/20 text-purple-400',
    emerald: 'from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400',
    yellow: 'from-yellow-500/10 to-transparent border-yellow-500/20 text-yellow-400',
    rose: 'from-rose-500/10 to-transparent border-rose-500/20 text-rose-400'
};

const MainframeCard: React.FC<MainframeCardProps> = ({
    children, title, subtitle, icon: Icon, color = 'cyan', className = "", onClick, isLoading = false
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={onClick}
            className={`group relative p-5 sm:p-6 rounded-[2rem] bg-[#050508] border border-white/5 transition-all duration-500 hover:border-white/10 cursor-pointer overflow-hidden flex flex-col ${className}`}
        >
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${accentColors[color]} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border bg-white/5 transition-all duration-500 group-hover:scale-110 ${accentColors[color].split(' ')[2]} ${accentColors[color].split(' ')[3]}`}>
                            <Icon size={20} />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-white uppercase tracking-tighter leading-none">{title}</h3>
                            {isLoading ? (
                                <span className="inline-flex items-center gap-1.5 mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                                    <span className="text-[8px] font-mono text-cyan-400/70 uppercase tracking-widest animate-pulse">Syncing...</span>
                                </span>
                            ) : (
                                subtitle && <p className="text-slate-500 text-[8px] font-mono tracking-widest uppercase mt-1">{subtitle}</p>
                            )}
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white group-hover:bg-white/10 transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                </div>
                <div className="flex-1 space-y-4">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default MainframeCard;