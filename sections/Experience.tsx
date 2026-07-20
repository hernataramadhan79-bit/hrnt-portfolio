'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ArrowUpRight, Layers } from 'lucide-react';
import { experiences } from '@/constants';

type FilterType = 'all' | 'work' | 'edu';

const Experience: React.FC = () => {
    const [filter, setFilter] = useState<FilterType>('all');

    const counts = {
        all: experiences.length,
        work: experiences.filter((e) => e.type === 'work').length,
        edu: experiences.filter((e) => e.type === 'edu').length,
    };

    const filteredExperiences = experiences.filter((exp) => {
        if (filter === 'all') return true;
        return exp.type === filter;
    });

    return (
        <section id="experience" className="relative z-10 py-20 px-4 sm:px-6 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4"
                    >
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">Evolution</span> Log
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed"
                    >
                        A systematic chronicle of technical milestones, corporate contributions, and academic growth.
                    </motion.p>

                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-2 mt-8"
                    >
                        {[
                            { id: 'all', label: 'All Protocols', count: counts.all, icon: Layers },
                            { id: 'work', label: 'Work Experience', count: counts.work, icon: Briefcase },
                            { id: 'edu', label: 'Education', count: counts.edu, icon: GraduationCap },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = filter === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setFilter(tab.id as FilterType)}
                                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                        isActive
                                            ? 'text-white font-bold'
                                            : 'text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabBg"
                                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <Icon size={14} className={`relative z-10 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                                    <span className="relative z-10">{tab.label}</span>
                                    <span
                                        className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] ${
                                            isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-white/10 text-slate-400'
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Timeline Layout */}
                <div className="relative pt-4">
                    {/* Vertical Line - Desktop */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-transparent -translate-x-1/2 hidden md:block" />

                    {/* Vertical Line - Mobile */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-transparent md:hidden" />

                    <motion.div layout className="space-y-8 md:space-y-12">
                        <AnimatePresence mode="popLayout">
                            {filteredExperiences.map((exp, index) => {
                                const isWork = exp.type === 'work';
                                const isPresent = exp.period.toLowerCase().includes('present');

                                return (
                                    <motion.div
                                        key={exp.role + exp.company}
                                        layout
                                        initial={{ opacity: 0, y: 25, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                        className={`relative flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-0 pl-10 md:pl-0 ${
                                            index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                        }`}
                                    >
                                        {/* Connector Node - Desktop */}
                                        <div className="absolute left-1/2 top-8 w-4 h-4 rounded-full bg-[#050508] border-2 border-cyan-400 -translate-x-1/2 z-20 hidden md:flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                                        </div>

                                        {/* Connector Node - Mobile */}
                                        <div className="absolute left-4 top-8 w-3.5 h-3.5 rounded-full bg-[#050508] border-2 border-cyan-400 -translate-x-1/2 z-20 flex md:hidden items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                                            <div className="w-1 h-1 rounded-full bg-cyan-400" />
                                        </div>

                                        {/* Card Content Container */}
                                        <div className="w-full md:w-[46%]">
                                            <div className="group relative p-6 rounded-2xl bg-[#08080c]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-[0_0_35px_rgba(34,211,238,0.08)] overflow-hidden h-full flex flex-col justify-between">
                                                {/* Ambient top-right light accent */}
                                                <div
                                                    className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${
                                                        isWork ? 'from-cyan-500/10' : 'from-purple-500/10'
                                                    } to-transparent pointer-events-none group-hover:scale-125 transition-transform duration-700`}
                                                />

                                                <div>
                                                    {/* Header Metadata */}
                                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-all duration-500 shadow-md ${
                                                                    isWork
                                                                        ? 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                                                                        : 'bg-purple-500/10 border-purple-500/25 text-purple-400 group-hover:bg-purple-400 group-hover:text-black group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                                                }`}
                                                            >
                                                                {isWork ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                                                            </div>
                                                            <div>
                                                                <h3 className="text-base md:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                                                                    {exp.role}
                                                                </h3>
                                                                <p className="text-xs font-mono text-slate-400 tracking-wide mt-0.5">
                                                                    {exp.company}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Badges / Period */}
                                                        <div className="flex items-center gap-2">
                                                            {isPresent && (
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono tracking-widest uppercase font-bold">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                                    ACTIVE
                                                                </span>
                                                            )}
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] font-mono text-slate-300 font-medium">
                                                                <Calendar size={11} className={isWork ? 'text-cyan-400' : 'text-purple-400'} />
                                                                {exp.period}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed mb-5 group-hover:text-slate-200 transition-colors">
                                                        {exp.description}
                                                    </p>
                                                </div>

                                                {/* Tech / Competency Tags */}
                                                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                                                    {exp.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-[10px] font-mono text-slate-400 font-medium group-hover:border-cyan-500/20 group-hover:text-cyan-300 transition-colors"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Balance spacer for MD screens */}
                                        <div className="hidden md:block w-0 h-0" />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* View Full Resume CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 md:mt-20 flex justify-center"
                >
                    <a
                        href="/Hernata%20CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#08080c] border border-white/10 hover:border-cyan-500/40 transition-all duration-500 shadow-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest group-hover:text-white transition-colors relative z-10">
                            Download Technical Resume
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 group-hover:rotate-45 relative z-10">
                            <ArrowUpRight size={15} strokeWidth={2.5} />
                        </div>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default React.memo(Experience);

