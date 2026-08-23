'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Github, Timer, TrendingUp, Activity,
    Users, Box, Sparkles, GitBranch, Zap,
    Code, Clock, Award,
    X, ArrowUpRight
} from 'lucide-react';
import MainframeCard from './MainframeCard';
import GitHubHeatmap from './GitHubHeatmap';
import StatsModal from './StatsModal';
import { SkeletonPulse } from './utils';
import { fetchGithubData, fetchWakaTimeData } from '../../lib/clientDataCache';

const Stats: React.FC = () => {
    const [selectedStat, setSelectedStat] = useState<'github' | 'wakatime' | null>(null);
    const [mounted, setMounted] = useState(false);
    const [loadingState, setLoadingState] = useState({
        github: true,
        wakatime: true
    });
    const [stats, setStats] = useState({
        github: {
            totalContributions: 0,
            stars: 0,
            repos: 0,
            followers: 0,
            contributions: [] as { date: string; count: number }[][],
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
                const data = await fetchGithubData();
                if (data && data.profile) {
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
                const data = await fetchWakaTimeData();
                if (data && (data.isLoaded || data.totalTime)) {
                    setStats(prev => ({ ...prev, wakatime: data }));
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
        <section id="stats" className="relative z-10 min-h-[calc(100dvh-4.5rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col justify-center w-full py-6 lg:py-2 xl:py-6 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto w-full flex flex-col h-full lg:justify-center">

                <div className="relative mb-4 lg:mb-5 xl:mb-8 text-center shrink-0">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em] mb-2.5 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Telemetry & Real-Time Sync
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-5xl font-black text-white mb-2 uppercase tracking-tighter">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">Vitals</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 lg:gap-4 xl:gap-6">
                    {/* GitHub Activity Card */}
                    <MainframeCard
                        title="GitHub Engine"
                        subtitle="Activity Telemetry"
                        icon={Github}
                        color="cyan"
                        onClick={() => setSelectedStat('github')}
                        isLoading={loadingState.github}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pb-4 border-b border-white/10">
                            {loadingState.github ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <SkeletonPulse className="h-6 w-14" />
                                        <SkeletonPulse className="h-2 w-8" />
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div>
                                        <div className="text-lg sm:text-xl xl:text-2xl font-black text-white tracking-tighter">
                                            {stats.github.totalContributions}
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Commits</span>
                                    </div>
                                    <div>
                                        <div className="text-lg sm:text-xl xl:text-2xl font-black text-white tracking-tighter">
                                            {stats.github.repos}
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Repos</span>
                                    </div>
                                    <div>
                                        <div className="text-lg sm:text-xl xl:text-2xl font-black text-cyan-400 tracking-tighter flex items-center gap-1">
                                            <Sparkles size={13} className="text-yellow-400" />
                                            {stats.github.stars}
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Stars</span>
                                    </div>
                                    <div>
                                        <div className="text-lg sm:text-xl xl:text-2xl font-black text-purple-400 tracking-tighter flex items-center gap-1">
                                            <Users size={13} className="text-purple-300" />
                                            {stats.github.followers}
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Followers</span>
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
                        <div className="grid grid-cols-2 gap-2.5 pb-4 border-b border-white/10">
                            {loadingState.wakatime ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <SkeletonPulse className="h-6 w-16" />
                                        <SkeletonPulse className="h-2 w-10" />
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div>
                                        <div className="text-lg sm:text-xl xl:text-2xl font-black text-white tracking-tighter flex items-center gap-1">
                                            <Clock size={14} className="text-purple-400 shrink-0" />
                                            <span className="truncate">{stats.wakatime.totalTime}</span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Coding Time</span>
                                    </div>
                                    <div>
                                        <div className="text-lg sm:text-xl xl:text-2xl font-black text-cyan-400 tracking-tighter flex items-center gap-1">
                                            <Timer size={14} className="text-cyan-400 shrink-0" />
                                            <span className="truncate">{stats.wakatime.dailyAverage}</span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Daily Average</span>
                                    </div>
                                    <div>
                                        <div className="text-lg sm:text-xl xl:text-2xl font-black text-emerald-400 tracking-tighter flex items-center gap-1">
                                            <TrendingUp size={14} className="text-emerald-400 shrink-0" />
                                            <span>{stats.wakatime.optimizationFactor}</span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Weekly Growth</span>
                                    </div>
                                    <div>
                                        <div className="text-sm sm:text-base xl:text-lg font-black text-yellow-400 tracking-tighter truncate flex items-center gap-1">
                                            <Award size={14} className="text-yellow-400 shrink-0" />
                                            <span className="truncate">{stats.wakatime.bestDay}</span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Peak Velocity</span>
                                    </div>
                                </>
                            )}
                        </div>

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
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-white/5">
                                        {stats.wakatime.languages.map((lang: any, i: number) => (
                                            <motion.div
                                                key={lang.name}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${lang.percent}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: i * 0.05 }}
                                                style={{ backgroundColor: lang.color || '#a855f7' }}
                                                className="h-full rounded-full transition-all relative group/bar"
                                                title={`${lang.name}: ${lang.percent}%`}
                                            />
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                                        {stats.wakatime.languages.slice(0, 6).map((lang: any, i: number) => (
                                            <div
                                                key={i}
                                                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between transition-colors hover:bg-white/[0.04] hover:border-purple-500/20"
                                            >
                                                <div className="flex items-center gap-2 truncate">
                                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: lang.color || '#a855f7' }} />
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

                {mounted && (
                    <StatsModal
                        selectedStat={selectedStat}
                        setSelectedStat={setSelectedStat}
                        stats={stats}
                        mounted={mounted}
                    />
                )}

            </div>
        </section >
    );
};

export default React.memo(Stats);