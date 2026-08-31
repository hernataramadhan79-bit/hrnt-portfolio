'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, TrendingUp, Cpu, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md -z-10"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 6 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card relative w-full max-w-4xl max-h-[90vh] bg-neutral-950/95 border border-neutral-800 rounded-3xl p-6 sm:p-8 md:p-10 overflow-y-auto shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-full border border-neutral-800 transition-colors z-20"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Header Info */}
          <div className="mb-6 pr-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="glass-badge px-2.5 py-0.5 rounded-full text-xs font-mono text-cyan-400 border-cyan-500/30">
                {project.category}
              </span>
              {project.tags.map((tag) => (
                <span key={tag} className="tech-badge text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h2>
          </div>

          {/* Main Visual Image Banner */}
          <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden mb-8 border border-neutral-800 bg-neutral-900">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
            
            {/* Quick Action Overlay Buttons */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2.5">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 text-xs font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-150 active:scale-[0.98]"
                >
                  <span>Live Preview</span>
                  <ExternalLink size={13} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-neutral-900/90 text-neutral-300 hover:text-white text-xs font-semibold px-4 py-2 rounded-full border border-neutral-700 hover:border-neutral-600 transition-all duration-150 active:scale-[0.98]"
                >
                  <Github size={14} />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Metrics Impact Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 font-mono">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <div className="flex items-center gap-1.5 text-neutral-500 text-[11px] uppercase tracking-wider mb-1">
                    <TrendingUp size={13} className="text-cyan-400" />
                    <span>{metric.label}</span>
                  </div>
                  <div className="text-xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  {metric.detail && (
                    <div className="text-xs text-neutral-400 leading-snug">
                      {metric.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Detailed Problem - Approach - Outcome Case Study */}
          <div className="space-y-6 text-neutral-300 text-sm leading-relaxed">
            {project.description && (
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Layers size={16} className="text-cyan-400" />
                  <span>Project Overview</span>
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm">{project.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {project.problem && (
                <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900/30">
                  <h4 className="text-xs uppercase tracking-wider text-rose-400 font-mono font-bold mb-2">
                    The Challenge &amp; Problem
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.approach && (
                <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900/30">
                  <h4 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2">
                    Architectural Approach
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              )}
            </div>

            {project.outcome && (
              <div className="p-4 rounded-2xl border border-neutral-800 bg-cyan-500/[0.02]">
                <h4 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2">
                  Engineering Outcome
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            )}

            {/* Highlights Checklist */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="pt-2">
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <Cpu size={16} className="text-cyan-400" />
                  <span>Key Technical Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
                      <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

