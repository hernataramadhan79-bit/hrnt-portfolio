'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Terminal,
  Activity,
  Award,
  Send,
  Check,
  Code2,
  Layers,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { projects, innerSkills, outerSkills } from '../../constants';
import { Project } from '../../types';
import {
  fetchGithubData,
  fetchWakaTimeData,
  getStoredGithubData,
  getStoredWakaTimeData,
} from '../../lib/clientDataCache';

const coreStack = [
  { name: 'React 19', role: 'UI Architecture', icon: '/icons/react.svg' },
  { name: 'Next.js 16', role: 'Full-Stack SSR', icon: '/icons/nextjs.svg' },
  { name: 'TypeScript', role: 'Strict Typing', icon: '/icons/typescript.svg' },
  { name: 'Node.js', role: 'Backend Engine', icon: '/icons/nodejs.svg' },
  { name: 'PostgreSQL', role: 'Relational DB', icon: '/icons/postgresql.svg' },
  { name: 'Tailwind CSS', role: 'Design System', icon: '/icons/tailwind.svg' },
  { name: 'Docker', role: 'Containers', icon: '/icons/docker.svg' },
  { name: 'GraphQL', role: 'Type-Safe API', icon: '/icons/graphql.svg' },
  { name: 'Git', role: 'CI/CD & DevOps', icon: '/icons/git.svg' },
];

interface DashboardProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onSelectProject, onNavigate }: DashboardProps) {
  const [quickMsg, setQuickMsg] = useState('');
  const [sentMsg, setSentMsg] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [telemetry, setTelemetry] = useState({
    repos: 19,
    stars: 0,
    contributions: 307,
    wakatimeHours: '71h+',
  });

  const showcaseProjects = projects.slice(0, 3);
  const currentProject = showcaseProjects[activeProjectIndex] || projects[0];

  const parseHours = (timeStr?: string) => {
    if (!timeStr) return '71h+';
    const match = timeStr.match(/\d+/);
    return match ? `${match[0]}h+` : '71h+';
  };

