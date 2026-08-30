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
          onClick={onClose}
          className="fixed inset-0 bg-[#090A0F]/85 backdrop-blur-xl -z-10"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card relative w-full max-w-4xl max-h-[90vh] bg-[#0d0e13]/95 border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 overflow-y-auto shadow-2xl"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)' }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#c4c7c8] hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors z-20"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header Info */}
          <div className="mb-6 pr-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="glass-badge px-3 py-1 rounded-full text-xs font-semibold text-cyan-300 uppercase tracking-wider border-cyan-400/30">
                {project.category}
              </span>
              {project.tags.map((tag) => (
                <span key={tag} className="tech-badge text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              {project.title}
            </h2>
          </div>

          {/* Main Visual Image Banner */}
          <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden mb-8 border border-white/10 bg-black/40">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent opacity-70" />
            
            {/* Quick Action Overlay Buttons */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-sky-400 text-black text-xs font-bold px-4 py-2 rounded-full hover:brightness-110 shadow-lg transition-transform hover:scale-105"
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
                  className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 hover:bg-black/80 transition-transform hover:scale-105"
                >
                  <Github size={14} />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Metrics Impact Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {project.metrics.map((metric, i) => (
                <div key={i} className="glass-card p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-2 text-[#8e9192] text-xs uppercase tracking-wider font-semibold mb-1">
                    <TrendingUp size={13} className="text-cyan-400" />
                    <span>{metric.label}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  {metric.detail && (
                    <div className="text-xs text-[#c4c7c8]/80 leading-snug">
                      {metric.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Detailed Problem - Approach - Outcome Case Study */}
          <div className="space-y-6 text-[#c4c7c8] text-sm sm:text-base leading-relaxed">
            {project.description && (
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Layers size={18} className="text-cyan-400" />
                  <span>Project Overview</span>
                </h3>
                <p className="text-[#c4c7c8]">{project.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {project.problem && (
                <div className="glass-card p-5 rounded-2xl border border-white/10 bg-white/[0.01]">
                  <h4 className="text-sm uppercase tracking-wider text-red-300 font-bold mb-2">
                    The Challenge &amp; Problem
                  </h4>
                  <p className="text-xs sm:text-sm text-[#c4c7c8]/90 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.approach && (
                <div className="glass-card p-5 rounded-2xl border border-white/10 bg-white/[0.01]">
                  <h4 className="text-sm uppercase tracking-wider text-cyan-300 font-bold mb-2">
                    Architectural Approach
                  </h4>
                  <p className="text-xs sm:text-sm text-[#c4c7c8]/90 leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              )}
            </div>

            {project.outcome && (
              <div className="glass-card p-5 rounded-2xl border border-white/10 bg-cyan-500/[0.02]">
                <h4 className="text-sm uppercase tracking-wider text-cyan-300 font-bold mb-2">
                  Engineering Outcome
                </h4>
                <p className="text-xs sm:text-sm text-[#c4c7c8]/90 leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            )}

            {/* Highlights Checklist */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="pt-2">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu size={18} className="text-cyan-400" />
                  <span>Key Technical Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-[#e3e1e9]">{item}</span>
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
