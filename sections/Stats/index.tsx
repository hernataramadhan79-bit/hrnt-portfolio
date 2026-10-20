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

type ContribDay = { date: string; count: number; level: number };

const GITHUB_COLORS = [
  '#171A21', // Level 0: --surface-2
  '#1E3A5F', // Level 1: low tonal blue
  '#2E5C9A', // Level 2: medium tonal blue
  '#6897E8', // Level 3: high tonal blue
  '#A8C7FA', // Level 4: --accent-pixel
];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

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

function createEmptyWeeks(): ContribDay[][] {
  const weeks: ContribDay[][] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 52 * 7 - today.getDay());
  startDate.setHours(0, 0, 0, 0);

  const current = new Date(startDate);
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

export function GitHubContributionGraph({
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

  const weeks = useMemo<ContribDay[][]>(() => {
    if (apiWeeks && apiWeeks.length > 0) {
      return buildWeeksFromApi(apiWeeks);
    }
    return createEmptyWeeks();
  }, [apiWeeks]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth;
    });
  }, [weeks]);

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
      return `${startM} ${startY} - ${endM} ${endY}`;
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
    <div className="bento-inner p-4 sm:p-5 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
            <GitCommit size={16} className="text-[var(--accent-pixel)]" />
            <span>52-Week GitHub Commit Matrix</span>
          </h4>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Public commit cadence verified via GitHub GraphQL API ({timeRangeText})
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[var(--text-secondary)] font-mono bg-[var(--surface-1)] px-3 py-1 rounded-full tabular-nums">
            <strong className="text-[var(--accent-pixel)]">{totalContributions}</strong> commits
          </span>
          <a
            href="https://github.com/hernataramadhan79-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--accent-pixel)] hover:text-[var(--accent-pixel-bright)] font-mono transition-colors inline-flex items-center gap-1 bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] px-3 py-1 rounded-full"
          >
            <span>@hernataramadhan79-bit</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      <div ref={graphRef} className="relative w-full pt-2">
        <div
          ref={scrollRef}
          className="overflow-x-auto w-full pb-1"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="min-w-[660px] sm:min-w-0 w-full">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto block select-none"
            >
              {monthPositions.map(({ label, weekIndex }) => (
                <text
                  key={label + weekIndex}
                  x={LEFT_LABEL_WIDTH + weekIndex * STEP}
                  y={11}
                  fill="#7C889B"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="500"
                >
                  {label}
                </text>
              ))}

              {DAY_LABELS.map((label, di) =>
                label ? (
                  <text
                    key={di}
                    x={2}
                    y={20 + di * STEP + CELL - 2}
                    fill="#7C889B"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="500"
                  >
                    {label}
                  </text>
                ) : null
              )}

              {weeks.map((week, wi) =>
                week.map((day, di) => (
                  <rect
                    key={`${wi}-${di}`}
                    x={LEFT_LABEL_WIDTH + wi * STEP}
                    y={20 + di * STEP}
                    width={CELL}
                    height={CELL}
                    rx={3}
                    fill={GITHUB_COLORS[day.level]}
                    className="transition-opacity duration-150 hover:opacity-80"
                    style={{ cursor: day.count > 0 ? 'pointer' : 'default' }}
                    onMouseEnter={(e) => handleMouseEnter(e, day.date, day.count)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))
              )}
            </svg>
          </div>
        </div>

        {tooltip.visible && (
          <div
            className="pointer-events-none absolute z-50 bg-[var(--surface-1)] text-[#F1F5F9] text-xs font-mono px-3 py-1.5 rounded-full shadow-xl whitespace-nowrap -translate-x-1/2 -translate-y-full flex items-center gap-2 tabular-nums"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-pixel)]" />
            <span className="text-[var(--accent-pixel-bright)] font-bold">
              {tooltip.count} {tooltip.count === 1 ? 'commit' : 'commits'}
            </span>
            <span className="text-[var(--text-secondary)]">on {formatTooltipDate(tooltip.date)}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 pt-3 text-xs text-[var(--text-muted)] font-mono bg-[var(--surface-1)] px-3.5 py-2 rounded-[12px]">
        <span>52-Week Observability Window ({timeRangeText})</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {GITHUB_COLORS.map((color, i) => (
            <span
              key={i}
              className="rounded-[3px] inline-block"
              style={{ width: 11, height: 11, backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default function Stats({ embedded = false }: { embedded?: boolean }) {
  const [githubData, setGithubData] = useState<any>(null);
  const [wakaData, setWakaData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ghCached = getStoredGithubData();
    const wkCached = getStoredWakaTimeData();
    if (ghCached) setGithubData(ghCached);
    if (wkCached) setWakaData(wkCached);
    if (ghCached || wkCached) setLoading(false);

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

  const apiWeeks: { date: string; count: number }[][] | undefined =
    githubData?.contributions?.length > 0 ? githubData.contributions : undefined;

  const totalTime = wakaData?.totalTime || (loading ? '...' : '0h 0m');
  const dailyAverage = wakaData?.dailyAverage || (loading ? '...' : '0h 0m');
  const bestDay = wakaData?.bestDay || (loading ? '...' : 'Tracked via WakaTime');
  const languages: { name: string; percent: number; color?: string }[] =
    wakaData?.languages || [];

  const content = (
    <div className="space-y-4">
      {!embedded && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bento-inner p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono uppercase mb-2">
              <span>Contributions</span>
              <GitCommit size={15} className="text-[var(--accent-pixel)]" />
            </div>
            <div className="text-3xl font-black text-[#F1F5F9] tabular-nums" suppressHydrationWarning>
              {totalContributions}
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1">Verified Commits (1Y)</span>
          </div>

          <div className="bento-inner p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono uppercase mb-2">
              <span>Logged Hours</span>
              <Clock size={15} className="text-[var(--accent-pixel)]" />
            </div>
            <div className="text-3xl font-black text-[#F1F5F9] tabular-nums" suppressHydrationWarning>
              {totalTime}
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1">WakaTime IDE Sync</span>
          </div>

          <div className="bento-inner p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono uppercase mb-2">
              <span>Daily Average</span>
              <Activity size={15} className="text-[var(--accent-pixel)]" />
            </div>
            <div className="text-3xl font-black text-[#F1F5F9] tabular-nums" suppressHydrationWarning>
              {dailyAverage}
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1">Active Editor Time</span>
          </div>

          <div className="bento-inner p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono uppercase mb-2">
              <span>Repos &amp; Stars</span>
              <TrendingUp size={15} className="text-[var(--accent-pixel)]" />
            </div>
            <div className="text-3xl font-black text-[#F1F5F9] tabular-nums" suppressHydrationWarning>
              {reposCount} <span className="text-lg text-[var(--text-muted)] font-normal">/</span> {starsCount}★
            </div>
            <span className="text-[11px] text-[var(--text-muted)] mt-1">Public Open Source</span>
          </div>
        </div>
      )}

      <GitHubContributionGraph
        totalContributions={typeof totalContributions === 'number' ? totalContributions : 0}
        apiWeeks={apiWeeks}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: WakaTime Language Distribution */}
        <div className="lg:col-span-6 bento-inner p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-[#F1F5F9] flex items-center gap-2">
                <Code2 size={15} className="text-[var(--accent-pixel)]" />
                <span>Language Distribution</span>
              </h4>
              <span className="text-[11px] text-[var(--accent-pixel)] font-mono px-2.5 py-0.5 rounded-full bg-[var(--surface-1)]">
                WakaTime API
              </span>
            </div>

            {loading && languages.length === 0 ? (
              <div className="space-y-3 py-2">
                <div className="skeleton-box h-5 w-full rounded-[10px]" />
                <div className="skeleton-box h-5 w-4/5 rounded-[10px]" />
                <div className="skeleton-box h-5 w-3/5 rounded-[10px]" />
              </div>
            ) : languages.length === 0 ? (
              <div className="py-6 text-center text-xs text-[var(--text-muted)] font-mono">
                WakaTime language breakdown syncing... Check back shortly.
              </div>
            ) : (
              <div className="space-y-3">
                {languages.map((lang: any) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs tabular-nums">
                      <span className="font-medium text-[#F1F5F9] flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: lang.color || '#A8C7FA' }}
                        />
                        <span>{lang.name}</span>
                      </span>
                      <span className="text-[var(--text-secondary)] font-mono">{lang.percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[var(--surface-1)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percent}%` }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color || '#A8C7FA' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono bg-[var(--surface-1)] px-3 py-2 rounded-[10px] tabular-nums">
            <span>
              Peak Day: <strong className="text-[var(--accent-pixel)]">{bestDay}</strong>
            </span>
            <span>Daily Avg: {dailyAverage}</span>
          </div>
        </div>

        {/* Right: Featured Repositories */}
        <div className="lg:col-span-6 bento-inner p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-[#F1F5F9] flex items-center gap-2">
                <Github size={15} className="text-[var(--accent-pixel)]" />
                <span>Top Active Repositories</span>
              </h4>
              <a
                href="https://github.com/hernataramadhan79-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--accent-pixel)] hover:text-[var(--accent-pixel-bright)] font-mono transition-colors"
              >
                View All GitHub
              </a>
            </div>

            <div className="space-y-2.5">
              {loading && (!githubData?.topRepos || githubData.topRepos.length === 0) ? (
                <div className="space-y-2.5">
                  <div className="skeleton-box h-16 w-full rounded-[12px]" />
                  <div className="skeleton-box h-16 w-full rounded-[12px]" />
                  <div className="skeleton-box h-16 w-full rounded-[12px]" />
                </div>
              ) : (githubData?.topRepos || []).length === 0 ? (
                <div className="py-6 text-center text-xs text-[var(--text-muted)] font-mono">
                  Public repository metadata syncing... Visit @hernataramadhan79-bit on GitHub.
                </div>
              ) : (
                (githubData.topRepos as any[]).slice(0, 3).map((repo: any) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-[12px] bg-[var(--surface-1)] hover:bg-[var(--surface-3)] transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-xs sm:text-sm font-bold text-[#F1F5F9] group-hover:text-[var(--accent-pixel)] transition-colors">
                        {repo.name}
                      </h5>
                      <span className="text-[10px] text-[var(--text-secondary)] font-mono bg-[var(--surface-2)] px-2 py-0.5 rounded-full tabular-nums">
                        ★ {repo.stargazers_count || 0}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mb-2">
                      {repo.description || 'Production software engineering repository.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[var(--accent-pixel)] bg-[var(--surface-2)] px-2.5 py-0.5 rounded-full">
                        {repo.language || 'TypeScript'}
                      </span>
                      <span className="text-[11px] text-[var(--text-secondary)] group-hover:text-[#F1F5F9] font-mono inline-flex items-center gap-1">
                        <span>Inspect Repo</span>
                        <ExternalLink size={11} />
                      </span>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bento-outer">{content}</div>
    </section>
  );
}
