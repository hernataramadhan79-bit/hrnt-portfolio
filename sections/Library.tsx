'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, X, BarChart3, Github, Globe, Timer, TrendingUp, Award, Box, History, MousePointer2, RefreshCw, ExternalLink, Activity, Users, Sparkles, GitBranch } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { projects, certificates, wakaTimeStats } from '../constants';
import { Certificate } from '../types';

const GITHUB_USERNAME = 'hernataramadhan79-bit';

const MainframeCard = ({
  children,
  title,
  subtitle,
  icon: Icon,
  color = 'cyan',
  className = "",
  onClick
}: {
  children: React.ReactNode,
  title: string,
  subtitle?: string,
  icon: any,
  color?: 'cyan' | 'purple' | 'emerald' | 'yellow',
  className?: string,
  onClick?: () => void
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)`;

  const colorMap = {
    cyan: 'rgba(34,211,238,0.5)',
    purple: 'rgba(192,132,252,0.5)',
    emerald: 'rgba(16,185,129,0.5)',
    yellow: 'rgba(234,179,8,0.5)'
  };

  const accentColor = {
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500',
    yellow: 'bg-yellow-500'
  };

  const textColor = {
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    emerald: 'text-emerald-400',
    yellow: 'text-yellow-400'
  };

  const borderLight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${colorMap[color]}, transparent 80%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={(e) => { e.stopPropagation(); if (onClick) onClick(); }}
      className={`group relative rounded-[3rem] bg-[#050508] border border-white/5 transition-all duration-500 hover:shadow-2xl overflow-hidden cursor-pointer ${className}`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: borderLight }}
      />

      <div className="relative h-full bg-[#050508] rounded-[2.9rem] overflow-hidden m-[1px] pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: spotlight }}
        />

        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
        <div
          className={`absolute inset-0 bg-grid-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]`}
        />

        <div
          className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 ${accentColor[color]}`}
        />

        <div className="relative z-10 p-8 h-full flex flex-col pointer-events-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 group-hover:-translate-y-1 transition-transform duration-500 ease-out">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 shadow-lg group-hover:scale-110 ${textColor[color]} bg-white/5 border-white/10 group-hover:border-white/20`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{title}</h3>
                {subtitle && <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase">{subtitle}</p>}
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <span className="text-[8px] uppercase tracking-widest text-white/40 group-hover:text-cyan-400 transition-colors">Details</span>
              <MousePointer2 size={12} className="text-white/40 group-hover:text-cyan-400" />
            </div>
          </div>

          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const PerformanceTab = ({
  onCardClick,
  stats
}: {
  onCardClick: (type: 'github' | 'wakatime' | 'efficiency' | 'analytics') => void,
  stats: any
}) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MainframeCard title="GitHub Activity" subtitle="Real-time Fetch" icon={Github} color="cyan" onClick={() => onCardClick('github')}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Commits', value: stats.github.totalContributions },
              { label: 'Stars', value: stats.github.stars },
              { label: 'Repos', value: stats.github.repos },
              { label: 'Followers', value: stats.github.followers }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                {stats.loading ? (
                  <div className="h-8 w-12 bg-white/5 rounded animate-pulse" />
                ) : (
                  <span className="text-2xl font-black text-white leading-none">{stat.value}</span>
                )}
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
            <div className="flex gap-1 justify-between">
              {stats.github.contributions.length > 0 ? (
                stats.github.contributions.slice(-12).map((week: any, i: number) => (
                  <div key={i} className="flex flex-col gap-1">
                    {week.map((day: any, j: number) => (
                      <div
                        key={j}
                        className="w-2 h-2 rounded-[1px]"
                        style={{
                          backgroundColor: day.contributionCount > 0
                            ? (day.contributionCount > 5 ? '#22d3ee' : '#164e63')
                            : 'rgba(255,255,255,0.03)'
                        }}
                      />
                    ))}
                  </div>
                ))
              ) : (
                Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <div key={j} className="w-2 h-2 rounded-[1px] bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">Live Engine Status</span>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${stats.error ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]'}`} />
                <span className={`${stats.error ? 'text-red-400' : 'text-cyan-400'} font-bold font-mono text-[10px] uppercase tracking-widest`}>
                  {stats.error ? 'Offline_Cache' : 'Active'}
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((stats.github.totalContributions / 200) * 100, 100)}%` }}
                className={`h-full ${stats.error ? 'bg-slate-600' : 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]'}`}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </MainframeCard>

        <MainframeCard title="Coding Stats" subtitle="Global Usage" icon={BarChart3} color="purple" onClick={() => onCardClick('wakatime')}>
          <div className="space-y-5">
            {wakaTimeStats.languages.slice(0, 4).map((lang, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                  <span className="text-white font-bold">{lang.name}</span>
                  <span className="text-slate-400">{lang.percent}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percent}%` }}
                    className="h-full"
                    style={{
                      backgroundColor: lang.color,
                      boxShadow: `0 0 10px ${lang.color}40`
                    }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </MainframeCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MainframeCard title="Efficiency" subtitle="Temporal Analysis" icon={TrendingUp} color="emerald" onClick={() => onCardClick('efficiency')}>
          <div className="space-y-8">
            <div className="group/metric">
              <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-1 group-hover:text-emerald-400 transition-colors">Total Hours</div>
              <div className="text-3xl font-black text-white tracking-tighter">{wakaTimeStats.totalTime}</div>
            </div>
            <div className="group/metric">
              <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-1 group-hover:text-emerald-400 transition-colors">Daily Mean</div>
              <div className="text-3xl font-black text-white tracking-tighter">{wakaTimeStats.dailyAverage}</div>
            </div>
          </div>
        </MainframeCard>

        <MainframeCard title="Traffic Evolution" subtitle="Real-time Analytics" icon={Activity} color="yellow" className="lg:col-span-2" onClick={() => onCardClick('analytics')}>
          <div className="flex flex-col h-full">
            <div className="overflow-x-auto pb-4 custom-scrollbar flex-1">
              <table className="w-full text-left min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <th className="pb-4 px-2 font-normal">Metric Type</th>
                    <th className="pb-4 px-2 font-normal">Total Count</th>
                    <th className="pb-4 px-2 font-normal">Growth</th>
                    <th className="pb-4 px-2 font-normal text-right">Activity</th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  {stats.loading ? (
                    [1, 2, 3].map(i => (
                      <tr key={i} className="border-b border-white/[0.03]">
                        <td colSpan={4} className="py-4">
                          <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      {stats.umami.stats ? (
                        <>
                          {[
                            { label: 'Page Views', value: stats.umami.stats.pageviews.value, prev: stats.umami.stats.pageviews.prev, color: 'text-yellow-500', icon: Activity },
                            { label: 'Visitors', value: stats.umami.stats.visitors.value, prev: stats.umami.stats.visitors.prev, color: 'text-emerald-400', icon: Users },
                            { label: 'Active', value: stats.umami.active, prev: 0, color: 'text-purple-400', icon: Activity },
                            { label: 'Bounce Rate', value: `${stats.umami.stats.bounces.value}%`, prev: `${stats.umami.stats.bounces.prev}%`, color: 'text-rose-400', icon: TrendingUp },
                            { label: 'Avg Session', value: `${Math.round(stats.umami.stats.totaltime.value / (stats.umami.stats.visits.value || 1) / 60)}m`, prev: `${Math.round(stats.umami.stats.totaltime.prev / (stats.umami.stats.visits.prev || 1) / 60)}m`, color: 'text-cyan-400', icon: Timer }
                          ].map((item, i) => (
                            <tr key={i} className="border-b border-white/[0.03] group/row hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 px-2 text-slate-300 font-bold uppercase tracking-wider">{item.label}</td>
                              <td className="py-4 px-2 text-white font-black text-lg">
                                {item.value}
                              </td>
                              <td className={`py-4 px-2 font-bold ${typeof item.value === 'number' && typeof item.prev === 'number' ? (item.value >= item.prev ? 'text-emerald-500' : 'text-red-500') : 'text-slate-500'}`}>
                                {item.prev === 0 || typeof item.value !== 'number' ? '--' : `${Math.round(((item.value - item.prev) / (item.prev || 1)) * 100)}%`}
                              </td>
                              <td className="py-4 px-2 text-right">
                                <item.icon size={16} className={item.color} />
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-12 text-center text-slate-500 font-mono text-[10px] uppercase tracking-widest italic">
                            Awaiting Analytics Data
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocol SOURCE @Umami_Cloud</span>
              <a href="https://cloud.umami.is/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-bold text-yellow-500 hover:text-white transition-colors uppercase tracking-widest">
                Go to Dashboard <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </MainframeCard>
      </div>
    </div>
  );
};

const Library: React.FC = () => {
  const [filter, setFilter] = useState<'projects' | 'certificates' | 'performance'>('projects');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedStat, setSelectedStat] = useState<'github' | 'wakatime' | 'efficiency' | 'analytics' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Real-time State with Defaults
  const [stats, setStats] = useState({
    github: {
      totalContributions: 116,
      stars: 0,
      repos: 11,
      followers: 1,
      contributions: [] as any[],
      topRepos: [] as any[]
    },
    umami: {
      stats: null as any,
      active: 0
    },
    loading: true,
    error: false
  });

  useEffect(() => {
    setMounted(true);

    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: false }));

        let githubData = { ...stats.github };
        let umamiData = { ...stats.umami };
        let hasError = false;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
          const githubRes = await fetch('/api/github', { signal: controller.signal });
          if (githubRes.ok) {
            const data = await githubRes.json();
            githubData = {
              totalContributions: data.profile.totalContributions,
              stars: data.profile.stars,
              repos: data.profile.repos,
              followers: data.profile.followers,
              contributions: data.contributions,
              topRepos: data.topRepos
            };
          } else {
            hasError = true;
          }
        } catch (e: any) {
          console.warn("GitHub fetch status:", e.name === 'AbortError' ? 'timeout' : 'unstable');
          hasError = true;
        }

        try {
          const umamiRes = await fetch('/api/umami', { signal: controller.signal });
          if (umamiRes.ok) {
            const umami = await umamiRes.json();
            if (umami && umami.stats) {
              umamiData = umami;
            } else {
              hasError = true;
            }
          } else {
            hasError = true;
          }
        } catch (e: any) {
          console.warn("Umami fetch status:", e.name === 'AbortError' ? 'timeout' : 'server error');
          hasError = true;
        } finally {
          clearTimeout(timeoutId);
        }

        setStats({
          github: githubData,
          umami: umamiData,
          loading: false,
          error: hasError
        });
      } catch (error) {
        console.error("Global stats fetch error:", error);
        setStats(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    if (filter === 'performance') {
      fetchStats();
    }

    if (isModalOpen || selectedStat) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen, selectedStat, filter]);

  if (!mounted) return null;

  return (
    <section id="library" className="relative z-10 py-12 md:py-24 px-4 sm:px-6" style={{ willChange: 'transform' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase">
                Library <br /> <span className="text-white/10">& Performance</span>
              </h2>
            </div>
            <div className="h-1 w-20 bg-cyan-500" />
          </motion.div>
          <div className="flex flex-col md:items-end gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-slate-400 max-w-sm font-light leading-relaxed md:text-right"
            >
              Digital archive of creative engineering, professional certifications, and technical activity metrics.
            </motion.p>
            {filter === 'performance' && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border ${stats.error ? 'border-red-500/30' : 'border-white/10'} text-[10px] font-mono uppercase tracking-widest`}
              >
                <RefreshCw size={10} className={`${stats.loading ? 'animate-spin' : ''} ${stats.error ? 'text-red-400' : 'text-slate-500'}`} />
                <span className={stats.error ? 'text-red-400' : 'text-slate-500'}>
                  {stats.loading ? 'Syncing_Data' : stats.error ? 'Sync_Failed_Using_Cache' : 'Sync_Complete'}
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-start mb-16 overflow-x-auto pb-4 no-scrollbar">
          <LayoutGroup>
            <nav className="flex items-center gap-2 p-1.5 bg-[#050505]/80 backdrop-blur-2xl border border-white/5 rounded-2xl">
              {[
                { id: 'projects', label: 'Projects', icon: Box },
                { id: 'certificates', label: 'Certificates', icon: Award },
                { id: 'performance', label: 'Performance', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`relative flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${filter === tab.id ? 'text-black' : 'text-slate-500 hover:text-white'
                    }`}
                >
                  {filter === tab.id && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-cyan-400 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <tab.icon size={14} className="relative z-10" />
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </nav>
          </LayoutGroup>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {filter === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <TiltCard className="h-[450px] w-full relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl">
                      <div className="absolute inset-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      </div>

                      <div className="absolute inset-0 p-10 flex flex-col justify-end">
                        <div className="mb-4">
                          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] rounded-lg">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors uppercase italic tracking-tighter">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-2 py-1 bg-white/5 rounded-md border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="absolute top-10 right-10">
                        <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <ArrowUpRight size={20} strokeWidth={2.5} />
                        </div>
                      </div>
                    </TiltCard>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filter === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => { setSelectedCertificate(cert); setIsModalOpen(true); }}
                >
                  <div className="group cursor-pointer p-8 rounded-[2.5rem] bg-[#050508] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-0 bg-cyan-500 group-hover:h-full transition-all duration-500" />

                    <div className="absolute inset-0 bg-grid-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10 group-hover:border-cyan-500/20">
                        <img src={cert.image} alt={cert.issuer} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.2em] mb-2 block">
                          {cert.issuer} • {cert.date}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight uppercase tracking-tighter">
                          {cert.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filter === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PerformanceTab stats={stats} onCardClick={(type) => setSelectedStat(type)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- PERFORMANCE DETAIL MODAL --- */}
        {mounted && createPortal(
          <AnimatePresence>
            {selectedStat && (
              <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedStat(null)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
                />

                <motion.div
                  className="relative w-full max-w-4xl bg-[#050508] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)] z-[1000000]"
                  initial={{ scale: 0.9, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 50 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" />

                  {/* Modal Header */}
                  <div className="relative z-10 p-8 md:p-12 border-b border-white/5 flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                        {selectedStat === 'github' && "GitHub Analysis"}
                        {selectedStat === 'wakatime' && "Coding Architecture"}
                        {selectedStat === 'efficiency' && "Productivity Metrics"}
                        {selectedStat === 'analytics' && "Traffic Intelligence"}
                      </h3>
                      <p className="text-slate-500 text-[10px] font-mono mt-2 uppercase tracking-widest text-[#05050800]">Protocol Sync_Status: {stats.loading ? 'Syncing...' : 'Real-time'}</p>
                    </div>
                    <button
                      onClick={() => setSelectedStat(null)}
                      className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-white/10"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="relative z-10 p-8 md:p-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {selectedStat === 'github' && (
                      <div className="space-y-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                          {[
                            { label: 'Commits', value: stats.github.totalContributions, color: 'text-cyan-400' },
                            { label: 'Stars', value: stats.github.stars, color: 'text-yellow-400' },
                            { label: 'Repos', value: stats.github.repos, color: 'text-purple-400' },
                            { label: 'Network', value: stats.github.followers, color: 'text-emerald-400' }
                          ].map((s, i) => (
                            <div key={i} className="flex flex-col">
                              <span className={`text-4xl font-black ${s.color} leading-none mb-2`}>{s.value}</span>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{s.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative group/contrib">
                          <div className="flex items-center justify-between mb-8">
                            <h4 className="text-white font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                              <History size={16} className="text-cyan-400" />
                              Technical Contribution Matrix
                            </h4>
                            <div className="flex items-center gap-2 text-[8px] font-mono text-slate-500 uppercase">
                              <span>Less</span>
                              <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-[1px] bg-white/5" />
                                <div className="w-2 h-2 rounded-[1px] bg-cyan-950" />
                                <div className="w-2 h-2 rounded-[1px] bg-cyan-800" />
                                <div className="w-2 h-2 rounded-[1px] bg-cyan-600" />
                                <div className="w-2 h-2 rounded-[1px] bg-cyan-400" />
                              </div>
                              <span>More</span>
                            </div>
                          </div>

                          <div className="relative overflow-x-auto custom-scrollbar pb-4">
                            <div className="flex gap-1 lg:gap-1.5 min-w-max">
                              {stats.github.contributions.length > 0 ? (
                                stats.github.contributions.slice(-24).map((week: any, weekIndex: number) => (
                                  <div key={weekIndex} className="flex flex-col gap-1 lg:gap-1.5">
                                    {week.map((day: any, dayIndex: number) => (
                                      <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className="relative group/square"
                                      >
                                        <div
                                          className="w-3 h-3 lg:w-4 lg:h-4 rounded-[1px] lg:rounded-[2px] transition-all duration-300 hover:scale-125 cursor-help"
                                          style={{
                                            backgroundColor: day.contributionCount > 0
                                              ? (day.contributionCount > 10 ? '#22d3ee' : day.contributionCount > 5 ? '#0891b2' : day.contributionCount > 2 ? '#155e75' : '#164e63')
                                              : 'rgba(255,255,255,0.03)'
                                          }}
                                        />
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/10 rounded-md text-[8px] font-mono text-white whitespace-nowrap opacity-0 group-hover/square:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
                                          {day.contributionCount} contributions • {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ))
                              ) : (
                                <div className="flex gap-1 lg:gap-1.5">
                                  {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="flex flex-col gap-1 lg:gap-1.5">
                                      {Array.from({ length: 7 }).map((_, j) => (
                                        <div key={j} className="w-3 h-3 lg:w-4 lg:h-4 rounded-[1px] lg:rounded-[2px] bg-white/5 animate-pulse" style={{ animationDelay: `${(i * 7 + j) * 10}ms` }} />
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <p className="mt-6 text-[10px] text-slate-500 font-mono italic flex items-center justify-between">
                            <span>Showing last 24 weeks of active engineering</span>
                            <span>SOURCE @{GITHUB_USERNAME}</span>
                          </p>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-white font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                            <Box size={16} className="text-cyan-400" />
                            Repository Intelligence
                          </h4>
                          <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left font-mono">
                              <thead>
                                <tr className="border-b border-white/5 text-[10px] text-slate-500 uppercase tracking-widest">
                                  <th className="pb-4 px-2">Project Name</th>
                                  <th className="pb-4 px-2">Tech Stack</th>
                                  <th className="pb-4 px-2 text-right">Activity Hub</th>
                                </tr>
                              </thead>
                              <tbody className="text-[11px]">
                                {stats.github.topRepos.length > 0 ? (
                                  stats.github.topRepos.map((repo: any) => (
                                    <tr key={repo.id} className="border-b border-white/[0.03] group/repo hover:bg-white/[0.02] transition-colors">
                                      <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-cyan-400 transition-colors uppercase tracking-wider">
                                            {repo.name}
                                          </a>
                                          <span className="text-[9px] text-slate-500 line-clamp-1 mt-1 group-hover/repo:text-slate-400">
                                            {repo.description || "No description provided"}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="py-4 px-2">
                                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase text-[9px]">
                                          {repo.language || "Shell"}
                                        </span>
                                      </td>
                                      <td className="py-4 px-2 text-right">
                                        <div className="flex items-center justify-end gap-4 text-slate-400">
                                          <div className="flex items-center gap-1">
                                            <Sparkles size={10} className="text-yellow-500" />
                                            <span>{repo.stargazers_count}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <GitBranch size={10} className="text-purple-400" />
                                            <span>{repo.forks_count}</span>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  Array.from({ length: 3 }).map((_, i) => (
                                    <tr key={i} className="border-b border-white/[0.03]">
                                      <td className="py-4 px-2"><div className="h-4 w-32 bg-white/5 rounded animate-pulse" /></td>
                                      <td className="py-4 px-2"><div className="h-4 w-16 bg-white/5 rounded animate-pulse" /></td>
                                      <td className="py-4 px-2"><div className="h-4 w-16 bg-white/5 rounded animate-pulse" /></td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedStat === 'wakatime' && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          {wakaTimeStats.languages.map((lang, i) => (
                            <div key={i} className="space-y-3">
                              <div className="flex justify-between items-end">
                                <span className="text-lg font-bold text-white uppercase tracking-tighter">{lang.name}</span>
                                <span className="text-[10px] font-mono text-slate-400">{lang.percent}%</span>
                              </div>
                              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${lang.percent}%` }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: lang.color }}
                                  transition={{ duration: 1, delay: i * 0.1 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedStat === 'efficiency' && (
                      <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                            {[
                              { label: 'Total Recorded', value: wakaTimeStats.totalTime },
                              { label: 'Daily Average', value: wakaTimeStats.dailyAverage },
                              { label: 'Peak Performance', value: wakaTimeStats.bestDay }
                            ].map((s, i) => (
                              <div key={i} className="flex justify-between items-center py-6 border-b border-white/5">
                                <span className="text-slate-400 text-sm">{s.label}</span>
                                <span className="text-white font-black">{s.value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="bg-emerald-500/5 p-8 rounded-[2rem] border border-emerald-500/10 flex flex-col justify-center text-center">
                            <div className="text-6xl font-black text-emerald-400 mb-2">+12%</div>
                            <div className="text-slate-400 text-[10px] uppercase tracking-widest font-mono">Optimization Factor</div>
                            <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest leading-relaxed">System output has increased following modular architecture migration.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedStat === 'analytics' && (
                      <div className="space-y-8">
                        <div className="overflow-x-auto pb-4 custom-scrollbar">
                          <table className="w-full text-left font-mono min-w-[600px]">
                            <thead>
                              <tr className="border-b border-white/5 text-[10px] text-slate-500 uppercase tracking-widest">
                                <th className="pb-6 px-1">Metric</th>
                                <th className="pb-6 px-1">Current Period</th>
                                <th className="pb-6 px-1 text-right">Previous Period</th>
                              </tr>
                            </thead>
                            <tbody>
                              {stats.umami.stats ? (
                                [
                                  { label: 'Total Page Views', value: stats.umami.stats.pageviews.value, prev: stats.umami.stats.pageviews.prev, color: 'text-yellow-500' },
                                  { label: 'Unique Visitors', value: stats.umami.stats.visitors.value, prev: stats.umami.stats.visitors.prev, color: 'text-emerald-400' },
                                  { label: 'Total Visits', value: stats.umami.stats.visits.value, prev: stats.umami.stats.visits.prev, color: 'text-cyan-400' },
                                  { label: 'Bounce Rate', value: `${stats.umami.stats.bounces.value}%`, prev: `${stats.umami.stats.bounces.prev}%`, color: 'text-purple-400' },
                                  { label: 'Average Time', value: `${Math.round(stats.umami.stats.totaltime.value / (stats.umami.stats.visits.value || 1) / 60)}m`, prev: `${Math.round(stats.umami.stats.totaltime.prev / (stats.umami.stats.visits.prev || 1) / 60)}m`, color: 'text-rose-400' }
                                ].map((item, i) => (
                                  <tr key={i} className="border-b border-white/[0.03] group hover:bg-white/[0.01]">
                                    <td className="py-6 px-1 text-white font-bold">{item.label}</td>
                                    <td className={`py-6 px-1 text-4xl font-black ${item.color} tracking-tighter`}>{item.value}</td>
                                    <td className="py-6 px-1 text-slate-500 font-bold text-right">{item.prev}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={3} className="py-20 text-center">
                                    <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] italic mb-4">Awaiting Analytics Engine Sync</p>
                                    <a href="https://cloud.umami.is/" target="_blank" rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-yellow-500 text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">
                                      View Full Dashboard <ExternalLink size={12} />
                                    </a>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-8 border-t border-white/5 bg-white/[0.01] flex justify-center">
                    <button
                      onClick={() => setSelectedStat(null)}
                      className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-all uppercase text-[10px] tracking-[0.2em] shadow-2xl"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Certificate Modal */}
        {mounted && createPortal(
          <AnimatePresence>
            {isModalOpen && selectedCertificate && (
              <div
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative max-w-5xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute -top-16 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
                  >
                    <X size={24} />
                  </button>
                  <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_100px_rgba(34,211,238,0.2)]">
                    <img
                      src={selectedCertificate.certificateImage}
                      alt={selectedCertificate.title}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </section>
  );
};

export default React.memo(Library);