  useEffect(() => {
    // 1. Hidrasi sinkron instan dari client cache pada browser mount (0ms)
    const ghCached = getStoredGithubData();
    const wkCached = getStoredWakaTimeData();
    if (ghCached || wkCached) {
      setTelemetry({
        repos: ghCached?.profile?.repos ?? 19,
        stars: ghCached?.profile?.stars ?? 0,
        contributions: ghCached?.profile?.totalContributions ?? 307,
        wakatimeHours: parseHours(wkCached?.totalTime),
      });
    }

    // 2. Sinkronisasi latar belakang
    let isMounted = true;
    async function loadStats() {
      try {
        const [gh, wk] = await Promise.all([
          fetchGithubData().catch(() => null),
          fetchWakaTimeData().catch(() => null),
        ]);
        if (!isMounted) return;
        if (gh || wk) {
          setTelemetry({
            repos: gh?.profile?.repos ?? 19,
            stars: gh?.profile?.stars ?? 0,
            contributions: gh?.profile?.totalContributions ?? 307,
            wakatimeHours: parseHours(wk?.totalTime),
          });
        }
      } catch (err) {
        console.warn('Dashboard telemetry fetch warning:', err);
      }
    }
    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMsg.trim()) return;
    setSentMsg(true);
    setTimeout(() => {
      onNavigate('contact');
    }, 800);
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* 12-Column Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        
        {/* Bento Cell 1: Hero Identity (Span 7 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 glass-card p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[420px]"
        >
          {/* Cyan Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none" />

          {/* Background Transparent Portrait with Interactive Spotlight Elevation */}
          <motion.div
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
            animate={{
              scale: isPhotoHovered ? 1.035 : 1,
              y: isPhotoHovered ? -6 : 0,
              opacity: isPhotoHovered ? 1 : 0.42,
              zIndex: isPhotoHovered ? 20 : 0,
            }}
            transition={{
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-8 -bottom-2 sm:-bottom-3 lg:-bottom-5 select-none overflow-hidden h-[400px] sm:h-[480px] md:h-[540px] lg:h-[600px] aspect-[810/1015] flex items-end justify-end cursor-pointer"
            title="Hernata Ramadhan — Full-Stack Engineer"
          >
            <div className="relative w-full h-full">
              <Image
                src="/profile-cutout.webp"
                alt="Hernata Ramadhan"
                fill
                className={`object-contain object-right-bottom pointer-events-none filter contrast-105 transition-all duration-300 ${
                  isPhotoHovered ? 'drop-shadow-[0_10px_30px_rgba(34,211,238,0.25)]' : ''
                }`}
                style={{
                  objectPosition: 'right bottom',
                  maskImage: isPhotoHovered
                    ? 'linear-gradient(to left, black 82%, transparent 100%), linear-gradient(to top, black 90%, transparent 100%)'
                    : 'linear-gradient(to left, black 70%, transparent 100%), linear-gradient(to top, black 85%, transparent 100%)',
                  WebkitMaskImage: isPhotoHovered
                    ? 'linear-gradient(to left, black 82%, transparent 100%), linear-gradient(to top, black 90%, transparent 100%)'
                    : 'linear-gradient(to left, black 70%, transparent 100%), linear-gradient(to top, black 85%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'destination-in',
                }}
                priority
              />
            </div>
          </motion.div>

          <div className="relative z-10 flex flex-col justify-between h-full flex-grow pointer-events-none">
            <div className={`pointer-events-auto transition-opacity duration-300 ease-[0.22,1,0.36,1] ${isPhotoHovered ? 'opacity-75' : 'opacity-100'}`}>
              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 glass-badge rounded-full px-3.5 py-1.5 border border-cyan-500/30 bg-cyan-500/10">
                  <span className="live-dot" />
                  <span className="text-xs font-semibold text-cyan-300 tracking-wide uppercase font-mono">
                    Available: Full-Time • Remote • Contract
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 glass-badge rounded-full px-3 py-1.5 text-xs text-[#8e9192] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                  <span>Indonesia (UTC+7)</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white">
                  HRNT
                </h1>
                <div className="w-3.5 h-3.5 border-[2px] border-cyan-400 bg-transparent rotate-45 shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-300 mb-4 font-mono">
                Hernata Ramadhan — Full-Stack Software Engineer
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">high-performance</span> web architectures, end to end.
              </h2>

              <p className="text-sm sm:text-base text-[#c4c7c8] max-w-xl leading-relaxed font-normal">
                Specializing in React, Next.js, Node.js, and TypeScript. From scalable system architecture
                to pixel-precise user interfaces — building resilient digital products.
              </p>

              {/* Engineering Focus & Production Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 py-3 my-3 border-y border-white/10 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">3+ Years</div>
                  <div className="text-[11px] text-[#8e9192]">Engineering Focus</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">10+</div>
                  <div className="text-[11px] text-[#8e9192]">Shipped Solutions</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">100%</div>
                  <div className="text-[11px] text-[#8e9192]">Type-Safe Standards</div>
                </div>
              </div>

              {/* Core Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['React 19', 'Next.js 16', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-slate-300 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick CTA Actions */}
            <div className="pt-8 flex flex-wrap items-center gap-3 relative z-30 pointer-events-auto">
              <button
                onClick={() => onNavigate('work')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-sky-400 text-black text-xs font-bold px-5 py-3 rounded-full hover:brightness-110 hover:-translate-y-0.5 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-200 active:translate-y-0 active:scale-[0.98]"
              >
                <span>Explore Selected Work</span>
                <ArrowRight size={14} />
              </button>
              <a
                href="/Hernata CV.pdf"
                download
                className="inline-flex items-center gap-2 glass-badge text-white text-xs font-semibold px-4 py-3 rounded-full hover:bg-white/10 hover:border-cyan-400/40 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:scale-[0.98]"
              >
                <Download size={14} className="text-cyan-400" />
                <span>Curriculum Vitae</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bento Cell 2: Multi-Project Engineering Showcase (Span 5 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 glass-card p-5 sm:p-6 flex flex-col justify-between border-white/10 hover:border-cyan-400/20 transition-colors duration-200"
        >
          <div>
            {/* Card Header with Icon, Counter & Navigation */}
            <div className="flex items-center justify-between mb-3.5 border-b border-white/10 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-cyan-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Featured Engineering Works
                </h3>
              </div>
              <button
                onClick={() => onNavigate('work')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors flex items-center gap-1 group"
              >
                <span>All Projects ({projects.length})</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Primary Spotlight Banner for Selected Project */}
            <div
              onClick={() => onSelectProject(currentProject)}
              className="relative w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 hover:border-cyan-400/40 transition-colors duration-200 group cursor-pointer mb-3"
            >
              <div className="relative w-full h-44 sm:h-48 overflow-hidden">
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/50 to-transparent opacity-90" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="glass-badge px-2.5 py-0.5 rounded-full text-[10px] font-bold text-cyan-300 uppercase tracking-wider backdrop-blur-md border-cyan-400/30">
                    {currentProject.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                    0{activeProjectIndex + 1} / 0{showcaseProjects.length}
                  </span>
                </div>

                {/* Top Right Live / Indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-[10px] font-mono text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Flagship</span>
                </div>

                {/* View Details Floating Pill */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-mono font-medium text-cyan-300 bg-cyan-500/20 px-3 py-1.5 rounded-full border border-cyan-400/40 backdrop-blur-md group-hover:bg-cyan-500/30 group-hover:border-cyan-400/70 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-200">
                  <span>Explore Case Study</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </div>

            {/* Project Title & Substantive Technical Description */}
            <div className="mb-2.5">
              <h4
                onClick={() => onSelectProject(currentProject)}
                className="text-base font-bold text-white line-clamp-1 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {currentProject.title}
              </h4>
              <p className="text-xs text-[#c4c7c8] line-clamp-2 leading-relaxed font-normal mt-1">
                {currentProject.description}
              </p>
            </div>

            {/* 3 Hard Technical KPI Metrics (Zero Kopong) */}
            <div className="grid grid-cols-3 gap-2 my-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
              {currentProject.metrics?.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-xs sm:text-sm font-black text-cyan-400 font-mono tracking-tight">{m.value}</div>
                  <div className="text-[10px] text-[#8e9192] font-mono mt-0.5 truncate">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Project Switcher: 3 Selectable Project Cards */}
            <div className="grid grid-cols-3 gap-2">
              {showcaseProjects.map((p, idx) => {
                const isActive = idx === activeProjectIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`p-2.5 rounded-xl text-left transition-all duration-200 flex flex-col justify-between relative border ${
                      isActive
                        ? 'bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-[#8e9192]'}`}>
                          0{idx + 1}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                        )}
                      </div>
                      <h5 className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-white' : 'text-[#c4c7c8]'}`}>
                        {p.title.split('—')[0].trim()}
                      </h5>
                      <p className="text-[10px] text-[#8e9192] line-clamp-1 font-mono mt-0.5">
                        {p.tags[0]} • {p.tags[1]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Project Tech Badges & Direct Launch Bar */}
          <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {currentProject.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tech-badge text-[10px] py-0.5 px-2">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {currentProject.link && (
                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 transition-colors"
                  title="Open Live Deployment"
                >
                  <span>Live</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
              <button
                onClick={() => onSelectProject(currentProject)}
                className="text-xs text-white hover:text-cyan-300 font-mono flex items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-full transition-colors"
              >
                <span>Details</span>
                <ArrowRight size={11} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bento Cell 3: Core Tech Radar (Span 4 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-4 glass-card p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3.5 border-b border-white/10 pb-3">
              <h4 className="text-xs font-bold text-[#8e9192] uppercase tracking-widest flex items-center gap-2">
                <Terminal size={14} className="text-cyan-400" />
                <span>Core Tech Stack</span>
              </h4>
              <button
                onClick={() => onNavigate('capabilities')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
              >
                <span>All Skills (14+)</span>
                <ArrowRight size={11} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {coreStack.map((tech) => (
                <div
                  key={tech.name}
                  className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-cyan-400/30 transition-all duration-200 text-center flex flex-col items-center justify-center gap-1.5 group"
                >
                  <div className="relative w-5 h-5 shrink-0">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={20}
                      height={20}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <div className="w-full">
                    <span className="text-[11px] text-white font-bold block truncate group-hover:text-cyan-300 transition-colors">
                      {tech.name}
                    </span>
                    <span className="text-[9px] text-[#8e9192] font-mono block truncate mt-0.5">
                      {tech.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8e9192]">
            <span>Full-Stack Architecture</span>
            <span className="text-cyan-400">Strict Type Safety</span>
          </div>
        </motion.div>

        {/* Bento Cell 4: Production Metrics & Telemetry (Span 4 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-4 glass-card p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3.5 border-b border-white/10 pb-3">
              <h4 className="text-xs font-bold text-[#8e9192] uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} className="text-cyan-400" />
                <span>Production Metrics</span>
              </h4>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[10px] font-mono text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>LIVE SYNC</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-1">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-colors">
                <div className="text-2xl font-black text-white font-mono">9+</div>
                <div className="text-xs font-bold text-[#e3e1e9] mt-0.5">Engineered Apps</div>
                <div className="text-[10px] text-[#8e9192] font-mono">Web, 3D & Native</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-colors">
                <div className="text-2xl font-black text-cyan-400 font-mono" suppressHydrationWarning>
                  {telemetry.wakatimeHours || '71h+'}
                </div>
                <div className="text-xs font-bold text-[#e3e1e9] mt-0.5">Logged Focus</div>
                <div className="text-[10px] text-[#8e9192] font-mono">WakaTime Sync</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-colors">
                <div className="text-2xl font-black text-white font-mono" suppressHydrationWarning>
                  {telemetry.repos} / {telemetry.stars}★
                </div>
                <div className="text-xs font-bold text-[#e3e1e9] mt-0.5">GitHub Repos</div>
                <div className="text-[10px] text-[#8e9192] font-mono">Verified Commits</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-colors">
                <div className="text-2xl font-black text-emerald-400 font-mono" suppressHydrationWarning>
                  {telemetry.contributions}
                </div>
                <div className="text-xs font-bold text-[#e3e1e9] mt-0.5">Contributions</div>
                <div className="text-[10px] text-[#8e9192] font-mono">1-Year Activity</div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-white/10">
            <button
              onClick={() => onNavigate('stats')}
              className="w-full py-2 px-3 rounded-full border border-white/10 text-xs font-semibold text-[#e3e1e9] hover:bg-white/5 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors flex items-center justify-center gap-2 group"
            >
              <span>Explore Telemetry Dashboard</span>
              <ArrowRight size={12} className="text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Bento Cell 5: Career Milestones Highlight (Span 4 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.09, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-4 glass-card p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3.5 border-b border-white/10 pb-3">
              <h4 className="text-xs font-bold text-[#8e9192] uppercase tracking-widest flex items-center gap-2">
                <Award size={14} className="text-cyan-400" />
                <span>Background & Milestones</span>
              </h4>
              <button
                onClick={() => onNavigate('about')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
              >
                <span>Details</span>
                <ArrowRight size={11} />
              </button>
            </div>

            <div className="space-y-2.5 my-1">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 hover:border-cyan-400/30 transition-colors">
                <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                  <Code2 size={14} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="text-xs font-bold text-white truncate">Full-Stack Engineer</h5>
                    <span className="text-[10px] font-mono text-cyan-400 shrink-0">2023–Present</span>
                  </div>
                  <p className="text-[10px] text-[#8e9192] truncate">Independent Architecture & Web Apps</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 hover:border-cyan-400/30 transition-colors">
                <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                  <GraduationCap size={14} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="text-xs font-bold text-white truncate">Universitas PGRI Madiun</h5>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">GPA 3.84</span>
                  </div>
                  <p className="text-[10px] text-[#8e9192] truncate">B.S. in Computer Science • Magna Cum Laude</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 hover:border-cyan-400/30 transition-colors">
                <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                  <ShieldCheck size={14} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="text-xs font-bold text-white truncate">Verified Credentials</h5>
                    <span className="text-[10px] font-mono text-[#8e9192] shrink-0">3 Certs</span>
                  </div>
                  <p className="text-[10px] text-[#8e9192] truncate">BNSP Junior Web Developer & Dicoding</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8e9192]">
            <span>Clean Architecture & TDD</span>
            <button
              onClick={() => onNavigate('about')}
              className="text-cyan-400 hover:underline"
            >
              Full Profile →
            </button>
          </div>
        </motion.div>

        {/* Bento Cell 6: Express Connect & Direct Channels (Span 12 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.11, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-12 glass-card p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-mono mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Full-Time Roles &amp; High-Impact Contracts</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Let&apos;s engineer something extraordinary together.
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9192] leading-relaxed">
              Open to senior full-stack opportunities, remote engagements, and technical collaborations. Average response time: &lt; 24h.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-center md:justify-end">
            {/* Social Links Dock */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/hernataramadhan79-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-badge flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/hernata-ramadhan-614725350/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-badge flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:hernataramadhan79@gmail.com"
                className="w-10 h-10 rounded-full glass-badge flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://www.instagram.com/heropakentanq15_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-badge flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>

            {/* Quick Dispatch Input */}
            <form onSubmit={handleQuickSubmit} className="relative min-w-[260px] sm:min-w-[320px]">
              <input
                type="text"
                value={quickMsg}
                onChange={(e) => setQuickMsg(e.target.value)}
                placeholder="Type a message or inquiry..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-xs text-white placeholder-[#8e9192] focus:outline-none focus:border-cyan-400/50 transition-all"
              />
              <button
                type="submit"
                disabled={sentMsg}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 text-black flex items-center justify-center hover:brightness-110 transition-transform active:scale-90"
                aria-label="Send inquiry"
              >
                {sentMsg ? <Check size={14} /> : <Send size={14} />}
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
