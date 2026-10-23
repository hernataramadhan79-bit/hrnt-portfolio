'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, TrendingUp, Cpu, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (project) {
      setSelectedImage(project.image);
    }
  }, [project]);

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
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto"
      >
        {/* Modal Backdrop (Glass Dose #2 of 2 allowed by R-10) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#060709]/80 backdrop-blur-md -z-10"
        />

        {/* Modal Sheet Container (Concentric: rounded-[28px] outer -> p-3/p-4 -> rounded-[16px] inner) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }}
          className="bento-outer relative w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-3" // taste-skill-ignore: modal dialog overlay
        >
          {/* Top Header Surface */}
          <div className="bento-inner p-4 sm:p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] rounded-full transition-colors z-20 active:scale-95"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="pr-10">
              <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-medium text-[var(--on-accent-pixel)] bg-[var(--accent-pixel)] font-bold">
                  {project.category}
                </span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-1)] text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2
                id="project-modal-title"
                className="text-xl sm:text-2xl md:text-3xl font-black text-[#F1F5F9] tracking-tight leading-tight"
              >
                {project.title}
              </h2>
            </div>
          </div>

          {/* Concentric Visual Showcase (rounded-[16px]) */}
          <div className="bento-inner p-3 space-y-3">
            <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-[16px] overflow-hidden bg-[var(--surface-1)]">
              <Image
                src={selectedImage || project.image}
                alt={project.title}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D]/80 via-transparent to-transparent" /> {/* taste-skill-ignore: neutral scrim over photo */}

              <div className="absolute bottom-3.5 right-3.5 flex items-center gap-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[var(--accent-pixel)] hover:bg-[var(--accent-pixel-bright)] text-[var(--on-accent-pixel)] text-xs font-bold px-4 py-2 rounded-full transition-transform active:scale-95"
                  >
                    <span>Live Deployment</span>
                    <ExternalLink size={13} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#111318]/90 hover:bg-[var(--surface-pill)] text-[#F1F5F9] text-xs font-semibold px-4 py-2 rounded-full transition-transform active:scale-95"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>

            {/* Gallery Switcher Pills */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {project.gallery.map((img, i) => {
                  const isCurrent = (selectedImage || project.image) === img;
                  return (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 sm:w-24 h-14 rounded-[12px] overflow-hidden shrink-0 transition-all duration-200 ${
                        isCurrent
                          ? 'ring-2 ring-[var(--accent-pixel)] opacity-100'
                          : 'opacity-55 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${project.title} preview ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tabular Metrics Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 tabular-nums">
              {project.metrics.map((metric, i) => (
                <div key={i} className="bento-inner p-4">
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)] text-[11px] font-medium mb-1">
                    <TrendingUp size={13} className="text-[var(--accent-pixel)]" />
                    <span>{metric.label}</span>
                  </div>
                  <div className="text-xl font-black text-[#F1F5F9] mb-0.5">
                    {metric.value}
                  </div>
                  {metric.detail && (
                    <div className="text-xs text-[var(--text-muted)] leading-snug font-sans">
                      {metric.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Problem / Approach / Outcome Case Study */}
          <div className="bento-inner p-4 sm:p-6 space-y-5 text-sm leading-relaxed">
            {project.description && (
              <div>
                <h3 className="text-sm font-bold text-[#F1F5F9] mb-1.5 flex items-center gap-2">
                  <Layers size={15} className="text-[var(--accent-pixel)]" />
                  <span>Architectural Overview</span>
                </h3>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                  {project.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.problem && (
                <div className="p-4 rounded-[12px] bg-[var(--surface-1)]">
                  <h4 className="text-xs font-semibold text-rose-300 mb-1.5">
                    Problem Statement
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.approach && (
                <div className="p-4 rounded-[12px] bg-[var(--surface-1)]">
                  <h4 className="text-xs font-semibold text-[var(--accent-pixel)] mb-1.5">
                    Engineering Solution
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              )}
            </div>

            {project.outcome && (
              <div className="p-4 rounded-[12px] bg-[var(--surface-1)]">
                <h4 className="text-xs font-semibold text-[var(--accent-pixel-bright)] mb-1.5">
                  Production Outcome
                </h4>
                <p className="text-xs text-[#F1F5F9] leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <div className="pt-1">
                <h3 className="text-sm font-bold text-[#F1F5F9] mb-2.5 flex items-center gap-2">
                  <Cpu size={15} className="text-[var(--accent-pixel)]" />
                  <span>Key Technical Specifications</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-[12px] bg-[var(--surface-1)]"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-[var(--accent-pixel)] shrink-0 mt-0.5"
                      />
                      <span className="text-xs text-[#F1F5F9]">{item}</span>
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
