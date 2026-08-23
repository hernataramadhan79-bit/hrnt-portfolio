'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Check, ExternalLink, Github, Zap, Activity } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  mounted: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ open, project, onClose, mounted }) => {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (project) {
      setActiveImage(project.image);
    }
  }, [project]);

  if (!mounted || !open || !project) return null;

  const hasCaseStudy = Boolean(project.problem || project.approach || project.outcome || project.highlights?.length);
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 md:p-6 pointer-events-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
        />

        {/* Modal Surface */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 25 }}
          transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          className="relative max-w-4xl w-full max-h-[92vh] bg-[#050508] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.08)] z-[100001] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10 bg-[#07070c] shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em] font-bold">
                {project.category}
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest hidden sm:inline-block">
                CASE STUDY
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-wider border border-white/10 hover:border-white/20 transition-all group"
                  title="View Source Repository"
                >
                  <Github size={13} className="text-slate-400 group-hover:text-white transition-colors" />
                  <span className="hidden xs:inline">Source Code</span>
                </a>
              )}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-[10px] sm:text-[11px] font-black uppercase font-mono tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.45)] hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                <span>Live Demo</span>
                <ArrowUpRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5 hover:border-white/15"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-5 flex-1">
            {/* Top Overview: Image + Title + Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              {/* Preview Thumbnail with Clickable Live Link */}
              <div className="md:col-span-6 space-y-2.5">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 hover:border-cyan-500/50 bg-black/60 shadow-inner group cursor-pointer transition-colors block"
                >
                  <Image
                    src={activeImage || project.image}
                    alt={`Interface preview of ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-white text-[9px] font-mono uppercase tracking-wider flex items-center gap-1.5 group-hover:border-cyan-400/50 group-hover:text-cyan-300 transition-colors shadow-lg">
                    <span>Open App</span>
                    <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>

                {/* Screenshot Thumbnails (if multiple exist) */}
                {gallery.length > 1 && (
                  <div className="flex gap-2 pt-1 overflow-x-auto pb-1">
                    {gallery.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`relative w-16 h-10 rounded-lg overflow-hidden border transition-all shrink-0 ${
                          activeImage === img
                            ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                            : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image src={img} alt={`Preview ${i + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title, Description & Stack */}
              <div className="md:col-span-6 flex flex-col justify-center space-y-3">
                <div>
                  <h3 id="project-modal-title" className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-[13px] font-light leading-relaxed mt-2">
                    {project.description || 'Production-grade application designed for scalability and seamless user experience.'}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-cyan-300 uppercase tracking-widest px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Metrics Section */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={13} className="text-cyan-400" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                    Key Metrics & Benchmark Performance
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 rounded-xl p-3 flex flex-col justify-between transition-all"
                    >
                      <span className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {metric.value}
                      </span>
                      <span className="text-[10px] font-mono text-white font-semibold uppercase tracking-wider mt-1">
                        {metric.label}
                      </span>
                      {metric.detail && (
                        <span className="text-[10px] text-slate-400 font-light mt-0.5 leading-snug">
                          {metric.detail}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case Study Details — Clean Spec Grid */}
            {hasCaseStudy && (
              <div className="border-t border-white/10 pt-5 space-y-4">
                {/* 3-Column Problem / Approach / Outcome Specification */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.problem && (
                    <div className="space-y-1.5 border-l-2 border-amber-400/40 pl-3">
                      <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                        01. The Problem
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed font-light">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {project.approach && (
                    <div className="space-y-1.5 border-l-2 border-cyan-400/40 pl-3">
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                        02. Approach
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed font-light">
                        {project.approach}
                      </p>
                    </div>
                  )}

                  {project.outcome && (
                    <div className="space-y-1.5 border-l-2 border-emerald-400/40 pl-3">
                      <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                        03. Impact & Outcome
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed font-light">
                        {project.outcome}
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Technical Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="pt-3 border-t border-white/5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-2.5">
                      Architecture & Key Deliverables
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;