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
} from 'lucide-react';
import { projects, innerSkills, outerSkills } from '../../constants';
import { Project } from '../../types';
import { fetchGithubData, fetchWakaTimeData } from '../../lib/clientDataCache';

interface DashboardProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onSelectProject, onNavigate }: DashboardProps) {
  const [quickMsg, setQuickMsg] = useState('');
  const [sentMsg, setSentMsg] = useState(false);
  const [telemetry, setTelemetry] = useState({
    repos: 18,
    stars: 15,
    wakatimeHours: '248h+',
  });

  const featuredProject = projects[0]; // BangunCity — 3D Isometric City Builder

  useEffect(() => {
    async function loadStats() {
      try {
        const [gh, wk] = await Promise.all([
          fetchGithubData().catch(() => null),
          fetchWakaTimeData().catch(() => null),
        ]);
        setTelemetry({
          repos: gh?.profile?.repos || 18,
          stars: gh?.profile?.stars || 15,
          wakatimeHours: wk?.totalTime || '248h+',
        });
      } catch (err) {
        console.warn('Dashboard telemetry fetch warning:', err);
      }
    }
    loadStats();
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 glass-card p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[420px]"
        >
          {/* Cyan Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none" />

          {/* Background Transparent Portrait Behind Text */}
          <div className="absolute right-0 bottom-0 top-0 w-full sm:w-[65%] lg:w-[50%] pointer-events-none select-none z-0 flex items-end justify-end overflow-hidden">
            <div className="relative w-full h-[95%] sm:h-full">
              <Image
                src="/profile-cutout.png"
                alt="Hernata Ramadhan"
                fill
                className="object-contain object-bottom sm:object-right-bottom opacity-20 sm:opacity-25 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none filter contrast-105"
                style={{
                  maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to left, black 50%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to left, black 50%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'destination-in',
                }}
                priority
              />
            </div>
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full flex-grow">
            <div>
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

              {/* Core Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-4">
                {['React 19', 'Next.js 16', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-slate-300 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick CTA Actions */}
            <div className="pt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('work')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-sky-400 text-black text-xs font-bold px-5 py-3 rounded-full hover:brightness-110 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-transform hover:scale-105 active:scale-95"
              >
                <span>Explore Selected Work</span>
                <ArrowRight size={14} />
              </button>
              <a
                href="/Hernata CV.pdf"
                download
                className="inline-flex items-center gap-2 glass-badge text-white text-xs font-semibold px-4 py-3 rounded-full hover:bg-white/10 hover:border-cyan-400/40 transition-colors"
              >
                <Download size={14} className="text-cyan-400" />
                <span>Curriculum Vitae</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bento Cell 2: Featured Project Spotlight (Span 5 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelectProject(featuredProject)}
          className="md:col-span-5 glass-card p-0 flex flex-col relative overflow-hidden group cursor-pointer border-white/10 hover:border-cyan-400/30 transition-colors duration-300 min-h-[400px]"
        >
          {/* Image Thumbnail Container */}
          <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-black/50">
            <Image
              src={featuredProject.image}
              alt={featuredProject.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 450px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent opacity-80" />
            <div className="absolute top-4 left-4">
              <span className="glass-badge px-3 py-1 rounded-full text-[11px] font-bold text-cyan-300 uppercase tracking-wider backdrop-blur-md border-cyan-400/30">
                Featured Flagship
              </span>
            </div>
            <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <ArrowUpRight size={18} />
            </div>
          </div>

          {/* Project Details */}
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                {featuredProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#8e9192] line-clamp-2 mb-4 leading-relaxed font-normal">
                {featuredProject.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-auto">
              {featuredProject.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tech-badge text-[10px] py-1 px-2">
                  {tag}
                </span>
              ))}
              <span className="tech-badge text-[10px] text-cyan-300 border-cyan-400/30 py-1 px-2">
                60 FPS 3D Engine
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bento Cell 3: Core Tech Radar (Span 4 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 glass-card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-[#8e9192] uppercase tracking-widest flex items-center gap-2">
              <Terminal size={14} className="text-cyan-400" />
              <span>Core Tech Stack</span>
            </h4>
            <button
              onClick={() => onNavigate('capabilities')}
              className="text-[11px] text-cyan-400 hover:underline font-mono"
            >
              All Skills →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {[...innerSkills, ...outerSkills.slice(0, 3)].map((skill) => (
              <div
                key={skill.name}
                className="glass-badge p-3 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/5 hover:border-cyan-400/30 transition-all text-center group"
              >
                <div className="relative w-6 h-6 shrink-0">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-[11px] text-[#c4c7c8] group-hover:text-white font-medium truncate w-full">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bento Cell 4: Production Metrics (Span 4 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 glass-card p-6 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#8e9192] uppercase tracking-widest flex items-center gap-2">
              <Activity size={14} className="text-cyan-400" />
              <span>Production Metrics</span>
            </h4>
            <span className="text-[11px] text-cyan-400 font-mono">LIVE SYNC</span>
          </div>

          <div className="space-y-3.5 my-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs text-[#8e9192] uppercase font-semibold">Web Applications</span>
              <span className="text-2xl font-black text-white">9+ Built</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs text-[#8e9192] uppercase font-semibold">Verified Credentials</span>
              <span className="text-2xl font-black text-white">3 Certs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8e9192] uppercase font-semibold">Client CSAT Score</span>
              <span className="text-2xl font-black text-cyan-400">100%</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('stats')}
            className="w-full mt-3 py-2 px-3 rounded-full border border-white/10 text-xs font-semibold text-[#e3e1e9] hover:bg-white/5 hover:border-cyan-400/40 transition-colors flex items-center justify-center gap-2"
          >
            <span>Telemetry Dashboard</span>
            <ArrowRight size={12} className="text-cyan-400" />
          </button>
        </motion.div>

        {/* Bento Cell 5: Career Milestones Highlight (Span 4 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 glass-card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#8e9192] uppercase tracking-widest flex items-center gap-2">
              <Award size={14} className="text-cyan-400" />
              <span>Background & Milestones</span>
            </h4>
            <button
              onClick={() => onNavigate('about')}
              className="text-[11px] text-cyan-400 hover:underline font-mono"
            >
              Details →
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400">
                <Code2 size={16} />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Full-Stack Engineer</h5>
                <p className="text-[11px] text-[#8e9192]">Independent Consulting (2023–Present)</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400">
                <Terminal size={16} />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Universitas PGRI Madiun</h5>
                <p className="text-[11px] text-[#8e9192]">B.S. in Computer Science / Informatics</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[11px] text-[#8e9192] block font-mono">
              Next.js 16 • React 19 • TypeScript • Node.js
            </span>
          </div>
        </motion.div>

        {/* Bento Cell 6: Express Connect & Direct Channels (Span 12 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-12 glass-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Let&apos;s build something together.
            </h3>
            <p className="text-xs sm:text-sm text-[#8e9192]">
              Available for full-time software engineering roles, remote contracts, and web projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-center md:justify-end">
            {/* Social Links Dock */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/hernataramadhan79-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-badge flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/hernata-ramadhan-176b68338"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-badge flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:hernataramadhan79@gmail.com"
                className="w-10 h-10 rounded-full glass-badge flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://instagram.com/hernata.ramadhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-badge flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all hover:scale-110"
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
