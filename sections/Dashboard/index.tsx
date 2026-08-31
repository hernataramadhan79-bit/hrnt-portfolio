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
  Activity,
  Layers,
  Clock,
  Code2,
} from 'lucide-react';
import { projects } from '../../constants';
import { Project } from '../../types';
import {
  fetchGithubData,
  fetchWakaTimeData,
  getStoredGithubData,
  getStoredWakaTimeData,
} from '../../lib/clientDataCache';

interface DashboardProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onSelectProject, onNavigate }: DashboardProps) {
  const [telemetry, setTelemetry] = useState({
    repos: 19,
    stars: 0,
    contributions: 307,
    wakatimeHours: '71h+',
    topLanguage: 'TypeScript',
  });

  const flagshipProject = projects[0]; // BangunCity
  const secondaryProjects = projects.slice(1, 4); // Huktif, SortiQ, etc.

  const parseHours = (timeStr?: string) => {
    if (!timeStr) return '71h+';
    const match = timeStr.match(/\d+/);
    return match ? `${match[0]}h+` : '71h+';
  };

  useEffect(() => {
    const ghCached = getStoredGithubData();
    const wkCached = getStoredWakaTimeData();
    if (ghCached || wkCached) {
      setTelemetry({
        repos: ghCached?.profile?.repos ?? 19,
        stars: ghCached?.profile?.stars ?? 0,
        contributions: ghCached?.profile?.totalContributions ?? 307,
        wakatimeHours: parseHours(wkCached?.totalTime),
        topLanguage: wkCached?.languages?.[0]?.name ?? 'TypeScript',
      });
    }

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
            topLanguage: wk?.languages?.[0]?.name ?? 'TypeScript',
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

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* ─── Golden Ratio (φ ≈ 1.618) Bento Grid: 61.8% Pitch vs 38.2% Telemetry ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Major Column (61.8% - lg:col-span-7): Identity, Value Proposition & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 glass-card p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Live Availability Status Pill */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 glass-badge rounded-full px-3 py-1 border border-cyan-500/30 bg-cyan-500/10">
                <span className="live-dot" />
                <span className="text-xs font-mono font-medium text-cyan-400 uppercase tracking-wide">
                  Available for Senior &amp; Full-Stack Roles
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 glass-badge rounded-full px-3 py-1 text-xs text-neutral-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                <span>Madiun, UTC+7</span>
              </div>
            </div>

            {/* Display Headline */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-neutral-400 block">
                Hernata Ramadhan
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Full-Stack Software Engineer &amp; Systems Craftsman
              </h1>
            </div>

            {/* Punchy Impact Statement (Zero Fluff, Max 2 sentences) */}
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed font-normal mb-8">
              Engineering high-performance web applications, robust system architectures, and mathematical interface designs with sub-50ms interaction response.
            </p>

            {/* Concrete Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 py-4 my-2 border-y border-neutral-800/80 max-w-lg">
              <div>
                <div className="text-2xl font-bold text-white font-mono">3+ Years</div>
                <div className="text-xs text-neutral-500 mt-0.5">Engineering Focus</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400 font-mono">10+</div>
                <div className="text-xs text-neutral-500 mt-0.5">Shipped Solutions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">100%</div>
                <div className="text-xs text-neutral-500 mt-0.5">Type-Safe Delivery</div>
              </div>
            </div>

            {/* Primary Stack Chips */}
            <div className="flex flex-wrap gap-2 pt-3">
              {['React 19', 'Next.js 16', 'TypeScript', 'Tauri & Rust', 'Node.js', 'PostgreSQL'].map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-8 mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('work')}
              className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-150 active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            >
              <span>Explore Selected Work</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="/Hernata CV.pdf"
              download
              className="inline-flex items-center gap-2 glass-badge text-neutral-300 hover:text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-neutral-800 transition-all duration-150 active:scale-[0.98]"
            >
              <Download size={14} className="text-cyan-400" />
              <span>Curriculum Vitae</span>
            </a>
            <div className="flex items-center gap-1.5 ml-auto">
              <a
                href="https://github.com/hernataramadhan79-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-badge flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/hernata-ramadhan-614725350/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-badge flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:hernataramadhan79@gmail.com"
                className="w-9 h-9 rounded-full glass-badge flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Minor Column (38.2% - lg:col-span-5): Visual Identity & Live Telemetry Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col justify-between gap-5"
        >
          {/* Portrait Elevation Frame — Centered subject with seamless studio vignette blending */}
          <div className="glass-card relative overflow-hidden flex-1 min-h-[360px] sm:min-h-[400px] lg:min-h-[420px] border-neutral-800/80 flex flex-col justify-end">
            {/* Ambient Background Glow & Studio Lighting Behind Subject */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/30 to-neutral-950 z-0 pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/[0.12] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-15 pointer-events-none" />

            {/* Profile Cutout Image — Horizontally Centered with balanced headroom & studio vignette */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] sm:w-[78%] lg:w-[82%] h-[90%] sm:h-[92%] lg:h-[94%] z-10 pointer-events-none flex items-end justify-center">
              <Image
                src="/profile-cutout-centered.webp"
                alt="Hernata Ramadhan"
                fill
                className="object-contain object-bottom filter contrast-[1.03] brightness-[1.02] drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)]"
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
              />
            </div>

            {/* Ambient vignette masks to dissolve all edges into the dark container */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent z-15 pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-neutral-950/60 to-transparent z-15 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-neutral-950/60 to-transparent z-15 pointer-events-none" />

            {/* Quick Identifier Badge */}
            <div className="absolute top-4 left-4 z-20 glass-badge px-3 py-1.5 rounded-xl border border-neutral-800/90 bg-neutral-950/85 backdrop-blur-md shadow-lg">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Hernata Ramadhan</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              </div>
              <div className="text-[10px] font-mono text-cyan-400 mt-0.5">CS Grad • Magna Cum Laude (GPA 3.84)</div>
            </div>
          </div>

          {/* Micro Live Activity Card (WakaTime + GitHub hook) */}
          <div className="glass-card p-5 border-neutral-800/80">
            <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-cyan-400" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">
                  Live Activity Telemetry
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span>SYNCED</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono">
              <div className="p-2.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-1">
                  <Clock size={12} />
                  <span>Tracked</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white" suppressHydrationWarning>
                  {telemetry.wakatimeHours}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-1">
                  <Code2 size={12} />
                  <span>Language</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-cyan-400 truncate" suppressHydrationWarning>
                  {telemetry.topLanguage}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-1">
                  <Github size={12} />
                  <span>Velocity</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white truncate" suppressHydrationWarning>
                  {telemetry.contributions}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ─── Golden Ratio Section 2: Flagship Case Study (61.8%) vs Rapid Highlights (38.2%) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Flagship Case Study Card (lg:col-span-8 - 61.8%) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onSelectProject(flagshipProject)}
          className="lg:col-span-8 glass-card p-6 sm:p-7 flex flex-col justify-between cursor-pointer group hover:border-neutral-700"
        >
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-cyan-400" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                  Flagship Case Study
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>View Full Breakdown</span>
                <ArrowUpRight size={13} />
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-5">
              <div className="md:col-span-6 relative h-48 sm:h-56 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <Image
                  src={flagshipProject.image}
                  alt={flagshipProject.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 glass-badge px-2.5 py-0.5 rounded-full text-[10px] font-mono text-cyan-400 border-cyan-500/30">
                  {flagshipProject.category}
                </span>
              </div>

              <div className="md:col-span-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {flagshipProject.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {flagshipProject.description}
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/80 font-mono text-center">
                  {flagshipProject.metrics?.map((m) => (
                    <div key={m.label} className="p-2 rounded-lg bg-neutral-900/40 border border-neutral-800/50">
                      <div className="text-xs font-bold text-cyan-400">{m.value}</div>
                      <div className="text-[10px] text-neutral-500 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-1.5 flex-wrap">
              {flagshipProject.tags.map((t) => (
                <span key={t} className="tech-badge text-[10px]">
                  {t}
                </span>
              ))}
            </div>
            <span className="text-neutral-400 hidden sm:inline">Three.js 60 FPS Engine</span>
          </div>
        </motion.div>

        {/* Secondary Rapid Highlights (lg:col-span-4 - 38.2%) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 glass-card p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                Secondary Highlights
              </span>
              <button
                onClick={() => onNavigate('work')}
                className="text-xs font-mono text-cyan-400 hover:underline"
              >
                All ({projects.length})
              </button>
            </div>

            <div className="space-y-3">
              {secondaryProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-850 cursor-pointer transition-all duration-150 group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1 mb-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {project.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[9px] font-mono text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Inspect</span>
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Verified Deployments</span>
            <button
              onClick={() => onNavigate('work')}
              className="text-cyan-400 hover:underline"
            >
              Browse All Work →
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

