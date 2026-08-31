'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  Activity,
  Globe,
  Server,
  Zap,
  Terminal,
  Check,
} from 'lucide-react';
import { TopologyFlowSvg } from './TopologyFlowSvg';

interface ArchitectureTier {
  id: 'web' | 'desktop' | 'backend' | 'data';
  number: string;
  name: string;
  shortLabel: string;
  category: string;
  status: string;
  description: string;
  role: string;
  protocols: string[];
  metrics: { label: string; value: string; detail: string }[];
  technologies: string[];
  keyImplementations: string[];
}

const ARCHITECTURE_TIERS: ArchitectureTier[] = [
  {
    id: 'web',
    number: '01',
    name: 'Modern Web & Reactive UI Systems',
    shortLabel: 'Web & UI',
    category: 'Web Application Layer',
    status: 'Production • React 19 RSC',
    description:
      'Engineering responsive, high-performance web applications using React 19, Next.js App Router, TypeScript, and Tailwind CSS. Combines React Server Components for zero-bundle server rendering with lightweight interactive client islands.',
    role:
      'Provides declarative component architecture, fluid 60 FPS spring physics animations, and canvas-based 3D isometric simulation rendering without layout shifts.',
    protocols: ['React 19 RSC', 'Server Actions', 'Zustand + Immer', 'Three.js / R3F', 'Framer Motion'],
    metrics: [
      { label: 'Rendering Pipeline', value: 'Hybrid RSC', detail: 'Zero-JS static server components' },
      { label: 'Client State', value: 'Zustand', detail: 'Predictable immutable store' },
      { label: '3D Simulation', value: '60 FPS', detail: 'Three.js canvas in BangunCity' },
    ],
    technologies: ['React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    keyImplementations: [
      'Interactive 3D isometric urban simulation with 128x128 expandable grid (BangunCity)',
      'Accessibility-focused responsive legal consultation portal with dark/light themes (Huktif)',
      'Client-side personal expense manager with instant chart visualization (Sakuku)',
    ],
  },
  {
    id: 'desktop',
    number: '02',
    name: 'Native Desktop & Systems Engineering',
    shortLabel: 'Desktop & Rust',
    category: 'Native Systems Layer',
    status: 'Compiled • Tauri v2 & Rust',
    description:
      'Building lightweight, memory-efficient cross-platform desktop applications using Tauri v2 with a native Rust backend. Bypasses bulky Chromium runtimes for minimal RAM footprint and direct operating system execution.',
    role:
      'Performs true binary header (magic bytes) stream inspection, atomic transaction rollback logging, and rapid file system I/O with native memory safety.',
    protocols: ['Tauri v2 IPC', 'Binary Magic Bytes', 'Atomic Transactions', 'Rust Memory Safety', 'YAML Config'],
    metrics: [
      { label: 'Memory Footprint', value: '< 30 MB', detail: 'Ultra-lean native execution' },
      { label: 'Binary Size', value: '< 15 MB', detail: 'Compact cross-platform installer' },
      { label: 'File Inspection', value: 'Magic Bytes', detail: 'Binary header vs extension heuristics' },
    ],
    technologies: ['Tauri v2', 'Rust', 'TypeScript', 'Tailwind CSS', 'Infer Crate'],
    keyImplementations: [
      'Content-aware desktop file categorization based on binary signatures (SortiQ)',
      'Atomic rollback transaction log guaranteeing 100% non-destructive file operations',
      'High-speed directory scanner processing thousands of files per second',
    ],
  },
  {
    id: 'backend',
    number: '03',
    name: 'Backend APIs & Streaming AI Systems',
    shortLabel: 'Backend & AI',
    category: 'Server & Inference Layer',
    status: 'Operational • Node & Streaming AI',
    description:
      'Architecting modular RESTful microservices and integrating Large Language Model (LLM) inference with streaming retrieval-augmented generation (RAG-Lite).',
    role:
      'Orchestrates asynchronous HTTP request lifecycles, streaming inference endpoints with Groq Cloud LPU, and strict runtime type verification with Zod schemas.',
    protocols: ['RESTful API', 'Server-Sent Events (SSE)', 'RAG-Lite Retrieval', 'Zod Contracts', 'Async Runtime'],
    metrics: [
      { label: 'Inference Speed', value: '< 400ms', detail: 'Sub-second streaming LLM responses' },
      { label: 'Knowledge Base', value: 'RAG-Lite', detail: 'Verified Indonesian statutory law index' },
      { label: 'Schema Safety', value: '100% Strict', detail: 'Zod end-to-end payload validation' },
    ],
    technologies: ['Node.js', 'Express.js', 'Next.js API', 'Groq LLaMA 3.3', 'Zod'],
    keyImplementations: [
      'Sub-400ms streaming legal advisory assistant with verified statute citations (Huktif)',
      'RESTful transaction endpoints for POS inventory workflows and auth handling',
      'Modular service architecture decoupling routing, validation, and domain rules',
    ],
  },
  {
    id: 'data',
    number: '04',
    name: 'Persistence & Real-Time Data Sync',
    shortLabel: 'Data & Sync',
    category: 'Data & Storage Layer',
    status: 'Synchronized • ACID & Real-Time',
    description:
      'Pairing relational database schema design in PostgreSQL with Prisma ORM alongside reactive sub-second state synchronization via Firebase Realtime Database.',
    role:
      'Maintains transactional integrity for business records and powers multi-device real-time event broadcasting with optimistic local UI mutations.',
    protocols: ['PostgreSQL ACID', 'Prisma ORM', 'WebSocket / Realtime', 'LocalStorage Cache', 'Optimistic UI'],
    metrics: [
      { label: 'Relational Safety', value: 'ACID Safe', detail: 'Strict foreign key and relational constraints' },
      { label: 'Sync Latency', value: '< 200ms', detail: 'Sub-second multi-device state broadcast' },
      { label: 'Offline Resilience', value: 'Local-First', detail: 'Zero-friction offline caching' },
    ],
    technologies: ['PostgreSQL', 'Prisma ORM', 'Firebase Realtime DB', 'Firestore', 'LocalStorage'],
    keyImplementations: [
      'Real-time transaction & inventory sync across tablet POS terminals (MyBoard Lite)',
      'Normalized relational schemas with Prisma migrations for enterprise healthcare apps',
      'Zero-account friction local-first storage for instant budgeting (Sakuku)',
    ],
  },
];

