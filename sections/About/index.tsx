'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Eye,
  Layers,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Code2,
  Zap,
  Shield,
  Palette,
  Cpu,
} from 'lucide-react';
import { experiences } from '../../constants';

export default function About() {
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'work' | 'edu'>('all');

  const coreTraits = [
    {
      num: '01',
      title: 'Problem Solver',
      desc: 'Analytical breakdown of complex requirements into clear, maintainable, and efficient software architecture.',
      icon: Brain,
    },
    {
      num: '02',
      title: 'Detail Precision',
      desc: 'Focus on responsive typography, fluid micro-interactions, high-contrast accessibility, and pixel accuracy.',
      icon: Eye,
    },
    {
      num: '03',
      title: 'Scalable Architecture',
      desc: 'Designing modular component systems and robust relational data schemas that gracefully handle scale.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Type Safety & Testing',
      desc: 'Strict TypeScript typing and automated unit tests to ensure long-term stability and regression-free releases.',
      icon: ShieldCheck,
    },
  ];

  const filteredExperiences = experiences.filter((exp) => {
    if (timelineFilter === 'all') return true;
    return exp.type === timelineFilter;
  });

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-10">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          03 / ABOUT &amp; EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Background &amp; Milestones
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-xl">
          Computer science foundations, production full-stack engineering, and digital media experience.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* ROW 1: Identity & Profile Bento Banner (Golden Ratio Span 12) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-6 sm:p-8 lg:p-10 relative overflow-hidden"
        >
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Bio Section (Span 7 - 61.8%) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-neutral-800 shrink-0 shadow-lg">
                  <Image
                    src="/profile.jpg"
                    alt="Hernata Ramadhan"
                    fill
                    className="object-cover"
                    sizes="80px"
                    priority
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Hernata Ramadhan
                    </h3>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      HRNT
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-cyan-400 font-mono mt-0.5">
                    Full-Stack Software Engineer • East Java, Indonesia (UTC+7)
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                Full-Stack Software Engineer bridging academic rigor in Computer Science with sharp aesthetic instincts from Visual Communication Design. Focused on building high-performance web architectures (React 19, Next.js), native desktop systems with minimal RAM footprint (Tauri v2, Rust), and reliable real-time database workflows (PostgreSQL, Supabase, Firebase).
              </p>

              {/* Core Stack Badges Strip */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'React 19 RSC',
                  'Next.js 16',
                  'TypeScript Strict',
                  'Tauri v2 & Rust',
                  'PostgreSQL & Supabase',
                  'Firebase Realtime',
                  'Three.js / R3F',
                  'Tailwind CSS',
                ].map((tech) => (
                  <span key={tech} className="tech-badge text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Quick Credentials & Foundations (Span 5 - 38.2%) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:border-l lg:border-neutral-800 lg:pl-8">
              <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-1">
                  <GraduationCap size={14} />
                  <span>Academic Degree</span>
                </div>
                <div className="text-xs font-bold text-white leading-snug">
                  B.S. in Computer Science
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  GPA 3.84 • Magna Cum Laude
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="flex items-center gap-2 text-neutral-300 text-xs font-mono font-bold mb-1">
                  <Palette size={14} />
                  <span>Design Foundation</span>
                </div>
                <div className="text-xs font-bold text-white leading-snug">
                  Visual Communication
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  SMKN 1 Wonoasri
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-1">
                  <Code2 size={14} />
                  <span>Engineering Paradigm</span>
                </div>
                <div className="text-xs font-bold text-white leading-snug">
                  Type-Safe &amp; Local-First
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Zero Fluff • Atomic State
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-1">
                  <CheckCircle2 size={14} />
                  <span>Current Availability</span>
                </div>
                <div className="text-xs font-bold text-white leading-snug">
                  Open to Opportunities
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Full-Time • Remote • Contract
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROW 2: Golden Ratio Split (7 vs 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Experience & Education Timeline (Span 7 - 61.8%) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 glass-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              {/* Timeline Header & Filter Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase size={18} className="text-cyan-400" />
                  <span>Career &amp; Academic Timeline</span>
                </h3>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-neutral-900/60 p-1 rounded-xl border border-neutral-800 self-start sm:self-auto">
                  {[
                    { id: 'all', label: `All (${experiences.length})` },
                    { id: 'work', label: 'Work (3)' },
                    { id: 'edu', label: 'Education (2)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setTimelineFilter(tab.id as 'all' | 'work' | 'edu')}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors ${
                        timelineFilter === tab.id
                          ? 'bg-neutral-800 text-white font-semibold border border-neutral-700'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vertical Timeline Nodes */}
              <div className="relative border-l border-neutral-800 ml-3 space-y-6">
                <AnimatePresence mode="popLayout">
                  {filteredExperiences.map((exp) => (
                    <motion.div
                      key={`${exp.role}-${exp.period}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="relative pl-7 group"
                    >
                      {/* Node Dot */}
                      <div
                        className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border transition-all duration-200 ${
                          exp.type === 'work'
                            ? 'bg-cyan-400 border-cyan-500/50 shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                            : 'bg-neutral-400 border-neutral-500/50 shadow-sm'
                        }`}
                      />
                      <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-1">
                        <span>{exp.period}</span>
                        <span className="capitalize text-cyan-400">{exp.type === 'work' ? 'Experience' : 'Education'}</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-neutral-400 font-medium mb-2">{exp.company}</p>
                      <p className="text-xs text-neutral-400 leading-relaxed font-normal mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((t) => (
                          <span key={t} className="tech-badge text-[10px] py-0.5 px-2">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Principles & Production Commitments (Span 5 - 38.2%) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Card 1: Engineering Principles */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-6 sm:p-8"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                Engineering Principles
              </h3>
              <p className="text-xs text-neutral-400 mb-5">
                Core architectural standards applied across frontend interfaces, database design, and API security.
              </p>

              <div className="space-y-3">
                {coreTraits.map((trait) => {
                  const Icon = trait.icon;
                  return (
                    <div
                      key={trait.num}
                      className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-850 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon size={15} className="text-cyan-400" />
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {trait.title}
                          </h4>
                        </div>
                        <span className="font-mono text-xs text-neutral-500">{trait.num}</span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed pl-6">
                        {trait.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Card 2: Production Commitments */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-6 rounded-2xl border border-neutral-800/80 space-y-3"
            >
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Production Engineering Commitments
                </h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Dedicated to writing accessible, self-documenting code with predictable state flow and sub-50ms interaction latency.
              </p>

              {/* 3 Core Commitments */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800 font-mono text-xs text-center">
                <div className="p-2 rounded-lg bg-neutral-900/40 border border-neutral-800/60">
                  <div className="text-cyan-400 font-bold flex items-center justify-center gap-1">
                    <Zap size={12} />
                    <span>&lt; 50ms</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Interaction INP</div>
                </div>
                <div className="p-2 rounded-lg bg-neutral-900/40 border border-neutral-800/60">
                  <div className="text-white font-bold flex items-center justify-center gap-1">
                    <Shield size={12} />
                    <span>Strict</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Type &amp; Schema</div>
                </div>
                <div className="p-2 rounded-lg bg-neutral-900/40 border border-neutral-800/60">
                  <div className="text-cyan-400 font-bold flex items-center justify-center gap-1">
                    <Cpu size={12} />
                    <span>60 FPS</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Three.js Graphics</div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}

