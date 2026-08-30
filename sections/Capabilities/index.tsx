'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  Activity,
  Globe,
  Lock,
  Server,
  Zap,
  ArrowRight,
  Code2,
  Terminal,
  Check,
} from 'lucide-react';

interface ArchitectureTier {
  id: 'edge' | 'security' | 'core' | 'data';
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
    id: 'edge',
    number: '01',
    name: 'Client Edge & Anycast Ingestion',
    shortLabel: 'Client Edge',
    category: 'Network & Ingestion Layer',
    status: 'Operational • < 35ms TTFB',
    description:
      'High-performance global request distribution via Cloudflare Anycast edge servers. Implements HTTP/3 over QUIC, TLS 1.3 encryption, and automated Brotli payload compression.',
    role:
      'Terminates SSL/TLS at the closest global point of presence, mitigating volumetric DDoS attacks and caching static assets with zero third-party CDN reliance.',
    protocols: ['HTTP/3 (QUIC)', 'TLS 1.3', 'Anycast DNS', 'Brotli Caching', 'Edge Middleware'],
    metrics: [
      { label: 'Edge TTFB', value: '< 35ms', detail: 'Global mean response time' },
      { label: 'Uptime SLA', value: '99.98%', detail: 'High-availability infrastructure' },
      { label: 'Asset Payload', value: '-65%', detail: 'Optimized local WebP/SVG encoding' },
    ],
    technologies: ['Next.js Edge', 'Cloudflare', 'Vercel Edge', 'DNSSEC'],
    keyImplementations: [
      'Anycast routing ensuring single-hop global request ingestion',
      'Dynamic header normalization before core server dispatch',
      'Automated Brotli compression reducing payload transfer latency',
    ],
  },
  {
    id: 'security',
    number: '02',
    name: 'Defense-in-Depth Security Shield',
    shortLabel: 'Security Shield',
    category: 'Zero-Trust Defense Layer',
    status: 'Enforced • A+ Rating',
    description:
      'Multi-layered defensive architecture protecting public endpoints from automated abuse, malicious injections, and cross-site scripting vulnerabilities.',
    role:
      'Executes in-memory sliding-window token bucket rate limiting (60 req/min/IP), strict Content Security Policy (CSP Level 3), and bidirectional input sanitization.',
    protocols: ['CSP Level 3', 'Token Bucket (60/min)', 'DOMPurify XSS Filter', 'HSTS Preload', 'Strict CORS'],
    metrics: [
      { label: 'Security Grade', value: 'A+ Rating', detail: 'OWASP Top 10 mitigation verified' },
      { label: 'Rate Limiter', value: '60 req/min', detail: 'In-memory sliding-window bucket' },
      { label: 'Type Integrity', value: '100% Strict', detail: 'Zod runtime schema validation' },
    ],
    technologies: ['DOMPurify', 'Zod', 'Security Headers', 'RateLimiter'],
    keyImplementations: [
      'In-memory IP token bucket preventing brute-force attacks and API scraping',
      'Strict nonce-based CSP blocking unauthorized external script execution',
      'Recursive input sanitization neutralizing malicious DOM injections',
    ],
  },
  {
    id: 'core',
    number: '03',
    name: 'Application Core & Hybrid Rendering',
    shortLabel: 'App Core',
    category: 'Execution & Rendering Tier',
    status: 'Optimized • React 19 RSC',
    description:
      'Modern full-stack application engine built on Next.js 16 App Router. Seamlessly unites React 19 Server Components for zero-bundle server rendering with performant client islands.',
    role:
      'Compiles dynamic view transitions, orchestrates immutable client state with Zustand, and delivers instant navigations via Incremental Static Regeneration (ISR).',
    protocols: ['React 19 RSC', 'Turbopack Engine', 'Hybrid SSG/ISR', 'Zustand State', 'Tailwind Tokens'],
    metrics: [
      { label: 'LCP Score', value: '< 0.8s', detail: 'Largest Contentful Paint speed' },
      { label: 'CLS Stability', value: '0.00', detail: 'Zero cumulative layout shift' },
      { label: 'Hydration Cost', value: '0 kB Static', detail: 'Zero JavaScript for static HTML' },
    ],
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    keyImplementations: [
      'React Server Components eliminating client JS overhead for content blocks',
      'Turbopack HMR and tree-shaking for minimal production bundle footprint',
      'Spring-damped physics animations for fluid 60 FPS user experience',
    ],
  },
  {
    id: 'data',
    number: '04',
    name: 'Persistence & Event Streaming',
    shortLabel: 'Persistence',
    category: 'Data Integrity & Storage Tier',
    status: 'Synchronized • Real-Time',
    description:
      'Dual-engine persistence layer pairing relational transactional integrity (PostgreSQL) with reactive sub-second event streaming (Firebase Realtime Database).',
    role:
      'Guarantees ACID transactions for structured relational data while maintaining WebSocket connection pools for collaborative real-time state synchronization.',
    protocols: ['PostgreSQL ACID', 'Prisma ORM', 'WebSocket Streams', 'Row-Level Security (RLS)'],
    metrics: [
      { label: 'Query Latency', value: '< 40ms', detail: 'Indexed relational query execution' },
      { label: 'Realtime Sync', value: '< 200ms', detail: 'WebSocket sub-second data broadcasts' },
      { label: 'Data Safety', value: 'ACID Compliant', detail: 'Guaranteed relational integrity' },
    ],
    technologies: ['PostgreSQL', 'Prisma ORM', 'Firebase', 'Supabase', 'Docker'],
    keyImplementations: [
      'Normalized relational schemas with foreign key integrity constraints',
      'WebSocket pub/sub pipelines for instant UI state synchronization',
      'Optimistic mutations with local rollback on connection drops',
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
  const [activeTierId, setActiveTierId] = useState<'edge' | 'security' | 'core' | 'data'>('core');
  const [techFilter, setTechFilter] = useState<'all' | 'frontend' | 'backend' | 'devops'>('all');

  const currentTier = ARCHITECTURE_TIERS.find((t) => t.id === activeTierId) || ARCHITECTURE_TIERS[2];

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
            Production-tested architectural blueprints, end-to-end type safety, multi-layered defensive security,
            and optimized runtime performance standards.
          </p>
        </div>

        {/* Global Architecture Health Bar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="glass-badge px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span>Architecture: 100% Strict Type-Safe</span>
          </div>
          <div className="glass-badge px-3 py-1.5 rounded-full border border-white/10 text-[#8e9192] hidden sm:flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-cyan-400" />
            <span>A+ Security Grade</span>
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
          className="lg:col-span-7 glass-card p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative border border-white/10"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <div className="ml-3 flex items-center gap-2">
                <Terminal size={14} className="text-cyan-400" />
                <span className="font-mono text-xs font-bold text-white tracking-wide">
                  system_architecture.svg
                </span>
              </div>
            </div>

            {/* Live Active Tier Indicator */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-cyan-300 font-semibold hidden xs:inline">
                Tier {currentTier.number} Active
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
          <div className="hidden sm:flex my-5 relative items-center justify-center bg-[#07080c]/60 rounded-2xl p-4 border border-white/5">
            <svg
              className="w-full h-full min-h-[220px] max-h-[260px]"
              viewBox="0 0 620 280"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="activeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Connecting Pipeline Paths with Live Signal Pulse */}
              <path
                d="M 125 140 L 195 140"
                fill="none"
                stroke={activeTierId === 'edge' || activeTierId === 'security' ? '#22d3ee' : 'rgba(255,255,255,0.15)'}
                strokeWidth="2.5"
                strokeDasharray={activeTierId === 'edge' || activeTierId === 'security' ? '6 4' : 'none'}
                className={activeTierId === 'edge' || activeTierId === 'security' ? 'flow-line' : ''}
              />
              <path
                d="M 315 140 C 370 140 370 65 425 65"
                fill="none"
                stroke={activeTierId === 'core' || activeTierId === 'security' ? '#38bdf8' : 'rgba(255,255,255,0.15)'}
                strokeWidth="2.5"
                strokeDasharray={activeTierId === 'core' || activeTierId === 'security' ? '6 4' : 'none'}
                className={activeTierId === 'core' || activeTierId === 'security' ? 'flow-line' : ''}
              />
              <path
                d="M 315 140 C 370 140 370 215 425 215"
                fill="none"
                stroke={activeTierId === 'data' || activeTierId === 'security' ? '#22d3ee' : 'rgba(255,255,255,0.15)'}
                strokeWidth="2.5"
                strokeDasharray={activeTierId === 'data' || activeTierId === 'security' ? '6 4' : 'none'}
                className={activeTierId === 'data' || activeTierId === 'security' ? 'flow-line' : ''}
              />

              {/* Node 1: Client Edge Network */}
              <g
                transform="translate(15, 105)"
                onClick={() => setActiveTierId('edge')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <rect
                  width="110"
                  height="70"
                  rx="14"
                  fill={activeTierId === 'edge' ? 'url(#activeGlow)' : 'rgba(255,255,255,0.03)'}
                  stroke={activeTierId === 'edge' ? '#22d3ee' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={activeTierId === 'edge' ? '2' : '1'}
                />
                <circle cx="24" cy="26" r="4" fill={activeTierId === 'edge' ? '#22d3ee' : '#8e9192'} />
                <text x="35" y="29" fill={activeTierId === 'edge' ? '#22d3ee' : '#8e9192'} className="text-[10px] font-mono font-bold">
                  01 EDGE
                </text>
                <text x="18" y="48" fill="#ffffff" className="text-[11px] font-bold">
                  Client Edge
                </text>
                <text x="18" y="62" fill="#8e9192" className="text-[9px] font-mono">
                  Cloudflare / QUIC
                </text>
              </g>

              {/* Node 2: Security Shield */}
              <g
                transform="translate(195, 105)"
                onClick={() => setActiveTierId('security')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <rect
                  width="120"
                  height="70"
                  rx="14"
                  fill={activeTierId === 'security' ? 'url(#activeGlow)' : 'rgba(255,255,255,0.03)'}
                  stroke={activeTierId === 'security' ? '#22d3ee' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={activeTierId === 'security' ? '2' : '1'}
                />
                <circle cx="24" cy="26" r="4" fill={activeTierId === 'security' ? '#22d3ee' : '#8e9192'} />
                <text x="35" y="29" fill={activeTierId === 'security' ? '#22d3ee' : '#8e9192'} className="text-[10px] font-mono font-bold">
                  02 DEFENSE
                </text>
                <text x="18" y="48" fill="#ffffff" className="text-[11px] font-bold">
                  Security Shield
                </text>
                <text x="18" y="62" fill="#8e9192" className="text-[9px] font-mono">
                  Rate Limit + CSP
                </text>
              </g>

              {/* Node 3: Next.js App Core */}
              <g
                transform="translate(425, 30)"
                onClick={() => setActiveTierId('core')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <rect
                  width="180"
                  height="70"
                  rx="14"
                  fill={activeTierId === 'core' ? 'url(#activeGlow)' : 'rgba(255,255,255,0.03)'}
                  stroke={activeTierId === 'core' ? '#38bdf8' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={activeTierId === 'core' ? '2' : '1'}
                />
                <circle cx="24" cy="26" r="4" fill={activeTierId === 'core' ? '#38bdf8' : '#8e9192'} />
                <text x="35" y="29" fill={activeTierId === 'core' ? '#38bdf8' : '#8e9192'} className="text-[10px] font-mono font-bold">
                  03 RUNTIME
                </text>
                <text x="18" y="48" fill="#ffffff" className="text-[11px] font-bold">
                  Next.js App Core
                </text>
                <text x="18" y="62" fill="#8e9192" className="text-[9px] font-mono">
                  React 19 RSC • Turbopack
                </text>
              </g>

              {/* Node 4: Persistence Layer */}
              <g
                transform="translate(425, 180)"
                onClick={() => setActiveTierId('data')}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <rect
                  width="180"
                  height="70"
                  rx="14"
                  fill={activeTierId === 'data' ? 'url(#activeGlow)' : 'rgba(255,255,255,0.03)'}
                  stroke={activeTierId === 'data' ? '#22d3ee' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={activeTierId === 'data' ? '2' : '1'}
                />
                <circle cx="24" cy="26" r="4" fill={activeTierId === 'data' ? '#22d3ee' : '#8e9192'} />
                <text x="35" y="29" fill={activeTierId === 'data' ? '#22d3ee' : '#8e9192'} className="text-[10px] font-mono font-bold">
                  04 STORAGE
                </text>
                <text x="18" y="48" fill="#ffffff" className="text-[11px] font-bold">
                  Persistence &amp; Real-time
                </text>
                <text x="18" y="62" fill="#8e9192" className="text-[9px] font-mono">
                  Postgres ACID + Firestore
                </text>
              </g>
            </svg>
          </div>

          {/* Dynamic Architectural Deep-Dive Inspector Panel */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 space-y-4">
            {/* Header with Title & Operational Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/30">
                  TIER {currentTier.number}
                </span>
                <h2 className="text-base sm:text-lg font-black text-white">
                  {currentTier.name}
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{currentTier.status}</span>
              </span>
            </div>

            {/* Substantive Technical Explanation */}
            <div className="text-xs sm:text-sm text-[#c4c7c8] leading-relaxed space-y-2">
              <p>{currentTier.description}</p>
              <p className="text-xs text-[#8e9192] italic">
                <strong className="text-slate-200 not-italic">Architectural Role: </strong>
                {currentTier.role}
              </p>
            </div>

            {/* 3 Hard Architectural Metric Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
              {currentTier.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-400/30 transition-colors"
                >
                  <div className="text-xs sm:text-base font-black text-cyan-300 font-mono">
                    {m.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-white mt-0.5 truncate">{m.label}</div>
                  <div className="text-[9px] text-[#8e9192] leading-tight mt-0.5 hidden md:block">
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
          
          {/* Card 01: Frontend Architecture & UX Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col justify-between border-white/10 hover:border-cyan-400/30 transition-colors duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#8e9192]">FRONTEND ARCHITECTURE</span>
                <Layers size={18} className="text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Frontend Architecture &amp; UX Performance
              </h2>
              <p className="text-xs text-[#c4c7c8] leading-relaxed mb-3 font-normal">
                Engineering reactive web applications with React 19 Server Components, modular design tokens,
                and fluid micro-interactions. Zero static hydration overhead with sub-50ms user interaction response.
              </p>

              {/* Hard Metrics Row */}
              <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-white/10 font-mono text-xs">
                <div>
                  <span className="text-white font-bold block">INP &lt; 50ms</span>
                  <span className="text-[10px] text-[#8e9192]">Interaction Latency</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block">0.00 CLS</span>
                  <span className="text-[10px] text-[#8e9192]">Visual Stability</span>
                </div>
                <div>
                  <span className="text-white font-bold block">98+ Score</span>
                  <span className="text-[10px] text-[#8e9192]">Lighthouse CWV</span>
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
                BangunCity (3D 60 FPS), Huktif, OryonWeb
              </div>
            </div>
          </motion.div>

          {/* Card 02: Distributed Backend & Persistence */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col justify-between border-white/10 hover:border-cyan-400/30 transition-colors duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#8e9192]">BACKEND &amp; PERSISTENCE</span>
                <Database size={18} className="text-sky-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Distributed Backend &amp; Data Systems
              </h2>
              <p className="text-xs text-[#c4c7c8] leading-relaxed mb-3 font-normal">
                Designing type-safe RESTful &amp; WebSocket APIs, normalized relational databases with PostgreSQL,
                and containerized microservice architectures with binary magic-byte stream parsing.
              </p>

              {/* Hard Metrics Row */}
              <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-white/10 font-mono text-xs">
                <div>
                  <span className="text-white font-bold block">&lt; 40ms Query</span>
                  <span className="text-[10px] text-[#8e9192]">Database Read</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block">ACID Safe</span>
                  <span className="text-[10px] text-[#8e9192]">Relational Schema</span>
                </div>
                <div>
                  <span className="text-white font-bold block">&lt; 200ms Sync</span>
                  <span className="text-[10px] text-[#8e9192]">WebSocket Sync</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Node.js', 'PostgreSQL', 'Prisma ORM', 'Docker', 'Firebase'].map((badge) => (
                  <span key={badge} className="tech-badge text-[10px]">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-[11px] font-mono text-[#8e9192]">
                <strong className="text-slate-300">Deployed In: </strong>
                SortiQ (Magic Bytes), Renova (Supabase RLS), RSUD Dolopo
              </div>
            </div>
          </motion.div>

          {/* Card 03: Zero-Trust Security & DevSecOps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.11, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 flex flex-col justify-between border-white/10 hover:border-cyan-400/30 transition-colors duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#8e9192]">SECURITY &amp; CODE INTEGRITY</span>
                <ShieldCheck size={18} className="text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Zero-Trust Security &amp; DevSecOps
              </h2>
              <p className="text-xs text-[#c4c7c8] leading-relaxed mb-3 font-normal">
                Multi-layer input sanitization against XSS, in-memory IP sliding window rate limiting, strict
                Content Security Policy without external CDN leaks, and automated Vitest regression suites.
              </p>

              {/* Hard Metrics Row */}
              <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-y border-white/10 font-mono text-xs">
                <div>
                  <span className="text-white font-bold block">A+ Rating</span>
                  <span className="text-[10px] text-[#8e9192]">Header Hardening</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold block">Zero CDN</span>
                  <span className="text-[10px] text-[#8e9192]">Self-Hosted Assets</span>
                </div>
                <div>
                  <span className="text-white font-bold block">100% CI Pass</span>
                  <span className="text-[10px] text-[#8e9192]">Vitest Unit Suite</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Strict CSP Level 3', 'Token Bucket', 'DOMPurify', 'Vitest CI'].map((badge) => (
                  <span key={badge} className="tech-badge text-[10px]">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-[11px] font-mono text-[#8e9192]">
                <strong className="text-slate-300">Deployed In: </strong>
                Hardened WebApps, Zero-External CDN Core
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
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 p-1.5 flex items-center justify-center relative shrink-0 group-hover:scale-110 transition-transform">
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
