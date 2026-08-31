'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Github,
  Clock,
  Code2,
  TrendingUp,
  GitCommit,
  ExternalLink,
} from 'lucide-react';
import {
  fetchGithubData,
  fetchWakaTimeData,
  getStoredGithubData,
  getStoredWakaTimeData,
} from '../../lib/clientDataCache';

// ─── Types ────────────────────────────────────────────────────────────────────

type ContribDay = { date: string; count: number; level: number };

// ─── Constants ────────────────────────────────────────────────────────────────

const GITHUB_COLORS = [
  '#141923', // Level 0 — empty (dark obsidian slate)
  '#083344', // Level 1 — low (deep cyan-950)
  '#0e7490', // Level 2 — medium (cyan-700)
  '#06b6d4', // Level 3 — high (cyan-500)
  '#22d3ee', // Level 4 — very high (luminous cyan-400)
];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

/** Convert API's weeks array (from GraphQL) into typed grid */
function buildWeeksFromApi(
  apiWeeks: { date: string; count: number }[][]
): ContribDay[][] {
  return apiWeeks.map((week) =>
    week.map((day) => ({
      date: day.date,
      count: day.count,
      level: getLevel(day.count),
    }))
  );
}

function formatTooltipDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const month = MONTH_LABELS[parseInt(parts[1], 10) - 1];
  const day = parseInt(parts[2], 10);
  return `${month} ${day}, ${year}`;
}

