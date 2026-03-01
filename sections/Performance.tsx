'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3, Github, Timer, TrendingUp, Activity,
    Users, History, Box, Sparkles,
    GitBranch, Zap, Globe, X, Code, Clock, ArrowUpRight
} from 'lucide-react';

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
        cyan: 'from-cyan-500/10 to-transparent border-cyan-500/20 text-cyan-400',
        purple: 'from-purple-500/10 to-transparent border-purple-500/20 text-purple-400',
        emerald: 'from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400',
        yellow: 'from-yellow-500/10 to-transparent border-yellow-500/20 text-yellow-400',
        rose: 'from-rose-500/10 to-transparent border-rose-500/20 text-rose-400'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={onClick}
            className={`group relative p-5 sm:p-6 rounded-[2rem] bg-[#050508] border border-white/5 transition-all duration-500 hover:border-white/10 cursor-pointer overflow-hidden flex flex-col ${className}`}
        >
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${accentColors[color]} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border bg-white/5 transition-all duration-500 group-hover:scale-110 ${accentColors[color].split(' ')[2]} ${accentColors[color].split(' ')[3]}`}>
                            <Icon size={20} />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-white uppercase tracking-tighter leading-none">{title}</h3>
                            {subtitle && <p className="text-slate-500 text-[8px] font-mono tracking-widest uppercase mt-1">{subtitle}</p>}
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white group-hover:bg-white/10 transition-all">
                        <ArrowUpRight size={14} />
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

// Optimized Sub-component for GitHub Contribution Grid
const GitHubHeatmap = React.memo(({
    contributions,
    sliceCount = 50,
    showHeader = true,
    compact = false,
    title = "Activity Pulse",
    icon: TitleIcon = null
}: {
    contributions: any[],
    sliceCount?: number,
    showHeader?: boolean,
    compact?: boolean,
    title?: string,
    icon?: any
}) => {
    const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);

    const getLevelColor = (count: number) => {
        if (count === 0) return 'rgba(255,255,255,0.05)';
        if (count <= 2) return '#083344';
        if (count <= 5) return '#155e75';
        if (count <= 9) return '#0891b2';
        return '#22d3ee';
    };

    if (contributions.length === 0) {
        return (
            <div className="pt-6 space-y-4">
                {showHeader && <div className="h-4 w-32 bg-white/5 animate-pulse rounded" />}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-1 items-end">
                    {Array.from({ length: sliceCount }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-[4px] flex-1 min-w-[10px]">
                            {Array.from({ length: 7 }).map((_, j) => (
                                <div key={j} className="w-full aspect-square bg-white/5 animate-pulse rounded-[1.5px]" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const slicedData = contributions.slice(-sliceCount);

    return (
        <div className={`${compact ? '' : 'pt-6'} space-y-4`}>
            {showHeader && (
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                        <h4 className={`text-[9px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 ${compact ? 'text-white opacity-50' : 'text-slate-500'}`}>
                            {TitleIcon && <TitleIcon size={12} className="text-cyan-400" />}
                            {title}
                        </h4>
                        <AnimatePresence mode="wait">
                            {hoveredDay && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex items-center gap-2 border-l border-white/10 pl-3"
                                >
                                    <span className="text-[9px] font-black text-white">{hoveredDay.count} COMMITS</span>
                                    <span className="text-[8px] font-mono text-slate-500 uppercase">{hoveredDay.date}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex items-center gap-2 text-[7px] font-mono text-slate-600 uppercase tracking-widest">
                        <span>Less</span>
                        <div className="flex gap-1">
                            {[0, 2, 5, 9, 12].map((lvl) => (
                                <div key={lvl} className="w-2 h-2 rounded-[2px]" style={{ backgroundColor: getLevelColor(lvl) }} />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </div>
            )}

            <div className={`p-4 rounded-2xl bg-white/[0.02] border border-white/5 relative group/matrix no-cursor ${compact ? 'py-4' : ''}`}>
                <div className="flex justify-start md:justify-between gap-[3px] md:gap-1 h-auto overflow-x-auto custom-scrollbar-horizontal pb-2 items-end">
                    {slicedData.map((week: any, i: number) => (
                        <div key={i} className="flex flex-col gap-[4px] flex-1 min-w-[10px]">
                            {(week.length === 7 ? week : [...Array(7 - week.length).fill({ count: 0 }), ...week]).map((day: any, j: number) => {
                                const count = day?.count || day?.contributionCount || 0;
                                const date = day?.date ? new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No Data';
                                return (
                                    <motion.div
                                        key={j}
                                        onMouseEnter={() => setHoveredDay({ count, date })}
                                        onMouseLeave={() => setHoveredDay(null)}
                                        className="w-full aspect-square rounded-[1.5px] relative group/dot shrink-0 cursor-pointer transition-colors"
                                        style={{ backgroundColor: getLevelColor(count) }}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                {compact && (
                    <div className="flex justify-start mt-2 px-1 gap-4 text-[7px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                        <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
                    </div>
                )}
            </div>
        </div>
    );
});

GitHubHeatmap.displayName = 'GitHubHeatmap';

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
        <section id="performance" className="relative z-10 py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="relative mb-12 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            System Intelligence
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
                            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Vitals</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Primary Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* GitHub Activity Card */}
                    <MainframeCard
                        title="GitHub Engine"
                        subtitle="Activity Sync"
                        icon={Github}
                        color="cyan"
                        className="md:col-span-2"
                        onClick={() => setSelectedStat('github')}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pb-6 border-b border-white/5">
                            <div>
                                <div className="text-2xl font-black text-white tracking-tighter">
                                    {stats.loading ? '--' : stats.github.totalContributions}
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Commits</span>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white tracking-tighter">
                                    {stats.loading ? '--' : stats.github.repos}
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Repos</span>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-cyan-400 tracking-tighter flex items-center gap-1.5">
                                    <Sparkles size={16} className="text-yellow-500/50" />
                                    {stats.loading ? '--' : stats.github.stars}
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Stars</span>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-purple-400 tracking-tighter flex items-center gap-1.5">
                                    <Users size={16} className="text-cyan-500/50" />
                                    {stats.loading ? '--' : stats.github.followers}
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Nodes</span>
                            </div>
                        </div>

                        <GitHubHeatmap contributions={stats.github.contributions} sliceCount={50} />
                    </MainframeCard>

                    {/* WakaTime Metrics Card */}
                    <MainframeCard
                        title="Dev Velocity"
                        subtitle="WakaTime Sync"
                        icon={Zap}
                        color="purple"
                        onClick={() => setSelectedStat('wakatime')}
                    >
                        <div className="flex items-center justify-between pb-4 border-b border-white/5">
                            <div>
                                <div className="text-2xl font-black text-white tracking-tighter">
                                    {stats.loading ? '--' : stats.wakatime.totalTime}
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Focus Time</span>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-black text-purple-400 tracking-tighter">
                                    {stats.wakatime.optimizationFactor}
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Efficiency</span>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            {stats.loading ? (
                                Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i} className="h-4 w-full bg-white/5 rounded-full animate-pulse" />
                                ))
                            ) : (
                                stats.wakatime.languages.slice(0, 3).map((lang: any, i: number) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-[8px] font-mono uppercase tracking-widest">
                                            <span className="text-white font-bold">{lang.name}</span>
                                            <span className="text-slate-500">{lang.percent}%</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${lang.percent}%` }}
                                                className="h-full bg-purple-500"
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </MainframeCard>

                    {/* Analytics Overview Card */}
                    <MainframeCard
                        title="Network Pulse"
                        subtitle="Traffic Signal"
                        icon={Globe}
                        color="yellow"
                        onClick={() => setSelectedStat('analytics')}
                    >
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Reach', value: stats.umami.stats?.pageviews ?? 0, color: 'text-yellow-400', icon: Globe },
                                { label: 'Hosts', value: stats.umami.stats?.visitors ?? 0, color: 'text-emerald-400', icon: Users },
                                { label: 'Active', value: stats.umami.active ?? 0, color: 'text-cyan-400', icon: Activity },
                                { label: 'Mean', value: `${Math.round((stats.umami.stats?.totaltime ?? 0) / (stats.umami.stats?.visits || 1) / 60)}m`, color: 'text-purple-400', icon: Timer }
                            ].map((m, i) => (
                                <div key={i} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
                                    <span className={`text-xl font-black ${m.color} tracking-tighter leading-none mb-1`}>{m.value}</span>
                                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{m.label}</span>
                                </div>
                            ))}
                        </div>
                    </MainframeCard>
                </div>

                {/* --- PERFORMANCE DETAIL MODAL - MORE COMPACT --- */}
                {mounted && createPortal(
                    <AnimatePresence>
                        {selectedStat && (
                            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedStat(null)}
                                    className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer pointer-events-auto"
                                />

                                <motion.div
                                    className="relative w-full max-w-lg md:max-w-2xl max-h-[85vh] bg-[#050508] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-10 pointer-events-auto flex flex-col"
                                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Modal Header */}
                                    <div className="shrink-0 p-6 border-b border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                                                <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest">Protocol Sync_Status</span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none">
                                                {selectedStat === 'github' && "GitHub Analytics"}
                                                {selectedStat === 'wakatime' && "Developer Velocity"}
                                                {selectedStat === 'analytics' && "Traffic Signal"}
                                            </h3>
                                        </div>

                                        <button
                                            onClick={() => setSelectedStat(null)}
                                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    {/* Modal Body - COMPACT & FIT */}
                                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-6">
                                        {selectedStat === 'github' && (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                                    {[
                                                        { label: 'Commits', value: stats.github.totalContributions, color: 'text-cyan-400' },
                                                        { label: 'Stars', value: stats.github.stars, color: 'text-yellow-400' },
                                                        { label: 'Repos', value: stats.github.repos, color: 'text-purple-400' },
                                                        { label: 'Followers', value: stats.github.followers, color: 'text-emerald-400' }
                                                    ].map((s, i) => (
                                                        <div key={i} className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center transition-colors hover:bg-white/[0.04]">
                                                            <span className={`text-2xl font-black ${s.color} leading-none mb-1 tracking-tighter`}>{s.value}</span>
                                                            <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500">{s.label}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <GitHubHeatmap
                                                    contributions={stats.github.contributions}
                                                    sliceCount={52}
                                                    compact={true}
                                                    title="Annual Performance Overview"
                                                    icon={Activity}
                                                />

                                                <div className="space-y-3">
                                                    <h4 className="text-[9px] font-black uppercase text-white tracking-widest flex items-center gap-2 opacity-50">
                                                        <Box size={14} className="text-cyan-400" /> Active Repositories
                                                    </h4>
                                                    <div className="grid gap-2">
                                                        {stats.github.topRepos.slice(0, 10).map((repo: any) => (
                                                            <a
                                                                key={repo.id}
                                                                href={repo.html_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="group/repo p-3 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between transition-all hover:bg-white/[0.04] hover:border-white/10 hover:translate-x-1"
                                                            >
                                                                <span className="text-[12px] font-black text-white group-hover/repo:text-cyan-400 transition-colors uppercase tracking-widest truncate max-w-[150px] md:max-w-none">
                                                                    {repo.name}
                                                                </span>
                                                                <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500">
                                                                    <span className="flex items-center gap-1"><Sparkles size={10} /> {repo.stargazers_count}</span>
                                                                    <span className="flex items-center gap-1"><GitBranch size={10} /> {repo.forks_count}</span>
                                                                    <ArrowUpRight size={12} className="opacity-0 group-hover/repo:opacity-100 transition-opacity text-cyan-400" />
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {selectedStat === 'wakatime' && (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-3 gap-3">
                                                    {[
                                                        { label: 'Coding', value: stats.wakatime.totalTime, color: 'text-purple-400' },
                                                        { label: 'Daily', value: stats.wakatime.dailyAverage, color: 'text-white' },
                                                        { label: 'Optimization', value: stats.wakatime.optimizationFactor, color: 'text-emerald-400' }
                                                    ].map((s, i) => (
                                                        <div key={i} className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                                                            <span className={`text-xl font-black tracking-tighter ${s.color}`}>{s.value}</span>
                                                            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-1">{s.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="text-[9px] font-black uppercase text-white tracking-tighter flex items-center gap-2 opacity-50">
                                                        <Code size={14} className="text-purple-400" /> Language Distribution
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {stats.wakatime.languages.slice(0, 5).map((lang: any, i: number) => (
                                                            <div key={i} className="space-y-1.5">
                                                                <div className="flex justify-between items-end">
                                                                    <span className="text-[12px] font-black text-white uppercase tracking-tighter">{lang.name}</span>
                                                                    <span className="text-[9px] font-mono text-slate-500">{lang.percent}%</span>
                                                                </div>
                                                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${lang.percent}%` }}
                                                                        className="h-full rounded-full bg-purple-500"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {selectedStat === 'analytics' && (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    {[
                                                        { label: 'Total Views', value: stats.umami.stats?.pageviews ?? 0, color: 'text-yellow-500' },
                                                        { label: 'Unique hosts', value: stats.umami.stats?.visitors ?? 0, color: 'text-emerald-400' },
                                                        { label: 'Active Signal', value: stats.umami.active ?? 0, color: 'text-cyan-400' },
                                                        { label: 'Persist Mean', value: `${Math.round((stats.umami.stats?.totaltime ?? 0) / (stats.umami.stats?.visits || 1) / 60)}m`, color: 'text-purple-400' }
                                                    ].map((item, i) => (
                                                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                                                            <div className={`text-2xl font-black text-white tracking-tighter mb-1`}>{item.value}</div>
                                                            <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{item.label}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="space-y-3">
                                                    <h4 className="text-[9px] font-black uppercase text-white tracking-tighter flex items-center gap-2 opacity-50">
                                                        <Activity size={14} className="text-cyan-400" /> Interaction Frequency
                                                    </h4>
                                                    <div className="grid gap-2">
                                                        {stats.umami.stats ? (
                                                            [
                                                                { label: 'Engagement', value: stats.umami.stats?.pageviews ?? 0, prev: stats.umami.stats?.comparison?.pageviews ?? 0, color: 'border-yellow-500/50' },
                                                                { label: 'Connection', value: stats.umami.stats?.visitors ?? 0, prev: stats.umami.stats?.comparison?.visitors ?? 0, color: 'border-emerald-500/50' },
                                                            ].map((item, i) => (
                                                                <div key={i} className={`p-4 rounded-xl bg-white/[0.02] border border-white/5 border-l-2 ${item.color} flex items-center justify-between gap-4`}>
                                                                    <div>
                                                                        <div className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">{item.label}</div>
                                                                        <div className="text-sm font-black text-white uppercase tracking-tighter">{item.value}</div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="text-[7px] font-mono text-slate-600 uppercase">Prev</div>
                                                                        <div className="text-xs font-bold text-slate-500 tracking-tighter italic">{item.prev}</div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="shrink-0 p-6 border-t border-white/5 bg-black/40 flex justify-center">
                                        <button
                                            onClick={() => setSelectedStat(null)}
                                            className="px-8 py-2.5 bg-white text-black font-black rounded-xl hover:bg-cyan-500 transition-all uppercase text-[9px] tracking-widest"
                                        >
                                            Return to Pulse
                                        </button>
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
                    width: 4px;
                    height: 4px;
                }
                .custom-scrollbar-horizontal::-webkit-scrollbar {
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track,
                .custom-scrollbar-horizontal::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb,
                .custom-scrollbar-horizontal::-webkit-scrollbar-thumb {
                    background: rgba(34, 211, 238, 0.2);
                    border-radius: 10px;
                }
            `}</style>
        </section >
    );
};

export default React.memo(Performance);
