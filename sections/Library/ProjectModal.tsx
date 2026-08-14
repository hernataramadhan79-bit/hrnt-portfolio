'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
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

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-8 pointer-events-auto" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
        />
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative max-w-3xl w-full bg-[#050508] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] z-[100001] flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full md:w-1/2 h-[220px] md:h-[420px] relative">
            <Image
              src={project.image}
              alt={`Tampilan antarmuka proyek ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050508] via-[#050508]/60 to-transparent" />
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative z-10">
            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-white/20" aria-label="Close modal">
              <X size={16} />
            </button>
            <span className="px-2.5 py-1 w-fit bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em] rounded-lg mb-5">
              {project.category}
            </span>
            <h3 id="project-modal-title" className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {project.description || 'No detailed description provided for this project.'}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-mono text-slate-300 uppercase tracking-widest px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 w-full py-3.5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-xl">
              Initialize Demo <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;