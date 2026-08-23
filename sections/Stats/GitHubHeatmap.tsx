'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLevelColor } from './utils';

interface GitHubHeatmapProps {
    contributions: any[];
    sliceCount?: number;
    showHeader?: boolean;
    compact?: boolean;
    title?: string;
    icon?: any;
}

const GitHubHeatmap: React.FC<GitHubHeatmapProps> = ({
    contributions, sliceCount = 50, showHeader = true, compact = false, title = "Activity Pulse", icon: TitleIcon = null
}) => {
    const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // Use pointer-based horizontal scroll — no preventDefault needed,
        // so we can use passive: true which lets the browser keep its scroll optimizations.
        // The wheel event now simply maps deltaY to scrollLeft without blocking.
        const handler = (e: WheelEvent) => {
            // Only intercept horizontal scroll if the container itself is scrollable
            if (el.scrollWidth > el.clientWidth) {
                el.scrollLeft += e.deltaY;
                // Do NOT call e.preventDefault() — this allows passive: true
            }
        };
        el.addEventListener('wheel', handler, { passive: true });
        return () => el.removeEventListener('wheel', handler);
    }, []);

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
                        <h4 className={`text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 ${compact ? 'text-slate-300' : 'text-slate-400'}`}>
                            {TitleIcon && <TitleIcon size={12} className="text-cyan-400" />}
                            {title}
                        </h4>
                        <AnimatePresence mode="wait">
                            {hoveredDay && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex items-center gap-2 border-l border-white/15 pl-3"
                                >
                                    <span className="text-[10px] font-bold text-white">{hoveredDay.count} COMMITS</span>
                                    <span className="text-[9px] font-mono text-slate-300 uppercase">{hoveredDay.date}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                        <span>Less</span>
                        <div className="flex gap-1">
                            {[0, 2, 5, 9, 12].map((lvl) => (
                                <div key={lvl} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: getLevelColor(lvl) }} />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </div>
            )}

            <div className={`rounded-2xl bg-white/[0.02] border border-white/5 relative group/matrix no-cursor overflow-hidden ${compact ? 'py-0' : ''}`}>
                <div ref={scrollRef} className="overflow-x-auto custom-scrollbar-horizontal">
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
                                    lastMonth = m;
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

                    <div className={`flex justify-start md:justify-between gap-[3px] md:gap-1 px-4 pb-4 items-end ${compact ? '' : 'pt-4'}`}>
                        {slicedData.map((week: any, i: number) => (
                            <div key={i} className="flex flex-col gap-[4px] flex-1 min-w-[10px]">
                                {(week.length === 7 ? week : [...Array(7 - week.length).fill({ count: 0 }), ...week]).map((day: any, j: number) => {
                                    const count = day?.count || day?.contributionCount || 0;
                                    const date = day?.date ? new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No Data';
                                    return (
                                        <div
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
};

export default React.memo(GitHubHeatmap);