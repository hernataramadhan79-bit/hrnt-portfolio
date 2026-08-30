'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Brain,
  Eye,
  Layers,
  Sparkles,
  Briefcase,
  Code2,
} from 'lucide-react';
import { experiences } from '../../constants';

export default function About() {
  const coreTraits = [
    {
      num: '01',
      title: 'Problem Solver',
      desc: 'Analytical breakdown of complex requirements into clear, maintainable, and efficient software architecture.',
      icon: Brain,
      color: '#22d3ee',
    },
    {
      num: '02',
      title: 'Detail Precision',
      desc: 'Focus on responsive typography, fluid micro-interactions, high-contrast accessibility, and pixel accuracy.',
      icon: Eye,
      color: '#38bdf8',
    },
    {
      num: '03',
      title: 'Scalable Architecture',
      desc: 'Designing modular component systems and robust relational data schemas that gracefully handle scale.',
      icon: Layers,
      color: '#60a5fa',
    },
    {
      num: '04',
      title: 'Type Safety & Testing',
      desc: 'Strict TypeScript typing and automated unit tests to ensure long-term stability and regression-free releases.',
      icon: Sparkles,
      color: '#818cf8',
    },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          03 / ABOUT &amp; EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Background &amp; Milestones
        </h2>
        <p className="text-sm text-[#8e9192] mt-2 max-w-xl">
          Computer science foundations, production full-stack engineering, and digital media experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Biography & Milestones (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-400/30 shrink-0">
                <Image
                  src="/profile.jpg"
                  alt="Hernata Ramadhan"
                  fill
                  className="object-cover"
                  sizes="64px"
                  priority
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Hernata Ramadhan (HRNT)
                </h3>
                <p className="text-xs text-cyan-400 font-mono">Full-Stack Software Engineer • East Java, Indonesia</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#c4c7c8] leading-relaxed mb-6 font-normal">
              Full-Stack Software Engineer with academic foundations in Computer Science and Visual Communication Design.
              Experienced in architecting modern web applications, 3D browser simulations with Three.js, and type-safe
              APIs with Next.js and Node.js. Committed to clean code, strong system security, and performance-first UX.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="tech-badge text-xs">React 19 &amp; Next.js 16</span>
              <span className="tech-badge text-xs">TypeScript Strict Mode</span>
              <span className="tech-badge text-xs">PostgreSQL &amp; Firebase</span>
              <span className="tech-badge text-xs">Three.js / WebGL</span>
              <span className="tech-badge text-xs">Tailwind CSS</span>
            </div>
          </motion.div>

          {/* Timeline Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-cyan-400" />
              <span>Experience &amp; Education Timeline</span>
            </h3>

            <div className="relative border-l border-white/10 ml-3 space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-7 group">
                  {/* Glowing Node Dot */}
                  <div
                    className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border transition-transform duration-200 ${
                      exp.type === 'work'
                        ? 'bg-cyan-400 border-cyan-400/50 group-hover:scale-110 shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                        : 'bg-sky-400 border-sky-400/50 group-hover:scale-110 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                    }`}
                  />
                  <div className="flex items-center justify-between text-xs text-[#8e9192] font-mono mb-1">
                    <span>{exp.period}</span>
                    <span className="capitalize text-cyan-300">{exp.type === 'work' ? 'Experience' : 'Education'}</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h4>
                  <p className="text-xs text-[#8e9192] font-medium mb-2">{exp.company}</p>
                  <p className="text-xs text-[#c4c7c8]/90 leading-relaxed font-normal mb-3">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <span key={t} className="tech-badge text-[10px] py-0.5 px-2">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column: Professional Traits (Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-2">
              Engineering Principles
            </h3>
            <p className="text-xs text-[#8e9192] mb-6">
              Core standards applied across frontend interfaces, database design, and API security.
            </p>

            <div className="space-y-4">
              {coreTraits.map((trait) => {
                const Icon = trait.icon;
                return (
                  <div
                    key={trait.num}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                          style={{ backgroundColor: `${trait.color}20`, border: `1px solid ${trait.color}40` }}
                        >
                          <Icon size={16} style={{ color: trait.color }} />
                        </div>
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {trait.title}
                        </h4>
                      </div>
                      <span className="font-mono text-xs text-[#8e9192]">{trait.num}</span>
                    </div>
                    <p className="text-xs text-[#8e9192] leading-relaxed pl-10">
                      {trait.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Focus Overview Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-cyan-500/[0.02]">
            <div className="flex items-center gap-2 mb-2">
              <Code2 size={16} className="text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Engineering Focus
              </h4>
            </div>
            <p className="text-xs text-[#c4c7c8] leading-relaxed">
              Prioritizing fast load times, robust defense-in-depth security headers, and responsive layouts
              tested across desktop, tablet, and mobile breakpoints.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
