'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projects } from '../../constants';
import { Project } from '../../types';

interface WorkProps {
  onSelectProject: (project: Project) => void;
}

export default function Work({ onSelectProject }: WorkProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Web App', 'Desktop App'];

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') return projects;
    return projects.filter((p) => p.category.toLowerCase().includes(selectedFilter.toLowerCase()));
  }, [selectedFilter]);

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
            01 / SELECTED WORK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Production Applications &amp; Case Studies
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            High-performance web apps, interactive 3D simulations, and native desktop utilities built with modern stacks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-neutral-900/60 p-1.5 rounded-xl border border-neutral-800 self-start md:self-auto">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                  isActive
                    ? 'bg-neutral-800 text-white font-semibold border-neutral-700'
                    : 'text-neutral-500 hover:text-neutral-300 border-transparent'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Bento Grid (Asymmetric Golden Ratio Split) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project, idx) => {
            // Flagship first project takes 8 columns (61.8%), second takes 4 columns (38.2%)
            const isFlagship = idx === 0 && selectedFilter === 'All';
            const colSpanClass = isFlagship
              ? 'lg:col-span-8'
              : idx === 1 && selectedFilter === 'All'
              ? 'lg:col-span-4'
              : 'lg:col-span-6';

            return (
              <motion.article
                layout="position"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{
                  layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.22, delay: idx * 0.02 },
                  y: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                }}
                key={project.id}
                className={`${colSpanClass} glass-card flex flex-col justify-between overflow-hidden group hover:border-neutral-700 transition-colors relative rounded-3xl p-5 sm:p-6`}
              >
                <div>
                  {/* Image Container with Ambient Gradient */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 cursor-pointer mb-5"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="glass-badge px-2.5 py-0.5 rounded-full text-[10px] font-mono text-cyan-400 border border-cyan-500/20 bg-neutral-950/80">
                        {project.category}
                      </span>
                    </div>

                    {/* Inspect Case Study Floating Indicator */}
                    <div className="absolute bottom-3.5 right-3.5 w-8 h-8 rounded-full bg-neutral-950/80 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div>
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="text-lg sm:text-xl font-bold text-white mb-2 cursor-pointer group-hover:text-cyan-300 transition-colors line-clamp-1"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mb-4 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Highlight Strip */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 font-mono text-xs">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <span className="text-cyan-400 font-bold block">{m.value}</span>
                          <span className="text-[10px] text-neutral-500 block truncate">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Badges & Actions */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 overflow-hidden max-w-[70%]">
                    {project.tags.slice(0, 3).map((t) => (
                      <span key={t} className="tech-badge text-[10px] py-0.5 px-2 truncate">
                        {t}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="tech-badge text-[10px] py-0.5 px-1.5 text-neutral-500">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full glass-badge text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full glass-badge text-neutral-400 hover:text-cyan-400 hover:border-neutral-700 transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

