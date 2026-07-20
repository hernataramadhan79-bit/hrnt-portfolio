'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github, Timer, TrendingUp, Activity,
    Users, Box, Sparkles, GitBranch, Zap,
    X, Code, Clock, ArrowUpRight, Award
} from 'lucide-react';


const timeAgo = (dateStr: string): string => {
    if (!dateStr) return 'N/A';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const months = Math.floor(days / 30);
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return `${months}mo ago`;
};

const SkeletonPulse = ({ className = '' }: { className?: string }) => (
    <div className={`bg-white/5 rounded animate-pulse ${className}`} />
);

const MainframeCard = ({
    children,
    title,
    subtitle,
    icon: Icon,
    color = 'cyan',
    className = "",
    onClick,
    isLoading = false
}: {
    children: React.ReactNode,
    title: string,
    subtitle?: string,
    icon: any,
    color?: 'cyan' | 'purple' | 'emerald' | 'yellow' | 'rose',
    className?: string,
    onClick?: () => void,
    isLoading?: boolean
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
                            {isLoading ? (
                                <span className="inline-flex items-center gap-1.5 mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                                    <span className="text-[8px] font-mono text-cyan-400/70 uppercase tracking-widest animate-pulse">Syncing...</span>
                                </span>
                            ) : (
                                subtitle && <p className="text-slate-500 text-[8px] font-mono tracking-widest uppercase mt-1">{subtitle}</p>
                            )}
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
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handler = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
            el.scrollLeft += e.deltaY;
        };
        el.addEventListener('wheel', handler, { passive: false });
        return () => el.removeEventListener('wheel', handler);
    }, []);

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

            <div className={`rounded-2xl bg-white/[0.02] border border-white/5 relative group/matrix no-cursor overflow-hidden ${compact ? 'py-0' : ''}`}>
                <div
                    ref={scrollRef}
                    className="overflow-x-auto custom-scrollbar-horizontal"
                >
                    {/* Month label row — inside scroll so it moves with the grid */}
                    {compact && (() => {
                        const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        let lastMonth = -1;
                        let lastLabelCol = -999;
                        const MIN_GAP = 4;
                        const labels: { label: string; colIndex: number }[] = [];
                        slicedData.forEach((week: any, i: number) => {
                            const days = Array.isArray(week) ? week : [];
                            const firstDay = days.find((d: any) => d?.date);
                            if (firstDay?.date) {
                                const m = new Date(firstDay.date).getMonth();
                                if (m !== lastMonth && (i - lastLabelCol) >= MIN_GAP) {
                                    labels.push({ label: MONTH_NAMES[m], colIndex: i });
                                    lastMonth = m;
                                    lastLabelCol = i;
                                } else if (m !== lastMonth) {
                                    lastMonth = m; // track month change even if skipped
                                }
                            }
                        });
                        return (
                            <div className="flex gap-[3px] md:gap-1 px-4 pt-3 pb-1">
                                {slicedData.map((_: any, i: number) => {
                                    const marker = labels.find(l => l.colIndex === i);
                                    return (
                                        <div key={i} className="flex-1 min-w-[10px]">
                                            {marker ? (
                                                <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest leading-none whitespace-nowrap">
                                                    {marker.label}
                                                </span>
                                            ) : null}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })()}

                    {/* Heatmap grid */}
                    <div className={`flex justify-start md:justify-between gap-[3px] md:gap-1 px-4 pb-4 items-end ${compact ? '' : 'pt-4'}`}>
                        {slicedData.map((week: any, i: number) => (
                            <div key={i} className="flex flex-col gap-[4px] flex-1 min-w-[10px]">
                                {(week.length === 7 ? week : [...Array(7 - week.length).fill({ count: 0 }), ...week]).map((day: any, j: number) => {
                                    const count = day?.count || day?.contributionCount || 0;
                                    const date = day?.date ? new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No Data';
                                    return (
                                        <motion.div
                                            key={j}
                                            onMouseEnter={() => { if (count > 0) setHoveredDay({ count, date }); }}
                                            onMouseLeave={() => { if (count > 0) setHoveredDay(null); }}
                                            className={`w-full aspect-square rounded-[1.5px] relative shrink-0 transition-colors ${count > 0 ? 'cursor-pointer group/dot' : 'cursor-default'}`}
                                            style={{ backgroundColor: getLevelColor(count) }}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

GitHubHeatmap.displayName = 'GitHubHeatmap';

const Performance: React.FC = () => {
    const [selectedStat, setSelectedStat] = useState<'github' | 'wakatime' | null>(null);
    const [mounted, setMounted] = useState(false);
    const [loadingState, setLoadingState] = useState({ github: true, wakatime: true });
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
        error: false
    });

    useEffect(() => {
        setMounted(true);

        const fetchGitHub = async () => {
            try {
                const res = await fetch('/api/github');
                if (res.ok) {
                    const data = await res.json();
                    setStats(prev => ({
                        ...prev,
                        github: {
                            totalContributions: data.profile.totalContributions,
                            stars: data.profile.stars,
                            repos: data.profile.repos,
                            followers: data.profile.followers,
                            contributions: data.contributions,
                            topRepos: data.topRepos
                        }
                    }));
                }
            } catch (e) {
                console.error('GitHub fetch error:', e);
            } finally {
                setLoadingState(prev => ({ ...prev, github: false }));
            }
        };

        const fetchWakaTime = async () => {
            try {
                const res = await fetch('/api/wakatime');
                if (res.ok) {
                    const data = await res.json();
                    if (data.isLoaded) {
                        setStats(prev => ({ ...prev, wakatime: data }));
                    }
                }
            } catch (e) {
                console.error('WakaTime fetch error:', e);
            } finally {
                setLoadingState(prev => ({ ...prev, wakatime: false }));
            }
        };

        fetchGitHub();
        fetchWakaTime();
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
                            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">Vitals</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Primary Content Grid - 2 Cards Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* GitHub Activity Card */}
                    <MainframeCard
                        title="GitHub Engine"
                        subtitle="Activity Sync"
                        icon={Github}
                        color="cyan"
                        onClick={() => setSelectedStat('github')}
                        isLoading={loadingState.github}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-6 border-b border-white/5">
                            {loadingState.github ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <SkeletonPulse className="h-7 w-16" />
                                        <SkeletonPulse className="h-2 w-10" />
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div>
                                        <div className="text-xl sm:text-2xl font-black text-white tracking-tighter">
                                            {stats.github.totalContributions}
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Commits</span>
                                    </div>
                                    <div>
                                        <div className="text-xl sm:text-2xl font-black text-white tracking-tighter">
                                            {stats.github.repos}
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Repos</span>
                                    </div>
                                    <div>
                                        <div className="text-xl sm:text-2xl font-black text-cyan-400 tracking-tighter flex items-center gap-1">
                                            <Sparkles size={14} className="text-yellow-500/50" />
                                            {stats.github.stars}
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Stars</span>
                                    </div>
                                    <div>
                                        <div className="text-xl sm:text-2xl font-black text-purple-400 tracking-tighter flex items-center gap-1">
                                            <Users size={14} className="text-cyan-500/50" />
                                            {stats.github.followers}
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Nodes</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {loadingState.github ? (
                            <div className="pt-6 space-y-3">
                                <SkeletonPulse className="h-3 w-28" />
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-1 items-end">
                                    {Array.from({ length: 32 }).map((_, i) => (
                                        <div key={i} className="flex flex-col gap-[4px] flex-1 min-w-[8px]">
                                            {Array.from({ length: 7 }).map((_, j) => (
                                                <div key={j} className="w-full aspect-square bg-white/5 animate-pulse rounded-[1.5px]" style={{ animationDelay: `${(i * 7 + j) * 10}ms` }} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <GitHubHeatmap contributions={stats.github.contributions} sliceCount={34} />
                        )}
                    </MainframeCard>

                    {/* WakaTime Dev Velocity Card */}
                    <MainframeCard
                        title="Dev Velocity"
                        subtitle="WakaTime Telemetry"
                        icon={Zap}
                        color="purple"
                        onClick={() => setSelectedStat('wakatime')}
                        isLoading={loadingState.wakatime}
                    >
                        {/* WakaTime Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3 pb-6 border-b border-white/5">
                            {loadingState.wakatime ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <SkeletonPulse className="h-7 w-20" />
                                        <SkeletonPulse className="h-2 w-14" />
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div>
                                        <div className="text-xl sm:text-2xl font-black text-white tracking-tighter flex items-center gap-1">
                                            <Clock size={15} className="text-purple-400 shrink-0" />
                                            <span className="truncate">{stats.wakatime.totalTime}</span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Focus Time</span>
                                    </div>
                                    <div>
                                        <div className="text-xl sm:text-2xl font-black text-cyan-400 tracking-tighter flex items-center gap-1">
                                            <Timer size={15} className="text-cyan-400 shrink-0" />
                                            <span className="truncate">{stats.wakatime.dailyAverage}</span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Daily Average</span>
                                    </div>
                                    <div>
                                        <div className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tighter flex items-center gap-1">
                                            <TrendingUp size={15} className="text-emerald-400 shrink-0" />
                                            <span>{stats.wakatime.optimizationFactor}</span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Weekly Growth</span>
                                    </div>
                                    <div>
                                        <div className="text-base sm:text-lg font-black text-yellow-400 tracking-tighter truncate flex items-center gap-1">
                                            <Award size={15} className="text-yellow-400 shrink-0" />
                                            <span className="truncate">{stats.wakatime.bestDay}</span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Peak Velocity</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Language Distribution Breakdown */}
                        <div className="pt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    <Code size={13} className="text-purple-400" />
                                    Language Telemetry
                                </h4>
                                <span className="text-[9px] font-mono text-slate-500 uppercase">Top Tech Distribution</span>
                            </div>

                            {loadingState.wakatime ? (
                                <div className="space-y-3">
                                    <SkeletonPulse className="h-2.5 w-full rounded-full" />
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <SkeletonPulse key={i} className="h-8 w-full rounded-xl" />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Stacked Multi-color Progress Bar */}
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-white/5">
                                        {stats.wakatime.languages.map((lang: any, i: number) => (
                                            <motion.div
                                                key={lang.name}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${lang.percent}%` }}
                                                transition={{ duration: 0.8, delay: i * 0.05 }}
                                                style={{ backgroundColor: lang.color || '#a855f7' }}
                                                className="h-full rounded-full transition-all relative group/bar"
                                                title={`${lang.name}: ${lang.percent}%`}
                                            />
                                        ))}
                                    </div>

                                    {/* Language Badges Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                                        {stats.wakatime.languages.slice(0, 6).map((lang: any, i: number) => (
                                            <div
                                                key={i}
                                                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between transition-colors hover:bg-white/[0.04] hover:border-purple-500/20"
                                            >
                                                <div className="flex items-center gap-2 truncate">
                                                    <span
                                                        className="w-2 h-2 rounded-full shrink-0"
                                                        style={{ backgroundColor: lang.color || '#a855f7' }}
                                                    />
                                                    <span className="text-[11px] font-mono text-slate-200 font-bold truncate">
                                                        {lang.name}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-mono text-slate-400 font-medium shrink-0 ml-1">
                                                    {lang.percent}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </MainframeCard>
                </div>

                {/* --- PERFORMANCE DETAIL MODAL --- */}
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
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                                <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest">Protocol Sync_Status</span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none">
                                                {selectedStat === 'github' && "GitHub Analytics"}
                                                {selectedStat === 'wakatime' && "Developer Velocity"}
                                            </h3>
                                        </div>

                                        <button
                                            onClick={() => setSelectedStat(null)}
                                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5 cursor-pointer"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    {/* Modal Body */}
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
                                                    <div className="max-h-64 overflow-y-auto custom-scrollbar pr-1" onWheel={(e) => e.stopPropagation()}>
                                                        <div className="grid gap-2">
                                                            {stats.github.topRepos.length === 0 ? (
                                                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                                                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">No public repositories found</p>
                                                                </div>
                                                            ) : (
                                                                stats.github.topRepos.map((repo: any) => (
                                                                    <a
                                                                        key={repo.id}
                                                                        href={repo.html_url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="group/repo p-3 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between transition-all hover:bg-white/[0.04] hover:border-white/10 hover:translate-x-1"
                                                                    >
                                                                        <div className="flex items-center gap-2 truncate">
                                                                            <span className="text-[12px] font-black text-white group-hover/repo:text-cyan-400 transition-colors uppercase tracking-widest truncate max-w-[150px] md:max-w-[220px]">
                                                                                {repo.name}
                                                                            </span>
                                                                            {repo.language && (
                                                                                <span className="shrink-0 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-mono text-slate-400 uppercase tracking-wider">
                                                                                    {repo.language}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                         <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 shrink-0 ml-2">
                                                                            {repo.stargazers_count > 0 && (
                                                                                <span className="flex items-center gap-1 text-yellow-400/70">
                                                                                    <Sparkles size={10} /> {repo.stargazers_count}
                                                                                </span>
                                                                            )}
                                                                            {repo.forks_count > 0 && (
                                                                                <span className="flex items-center gap-1 text-cyan-400/70">
                                                                                    <GitBranch size={10} /> {repo.forks_count}
                                                                                </span>
                                                                            )}
                                                                            <span className="flex items-center gap-1">
                                                                                <Clock size={10} /> {timeAgo(repo.pushed_at)}
                                                                            </span>
                                                                            <ArrowUpRight size={12} className="opacity-0 group-hover/repo:opacity-100 transition-opacity text-cyan-400" />
                                                                         </div>
                                                                    </a>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {selectedStat === 'wakatime' && (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                    {[
                                                        { label: 'Total Coding', value: stats.wakatime.totalTime, color: 'text-purple-400' },
                                                        { label: 'Daily Avg', value: stats.wakatime.dailyAverage, color: 'text-cyan-400' },
                                                        { label: 'Weekly Growth', value: stats.wakatime.optimizationFactor, color: 'text-emerald-400' },
                                                        { label: 'Peak Velocity', value: stats.wakatime.bestDay, color: 'text-yellow-400' }
                                                    ].map((s, i) => (
                                                        <div key={i} className="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                                                            <span className={`text-xl font-black tracking-tighter ${s.color} truncate`}>{s.value}</span>
                                                            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-1">{s.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="text-[9px] font-black uppercase text-white tracking-tighter flex items-center gap-2 opacity-50">
                                                        <Code size={14} className="text-purple-400" /> Language Telemetry Breakdown
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {stats.wakatime.languages.map((lang: any, i: number) => (
                                                            <div key={i} className="space-y-1.5">
                                                                <div className="flex justify-between items-end">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color || '#a855f7' }} />
                                                                        <span className="text-[12px] font-black text-white uppercase tracking-tighter">{lang.name}</span>
                                                                    </div>
                                                                    <span className="text-[10px] font-mono text-slate-400">{lang.percent}%</span>
                                                                </div>
                                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${lang.percent}%` }}
                                                                        style={{ backgroundColor: lang.color || '#a855f7' }}
                                                                        className="h-full rounded-full"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="shrink-0 p-6 border-t border-white/5 bg-black/40 flex justify-center">
                                        <button
                                            onClick={() => setSelectedStat(null)}
                                            className="px-8 py-2.5 bg-white text-black font-black rounded-xl hover:bg-cyan-400 transition-all uppercase text-[9px] tracking-widest cursor-pointer"
                                        >
                                            Return to Telemetry
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

