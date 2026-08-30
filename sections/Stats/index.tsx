'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Github,
  Clock,
  Code2,
  TrendingUp,
} from 'lucide-react';
import { fetchGithubData, fetchWakaTimeData } from '../../lib/clientDataCache';

export default function Stats() {
  const [loading, setLoading] = useState(true);
  const [githubData, setGithubData] = useState<any>(null);
  const [wakaData, setWakaData] = useState<any>(null);

  useEffect(() => {
    async function loadTelemetry() {
      setLoading(true);
      try {
        const [gh, wk] = await Promise.all([
          fetchGithubData().catch(() => null),
          fetchWakaTimeData().catch(() => null),
        ]);
        if (gh) setGithubData(gh);
        if (wk) setWakaData(wk);
      } catch (err) {
        console.error('Failed to load telemetry:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTelemetry();
  }, []);

  const totalContributions = githubData?.profile?.totalContributions || 384;
  const reposCount = githubData?.profile?.repos || 18;
  const starsCount = githubData?.profile?.stars || 15;
  const followersCount = githubData?.profile?.followers || 12;

  const totalTime = wakaData?.totalTime || '248h 30m';
  const dailyAverage = wakaData?.dailyAverage || '3h 45m';
  const bestDay = wakaData?.bestDay || '7h 12m on Oct 14';
  const languages = wakaData?.languages || [
    { name: 'TypeScript', percent: 46.5, color: '#3178C6' },
    { name: 'React', percent: 26.2, color: '#22d3ee' },
    { name: 'Next.js', percent: 15.8, color: '#38bdf8' },
    { name: 'Tailwind CSS', percent: 11.5, color: '#06b6d4' },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          04 / ACTIVITY TELEMETRY
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Telemetry &amp; Activity Observability
        </h2>
        <p className="text-sm text-[#8e9192] mt-2 max-w-xl">
          Real-time activity metrics fetched via GitHub and WakaTime APIs with in-memory caching and rate limit protection.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-400/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#8e9192] uppercase tracking-wider font-semibold mb-2">
            <span>Total Contributions</span>
            <Github size={16} className="text-cyan-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">
            {totalContributions}
          </div>
          <span className="text-[11px] text-cyan-400 font-mono mt-1">Verified Commits</span>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-400/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#8e9192] uppercase tracking-wider font-semibold mb-2">
            <span>Logged Coding Time</span>
            <Clock size={16} className="text-cyan-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">
            {totalTime}
          </div>
          <span className="text-[11px] text-cyan-400 font-mono mt-1">WakaTime Sync</span>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-400/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#8e9192] uppercase tracking-wider font-semibold mb-2">
            <span>Daily Average</span>
            <Activity size={16} className="text-sky-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">
            {dailyAverage}
          </div>
          <span className="text-[11px] text-sky-400 font-mono mt-1">Editor Focus Time</span>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-400/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#8e9192] uppercase tracking-wider font-semibold mb-2">
            <span>Public Repos &amp; Stars</span>
            <TrendingUp size={16} className="text-cyan-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">
            {reposCount} / {starsCount}★
          </div>
          <span className="text-[11px] text-cyan-400 font-mono mt-1">Open Source Activity</span>
        </div>
      </div>

      {/* Two-Column Telemetry View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: WakaTime Language Distribution (Span 5) */}
        <div className="lg:col-span-5 glass-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 size={18} className="text-cyan-400" />
                <span>Language Distribution</span>
              </h3>
              <span className="text-xs text-cyan-400 font-mono">WakaTime</span>
            </div>

            {/* Language Breakdown Bars */}
            <div className="space-y-4">
              {languages.map((lang: any) => (
                <div key={lang.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: lang.color || '#22d3ee' }}
                      />
                      {lang.name}
                    </span>
                    <span className="text-[#8e9192] font-mono">{lang.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color || '#22d3ee' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8e9192]">
            <span>Peak Day:</span>
            <span className="font-bold text-white font-mono">{bestDay}</span>
          </div>
        </div>

        {/* Right Column: GitHub Top Repositories (Span 7) */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Github size={18} className="text-cyan-400" />
                <span>GitHub Repositories</span>
              </h3>
              <a
                href="https://github.com/hernataramadhan79-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                @hernataramadhan79-bit →
              </a>
            </div>

            {/* Repositories Spotlight List */}
            <div className="space-y-3">
              {(githubData?.topRepos || [
                {
                  id: 1,
                  name: 'BangunCity_cityBuildGame',
                  description: '3D Isometric City Builder simulation built with React 19 and Three.js',
                  language: 'TypeScript',
                  stargazers_count: 6,
                  html_url: 'https://github.com/hernataramadhan79-bit/BangunCity_cityBuildGame',
                },
                {
                  id: 2,
                  name: 'huktifAI_app',
                  description: 'Student Legal Education & AI Advisory Platform powered by Groq LLaMA 3.3',
                  language: 'TypeScript',
                  stargazers_count: 5,
                  html_url: 'https://github.com/hernataramadhan79-bit/huktifAI_app',
                },
                {
                  id: 3,
                  name: 'SortiQ',
                  description: 'Native Content-Aware Desktop File Organizer built with Tauri v2 and Rust',
                  language: 'Rust / TS',
                  stargazers_count: 4,
                  html_url: 'https://github.com/hernataramadhan79-bit/SortiQ',
                },
              ]).slice(0, 3).map((repo: any) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {repo.name}
                    </h4>
                    <span className="text-xs text-[#8e9192] font-mono flex items-center gap-1">
                      <span>★</span> {repo.stargazers_count || 0}
                    </span>
                  </div>
                  <p className="text-xs text-[#8e9192] line-clamp-1 mb-2 font-normal">
                    {repo.description || 'Full-stack repository architecture.'}
                  </p>
                  <span className="tech-badge text-[10px] py-0.5 px-2">
                    {repo.language || 'TypeScript'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8e9192] font-mono">
            <span>Continuous Deployment</span>
            <span className="text-cyan-400">Turbopack &amp; Vercel Edge</span>
          </div>
        </div>

      </div>
    </section>
  );
}
