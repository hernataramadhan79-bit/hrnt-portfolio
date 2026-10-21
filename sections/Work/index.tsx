'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, Filter, X, Eye } from 'lucide-react';
import { projects } from '../../constants';
import { Project } from '../../types';
import { ENGINEERING_CLUSTERS } from '../Capabilities';

interface WorkProps {
  onSelectProject: (project: Project) => void;
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
}

const VELCO_DECK_VIEWS = [
  {
    id: 'workspace',
    label: 'Studio',
    fullTitle: 'Foundry Studio',
    image: '/velco.webp',
    caption: 'Context-bound AI workbench with local SQLite FTS5 (< 2ms query latency) & Ollama/LM Studio runtime.',
  },
  {
    id: 'actions',
    label: 'Actions',
    fullTitle: 'Action Engine',
    image: '/velco-actions.webp',
    caption: 'Deterministic command palette, hardware-level egress kill-switch, and 1-click multi-format export.',
  },
  {
    id: 'kanban',
    label: 'Kanban',
    fullTitle: 'Kanban Matrix',
    image: '/velco-kanban.webp',
    caption: 'Bidirectional wikilink task board ([[...]]) backed by SQLite Write-Ahead Logging (WAL).',
  },
  {
    id: 'p2p',
    label: 'P2P Sync',
    fullTitle: 'P2P LAN Sync',
    image: '/velco-p2p.webp',
    caption: 'Air-gapped UDP port 42426 multicast discovery & XChaCha20-Poly1305 AEAD encrypted TCP framing.',
  },
];

// Tier 2 Featured IDs: Sakuku (1), Huktif (8), Renova (4), Oryon AI (3)
const TIER_2_IDS = [8, 1, 4, 3];
// Tier 3 Archive IDs: SortiQ (9), BangunCity (7), MyBoard Lite (6), RSUD Dolopo (5), OryonWeb (2)
const TIER_3_IDS = [9, 7, 6, 5, 2];

