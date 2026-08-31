'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  CheckCircle2,
  Zap,
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
      'Pairing relational database schema design in PostgreSQL with Supabase alongside reactive sub-second state synchronization via Firebase Realtime Database.',
    role:
      'Maintains transactional integrity for business records and powers multi-device real-time event broadcasting with optimistic local UI mutations.',
    protocols: ['PostgreSQL ACID', 'Supabase Realtime', 'WebSocket / Realtime', 'LocalStorage Cache', 'Optimistic UI'],
    metrics: [
      { label: 'Relational Safety', value: 'ACID Safe', detail: 'Strict foreign key and relational constraints' },
      { label: 'Sync Latency', value: '< 200ms', detail: 'Sub-second multi-device state broadcast' },
      { label: 'Offline Resilience', value: 'Local-First', detail: 'Zero-friction offline caching' },
    ],
    technologies: ['PostgreSQL', 'Supabase', 'Firebase Realtime DB', 'Firestore', 'LocalStorage'],
    keyImplementations: [
      'Real-time transaction & inventory sync across tablet POS terminals (MyBoard Lite)',
      'Normalized relational schemas and row-level security with Supabase & PostgreSQL',
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

const CATEGORIZED_STACK: CategorizedTech[] = [
  {
    name: 'React',
    category: 'frontend',
    icon: '/icons/react.svg',
    level: 'Core Production',
    role: 'Server Components (RSC) & Concurrent UI',
    projects: ['BangunCity', 'Huktif', 'Sakuku'],
  },
  {
    name: 'Next.js',
    category: 'frontend',
    icon: '/icons/nextjs.svg',
    level: 'Core Production',
    role: 'Hybrid SSR, App Router & Server Actions',
    projects: ['Portfolio', 'Huktif', 'BangunCity'],
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: '/icons/typescript.svg',
    level: 'Core Production',
    role: 'End-to-End Strict Static Typing & Schema Inference',
    projects: ['SortiQ', 'BangunCity', 'Huktif'],
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: '/icons/tailwind.svg',
    level: 'Core Production',
    role: 'Design System, Fluid Typography & Dark Mode',
    projects: ['Portfolio', 'Huktif', 'SortiQ'],
  },
  {
    name: 'Tauri',
    category: 'frontend',
    icon: '/icons/tauri.svg',
    level: 'Advanced',
    role: 'Ultra-Lean Native OS Windowing (<30MB RAM)',
    projects: ['SortiQ'],
  },
  {
    name: 'Three.js / R3F',
    category: 'frontend',
    icon: '/icons/threejs.svg',
    level: 'Advanced',
    role: '60 FPS 3D Canvas Rendering & Simulation',
    projects: ['BangunCity'],
  },
  {
    name: 'Node.js',
    category: 'backend',
    icon: '/icons/nodejs.svg',
    level: 'Core Production',
    role: 'Asynchronous Event Loop & High-Throughput REST APIs',
    projects: ['Huktif', 'MyBoard Lite'],
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    icon: '/icons/postgresql.svg',
    level: 'Core Production',
    role: 'Relational ACID Data Integrity & Constraints',
    projects: ['Enterprise Healthcare', 'MyBoard Lite'],
  },
  {
    name: 'Firebase',
    category: 'backend',
    icon: '/icons/firebase.svg',
    level: 'Advanced',
    role: 'Sub-Second Real-Time Database Synchronization',
    projects: ['MyBoard Lite', 'Portfolio Forum'],
  },
  {
    name: 'Docker',
    category: 'devops',
    icon: '/icons/docker.svg',
    level: 'Advanced',
    role: 'Containerization & Multi-Stage Builds',
    projects: ['CI/CD Pipelines'],
  },
  {
    name: 'GraphQL',
    category: 'backend',
    icon: '/icons/graphql.svg',
    level: 'Proficient',
    role: 'Declarative Querying & Network Payload Pruning',
    projects: ['Internal APIs'],
  },
  {
    name: 'Git',
    category: 'devops',
    icon: '/icons/git.svg',
    level: 'Core Production',
    role: 'Branching Strategy, Code Review & GitFlow',
    projects: ['All Projects'],
  },
  {
    name: 'Rust',
    category: 'backend',
    icon: '/icons/rust.svg',
    level: 'Advanced',
    role: 'Memory Safety, OS File Systems & Binary Stream Inspection',
    projects: ['SortiQ Engine'],
  },
  {
    name: 'Linux / Bash',
    category: 'devops',
    icon: '/icons/linux.svg',
    level: 'Proficient',
    role: 'Shell Scripting, Server Configuration & Automation',
    projects: ['Server Operations'],
  },
  {
    name: 'Supabase',
    category: 'backend',
    icon: '/icons/supabase.svg',
    level: 'Core Production',
    role: 'Serverless PostgreSQL, Realtime Subscriptions & Auth Engine',
    projects: ['Huktif', 'MyBoard Lite'],
  },
  {
    name: 'Redis',
    category: 'backend',
    icon: '/icons/redis.svg',
    level: 'Advanced',
    role: 'Sub-Millisecond In-Memory Caching & Session Store',
    projects: ['Internal APIs', 'MyBoard Lite'],
  },
];

export default function Capabilities() {
  const [activeTierId, setActiveTierId] = useState<'web' | 'desktop' | 'backend' | 'data'>('web');
  const [techFilter, setTechFilter] = useState<'all' | 'frontend' | 'backend' | 'devops'>('all');

  const currentTier = ARCHITECTURE_TIERS.find((t) => t.id === activeTierId) || ARCHITECTURE_TIERS[0];

  const filteredTech = CATEGORIZED_STACK.filter((tech) => {
    if (techFilter === 'all') return true;
    return tech.category === techFilter;
  });

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-10">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          02 / ARCHITECTURE &amp; CAPABILITIES
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          System Architecture &amp; Tech Matrix
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
          Multi-tier software engineering from client rendering pipelines to native desktop runtimes, streaming AI backends, and relational data stores.
        </p>
      </div>

      {/* Top Architecture Topology Section */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-neutral-800/80 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
              Interactive System Topology
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Click nodes to inspect architectural layers
          </span>
        </div>

        {/* Tier Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {ARCHITECTURE_TIERS.map((tier) => {
            const isActive = activeTierId === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTierId(tier.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-150 flex items-center justify-between select-none ${
                  isActive
                    ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                    : 'bg-neutral-900/40 border-neutral-800/60 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-neutral-500'}`}>
                      {tier.number}
                    </span>
                    <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                      {tier.shortLabel}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-0.5 truncate">
                    {tier.category}
                  </div>
                </div>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* SVG Flow Diagram */}
        <TopologyFlowSvg activeTierId={activeTierId} onSelectTier={setActiveTierId} />

        {/* Active Tier Inspector */}
        <div className="p-4 sm:p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                TIER {currentTier.number} • {currentTier.status}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {currentTier.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentTier.protocols.map((p) => (
                <span key={p} className="tech-badge text-[10px]">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {currentTier.description}
          </p>

          {/* Hard Architectural Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {currentTier.metrics.map((m) => (
              <div key={m.label} className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/60">
                <div className="text-base font-bold text-cyan-400 font-mono">{m.value}</div>
                <div className="text-xs font-semibold text-white mt-0.5">{m.label}</div>
                <div className="text-[11px] text-neutral-500 mt-0.5 font-mono">{m.detail}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800/80">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
              Key Implementations
            </span>
            <ul className="space-y-1.5">
              {currentTier.keyImplementations.map((impl) => (
                <li key={impl} className="text-xs text-neutral-300 flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{impl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Production Technical Inventory */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap size={18} className="text-cyan-400" />
              <span>Production Technical Inventory</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Curated stack inventory with strict production roles and project associations.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 bg-neutral-900/60 p-1.5 rounded-xl border border-neutral-800">
            {(
              [
                { id: 'all', label: 'All (16)' },
                { id: 'frontend', label: 'Frontend (6)' },
                { id: 'backend', label: 'Backend (7)' },
                { id: 'devops', label: 'DevOps (3)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTechFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors border ${
                  techFilter === tab.id
                    ? 'bg-neutral-800 text-white font-semibold border-neutral-700'
                    : 'text-neutral-500 hover:text-neutral-300 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-850 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-neutral-800/80 border border-neutral-700/60 p-1.5 flex items-center justify-center relative shrink-0 group-hover:border-cyan-500/40 transition-colors">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={22}
                      height={22}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border text-cyan-400 border-cyan-500/20 bg-cyan-500/10">
                    {tech.level}
                  </span>
                </div>

                <div className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </div>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                  {tech.role}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-neutral-800/80 text-[10px] font-mono text-neutral-500 truncate">
                <span className="text-neutral-400">In: </span>
                {tech.projects.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
