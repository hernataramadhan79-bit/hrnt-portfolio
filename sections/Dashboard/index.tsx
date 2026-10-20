'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Activity,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Camera,
  GitCommit,
  Code2,
} from 'lucide-react';
import { Project } from '../../types';
import {
  fetchGithubData,
  fetchWakaTimeData,
  getStoredGithubData,
  getStoredWakaTimeData,
} from '../../lib/clientDataCache';
import Stats from '../Stats';
import About from '../About';
import Capabilities from '../Capabilities';

interface DashboardProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (tab: string) => void;
  selectedTechFilter?: string | null;
  onSelectTechFilter?: (tech: string | null) => void;
}

const PIXEL_PHOTO_ITEMS = [
  {
    src: '/galeri1.webp',
    title: 'UPTPTKK Photography Cohort',
    caption: 'MJC Photography Acceleration Cohort 1 • Surabaya, ID',
  },
  {
    src: '/gallery2.webp',
    title: 'Digital Media Mentorship',
    caption: 'Visual production & industry mentorship • Surabaya, ID',
  },
  {
    src: '/profile.jpg',
    title: 'Studio Portrait I',
    caption: 'Hernata Ramadhan • Full-Stack & Systems Engineer',
  },
  {
    src: '/profile2.jpg',
    title: 'Studio Portrait II',
    caption: 'East Java, Indonesia • Computer Science & Visual Design',
  },
];