interface CategorizedTech {
  name: string;
  category: 'frontend' | 'backend' | 'devops';
  icon: string;
  level: 'Core Production' | 'Advanced' | 'Proficient';
  role: string;
  projects: string[];
}

const CATEGORIZED_TECH: CategorizedTech[] = [
  {
    name: 'React',
    category: 'frontend',
    icon: '/icons/react.svg',
    level: 'Core Production',
    role: 'UI Component Library & Virtual DOM',
    projects: ['BangunCity', 'Huktif', 'Sakuku'],
  },
  {
    name: 'Next.js',
    category: 'frontend',
    icon: '/icons/nextjs.svg',
    level: 'Core Production',
    role: 'Full-Stack App Router & Edge Runtime',
    projects: ['HRNT Portfolio', 'Huktif'],
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: '/icons/typescript.svg',
    level: 'Core Production',
    role: 'Compile-Time Type Integrity & Contracts',
    projects: ['All Codebases', 'BangunCity', 'SortiQ'],
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: '/icons/tailwind.svg',
    level: 'Core Production',
    role: 'Design Tokens & Zero-Runtime Utility Styling',
    projects: ['BangunCity', 'Huktif', 'MyBoard'],
  },
  {
    name: 'HTML5',
    category: 'frontend',
    icon: '/icons/html5.svg',
    level: 'Core Production',
    role: 'Semantic Document Architecture & WCAG a11y',
    projects: ['All Web Applications'],
  },
  {
    name: 'Figma',
    category: 'frontend',
    icon: '/icons/figma.svg',
    level: 'Advanced',
    role: 'Design Tokens & Interface Prototyping',
    projects: ['BangunCity Design', 'Portfolio Tokens'],
  },
  {
    name: 'Vue.js',
    category: 'frontend',
    icon: '/icons/vuejs.svg',
    level: 'Proficient',
    role: 'Alternative Reactive SPA Architecture',
    projects: ['Component Prototyping'],
  },
  {
    name: 'Node.js',
    category: 'backend',
    icon: '/icons/nodejs.svg',
    level: 'Core Production',
    role: 'Async Server Runtime & Microservice API',
    projects: ['API Server', 'SortiQ Engine'],
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    icon: '/icons/postgresql.svg',
    level: 'Core Production',
    role: 'Relational ACID Data Storage & Indexing',
    projects: ['Renova', 'RSUD Dolopo'],
  },
  {
    name: 'GraphQL',
    category: 'backend',
    icon: '/icons/graphql.svg',
    level: 'Advanced',
    role: 'Declarative Data Fetching & Strict Schemas',
    projects: ['Data Pipelines', 'API Endpoints'],
  },
  {
    name: 'Docker',
    category: 'devops',
    icon: '/icons/docker.svg',
    level: 'Advanced',
    role: 'Containerization & Reproducible Environments',
    projects: ['Microservice Deployments'],
  },
  {
    name: 'Git',
    category: 'devops',
    icon: '/icons/git.svg',
    level: 'Core Production',
    role: 'Version Control, Branching & GitOps Workflows',
    projects: ['All 18+ Repositories'],
  },
  {
    name: 'Jest / Vitest',
    category: 'devops',
    icon: '/icons/jest.svg',
    level: 'Advanced',
    role: 'Automated Unit & Regression Test Suites',
    projects: ['CI Test Suites', 'Portfolio Tests'],
  },
  {
    name: 'Vite',
    category: 'devops',
    icon: '/icons/vite.svg',
    level: 'Core Production',
    role: 'Next-Gen ESM Bundler & Instant HMR',
    projects: ['MyBoard POS', 'BangunCity'],
  },
];

