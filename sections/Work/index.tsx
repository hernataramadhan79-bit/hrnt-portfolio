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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
            01 / SELECTED WORK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Production Applications &amp; Case Studies
          </h2>
          <p className="text-sm text-[#8e9192] mt-2 max-w-xl">
            High-performance web apps, interactive 3D simulations, and native desktop utilities built with modern stacks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                    : 'glass-badge text-[#8e9192] hover:text-white hover:bg-white/10 hover:border-cyan-400/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project, idx) => (
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
              className="glass-card flex flex-col overflow-hidden group hover:border-cyan-400/30 transition-colors duration-200 relative rounded-3xl"
            >
              {/* Image Container with Ambient Gradient */}
              <div
                onClick={() => onSelectProject(project)}
                className="relative w-full h-56 overflow-hidden bg-black/60 cursor-pointer"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13] via-transparent to-transparent opacity-80" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4">
                  <span className="glass-badge px-3 py-1 rounded-full text-[10px] font-bold text-cyan-300 uppercase tracking-wider backdrop-blur-md border-cyan-400/30">
                    {project.category}
                  </span>
                </div>

                {/* Inspect Case Study Floating Indicator */}
                <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500/40 group-hover:border-cyan-400/80 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-200">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-xl font-bold text-white mb-2 cursor-pointer hover:text-cyan-300 transition-colors line-clamp-1"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#8e9192] line-clamp-2 mb-4 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Metrics Highlight Badge */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mb-4 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-[#8e9192] font-semibold">
                      {project.metrics[0].label}:
                    </span>
                    <span className="text-xs font-bold text-cyan-400 font-mono">
                      {project.metrics[0].value}
                    </span>
                  </div>
                )}

                {/* Footer Badges & Actions */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 overflow-hidden max-w-[70%]">
                    {project.tags.slice(0, 2).map((t) => (
                      <span key={t} className="tech-badge text-[10px] py-0.5 px-2 truncate">
                        {t}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="tech-badge text-[10px] py-0.5 px-1.5 text-[#8e9192]">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full glass-badge text-[#8e9192] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-colors"
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
                        className="p-2 rounded-full glass-badge text-[#8e9192] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