export default function Dashboard({
  onNavigate,
  selectedTechFilter = null,
  onSelectTechFilter,
}: DashboardProps) {
  const [telemetry, setTelemetry] = useState({
    repos: 19,
    stars: 0,
    contributions: 307,
    wakatimeHours: '71h 20m',
    dailyAverage: '4h 12m',
    topLanguage: 'TypeScript',
    languages: [
      { name: 'TypeScript', percent: 58, color: '#A8C7FA' },
      { name: 'Rust', percent: 22, color: '#E09F67' },
      { name: 'React / TSX', percent: 20, color: '#7DD3FC' },
    ],
  });

  const [dateString, setDateString] = useState('Tuesday, Oct 20');
  const [timeString, setTimeString] = useState('12:00 PM WIB');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isTelemetryExpanded, setIsTelemetryExpanded] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateFormatted = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: 'Asia/Jakarta',
      }).format(now);

      const timeFormatted = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta',
      }).format(now);

      setDateString(dateFormatted);
      setTimeString(`${timeFormatted} WIB`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const applyTelemetry = (gh: any, wk: any) => {
      setTelemetry((prev) => ({
        repos: gh?.profile?.repos ?? prev.repos,
        stars: gh?.profile?.stars ?? prev.stars,
        contributions: gh?.profile?.totalContributions ?? prev.contributions,
        wakatimeHours: wk?.totalTime || prev.wakatimeHours,
        dailyAverage: wk?.dailyAverage || prev.dailyAverage,
        topLanguage: wk?.languages?.[0]?.name ?? prev.topLanguage,
        languages:
          wk?.languages && wk.languages.length > 0
            ? wk.languages.slice(0, 4)
            : prev.languages,
      }));
    };

    const ghCached = getStoredGithubData();
    const wkCached = getStoredWakaTimeData();
    if (ghCached || wkCached) {
      applyTelemetry(ghCached, wkCached);
    }

    let isMounted = true;
    async function loadStats() {
      try {
        const [gh, wk] = await Promise.all([
          fetchGithubData().catch(() => null),
          fetchWakaTimeData().catch(() => null),
        ]);
        if (!isMounted) return;
        if (gh || wk) {
          applyTelemetry(gh, wk);
        }
      } catch (err) {
        console.warn('Dashboard telemetry fetch warning:', err);
      }
    }
    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentPhoto = PIXEL_PHOTO_ITEMS[photoIndex];

  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % PIXEL_PHOTO_ITEMS.length);
  };

  const handlePrevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + PIXEL_PHOTO_ITEMS.length) % PIXEL_PHOTO_ITEMS.length);
  };

  return (
    <section
      id="dashboard"
      aria-label="Zone 01: At a Glance Command Hub"
      className="w-full max-w-[1280px] mx-auto pt-24 pb-6 px-4 sm:px-6 lg:px-8 space-y-4"
    >
      {/* ─── Pixel "At a Glance" Top Telemetry Strip ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[var(--text-secondary)] tabular-nums">
          <span className="text-[#F1F5F9] font-semibold">{dateString}</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent-pixel)]">
            <Clock size={12} />
            <span>{timeString}</span>
          </span>
          <span className="text-[var(--text-muted)] hidden sm:inline">•</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs">
            <MapPin size={12} className="text-[var(--accent-pixel)]" />
            <span>East Java / Jakarta, ID</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-2 bg-[var(--surface-1)] rounded-full px-3.5 py-1.5">
          <span className="live-dot" />
          <span className="text-xs font-medium text-[#F1F5F9]">
            Available for Full-Stack &amp; Systems Roles
          </span>
        </div>
      </div>

      {/* ─── ZONE 1: Golden Ratio Split (62% Left Identity + About : 38% Right Live Telemetry) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT (~62% -> lg:col-span-7): Primary Identity, Portrait, Pixel Photo Widget & Career Timeline */}
        <div className="lg:col-span-7 bento-outer space-y-3">
          {/* Top Inner Card: Seamless Cutout Portrait + Headline + Narrative + Tactile Pill CTAs */}
          <div className="bento-inner p-5 sm:p-6 relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* Narrative & Headline (Span 7) */}
              <div className="sm:col-span-7 space-y-3 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-1)] text-[11px] font-mono text-[var(--accent-pixel)]">
                  <span>Hernata Ramadhan (HRNT)</span>
                  <span>•</span>
                  <span>GPA 3.84</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F1F5F9] tracking-tight leading-[1.12]">
                  Full-Stack Engineer &amp; Native Systems Builder.
                </h1>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Bridging Computer Science rigor with Visual Design precision. I architect reactive web applications in{' '}
                  <strong className="text-[#F1F5F9] font-semibold">Next.js 16 &amp; React 19</strong>, ultra-lean native desktop tools in{' '}
                  <strong className="text-[#F1F5F9] font-semibold">Rust &amp; Tauri v2</strong>, and real-time relational backends.
                </p>

                {/* Tactile Pill CTAs */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <a
                    href="/Hernata CV.pdf"
                    download
                    className="inline-flex items-center gap-2 bg-[var(--accent-pixel)] hover:bg-[var(--accent-pixel-bright)] text-[var(--on-accent-pixel)] text-xs font-bold px-4 py-2.5 rounded-full transition-all duration-200 active:scale-[0.97]"
                  >
                    <Download size={14} />
                    <span>Download CV</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 bg-[var(--surface-pill)] hover:bg-[var(--surface-bright)] text-[#F1F5F9] text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 active:scale-[0.97]"
                  >
                    <MessageSquare size={13} className="text-[var(--accent-pixel)]" />
                    <span>Comm Hub</span>
                  </button>

                  <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                    <a
                      href="https://github.com/hernataramadhan79-bit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <Github size={15} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/hernata-ramadhan-614725350/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={15} />
                    </a>
                    <a
                      href="mailto:hernataramadhan79@gmail.com"
                      className="w-9 h-9 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] transition-colors"
                      aria-label="Send Email"
                    >
                      <Mail size={15} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Seamless Cutout Portrait Surface (Span 5, Concentric rounded-[16px]) */}
              <div className="sm:col-span-5 relative h-56 sm:h-64 rounded-[16px] bg-[var(--surface-1)] overflow-hidden flex items-end justify-center">
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 35%, #A8C7FA 0%, transparent 70%)',
                  }}
                />
                <div className="relative w-[88%] h-[94%]">
                  <Image
                    src="/profile-cutout-centered.webp"
                    alt="Hernata Ramadhan"
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 260px, 280px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Career & Academic Milestones (About) */}
          <About embedded />
        </div>

        {/* RIGHT (~38% -> lg:col-span-5): Live Telemetry "At a Glance" Widget (Stats) */}
        <div id="stats" className="lg:col-span-5 bento-outer space-y-3">
          {/* Oversized Pixel Lockscreen / At-a-Glance Telemetry Header */}
          <div className="bento-inner p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={15} className="text-[var(--accent-pixel)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] font-mono">
                  Live Coding Telemetry
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[var(--surface-1)] text-[10px] font-mono text-[var(--accent-pixel)]">
                WakaTime + GitHub
              </span>
            </div>

            {/* Oversized Editorial Tabular Numerals */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-[16px] bg-[var(--surface-1)]">
                <div className="text-[11px] font-mono text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                  <Clock size={12} className="text-[var(--accent-pixel)]" />
                  <span>IDE Logged Time</span>
                </div>
                <div
                  className="text-3xl sm:text-4xl font-black text-[#F1F5F9] tracking-tight tabular-nums leading-none mt-1"
                  suppressHydrationWarning
                >
                  {telemetry.wakatimeHours}
                </div>
                <div className="text-[11px] font-mono text-[var(--accent-pixel)] mt-2 tabular-nums">
                  Avg {telemetry.dailyAverage} / day
                </div>
              </div>

              <div className="p-4 rounded-[16px] bg-[var(--surface-1)]">
                <div className="text-[11px] font-mono text-[var(--text-secondary)] mb-1 flex items-center gap-1.5">
                  <GitCommit size={12} className="text-[var(--accent-pixel)]" />
                  <span>Yearly Commits</span>
                </div>
                <div
                  className="text-3xl sm:text-4xl font-black text-[var(--accent-pixel-bright)] tracking-tight tabular-nums leading-none mt-1"
                  suppressHydrationWarning
                >
                  {telemetry.contributions}
                </div>
                <div
                  className="text-[11px] font-mono text-[var(--text-secondary)] mt-2 tabular-nums"
                  suppressHydrationWarning
                >
                  {telemetry.repos} Public Repos
                </div>
              </div>
            </div>

            {/* Language Distribution At-a-Glance Strip */}
            <div className="p-4 rounded-[16px] bg-[var(--surface-1)] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#F1F5F9] flex items-center gap-1.5">
                  <Code2 size={14} className="text-[var(--accent-pixel)]" />
                  <span>Active Language Velocity</span>
                </span>
                <span className="font-mono text-[11px] text-[var(--accent-pixel)]" suppressHydrationWarning>
                  Primary: {telemetry.topLanguage}
                </span>
              </div>

              {/* Multi-segment Pill Bar */}
              <div className="w-full h-2.5 rounded-full bg-[var(--surface-2)] overflow-hidden flex gap-0.5 p-0.5">
                {telemetry.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(lang.percent, 6)}%`,
                      backgroundColor: lang.color || '#A8C7FA',
                    }}
                    title={`${lang.name}: ${lang.percent}%`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {telemetry.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-[10px] bg-[var(--surface-2)] tabular-nums"
                  >
                    <span className="flex items-center gap-1.5 text-[var(--text-secondary)] truncate">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: lang.color || '#A8C7FA' }}
                      />
                      <span className="truncate">{lang.name}</span>
                    </span>
                    <span className="font-mono font-semibold text-[#F1F5F9]">{lang.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipped Benchmarks Strip */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono tabular-nums">
              <div className="p-3 rounded-[14px] bg-[var(--surface-1)]">
                <div className="text-base sm:text-lg font-black text-[#F1F5F9]">&lt; 2ms</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">SQLite FTS5</div>
              </div>
              <div className="p-3 rounded-[14px] bg-[var(--surface-1)]">
                <div className="text-base sm:text-lg font-black text-[var(--accent-pixel)]">~35 MB</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">Tauri RAM</div>
              </div>
              <div className="p-3 rounded-[14px] bg-[var(--surface-1)]">
                <div className="text-base sm:text-lg font-black text-[#F1F5F9]">60 FPS</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">3D WebGL</div>
              </div>
            </div>

            {/* Apple Progressive Disclosure Toggle */}
            <button
              type="button"
              onClick={() => setIsTelemetryExpanded((prev) => !prev)}
              aria-expanded={isTelemetryExpanded}
              className="w-full py-3 px-4 rounded-full bg-[var(--surface-pill)] hover:bg-[var(--accent-pixel)] text-[#F1F5F9] hover:text-[var(--on-accent-pixel)] text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] cursor-pointer"
            >
              <span>
                {isTelemetryExpanded
                  ? 'Collapse Full Telemetry Breakdown'
                  : 'Inspect Full Telemetry (52-Week Matrix & Repos)'}
              </span>
              {isTelemetryExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {/* Interactive Pixel Photo Widget (Concentric rounded-[16px]) */}
          <div className="bento-inner p-3.5 sm:p-4">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div className="flex items-center gap-2">
                <Camera size={14} className="text-[var(--accent-pixel)]" />
                <span className="text-xs font-bold text-[#F1F5F9]">Pixel Photo &amp; Field Deck</span>
              </div>
              <div className="flex items-center gap-1.5">
                {PIXEL_PHOTO_ITEMS.map((item, idx) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setPhotoIndex(idx)}
                    aria-label={`View photo ${idx + 1}: ${item.title}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === photoIndex
                        ? 'w-5 bg-[var(--accent-pixel)]'
                        : 'w-1.5 bg-[var(--surface-pill)] hover:bg-[var(--text-muted)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative w-full h-48 sm:h-60 lg:h-72 rounded-[16px] overflow-hidden bg-[var(--surface-1)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentPhoto.src}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 680px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3.5 right-20">
                    <div className="text-xs sm:text-sm font-bold text-[#F1F5F9]">
                      {currentPhoto.title}
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] truncate">
                      {currentPhoto.caption}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tactile Prev/Next Pill Controls */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  aria-label="Previous photo"
                  className="w-8 h-8 rounded-full bg-[#111318]/90 hover:bg-[var(--surface-pill)] text-[#F1F5F9] flex items-center justify-center transition-transform active:scale-90"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  aria-label="Next photo"
                  className="w-8 h-8 rounded-full bg-[#111318]/90 hover:bg-[var(--surface-pill)] text-[#F1F5F9] flex items-center justify-center transition-transform active:scale-90"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Progressive Disclosure: Full Telemetry Breakdown (Spring Physics) */}
      <AnimatePresence initial={false}>
        {isTelemetryExpanded && (
          <motion.div
            key="expanded-telemetry"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }}
            className="overflow-hidden"
          >
            <div className="bento-outer pt-3">
              <Stats embedded />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Row of Zone 1: Interactive Capability Topology (3 Functional Clusters) */}
      <Capabilities
        embedded
        selectedTechFilter={selectedTechFilter}
        onSelectTechFilter={onSelectTechFilter}
      />
    </section>
  );
}