export default function Capabilities() {
  const [activeTierId, setActiveTierId] = useState<'web' | 'desktop' | 'backend' | 'data'>('web');
  const [techFilter, setTechFilter] = useState<'all' | 'frontend' | 'backend' | 'devops'>('all');

  const currentTier = ARCHITECTURE_TIERS.find((t) => t.id === activeTierId) || ARCHITECTURE_TIERS[0];

  const filteredTech =
    techFilter === 'all'
      ? CATEGORIZED_TECH
      : CATEGORIZED_TECH.filter((t) => t.category === techFilter);

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
            02 / CORE CAPABILITIES
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Architecture &amp; Technical Stack
          </h1>
          <p className="text-sm text-[#8e9192] mt-2 max-w-2xl leading-relaxed">
            Specialized engineering stack across modern web applications, native desktop systems, high-performance backends, and real-time persistence layers.
          </p>
        </div>

        {/* Global Architecture Standards */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="glass-badge px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span>Specialization: Web, Desktop &amp; Backend</span>
          </div>
          <div className="glass-badge px-3 py-1.5 rounded-full border border-white/10 text-[#8e9192] hidden sm:flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-cyan-400" />
            <span>100% Strict Type Safety (TS &amp; Rust)</span>
          </div>
        </div>
      </div>

      {/* Main Split: Left Interactive System Architecture / Right Hard Capability Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        
        {/* Left: Interactive System Architecture & Pipeline Inspector (Span 7) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 glass-card p-3.5 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden relative border border-white/10 min-w-0 max-w-full"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-2 min-w-0 overflow-hidden">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="ml-1 sm:ml-2 flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                <Terminal size={13} className="text-cyan-400 shrink-0" />
                <span className="block font-mono text-[10px] sm:text-xs font-bold text-white tracking-tight overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
                  engineering_stack_architecture.svg
                </span>
              </div>
            </div>

            {/* Live Active Tier Indicator */}
            <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs shrink-0">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-cyan-300 font-semibold hidden sm:inline">
                Tier {currentTier.number}
              </span>
            </div>
          </div>

          {/* Dedicated Full-Width 4-Tier Interactive Segmented Control */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-black/60 rounded-2xl border border-white/10 my-4 w-full">
            {ARCHITECTURE_TIERS.map((tier) => {
              const isActive = activeTierId === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setActiveTierId(tier.id)}
                  className={`w-full py-2 px-2 text-xs font-mono font-medium rounded-xl transition-all duration-150 border text-center select-none truncate ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.25)] font-semibold'
                      : 'text-[#8e9192] hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                >
                  <span className="opacity-60 mr-1">{tier.number}</span>
                  <span>{tier.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Interactive Pipeline Stepper (Visible on Mobile Screens Only) */}
          <div className="block sm:hidden my-4 space-y-2 bg-[#07080c]/80 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-[10px] font-mono font-bold text-[#8e9192] uppercase tracking-wider">
                System Topology Flow
              </span>
              <span className="text-[10px] font-mono text-cyan-400">Tap tier to inspect</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {ARCHITECTURE_TIERS.map((tier) => {
                const isActive = activeTierId === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setActiveTierId(tier.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-150 flex items-center justify-between select-none ${
                      isActive
                        ? 'bg-cyan-500/15 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive
                            ? 'bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                            : 'bg-white/20'
                        }`}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-mono font-bold ${
                              isActive ? 'text-cyan-400' : 'text-[#8e9192]'
                            }`}
                          >
                            {tier.number}
                          </span>
                          <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#c4c7c8]'}`}>
                            {tier.shortLabel}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-[#8e9192] mt-0.5">
                          {tier.category}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                        isActive
                          ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30'
                          : 'text-[#8e9192] border-transparent'
                      }`}
                    >
                      {tier.metrics[0].value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Interactive Topology Flow Diagram (Visible on Tablet/Desktop sm+ screens) */}
          <TopologyFlowSvg
            activeTierId={activeTierId}
            onSelectTier={setActiveTierId}
          />

          {/* Dynamic Architectural Deep-Dive Inspector Panel */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3.5 sm:space-y-4 overflow-hidden min-w-0 max-w-full">
            {/* Header with Title & Operational Status */}
            <div className="border-b border-white/10 pb-3 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 bg-cyan-400/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-cyan-400/30 shrink-0">
                  TIER {currentTier.number}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-emerald-400 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>{currentTier.status}</span>
                </div>
              </div>
              <h2 className="text-sm sm:text-base lg:text-lg font-black text-white leading-snug" style={{wordBreak: 'break-word', overflowWrap: 'anywhere'}}>
                {currentTier.name}
              </h2>
            </div>

            {/* Substantive Technical Explanation */}
            <div className="text-xs sm:text-sm text-[#c4c7c8] leading-relaxed space-y-2 break-words">
              <p>{currentTier.description}</p>
              <p className="text-xs text-[#8e9192] italic">
                <strong className="text-slate-200 not-italic">Architectural Role: </strong>
                {currentTier.role}
              </p>
            </div>

            {/* 3 Hard Architectural Metric Cards */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-1">
              {currentTier.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/30 transition-colors flex flex-col justify-start min-w-0"
                >
                  <div className="text-xs sm:text-base font-black text-cyan-300 font-mono truncate">
                    {m.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-white mt-0.5 leading-tight break-words">
                    {m.label}
                  </div>
                  <div className="text-[9px] text-[#8e9192] leading-tight mt-1 hidden md:block">
                    {m.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Protocols & Technology Badges */}
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-[#8e9192] mr-1">Protocols:</span>
                {currentTier.protocols.map((proto) => (
                  <span
                    key={proto}
                    className="text-[10px] font-mono font-semibold text-slate-300 px-2 py-0.5 rounded bg-white/5 border border-white/10"
                  >
                    {proto}
                  </span>
                ))}
              </div>
              <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Verified in Production</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: 3 Hard Capability Pillars (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* Card 01: Frontend Architecture & Interactive 3D */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col justify-between border-white/10 hover:border-cyan-400/30 transition-colors duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#8e9192]">FRONTEND &amp; INTERACTIVE 3D</span>
                <Layers size={18} className="text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Frontend Architecture &amp; Interactive 3D
              </h2>
              <p className="text-xs text-[#c4c7c8] leading-relaxed mb-3 font-normal">
                Engineering reactive web applications with React 19 Server Components, modular design tokens,
                and fluid 60 FPS 3D canvas simulations. Zero static hydration overhead with sub-50ms interaction response.
              </p>

              {/* Hard Metrics Row */}
              <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-white/10 font-mono text-xs">
                <div>
                  <span className="text-white font-bold block">Hybrid RSC</span>
                  <span className="text-[10px] text-[#8e9192]">Render Pipeline</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block">60 FPS 3D</span>
                  <span className="text-[10px] text-[#8e9192]">Canvas Graphics</span>
                </div>
                <div>
                  <span className="text-white font-bold block">Zustand</span>
                  <span className="text-[10px] text-[#8e9192]">Immutable State</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['React 19 RSC', 'Next.js 16', 'TypeScript', 'Three.js / R3F', 'Zustand'].map((badge) => (
                  <span key={badge} className="tech-badge text-[10px]">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-[11px] font-mono text-[#8e9192]">
                <strong className="text-slate-300">Deployed In: </strong>
                BangunCity (3D Simulation), Huktif, Sakuku
              </div>
            </div>
          </motion.div>

          {/* Card 02: Native Systems & Desktop Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col justify-between border-white/10 hover:border-cyan-400/30 transition-colors duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#8e9192]">NATIVE SYSTEMS &amp; DESKTOP</span>
                <Cpu size={18} className="text-sky-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Native Desktop &amp; Systems Engineering
              </h2>
              <p className="text-xs text-[#c4c7c8] leading-relaxed mb-3 font-normal">
                Developing high-efficiency native cross-platform desktop applications using Tauri v2 and Rust.
                Eliminates bulky Chromium dependencies in favor of ultra-lean memory footprints and direct OS file system access.
              </p>

              {/* Hard Metrics Row */}
              <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-white/10 font-mono text-xs">
                <div>
                  <span className="text-white font-bold block">&lt; 30 MB</span>
                  <span className="text-[10px] text-[#8e9192]">RAM Footprint</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block">&lt; 15 MB</span>
                  <span className="text-[10px] text-[#8e9192]">Binary Package</span>
                </div>
                <div>
                  <span className="text-white font-bold block">Magic Bytes</span>
                  <span className="text-[10px] text-[#8e9192]">Binary Inspection</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Tauri v2', 'Rust', 'TypeScript', 'Infer Crate', 'Atomic Undo'].map((badge) => (
                  <span key={badge} className="tech-badge text-[10px]">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-[11px] font-mono text-[#8e9192]">
                <strong className="text-slate-300">Deployed In: </strong>
                SortiQ Desktop App (Binary Magic Bytes File Organizer)
              </div>
            </div>
          </motion.div>

          {/* Card 03: Backend Services, Real-Time & AI Systems */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.11, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col justify-between border-white/10 hover:border-cyan-400/30 transition-colors duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#8e9192]">BACKEND, PERSISTENCE &amp; AI</span>
                <Server size={18} className="text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Backend Services, Real-Time Sync &amp; AI
              </h2>
              <p className="text-xs text-[#c4c7c8] leading-relaxed mb-3 font-normal">
                Designing type-safe RESTful APIs, relational database schemas with PostgreSQL and Prisma,
                reactive sub-second data synchronization via Firebase, and streaming LLM inference.
              </p>

              {/* Hard Metrics Row */}
              <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-white/10 font-mono text-xs">
                <div>
                  <span className="text-white font-bold block">&lt; 400ms</span>
                  <span className="text-[10px] text-[#8e9192]">AI Streaming</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block">ACID Safe</span>
                  <span className="text-[10px] text-[#8e9192]">Relational Schema</span>
                </div>
                <div>
                  <span className="text-white font-bold block">&lt; 200ms</span>
                  <span className="text-[10px] text-[#8e9192]">Real-Time Sync</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'Firebase', 'Groq LLaMA'].map((badge) => (
                  <span key={badge} className="tech-badge text-[10px]">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-[11px] font-mono text-[#8e9192]">
                <strong className="text-slate-300">Deployed In: </strong>
                Huktif (Streaming LLaMA 3.3), MyBoard Lite (Real-time POS), RSUD Dolopo
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Container: Structured Technical Inventory with Category Filter */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap size={18} className="text-cyan-400" />
              <span>Production Technical Inventory</span>
            </h2>
            <p className="text-xs text-[#8e9192] mt-1">
              Zero external CDN lock-in: 100% local vector SVG assets, strict versioning, and verified production roles.
            </p>
          </div>

          {/* Filter Tabs (Responsive 2x2 on mobile, flex row on desktop — Zero layout shift) */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto">
            {(
              [
                { id: 'all', label: 'All (14)' },
                { id: 'frontend', label: 'Frontend (7)' },
                { id: 'backend', label: 'Backend (3)' },
                { id: 'devops', label: 'DevOps (4)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTechFilter(tab.id)}
                className={`w-full sm:w-auto px-3.5 py-2 text-xs font-mono font-medium rounded-xl transition-all duration-150 border text-center whitespace-nowrap select-none ${
                  techFilter === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                    : 'text-[#8e9192] hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Categorized Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="glass-card p-4 rounded-2xl border border-white/5 hover:border-cyan-400/40 hover:bg-white/[0.04] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 p-1.5 flex items-center justify-center relative shrink-0 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-200">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={22}
                      height={22}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      tech.level === 'Core Production'
                        ? 'text-cyan-300 border-cyan-400/30 bg-cyan-400/10'
                        : tech.level === 'Advanced'
                        ? 'text-sky-300 border-sky-400/30 bg-sky-400/10'
                        : 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10'
                    }`}
                  >
                    {tech.level}
                  </span>
                </div>

                <div className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </div>
                <p className="text-xs text-[#8e9192] mt-1 leading-relaxed line-clamp-2">
                  {tech.role}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/5 text-[10px] font-mono text-[#8e9192] truncate">
                <span className="text-slate-300">In: </span>
                {tech.projects.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
