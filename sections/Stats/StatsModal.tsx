'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Award, Box, Clock, Code, GitBranch, Sparkles, TrendingUp, Timer, Users, X, ArrowUpRight } from 'lucide-react';
import GitHubHeatmap from './GitHubHeatmap';
import { timeAgo } from './utils';

interface StatsModalProps {
    selectedStat: 'github' | 'wakatime' | null;
    setSelectedStat: (v: null) => void;
    stats: {
        github: { totalContributions: number; stars: number; repos: number; followers: number; contributions: any[]; topRepos: any[] };
        wakatime: { languages: any[]; totalTime: string; dailyAverage: string; bestDay: string; optimizationFactor: string };
    };
    mounted: boolean;
}

const StatsModal: React.FC<StatsModalProps> = ({ selectedStat, setSelectedStat, stats, mounted }) => {
    if (!mounted) return null;

    return (
        <AnimatePresence>
            {selectedStat && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="perf-modal-title">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedStat(null)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer pointer-events-auto"
                    />

                    <motion.div
                        className="relative w-full max-w-lg md:max-w-2xl max-h-[90dvh] lg:max-h-[85vh] bg-[#050508] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl z-10 pointer-events-auto flex flex-col"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="shrink-0 p-5 md:p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-[9px] font-mono text-cyan-300 uppercase tracking-widest font-semibold">Live System Telemetry</span>
                                </div>
                                <h3 id="perf-modal-title" className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none">
                                    {selectedStat === 'github' && "GitHub Analytics"}
                                    {selectedStat === 'wakatime' && "Developer Velocity"}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedStat(null)}
                                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 hover:text-white transition-all border border-white/10 cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="shrink overflow-y-auto custom-scrollbar p-5 md:p-6 space-y-5 md:space-y-6">
                            {selectedStat === 'github' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                        {[
                                            { label: 'Commits', value: stats.github.totalContributions, color: 'text-cyan-400' },
                                            { label: 'Stars', value: stats.github.stars, color: 'text-yellow-400' },
                                            { label: 'Repos', value: stats.github.repos, color: 'text-purple-400' },
                                            { label: 'Followers', value: stats.github.followers, color: 'text-emerald-400' }
                                        ].map((s, i) => (
                                            <div key={i} className="flex flex-col p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center transition-colors hover:bg-white/[0.06]">
                                                <span className={`text-2xl font-black ${s.color} leading-none mb-1 tracking-tighter`}>{s.value}</span>
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">{s.label}</span>
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

                        <div className="shrink-0 p-4 md:p-6 border-t border-white/5 bg-black/40 flex justify-center">
                            <button
                                onClick={() => setSelectedStat(null)}
                                className="px-8 py-2 md:py-2.5 bg-white text-black font-black rounded-xl hover:bg-cyan-400 transition-all uppercase text-[9px] md:text-[10px] tracking-widest cursor-pointer"
                            >
                                Return to Telemetry
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StatsModal;