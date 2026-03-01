'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ArrowUpRight, ChevronRight } from 'lucide-react';
import { experiences } from '@/constants';

const Experience: React.FC = () => {
    return (
        <section id="experience" className="relative z-10 py-20 px-4 sm:px-6 overflow-visible">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                {/* Header - More Professional & Centered Approach */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Professional Narrative
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6"
                    >
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Evolution</span> Log
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-[13px] md:text-[15px] font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        A systematic chronicle of technical growth, academic milestones, and professional engineering protocols.
                    </motion.p>
                </div>

                {/* Timeline Layout - Compact & Scalable */}
                <div className="relative space-y-4 md:space-y-6">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/20 via-white/5 to-transparent -translate-x-1/2 hidden md:block" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Connector Dot */}
                            <div className="absolute left-0 md:left-1/2 top-10 md:top-1/2 w-3 h-3 rounded-full bg-[#050508] border-2 border-cyan-500/50 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block ring-4 ring-cyan-500/10" />

                            {/* Content Card */}
                            <div className="w-full md:w-[45%]">
                                <div className="group relative p-6 rounded-2xl bg-[#08080a]/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.03)] overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/[0.02] to-transparent pointer-events-none" />

                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${exp.type === 'work' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black' : 'bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-black'}`}>
                                                {exp.type === 'work' ? <Briefcase size={18} strokeWidth={2} /> : <GraduationCap size={18} strokeWidth={2} />}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-white tracking-tight uppercase leading-none mb-1 group-hover:text-cyan-400 transition-colors">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{exp.company}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-mono text-slate-500 uppercase font-bold tracking-tighter">
                                            <Calendar size={10} className="text-cyan-500/50" />
                                            {exp.period}
                                        </div>
                                    </div>

                                    <p className="text-[12px] text-slate-400 font-light leading-relaxed mb-4 group-hover:text-slate-300 transition-colors">
                                        {exp.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {exp.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[8px] font-mono text-slate-500 uppercase tracking-widest font-bold group-hover:text-cyan-400 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-end pt-2 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-1 text-[8px] font-mono text-cyan-400 uppercase tracking-widest">
                                            Expand Protocol <ChevronRight size={10} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Spacer for MD screens */}
                            <div className="hidden md:block w-0 h-0" />
                        </motion.div>
                    ))}
                </div>

                {/* View Full Resume CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-20 flex justify-center"
                >
                    <a
                        href="/Hernata%20CV.pdf"
                        target="_blank"
                        className="group relative flex items-center gap-4 px-8 py-4 rounded-2xl bg-[#08080a] border border-white/10 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-white transition-colors relative z-10">Download Technical Resume</span>
                        <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all duration-500 group-hover:rotate-12 relative z-10">
                            <ArrowUpRight size={16} strokeWidth={2.5} />
                        </div>
                    </a>
                </motion.div>
            </div>

            <style jsx>{`
                .glass-card {
                    background: rgba(8, 8, 10, 0.4);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
            `}</style>
        </section>
    );
};

export default React.memo(Experience);
