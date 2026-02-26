'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const experiences = [
    {
        type: 'work',
        role: 'Fullstack Freelancer',
        company: 'Self-Employed',
        period: '2023 - Present',
        description: 'Providing bespoke digital solutions for local and international clients, focusing on React, Next.js, and high-performance infrastructure.',
        tags: ['React', 'Next.js', 'PostgreSQL', 'UI/UX']
    },
    {
        type: 'edu',
        role: 'University Student',
        company: 'University of PGRI Madiun',
        period: '2025 - Present',
        description: 'Pursuing academic excellence in Computer Science, deepening knowledge in distributed systems and software orchestration.',
        tags: ['Algorithms', 'Logic', 'Architecture']
    },
    {
        type: 'edu',
        role: 'High School Graduate',
        company: 'SMKN 1 Wonoasri',
        period: '2022 - 2025',
        description: 'Specialized in Software Engineering, building a robust foundation in web subsystems and programming patterns.',
        tags: ['Web Dev', 'Networking']
    }
];

const Experience: React.FC = () => {
    return (
        <section id="experience" className="relative z-10 py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    {/* Left: Sticky Header */}
                    <div className="lg:col-span-4 h-fit lg:sticky lg:top-24">
                        <div className="space-y-8">
                            <div className="space-y-6 relative">
                                <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em] backdrop-blur-sm"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    Evolution Log
                                </motion.span>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-3xl md:text-5xl font-black leading-tight text-white tracking-tighter"
                                >
                                    Building <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">The Narrative.</span>
                                </motion.h2>
                                <p className="text-[13px] text-slate-400 font-light leading-relaxed max-w-sm">
                                    A technical chronicle of my professional growth. Every protocol marks a milestone in digital engineering.
                                </p>
                            </div>

                            {/* Operational Metrics - Highlighting Professional Weight */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-5 relative overflow-hidden group shadow-xl backdrop-blur-md"
                            >
                                <div className="absolute top-0 left-0 w-1 h-0 bg-cyan-400 group-hover:h-full transition-all duration-500" />
                                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />

                                <div className="space-y-1">
                                    <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Operational Metrics</h3>
                                    <p className="text-[10px] text-slate-500 font-mono">System-wide performance indicators</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Projects', value: '12+', sub: 'Completed' },
                                        { label: 'Clients', value: '08+', sub: 'Global' },
                                        { label: 'Uptime', value: '99.9%', sub: 'Reliability' },
                                        { label: 'Stack', value: '04+', sub: 'Core Paradigms' }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-1">
                                            <div className="text-xl font-black text-white tracking-tighter group-hover:text-cyan-400 transition-colors">{stat.value}</div>
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                                <span className="text-[7px] font-mono text-slate-500 uppercase">{stat.sub}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-white/5 space-y-3">
                                    {[
                                        { text: 'Architecture Optimization', color: 'text-cyan-400' },
                                        { text: 'Scalable Systems Design', color: 'text-purple-400' }
                                    ].map((p, i) => (
                                        <div key={i} className="flex items-center gap-3 group/item">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-white/10 group-hover/item:border-cyan-500/50 group-hover/item:scale-125 transition-all" />
                                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest group-hover/item:text-slate-200 transition-colors">{p.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Timeline */}
                    <div className="lg:col-span-8 space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[27px] lg:left-[39px] top-12 bottom-12 w-px bg-gradient-to-b from-cyan-400/20 via-white/5 to-transparent hidden sm:block" />

                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.15 }}
                                className="relative sm:pl-20 group"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[24px] lg:left-[36px] top-10 w-2 h-2 rounded-full bg-white/10 group-hover:bg-cyan-400 group-hover:scale-[3] transition-all duration-700 z-10 hidden sm:block" />

                                <div className="p-6 md:p-8 rounded-2xl bg-[#050508]/40 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 shadow-xl relative overflow-hidden group-hover:shadow-[0_0_50px_rgba(34,211,238,0.05)] backdrop-blur-sm">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-400/[0.03] to-transparent rounded-bl-full group-hover:from-cyan-400/10 transition-colors duration-700" />
                                    <div className="absolute inset-0 bg-grid-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 text-left relative z-10">
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 shadow-md ${exp.type === 'work' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black' : 'bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:bg-purple-400 group-hover:text-black'} group-hover:-rotate-6 group-hover:scale-110`}>
                                                {exp.type === 'work' ? <Briefcase size={22} strokeWidth={1.5} /> : <GraduationCap size={22} strokeWidth={1.5} />}
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-50 transition-colors tracking-tighter uppercase leading-none">
                                                    {exp.role}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] font-bold">{exp.company}</span>
                                                    <div className="w-1 h-1 rounded-full bg-white/10" />
                                                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                                                        <Calendar size={10} className="text-slate-600" />
                                                        <span>{exp.period}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-[13px] text-slate-400 font-light leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-300 relative z-10 max-w-2xl">
                                        {exp.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 relative z-10">
                                        {exp.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono text-slate-400 uppercase tracking-widest group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-all font-bold backdrop-blur-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* View Full Resume CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="sm:pl-20 pt-4"
                        >
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                className="group relative inline-flex items-center gap-3 px-5 py-3 rounded-full glass glass-hover border-white/5 transition-all duration-500 shadow-xl"
                            >
                                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                                <span className="text-[9px] font-mono text-slate-300 uppercase tracking-widest font-bold group-hover:text-white transition-colors relative z-10">Access Datalink</span>
                                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 group-hover:rotate-12 shadow-md relative z-10">
                                    <ArrowUpRight size={14} strokeWidth={2} />
                                </div>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Experience);