export default function Work({
  onSelectProject,
  selectedTechFilter = null,
  onClearTechFilter,
}: WorkProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVelcoTab, setActiveVelcoTab] = useState<string>('workspace');

  const categories = ['All', 'Web App', 'Desktop App'];

  // Resolve keywords for the selectedTechFilter from ENGINEERING_CLUSTERS
  const activeFilterKeywords = useMemo(() => {
    if (!selectedTechFilter) return null;
    for (const cluster of ENGINEERING_CLUSTERS) {
      const found = cluster.items.find((i) => i.name === selectedTechFilter);
      if (found) return found.matchKeywords;
    }
    return [selectedTechFilter];
  }, [selectedTechFilter]);

  const matchesActiveFilters = (project: Project): boolean => {
    if (selectedCategory !== 'All') {
      if (!project.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }
    }
    if (activeFilterKeywords && activeFilterKeywords.length > 0) {
      const matchesTech = activeFilterKeywords.some(
        (kw) =>
          project.tags.some((t) => t.toLowerCase().includes(kw.toLowerCase())) ||
          project.category.toLowerCase().includes(kw.toLowerCase()) ||
          (project.description && project.description.toLowerCase().includes(kw.toLowerCase()))
      );
      if (!matchesTech) return false;
    }
    return true;
  };

  const velcoProject = useMemo(
    () => projects.find((p) => p.id === 10) || projects[1],
    []
  );

  const showVelcoFlagship = matchesActiveFilters(velcoProject);

  const tier2Projects = useMemo(
    () =>
      TIER_2_IDS.map((id) => projects.find((p) => p.id === id))
        .filter((p): p is Project => Boolean(p))
        .filter(matchesActiveFilters),
    [selectedCategory, activeFilterKeywords]
  );

  const tier3Projects = useMemo(
    () =>
      TIER_3_IDS.map((id) => projects.find((p) => p.id === id))
        .filter((p): p is Project => Boolean(p))
        .filter(matchesActiveFilters),
    [selectedCategory, activeFilterKeywords]
  );

  const totalMatching =
    (showVelcoFlagship ? 1 : 0) + tier2Projects.length + tier3Projects.length;

  const currentVelcoSlide =
    VELCO_DECK_VIEWS.find((v) => v.id === activeVelcoTab) || VELCO_DECK_VIEWS[0];

  return (
    <section
      id="work"
      aria-label="Zone 02: Engineering Showcase"
      className="w-full max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-4"
    >
      {/* ─── Zone 02 Header & Apple/Pixel Segmented Filter Bar ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F1F5F9] tracking-tight">
            Production Systems &amp; Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            Three-tier architecture showcase: interactive flagship desktop OS, featured web platforms, and full engineering archive.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedTechFilter && (
            <button
              type="button"
              onClick={onClearTechFilter}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-pixel)] text-[var(--on-accent-pixel)] text-xs font-bold transition-transform active:scale-95"
            >
              <Filter size={12} />
              <span>Tech: {selectedTechFilter}</span>
              <X size={13} />
            </button>
          )}

          <div className="flex items-center gap-1 bg-[var(--surface-1)] p-1.5 rounded-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-[var(--surface-pill)] text-[#F1F5F9] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[#F1F5F9]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Empty Filter State (R-27) */}
      {totalMatching === 0 && (
        <div className="bento-outer">
          <div className="bento-inner p-8 text-center space-y-3">
            <p className="text-sm font-bold text-[#F1F5F9]">
              No projects match the active filter combination ({selectedCategory}
              {selectedTechFilter ? ` + ${selectedTechFilter}` : ''}).
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                onClearTechFilter?.();
              }}
              className="px-4 py-2 rounded-full bg-[var(--accent-pixel)] text-[var(--on-accent-pixel)] text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* ─── TIER 1: Interactive Flagship Deck (Velco) ─── */}
      {showVelcoFlagship && (
        <div className="bento-outer">
          <div className="bento-inner p-4 sm:p-6 space-y-5">
            {/* Top Bar: Velco Brand Logo + Segmented Control */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-[14px] bg-[var(--surface-1)] p-2 flex items-center justify-center shrink-0">
                  <Image
                    src="/velco-logo.png"
                    alt="Velco Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--accent-pixel)]">
                      Flagship Desktop OS
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">•</span>
                    <span className="text-[11px] font-medium text-[var(--text-secondary)]">
                      Tauri v2 + Rust 2021 + SQLite WAL
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-[#F1F5F9] tracking-tight">
                    {velcoProject.title}
                  </h3>
                </div>
              </div>

              {/* Apple macOS Segmented Control */}
              <div
                role="tablist"
                aria-label="Velco interactive view switcher"
                className="flex items-center gap-1 bg-[var(--surface-1)] p-1.5 rounded-full shrink-0 self-start lg:self-auto overflow-hidden"
              >
                {VELCO_DECK_VIEWS.map((view) => {
                  const isActive = activeVelcoTab === view.id;
                  return (
                    <button
                      key={view.id}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      onClick={() => setActiveVelcoTab(view.id)}
                      title={view.fullTitle || view.label}
                      className={`relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'text-[#F1F5F9] font-semibold'
                          : 'text-[var(--text-secondary)] hover:text-[#F1F5F9]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="velcoSegmentPill"
                          initial={false}
                          className="absolute inset-0 bg-[var(--surface-pill)] rounded-full -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }}
                        />
                      )}
                      <span className="relative z-10">{view.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Interactive Split: Live Screen Preview (7 cols) + Architecture & Metrics (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Concentric 16px Screen Viewport */}
              <div className="lg:col-span-7 space-y-2.5">
                <div
                  onClick={() => onSelectProject(velcoProject)}
                  className="relative w-full h-60 sm:h-80 lg:h-[360px] rounded-[16px] overflow-hidden bg-[var(--surface-1)] cursor-pointer group"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentVelcoSlide.image}
                      initial={{ opacity: 0, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={currentVelcoSlide.image}
                        alt={`Velco ${currentVelcoSlide.label}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 740px"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D]/85 via-transparent to-transparent" /> {/* taste-skill-ignore: neutral scrim over photo */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="text-xs text-[#F1F5F9] font-medium bg-[#111318]/90 px-3 py-1.5 rounded-full truncate">
                      {currentVelcoSlide.caption}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Engineering Breakdown & Tabular Benchmarks */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {velcoProject.description}
                  </p>

                  {/* 3 Tabular Benchmark Cards */}
                  <div className="grid grid-cols-3 gap-2 tabular-nums">
                    {velcoProject.metrics?.map((m) => (
                      <div key={m.label} className="p-3 rounded-[14px] bg-[var(--surface-1)]">
                        <div className="text-sm sm:text-base font-black text-[var(--accent-pixel)]">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-[#F1F5F9] font-semibold mt-0.5 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {velcoProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[var(--surface-1)] text-xs font-medium text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectProject(velcoProject)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--accent-pixel)] hover:bg-[var(--accent-pixel-bright)] text-[var(--on-accent-pixel)] text-xs font-bold transition-transform active:scale-95 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>Inspect Architecture Sheet</span>
                  </button>

                  {velcoProject.link && (
                    <a
                      href={velcoProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[#F1F5F9] text-xs font-semibold transition-colors"
                    >
                      <span>Releases</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {velcoProject.githubUrl && (
                    <a
                      href={velcoProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[var(--text-secondary)] hover:text-[#F1F5F9] flex items-center justify-center transition-colors"
                      aria-label="Velco GitHub Repository"
                    >
                      <Github size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TIER 2: Asymmetric Featured Bento Grid (60% / 40% Alternating Split) ─── */}
      {tier2Projects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {tier2Projects.map((project, index) => {
            // Alternating 60% / 40% (7 cols / 5 cols, then 5 cols / 7 cols)
            const isWide = index % 3 === 0;
            const colSpan = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <motion.article
                key={project.id}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }}
                className={`${colSpan} bento-outer flex flex-col justify-between group cursor-pointer`}
                onClick={() => onSelectProject(project)}
              >
                <div>
                  {/* Concentric Inner Image Container (rounded-[28px] outer - 12px p-3 = rounded-[16px] inner) */}
                  <div className="relative w-full h-52 sm:h-60 rounded-[16px] overflow-hidden bg-[var(--surface-2)] mb-3">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 640px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D]/80 via-transparent to-transparent" /> {/* taste-skill-ignore: neutral scrim over photo */}

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-[#111318]/90 text-[11px] font-medium text-[var(--accent-pixel)]">
                        {project.category}
                      </span>
                    </div>

                    {project.metrics?.[0] && (
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#111318]/90 text-[11px] font-medium text-[#F1F5F9] tabular-nums">
                        <strong className="text-[var(--accent-pixel)]">{project.metrics[0].value}</strong>{' '}
                        <span className="text-[var(--text-secondary)]">{project.metrics[0].label}</span>
                      </div>
                    )}
                  </div>

                  {/* Concentric Inner Content Surface */}
                  <div className="bento-inner p-4 space-y-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#F1F5F9] group-hover:text-[var(--accent-pixel)] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full bg-[var(--surface-1)] text-[10px] font-medium text-[var(--text-secondary)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div
                        className="flex items-center gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[var(--text-secondary)] hover:text-[#F1F5F9] flex items-center justify-center transition-colors"
                            aria-label={`${project.title} GitHub`}
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[var(--text-secondary)] hover:text-[var(--accent-pixel)] flex items-center justify-center transition-colors"
                            aria-label={`${project.title} Live URL`}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* ─── TIER 3: Pixel Settings-Style Engineering Archive ─── */}
      {tier3Projects.length > 0 && (
        <div className="bento-outer space-y-2">
          <div className="flex items-center justify-between px-2 pt-1 pb-1">
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-[var(--accent-pixel)]" />
              <h3 className="text-sm sm:text-base font-bold text-[#F1F5F9]">
                Engineering Archive &amp; Domain Builds
              </h3>
            </div>
            <span className="text-xs text-[var(--text-muted)] tabular-nums">
              {tier3Projects.length} Systems • Click row to inspect sheet
            </span>
          </div>

          <div className="space-y-2">
            {tier3Projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bento-inner-interactive p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 cursor-pointer group"
              >
                {/* Left: Concentric Thumbnail + Title + Category */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-[12px] overflow-hidden bg-[var(--surface-1)] shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-medium text-[var(--accent-pixel)] bg-[var(--surface-1)] px-2 py-0.5 rounded-full">
                        {project.category}
                      </span>
                      {project.metrics?.[0] && (
                        <span className="text-[10px] text-[var(--text-muted)] tabular-nums">
                          {project.metrics[0].label}: <strong className="text-[#F1F5F9]">{project.metrics[0].value}</strong>
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-[#F1F5F9] group-hover:text-[var(--accent-pixel)] transition-colors truncate">
                      {project.title}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] truncate max-w-xl">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right: Stack Pills + Quick Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-[var(--surface-1)] text-[10px] font-medium text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="px-3 py-1.5 rounded-full bg-[var(--surface-pill)] hover:bg-[var(--accent-pixel)] text-[#F1F5F9] hover:text-[var(--on-accent-pixel)] text-xs font-semibold transition-colors"
                    >
                      Case Study
                    </button>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[var(--text-secondary)] hover:text-[#F1F5F9] flex items-center justify-center transition-colors"
                        aria-label={`Open ${project.title}`}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
