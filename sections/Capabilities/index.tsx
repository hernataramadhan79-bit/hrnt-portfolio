'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Zap, Layers, Database } from 'lucide-react';
import { innerSkills, outerSkills } from '../../constants';

export default function Capabilities() {
  const allSkills = [...innerSkills, ...outerSkills];

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          02 / CORE CAPABILITIES
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Architecture &amp; Technical Stack
        </h2>
        <p className="text-sm text-[#8e9192] mt-2 max-w-xl">
          Modern full-stack web applications, scalable API protocols, containerized deployments, and system security.
        </p>
      </div>

      {/* Main Split: Left Interactive Flow / Right Capability Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Left: Architecture Diagram Simulator (Span 7) */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 glass-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative min-h-[460px]"
        >
          {/* Window Header */}
          <div className="flex items-center gap-2 mb-6 opacity-75 border-b border-white/10 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-cyan-400/80" />
            <span className="ml-4 font-mono text-xs text-[#8e9192] uppercase tracking-widest">
              system_architecture.svg
            </span>
          </div>

          {/* SVG Topology Flow Diagram */}
          <div className="flex-1 relative my-4 flex items-center justify-center">
            <svg
              className="w-full h-full min-h-[260px] max-h-[300px]"
              viewBox="0 0 600 320"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                </linearGradient>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                </linearGradient>
              </defs>

              {/* Connecting Dashed Flow Lines */}
              <path
                d="M 130 160 L 220 160"
                fill="none"
                stroke="url(#cyanGrad)"
                strokeWidth="2"
                className="flow-line"
              />
              <path
                d="M 320 160 C 370 160 370 70 440 70"
                fill="none"
                stroke="url(#skyGrad)"
                strokeWidth="2"
                className="flow-line"
              />
              <path
                d="M 320 160 C 370 160 370 250 440 250"
                fill="none"
                stroke="url(#cyanGrad)"
                strokeWidth="2"
                className="flow-line"
              />

              {/* Node 1: Client Edge */}
              <g transform="translate(30, 130)">
                <rect
                  width="100"
                  height="60"
                  rx="12"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.15)"
                />
                <text x="50" y="35" fill="#e3e1e9" textAnchor="middle" className="text-[11px] font-mono font-bold">
                  Client Edge
                </text>
              </g>

              {/* Node 2: API Gateway */}
              <g transform="translate(220, 130)">
                <rect
                  width="100"
                  height="60"
                  rx="12"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(34,211,238,0.5)"
                />
                <text x="50" y="32" fill="#22d3ee" textAnchor="middle" className="text-[11px] font-mono font-bold">
                  API Gateway
                </text>
                <text x="50" y="47" fill="#8e9192" textAnchor="middle" className="text-[9px] font-mono">
                  Rate Limit + CSP
                </text>
              </g>

              {/* Node 3: Next.js App Cluster */}
              <g transform="translate(440, 40)">
                <rect
                  width="120"
                  height="60"
                  rx="12"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(56,189,248,0.5)"
                />
                <text x="60" y="32" fill="#38bdf8" textAnchor="middle" className="text-[11px] font-mono font-bold">
                  Next.js App Core
                </text>
                <text x="60" y="47" fill="#8e9192" textAnchor="middle" className="text-[9px] font-mono">
                  React 19 &amp; Turbopack
                </text>
              </g>

              {/* Node 4: Persistence */}
              <g transform="translate(440, 220)">
                <rect
                  width="120"
                  height="60"
                  rx="12"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.15)"
                />
                <text x="60" y="32" fill="#e3e1e9" textAnchor="middle" className="text-[11px] font-mono font-bold">
                  Persistence
                </text>
                <text x="60" y="47" fill="#8e9192" textAnchor="middle" className="text-[9px] font-mono">
                  Postgres &amp; Firestore
                </text>
              </g>
            </svg>
          </div>

          {/* Terminal Console Logs */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-cyan-400 space-y-1">
            <p>&gt; routing client traffic through Next.js edge...</p>
            <p>&gt; rate-limiting engine active (client IP verification) [OK]</p>
            <p className="text-white">
              &gt; zero-downtime cache revalidation online
              <span className="terminal-cursor" />
            </p>
          </div>
        </motion.div>

        {/* Right: Capability Pillars (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Card 01: Frontend Engineering */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col justify-between group hover:border-cyan-400/30 transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#8e9192]">FRONTEND ARCHITECTURE</span>
                <Layers size={16} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Modern Frontend Engineering
              </h3>
              <p className="text-xs text-[#8e9192] leading-relaxed mb-4 font-normal">
                Building scalable web apps using React 19, Next.js 16, TypeScript, Zustand state management,
                and responsive Tailwind design tokens with fluid smooth animations.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="tech-badge text-[10px]">React 19</span>
              <span className="tech-badge text-[10px]">Next.js 16</span>
              <span className="tech-badge text-[10px]">TypeScript</span>
              <span className="tech-badge text-[10px]">Tailwind</span>
            </div>
          </motion.div>

          {/* Card 02: Backend & Database */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col justify-between group hover:border-cyan-400/30 transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#8e9192]">BACKEND &amp; DATA</span>
                <Database size={16} className="text-sky-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Backend Architecture &amp; Databases
              </h3>
              <p className="text-xs text-[#8e9192] leading-relaxed mb-4 font-normal">
                Designing type-safe RESTful APIs, relational databases with PostgreSQL, and realtime sync
                with Firebase and containerized microservice architectures.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="tech-badge text-[10px]">Node.js</span>
              <span className="tech-badge text-[10px]">PostgreSQL</span>
              <span className="tech-badge text-[10px]">Docker</span>
              <span className="tech-badge text-[10px]">REST / GraphQL</span>
            </div>
          </motion.div>

          {/* Card 03: Security & Optimization */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col justify-between group hover:border-cyan-400/30 transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#8e9192]">SECURITY &amp; CWV</span>
                <ShieldCheck size={16} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Defense-in-Depth Security
              </h3>
              <p className="text-xs text-[#8e9192] leading-relaxed mb-4 font-normal">
                Multi-layer input sanitization against XSS, strict CSP headers, in-memory IP rate limiting,
                and zero-cache reverse proxy headers for authenticated routes.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="tech-badge text-[10px]">Strict CSP</span>
              <span className="tech-badge text-[10px]">Rate Limiting</span>
              <span className="tech-badge text-[10px]">XSS Shield</span>
              <span className="tech-badge text-[10px]">Auth Proxy</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Grid: 14 Local Vector SVG Tech Badges */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
          <Zap size={16} className="text-cyan-400" />
          <span>Core Technologies (Zero External CDN Dependencies)</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {allSkills.map((s) => (
            <div
              key={s.name}
              className="glass-badge p-3 rounded-xl flex items-center gap-3 hover:bg-white/5 hover:border-cyan-400/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="w-6 h-6 shrink-0 relative">
                <Image
                  src={s.icon}
                  alt={s.name}
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-[#e3e1e9] truncate">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
