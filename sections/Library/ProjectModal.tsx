'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2, Target, Cpu, Trophy, Layers } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  mounted: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ open, project, onClose, mounted }) => {
  if (!mounted || !open || !project) return null;

  const hasCaseStudy = Boolean(project.problem || project.approach || project.outcome || project.highlights?.length);

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-auto" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative max-w-4xl w-full max-h-[90vh] bg-[#07070c] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_90px_rgba(34,211,238,0.15)] z-[100001] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar / Header with Close Button */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/5 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] rounded-lg">
                {project.category}
              </span>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline-block">
                PROJECT CASE STUDY
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
              aria-label="Close modal"
            >
              <X size={15} />
            </button>
          </div>

          {/* Scrollable Modal Content Body */}
          <div className="overflow-y-auto custom-scrollbar p-5 sm:p-7 md:p-8 space-y-6 sm:space-y-8 flex-1">
            {/* Visual Hero + Main Title */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 h-[200px] sm:h-[260px] relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src={project.image}
                  alt={`Interface preview of ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-transparent opacity-80" />
              </div>

              <div className="md:col-span-6 space-y-3 sm:space-y-4">
                <h3 id="project-modal-title" className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-snug">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {project.description || 'Production-grade web application engineered with modern architectural standards.'}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono text-cyan-300/90 uppercase tracking-widest px-2.5 py-1 bg-cyan-950/30 rounded-md border border-cyan-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Demo Action Button */}
                <div className="pt-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-xl"
                  >
                    <span>Launch Live Demo</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Deep-Dive Case Study Content */}
            {hasCaseStudy && (
              <div className="border-t border-white/10 pt-6 space-y-6">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-[0.25em]">
                  <Layers size={14} />
                  <span>Engineering Breakdown</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Problem */}
                  {project.problem && (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                        <Target size={14} />
                        <span>The Problem</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-light">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {/* Approach */}
                  {project.approach && (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                        <Cpu size={14} />
                        <span>Technical Approach</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-light">
                        {project.approach}
                      </p>
                    </div>
                  )}

                  {/* Outcome */}
                  {project.outcome && (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <Trophy size={14} />
                        <span>Key Outcome</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-light">
                        {project.outcome}
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Technical Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-xl bg-[#030306] border border-cyan-500/20 space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Key Technical Deliverables & Architecture
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                          <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
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