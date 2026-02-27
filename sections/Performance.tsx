'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3, Github, Timer, TrendingUp, Activity,
    Users, RefreshCw, History, Box, Sparkles,
    GitBranch, Zap, Shield, Cpu, Globe, ExternalLink, X, Code
} from 'lucide-react';

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
    color?: 'cyan' | 'purple' | 'emerald' | 'yellow' | 'rose',
    className?: string,
    onClick?: () => void
}) => {
    const accentColors = {
        cyan: 'from-cyan-500/10 to-transparent border-cyan-500/20 text-cyan-400 shadow-cyan-500/5',
        purple: 'from-purple-500/10 to-transparent border-purple-500/20 text-purple-400 shadow-purple-500/5',
        emerald: 'from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400 shadow-emerald-500/5',
        yellow: 'from-yellow-500/10 to-transparent border-yellow-500/20 text-yellow-400 shadow-yellow-500/5',
        rose: 'from-rose-500/10 to-transparent border-rose-500/20 text-rose-400 shadow-rose-500/5'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={onClick}
            className={`group relative p-8 rounded-[2.5rem] bg-[#050508] border border-white/5 transition-all duration-500 hover:border-white/10 hover:shadow-2xl cursor-pointer overflow-hidden ${className}`}
        >
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${accentColors[color]} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
            <div className="absolute inset-0 bg-grid-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 ${accentColors[color].split(' ')[2]} ${accentColors[color].split(' ')[3]}`}>
                            <Icon size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">{title}</h3>
                            {subtitle && <p className="text-slate-500 text-[9px] font-mono tracking-widest uppercase">{subtitle}</p>}
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white group-hover:bg-white/10 transition-all">
                        <ArrowUpRight size={16} />
                    </div>
                </div>

                <div className="space-y-6">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

const ArrowUpRight = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
);

const Performance: React.FC = () => {
    const [selectedStat, setSelectedStat] = useState<'github' | 'wakatime' | 'analytics' | null>(null);
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState({
        github: {
            totalContributions: 0,
            stars: 0,
            repos: 0,
            followers: 0,
            contributions: [] as any[],
            topRepos: [] as any[]
        },
        wakatime: {
            languages: [] as any[],
            totalTime: '0h 0m',
            dailyAverage: '0h 0m',
            bestDay: 'N/A',
            optimizationFactor: '+0%'
        },
        umami: {
            stats: null as any,
            active: 0
        },
        loading: true,
        error: false
    });
    const [hoveredDay, setHoveredDay] = useState<{ count: number, date: string, x: number, y: number } | null>(null);

    useEffect(() => {
        setMounted(true);
        const fetchStats = async () => {
            try {
                setStats(prev => ({ ...prev, loading: true }));

                const [githubRes, wakaRes, umamiRes] = await Promise.all([
                    fetch('/api/github'),
                    fetch('/api/wakatime'),
                    fetch('/api/umami')
                ]);

                let githubData = stats.github;
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
                }

                let wakatimeData = stats.wakatime;
                if (wakaRes.ok) {
                    const data = await wakaRes.json();
                    if (data.isLoaded) wakatimeData = data;
                }

                let umamiData = stats.umami;
                if (umamiRes.ok) {
                    const data = await umamiRes.json();
                    if (data && (data.stats || data.active !== undefined)) umamiData = data;
                }

                setStats({
                    github: githubData,
                    wakatime: wakatimeData,
                    umami: umamiData,
                    loading: false,
                    error: !githubRes.ok && !wakaRes.ok && !umamiRes.ok
                });
            } catch (error) {
                console.error("Performance stats error:", error);
                setStats(prev => ({ ...prev, loading: false, error: true }));
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        if (selectedStat) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-open');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('modal-open');
        }
    }, [selectedStat]);

    if (!mounted) return null;

    return (
        <section id="performance" className="relative z-10 py-16 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="relative mb-24 text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Real-time Metrics
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Vitals</span></h2>
                        <p className="text-slate-400 text-lg font-light max-w-xl mx-auto">Live technical engine status, development velocity, and digital reach metrics.</p>
                    </motion.div>
                </div>

                {/* Primary Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* GitHub Activity Card */}
                    <MainframeCard
                        title="GitHub Architecture"
                        subtitle="Real-time Activity"
                        icon={Github}
                        color="cyan"
                        onClick={() => setSelectedStat('github')}
                    >
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
                                        <span className="text-2xl font-black text-white leading-none tracking-tighter">{stat.value}</span>
                                    )}
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mb-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                            <div className="flex gap-1 justify-between">
                                {stats.github.contributions.length > 0 ? (
                                    stats.github.contributions.slice(-12).map((week: any, i: number) => (
                                        <div key={i} className="flex flex-col gap-1">
                                            {week.map((day: any, j: number) => (
                                                <div
                                                    key={j}
                                                    onMouseEnter={(e) => {
                                                        const rect = e.currentTarget.getBoundingClientRect();
                                                        setHoveredDay({
                                                            count: day.count || day.contributionCount || 0,
                                                            date: day.date,
                                                            x: rect.left + rect.width / 2,
                                                            y: rect.top - 10
                                                        });
                                                    }}
                                                    onMouseLeave={() => setHoveredDay(null)}
                                                    className="w-2 h-2 rounded-[1px] cursor-pointer transition-transform hover:scale-150 relative"
                                                    style={{
                                                        backgroundColor: (day.count || day.contributionCount || 0) > 0
                                                            ? ((day.count || day.contributionCount || 0) > 5 ? '#22d3ee' : '#164e63')
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
                    </MainframeCard>

                    {/* WakaTime Metrics Card */}
                    <MainframeCard
                        title="Development Metrics"
                        subtitle="WakaTime Engine"
                        icon={BarChart3}
                        color="purple"
                        onClick={() => setSelectedStat('wakatime')}
                    >
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                                <div className="group/metric">
                                    <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-1 group-hover:text-purple-400 transition-colors">Total Hours</div>
                                    <div className="text-2xl font-black text-white tracking-tighter">{stats.wakatime.totalTime}</div>
                                </div>
                                <div className="group/metric">
                                    <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-1 group-hover:text-purple-400 transition-colors">Daily Mean</div>
                                    <div className="text-2xl font-black text-white tracking-tighter">{stats.wakatime.dailyAverage}</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {stats.loading ? (
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="h-6 w-full bg-white/5 rounded animate-pulse" />
                                    ))
                                ) : (
                                    stats.wakatime.languages.slice(0, 3).map((lang: any, i: number) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                                                <span className="text-white font-bold">{lang.name}</span>
                                                <span className="text-slate-400">{lang.percent}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${lang.percent}%` }}
                                                    className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                                                    transition={{ duration: 1.5, delay: i * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </MainframeCard>

                    {/* Analytics Overview Card */}
                    <MainframeCard
                        title="Presence Control"
                        subtitle="Umami Cloud Intelligence"
                        icon={Activity}
                        color="yellow"
                        className="lg:col-span-2"
                        onClick={() => setSelectedStat('analytics')}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {stats.loading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />
                                ))
                            ) : (
                                <>
                                    {[
                                        { label: 'Total Page Views', value: stats.umami.stats?.pageviews ?? 0, icon: Globe, color: 'text-yellow-400' },
                                        { label: 'Unique Visitors', value: stats.umami.stats?.visitors ?? 0, icon: Users, color: 'text-emerald-400' },
                                        { label: 'Active Sessions', value: stats.umami.active ?? 0, icon: Activity, color: 'text-cyan-400' },
                                        { label: 'Avg Persistence', value: `${Math.round((stats.umami.stats?.totaltime ?? 0) / (stats.umami.stats?.visits || 1) / 60)}m`, icon: Timer, color: 'text-purple-400' }
                                    ].map((m, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors">
                                            <div className="flex items-center gap-2 mb-4">
                                                <m.icon size={14} className={m.color} />
                                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{m.label}</span>
                                            </div>
                                            <span className="text-3xl font-black text-white tracking-tighter">{m.value}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </MainframeCard>
                </div>

                {/* --- PERFORMANCE DETAIL MODAL --- */}
                {mounted && createPortal(
                    <AnimatePresence>
                        {selectedStat && (
                            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-2 md:p-10 pointer-events-auto">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedStat(null)}
                                    className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
                                />

                                <motion.div
                                    className="relative w-full max-w-3xl md:max-w-4xl lg:max-w-5xl bg-[#050508] border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)] z-[1000000]"
                                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" />

                                    {/* Modal Header */}
                                    <div className="relative z-10 p-4 md:p-8 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-white italic tracking-tighter uppercase leading-[0.8] flex items-center gap-2 md:gap-4">
                                                {selectedStat === 'github' && "GitHub Analysis"}
                                                {selectedStat === 'wakatime' && "Development Metrics"}
                                                {selectedStat === 'analytics' && "Traffic Intelligence"}
                                            </h3>
                                            <p className="text-slate-500 text-[9px] md:text-[10px] font-mono mt-2 md:mt-4 uppercase tracking-widest">Protocol Sync_Status: {stats.loading ? 'Syncing...' : 'Real-time'}</p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {selectedStat === 'wakatime' && (
                                                <a
                                                    href="https://wakatime.com/@hernata"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-purple-400 text-[10px] font-bold uppercase tracking-widest hover:bg-purple-500 hover:text-black transition-all flex items-center gap-2"
                                                >
                                                    <Activity size={14} />
                                                    View WakaTime
                                                </a>
                                            )}
                                            {selectedStat === 'analytics' && (
                                                <a
                                                    href="https://cloud.umami.is/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-yellow-500 text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center gap-2"
                                                >
                                                    <BarChart3 size={14} />
                                                    View Analytics
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Modal Body */}
                                    <div
                                        className="relative z-10 p-4 md:p-8 max-h-[60vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar"
                                        data-lenis-prevent
                                    >
                                        {selectedStat === 'github' && (
                                            <div className="space-y-8 md:space-y-12">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                                    {[
                                                        { label: 'Commits', value: stats.github.totalContributions, color: 'text-cyan-400' },
                                                        { label: 'Stars', value: stats.github.stars, color: 'text-yellow-400' },
                                                        { label: 'Repos', value: stats.github.repos, color: 'text-purple-400' },
                                                        { label: 'Network', value: stats.github.followers, color: 'text-emerald-400' }
                                                    ].map((s, i) => (
                                                        <div key={i} className="flex flex-col">
                                                            <span className={`text-2xl md:text-4xl font-black ${s.color} leading-none mb-1 md:mb-2 tracking-tighter`}>{s.value}</span>
                                                            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-slate-500">{s.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 relative group/contrib">
                                                    {/* ... (Matrix code) */}
                                                    <div className="flex items-center justify-between mb-4 md:mb-8">
                                                        <h4 className="text-white font-bold flex items-center gap-1 md:gap-2 text-[10px] md:text-xs uppercase tracking-widest">
                                                            <History size={14} className="text-cyan-400 md:w-4 md:h-4 w-3.5 h-3.5" />
                                                            Technical Contribution
                                                        </h4>
                                                        <div className="flex items-center gap-1 md:gap-2 text-[8px] font-mono text-slate-500 uppercase">
                                                            <span>Less</span>
                                                            <div className="flex gap-1">
                                                                {[0, 1, 2, 3, 4].map(v => (
                                                                    <div key={v} className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-[1px] ${v === 0 ? 'bg-white/5' : v === 1 ? 'bg-cyan-950' : v === 2 ? 'bg-cyan-800' : v === 3 ? 'bg-cyan-600' : 'bg-cyan-400'}`} />
                                                                ))}
                                                            </div>
                                                            <span>More</span>
                                                        </div>
                                                    </div>

                                                    <div className="relative overflow-x-auto custom-scrollbar pb-4">
                                                        <div className="flex gap-0.5 lg:gap-1 min-w-max">
                                                            {stats.github.contributions.length > 0 ? (
                                                                stats.github.contributions.slice(-24).map((week: any, weekIndex: number) => (
                                                                    <div key={weekIndex} className="flex flex-col gap-0.5 lg:gap-1">
                                                                        {week.map((day: any, dayIndex: number) => (
                                                                            <div
                                                                                key={`${weekIndex}-${dayIndex}`}
                                                                                onMouseEnter={(e) => {
                                                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                                                    setHoveredDay({
                                                                                        count: day.count || day.contributionCount || 0,
                                                                                        date: day.date,
                                                                                        x: rect.left + rect.width / 2,
                                                                                        y: rect.top - 10
                                                                                    });
                                                                                }}
                                                                                onMouseLeave={() => setHoveredDay(null)}
                                                                                className="w-2 h-2 lg:w-3 lg:h-3 rounded-[1px] lg:rounded-[2px] transition-all duration-300 hover:scale-125 cursor-pointer"
                                                                                style={{
                                                                                    backgroundColor: (day.count || day.contributionCount || 0) > 0
                                                                                        ? ((day.count || day.contributionCount || 0) > 10 ? '#22d3ee' : (day.count || day.contributionCount || 0) > 5 ? '#0891b2' : (day.count || day.contributionCount || 0) > 2 ? '#155e75' : '#164e63')
                                                                                        : 'rgba(255,255,255,0.03)'
                                                                                }}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                ))
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <h4 className="text-white font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                                                        <Box size={16} className="text-cyan-400" />
                                                        Repository Intelligence
                                                    </h4>
                                                    <div className="overflow-x-auto custom-scrollbar">
                                                        <table className="w-full text-left font-mono min-w-full md:min-w-[600px]">
                                                            <thead>
                                                                <tr className="border-b border-white/5 text-[10px] text-slate-500 uppercase tracking-widest">
                                                                    <th className="pb-2 md:pb-3 px-2">Project Name</th>
                                                                    <th className="pb-2 md:pb-3 px-2">Tech Stack</th>
                                                                    <th className="pb-2 md:pb-3 px-2 text-right">Activity Hub</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="text-[10px]">
                                                                {stats.github.topRepos.map((repo: any) => (
                                                                    <tr key={repo.id} className="border-b border-white/[0.03] group/repo">
                                                                        <td className="py-2 px-2">
                                                                            <div className="flex flex-col">
                                                                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-cyan-400 transition-colors uppercase tracking-wider">
                                                                                    {repo.name}
                                                                                </a>
                                                                                {repo.description && (
                                                                                    <p className="text-[9px] text-slate-500 mt-0.5 line-clamp-1 group-hover/repo:text-slate-300 transition-colors max-w-[200px]">
                                                                                        {repo.description}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </td>
                                                                        <td className="py-2 px-2 text-right">
                                                                            <div className="flex items-center justify-end gap-3 text-slate-400">
                                                                                <span className="flex items-center gap-1">
                                                                                    {repo.stargazers_count}
                                                                                    <Sparkles size={10} className="text-yellow-500/50" />
                                                                                </span>
                                                                                <span className="flex items-center gap-1 border-l border-white/10 pl-3">
                                                                                    {repo.forks_count}
                                                                                    <GitBranch size={10} className="text-cyan-500/50" />
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {selectedStat === 'wakatime' && (
                                            <div className="space-y-8 md:space-y-12">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 pb-4 md:pb-8 border-b border-white/5">
                                                    {[
                                                        { label: 'Total Recorded Focus', value: stats.wakatime.totalTime },
                                                        { label: 'Daily Output Average', value: stats.wakatime.dailyAverage },
                                                        { label: 'Peak Performance Day', value: stats.wakatime.bestDay }
                                                    ].map((s, i) => (
                                                        <div key={i} className="flex flex-col">
                                                            <span className="text-2xl font-black text-white tracking-tighter">{s.value}</span>
                                                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">{s.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
                                                    <div className="space-y-6">
                                                        <h4 className="text-white font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                                                            <Code size={16} className="text-purple-400" />
                                                            Language Architecture
                                                        </h4>
                                                        {stats.wakatime.languages.map((lang: any, i: number) => (
                                                            <div key={i} className="space-y-3">
                                                                <div className="flex justify-between items-end">
                                                                    <span className="text-lg font-bold text-white uppercase tracking-tighter">{lang.name}</span>
                                                                    <span className="text-[10px] font-mono text-slate-400">{lang.percent}%</span>
                                                                </div>
                                                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${lang.percent}%` }}
                                                                        className="h-full rounded-full bg-purple-500"
                                                                        transition={{ duration: 1, delay: i * 0.1 }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="bg-purple-500/5 p-8 rounded-[2rem] border border-purple-500/10 flex flex-col justify-center text-center h-full">
                                                        <div className="text-6xl font-black text-purple-400 mb-2">{stats.wakatime.optimizationFactor}</div>
                                                        <div className="text-slate-400 text-[10px] uppercase tracking-widest font-mono">Optimization Factor</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {selectedStat === 'analytics' && (
                                            <div className="space-y-8">
                                                <div className="overflow-x-auto pb-4 custom-scrollbar">
                                                    <table className="w-full text-left font-mono min-w-full md:min-w-[600px]">
                                                        <thead>
                                                            <tr className="border-b border-white/5 text-[10px] text-slate-500 uppercase tracking-widest">
                                                                <th className="pb-4 md:pb-6 px-1">Metric</th>
                                                                <th className="pb-4 md:pb-6 px-1">Current Period</th>
                                                                <th className="pb-4 md:pb-6 px-1 text-right">Previous Period</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {stats.umami.stats ? (
                                                                [
                                                                    { label: 'Total Page Views', value: stats.umami.stats?.pageviews ?? 0, prev: stats.umami.stats?.comparison?.pageviews ?? 0, color: 'text-yellow-500' },
                                                                    { label: 'Unique Visitors', value: stats.umami.stats?.visitors ?? 0, prev: stats.umami.stats?.comparison?.visitors ?? 0, color: 'text-emerald-400' },
                                                                    { label: 'Total Visits', value: stats.umami.stats?.visits ?? 0, prev: stats.umami.stats?.comparison?.visits ?? 0, color: 'text-cyan-400' },
                                                                    { label: 'Bounce Rate', value: `${Math.round(((stats.umami.stats?.bounces ?? 0) / (stats.umami.stats?.visits || 1)) * 100)}%`, prev: `${Math.round(((stats.umami.stats?.comparison?.bounces ?? 0) / (stats.umami.stats?.comparison?.visits || 1)) * 100)}%`, color: 'text-purple-400' },
                                                                    { label: 'Average Time', value: `${Math.round((stats.umami.stats?.totaltime ?? 0) / (stats.umami.stats?.visits || 1) / 60)}m`, prev: `${Math.round((stats.umami.stats?.comparison?.totaltime ?? 0) / (stats.umami.stats?.comparison?.visits || 1) / 60)}m`, color: 'text-rose-400' }
                                                                ].map((item, i) => (
                                                                    <tr key={i} className="border-b border-white/[0.03] group hover:bg-white/[0.01]">
                                                                        <td className="py-4 md:py-6 px-1 text-white font-bold">{item.label}</td>
                                                                        <td className={`py-4 md:py-6 px-1 text-2xl md:text-xl md:text-4xl font-black ${item.color} tracking-tighter`}>{item.value}</td>
                                                                        <td className="py-4 md:py-6 px-1 text-slate-500 font-bold text-right">{item.prev}</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan={3} className="py-20 text-center">
                                                                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] italic mb-4">Awaiting Analytics Engine Sync</p>
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
                                    <div className="p-4 md:p-6 border-t border-white/5 bg-white/[0.01] flex justify-center">
                                        <button
                                            onClick={() => setSelectedStat(null)}
                                            className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-black rounded-xl md:rounded-2xl hover:bg-cyan-400 transition-all uppercase text-[9px] md:text-[10px] tracking-[0.2em] shadow-2xl"
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

                {/* --- CUSTOM GITHUB TOOLTIP --- */}
                {mounted && createPortal(
                    <AnimatePresence>
                        {hoveredDay && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="fixed z-[99999999] pointer-events-none"
                                style={{
                                    left: hoveredDay.x,
                                    top: hoveredDay.y,
                                    transform: 'translateX(-50%) translateY(-100%)'
                                }}
                            >
                                <div className="bg-black/90 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg shadow-2xl flex flex-col items-center gap-0.5 min-w-[120px]">
                                    <span className="text-white font-black text-xs uppercase tracking-tight">{hoveredDay.count} Commits</span>
                                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">{hoveredDay.date}</span>
                                    {/* Pointer Arrow */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 border-r border-b border-white/10 rotate-45" />
                                </div>
                            </motion.div>
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

export default React.memo(Performance);