/** Clean neutral 52-week calendar grid without fake/random commit fabrication */
function createEmptyWeeks(): ContribDay[][] {
  const weeks: ContribDay[][] = [];
  const today = new Date();
  const startDate = new Date(today);
  // Aligned exactly to Sunday 52 weeks ago
  startDate.setDate(today.getDate() - 52 * 7 - today.getDay());
  startDate.setHours(0, 0, 0, 0);

  let current = new Date(startDate);
  for (let w = 0; w < 53; w++) {
    const week: ContribDay[] = [];
    for (let d = 0; d < 7; d++) {
      week.push({
        date: current <= today ? current.toISOString().slice(0, 10) : '',
        count: 0,
        level: 0,
      });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

// ─── GitHubContributionGraph ──────────────────────────────────────────────────

function GitHubContributionGraph({
  totalContributions,
  apiWeeks,
}: {
  totalContributions: number;
  apiWeeks?: { date: string; count: number }[][];
}) {
  const graphRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    date: string;
    count: number;
  }>({ visible: false, x: 0, y: 0, date: '', count: 0 });

  // Use real API data if available, else clean neutral grid (zero mock data)
  const weeks = useMemo<ContribDay[][]>(() => {
    if (apiWeeks && apiWeeks.length > 0) {
      return buildWeeksFromApi(apiWeeks);
    }
    return createEmptyWeeks();
  }, [apiWeeks]);

  // Auto-scroll on small screens to the rightmost (most recent) weeks
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth;
    });
  }, [weeks]);

  // Non-colliding month label placements: only 1 label per month, strictly spaced >= 4 weeks
  const monthPositions = useMemo(() => {
    const positions: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, wi) => {
      for (const day of week) {
        if (day.date) {
          const parts = day.date.split('-');
          if (parts.length === 3) {
            const m = parseInt(parts[1], 10) - 1;
            const dayNum = parseInt(parts[2], 10);
            if (dayNum <= 7 && m !== lastMonth) {
              if (wi <= weeks.length - 3) {
                positions.push({ label: MONTH_LABELS[m], weekIndex: wi });
                lastMonth = m;
              }
              break;
            }
          }
        }
      }
    });

    return positions;
  }, [weeks]);

  // Formatted rolling time range (e.g. "Sep 2025 — Aug 2026")
  const timeRangeText = useMemo(() => {
    let firstDate = '';
    let lastDate = '';
    for (const week of weeks) {
      for (const day of week) {
        if (day.date) {
          if (!firstDate) firstDate = day.date;
          lastDate = day.date;
        }
      }
    }
    if (!firstDate || !lastDate) return 'Past 52 Weeks';
    const fParts = firstDate.split('-');
    const lParts = lastDate.split('-');
    if (fParts.length === 3 && lParts.length === 3) {
      const startM = MONTH_LABELS[parseInt(fParts[1], 10) - 1];
      const startY = fParts[0];
      const endM = MONTH_LABELS[parseInt(lParts[1], 10) - 1];
      const endY = lParts[0];
      return `${startM} ${startY} — ${endM} ${endY}`;
    }
    return 'Past 52 Weeks';
  }, [weeks]);

  const CELL = 11;
  const GAP = 3;
  const STEP = CELL + GAP;
  const LEFT_LABEL_WIDTH = 28;

  const handleMouseEnter = (
    e: React.MouseEvent<SVGRectElement>,
    date: string,
    count: number
  ) => {
    const cellRect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
    const graphRect = graphRef.current?.getBoundingClientRect();
    if (!graphRect) return;
    setTooltip({
      visible: true,
      x: cellRect.left - graphRect.left + cellRect.width / 2,
      y: cellRect.top - graphRect.top - 8,
      date,
      count,
    });
  };

  const handleMouseLeave = () =>
    setTooltip((t) => ({ ...t, visible: false }));

  const svgWidth = weeks.length * STEP + LEFT_LABEL_WIDTH;
  const svgHeight = 7 * STEP + 22;

  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl relative border-neutral-800/80">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-neutral-800 pb-4 gap-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GitCommit size={17} className="text-cyan-400" />
            <span>GitHub Contribution Matrix</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5 font-normal">
            Continuous engineering cadence and public commit distribution over the past 52 weeks.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs text-neutral-400 font-mono bg-neutral-900/60 px-3 py-1 rounded-full border border-neutral-800 flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">{totalContributions}</span> verified commits
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-300">{timeRangeText}</span>
          </span>
          <a
            href="https://github.com/hernataramadhan79-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full hover:bg-cyan-500/20"
          >
            <span>@hernataramadhan79-bit</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Responsive Heatmap Area: stretches 100% to fit container on sm/md/lg */}
      <div ref={graphRef} className="relative w-full pt-3">
        <div
          ref={scrollRef}
          className="overflow-x-auto w-full pb-1"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#22d3ee33 transparent',
          }}
        >
          <div className="min-w-[680px] sm:min-w-0 w-full">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto block select-none"
            >
              {/* Month labels */}
              {monthPositions.map(({ label, weekIndex }) => (
                <text
                  key={label + weekIndex}
                  x={LEFT_LABEL_WIDTH + weekIndex * STEP}
                  y={11}
                  fill="#8e9192"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="500"
                >
                  {label}
                </text>
              ))}

              {/* Day-of-week labels */}
              {DAY_LABELS.map((label, di) =>
                label ? (
                  <text
                    key={di}
                    x={2}
                    y={20 + di * STEP + CELL - 2}
                    fill="#8e9192"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="500"
                  >
                    {label}
                  </text>
                ) : null
              )}

              {/* Contribution cells */}
              {weeks.map((week, wi) =>
                week.map((day, di) => (
                  <rect
                    key={`${wi}-${di}`}
                    x={LEFT_LABEL_WIDTH + wi * STEP}
                    y={20 + di * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2.5}
                    fill={GITHUB_COLORS[day.level]}
                    stroke={day.level === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(34,211,238,0.2)'}
                    strokeWidth={0.5}
                    className="transition-all duration-150 hover:brightness-125 hover:stroke-cyan-300 hover:stroke-[1.5]"
                    style={{ cursor: day.count > 0 ? 'pointer' : 'default' }}
                    onMouseEnter={(e) => handleMouseEnter(e, day.date, day.count)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))
              )}
            </svg>
          </div>
        </div>

        {/* Floating Tooltip — floats cleanly above hovered cell with caret pointer */}
        {tooltip.visible && (
          <div
            className="pointer-events-none absolute z-50 bg-[#0c1017]/95 backdrop-blur-md border border-cyan-400/60 text-white text-xs font-mono px-3.5 py-1.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(34,211,238,0.25)] whitespace-nowrap -translate-x-1/2 -translate-y-full flex items-center gap-2"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)] animate-pulse" />
            <span className="text-cyan-300 font-bold">
              {tooltip.count} {tooltip.count === 1 ? 'commit' : 'commits'}
            </span>
            <span className="text-[#8e9192]">on {formatTooltipDate(tooltip.date)}</span>

            {/* Caret arrow pointing directly at hovered cell */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-cyan-400/60" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-[5px] border-transparent border-t-[#0c1017]" />
          </div>
        )}
      </div>

      {/* Legend & Telemetry Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5 pt-3.5 text-xs text-[#8e9192] font-mono border-t border-white/10">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-cyan-400/80 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
          <span>52-Week Observability Window ({timeRangeText}) • In-Memory Cached (5m TTL)</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {GITHUB_COLORS.map((color, i) => (
              <div
                key={i}
                className="rounded-[3px] border border-white/10"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Section ─────────────────────────────────────────────────────────────

export default function Stats() {
  const [githubData, setGithubData] = useState<any>(null);
  const [wakaData, setWakaData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Segera hidrasi dari cache lokal begitu mount di browser (0ms)
    const ghCached = getStoredGithubData();
    const wkCached = getStoredWakaTimeData();
    if (ghCached) setGithubData(ghCached);
    if (wkCached) setWakaData(wkCached);
    if (ghCached || wkCached) setLoading(false);

    // 2. Sinkronisasi latar belakang
    let isMounted = true;
    async function loadTelemetry() {
      try {
        const [gh, wk] = await Promise.all([
          fetchGithubData().catch(() => null),
          fetchWakaTimeData().catch(() => null),
        ]);
        if (!isMounted) return;
        if (gh) setGithubData(gh);
        if (wk) setWakaData(wk);
      } catch (err) {
        console.error('Failed to load telemetry:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTelemetry();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalContributions = githubData?.profile?.totalContributions ?? (loading ? '...' : 0);
  const reposCount = githubData?.profile?.repos ?? (loading ? '...' : 0);
  const starsCount = githubData?.profile?.stars ?? (loading ? '...' : 0);

  // Real contribution weeks from API (array of weeks, each week = array of days)
  const apiWeeks: { date: string; count: number }[][] | undefined =
    githubData?.contributions?.length > 0 ? githubData.contributions : undefined;

  const totalTime = wakaData?.totalTime || (loading ? '...' : '0h 0m');
  const dailyAverage = wakaData?.dailyAverage || (loading ? '...' : '0h 0m');
  const bestDay = wakaData?.bestDay || (loading ? '...' : 'Tracked via WakaTime');
  const languages: { name: string; percent: number; color?: string }[] =
    wakaData?.languages || [];

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-6"
      >
        <div>
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
            04 / ACTIVITY TELEMETRY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Telemetry &amp; Activity Observability
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            Real-time activity metrics fetched via GitHub and WakaTime APIs with in-memory caching and rate limit protection.
          </p>
        </div>

        {/* Real-time Status Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="inline-flex items-center gap-2 glass-badge px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <span className="text-xs font-mono font-medium text-cyan-400">
              {loading ? 'SYNCING TELEMETRY...' : 'TELEMETRY ACTIVE'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Row 1: Primary KPI Grid (4 Columns) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-5"
      >
        {/* Metric 1: Contributions */}
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-colors duration-200 group">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono uppercase tracking-wider mb-2">
            <span>Contributions</span>
            <GitCommit size={16} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight" suppressHydrationWarning>
              {totalContributions}
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-cyan-400 font-mono">
              <span>Verified Commits</span>
              <span className="text-neutral-500">1 Year</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Coding Hours */}
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-colors duration-200 group">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono uppercase tracking-wider mb-2">
            <span>Logged Coding Time</span>
            <Clock size={16} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight" suppressHydrationWarning>
              {totalTime}
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-cyan-400 font-mono">
              <span>WakaTime Sync</span>
              <span className="text-neutral-500">Tracked</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Daily Average */}
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-colors duration-200 group">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono uppercase tracking-wider mb-2">
            <span>Daily Average</span>
            <Activity size={16} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight" suppressHydrationWarning>
              {dailyAverage}
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-cyan-400 font-mono">
              <span>Editor Focus Time</span>
              <span className="text-neutral-500">/ day</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Open Source */}
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-colors duration-200 group">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono uppercase tracking-wider mb-2">
            <span>Public Repos &amp; Stars</span>
            <TrendingUp size={16} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight" suppressHydrationWarning>
              {reposCount} <span className="text-xl text-neutral-500 font-normal">/</span> {starsCount}★
            </div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-cyan-400 font-mono">
              <span>Open Source</span>
              <span className="text-neutral-500">Public</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Row 2: Full-Width GitHub Contribution Heatmap Card (Span 12) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5"
      >
        <GitHubContributionGraph
          totalContributions={typeof totalContributions === 'number' ? totalContributions : 0}
          apiWeeks={apiWeeks}
        />
      </motion.div>

      {/* Row 3: Complementary Telemetry Bento — Languages (Span 6) & Top Repositories (Span 6) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5"
      >
        {/* Left: WakaTime Language Distribution (Span 6) */}
        <div className="lg:col-span-6 glass-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between border-neutral-800/80">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 size={16} className="text-cyan-400" />
                <span>Language Breakdown &amp; Velocity</span>
              </h3>
              <span className="text-xs text-cyan-400 font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                WakaTime Telemetry
              </span>
            </div>

            {loading && languages.length === 0 ? (
              <div className="space-y-3 py-3">
                <div className="skeleton-box h-6 w-full rounded-lg" />
                <div className="skeleton-box h-6 w-4/5 rounded-lg" />
                <div className="skeleton-box h-6 w-3/5 rounded-lg" />
              </div>
            ) : languages.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-500 font-mono">
                No language telemetry recorded yet for this period.
              </div>
            ) : (
              <>
                {/* Segmented Color Bar Overview */}
                <div className="w-full h-2.5 rounded-full overflow-hidden flex gap-0.5 bg-neutral-900 mb-5 p-0.5">
                  {languages.map((lang: any) => (
                    <div
                      key={lang.name}
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${lang.percent}%`,
                        backgroundColor: lang.color || '#22d3ee',
                      }}
                      title={`${lang.name}: ${lang.percent}%`}
                    />
                  ))}
                </div>

                {/* Individual Language Bars */}
                <div className="space-y-3.5">
                  {languages.map((lang: any) => (
                    <div key={lang.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: lang.color || '#22d3ee' }}
                          />
                          <span className="text-xs text-neutral-300">{lang.name}</span>
                        </span>
                        <span className="text-neutral-500 font-mono text-xs">{lang.percent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.percent}%` }}
                          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: lang.color || '#22d3ee' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="mt-6 pt-3.5 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>Peak Day: <strong className="text-cyan-400 font-semibold">{bestDay}</strong></span>
            <span className="text-neutral-500">VS Code &amp; WakaTime API</span>
          </div>
        </div>

        {/* Right: Featured Repositories (Span 6) */}
        <div className="lg:col-span-6 glass-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between border-neutral-800/80">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Github size={16} className="text-cyan-400" />
                <span>Featured Repositories</span>
              </h3>
              <a
                href="https://github.com/hernataramadhan79-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
              >
                @hernataramadhan79-bit →
              </a>
            </div>

            <div className="space-y-3">
              {loading && (!githubData?.topRepos || githubData.topRepos.length === 0) ? (
                <div className="space-y-3">
                  <div className="skeleton-box h-20 w-full rounded-xl" />
                  <div className="skeleton-box h-20 w-full rounded-xl" />
                  <div className="skeleton-box h-20 w-full rounded-xl" />
                </div>
              ) : (githubData?.topRepos || []).length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-500 font-mono">
                  No public repositories found.
                </div>
              ) : (
                (githubData.topRepos as any[]).slice(0, 3).map((repo: any) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700 hover:bg-neutral-850 transition-colors duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {repo.name}
                      </h4>
                      <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
                        <span>★</span> {repo.stargazers_count || 0}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-1 mb-2 font-normal leading-relaxed">
                      {repo.description || 'Full-stack repository architecture.'}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="tech-badge text-[10px] py-0.5 px-2">
                        {repo.language || 'TypeScript'}
                      </span>
                      <span className="text-xs text-cyan-400 font-mono flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-200">
                        <span>Open Repo</span>
                        <ExternalLink size={11} />
                      </span>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>Verified GitHub Sync:</span>
            <span className="text-cyan-400 font-semibold">Live via REST &amp; GraphQL</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
