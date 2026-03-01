'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, Award, Box, Image, X, MapPin, Calendar, Tag } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { projects, certificates, galleryItems } from '../constants';
import { Certificate, Project, GalleryItem } from '../types';

const ImageWithLoader = ({ src, alt, className, ...props }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`relative w-full h-full transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={className}
        {...props}
      />
    </div>
  );
};

const Library: React.FC = () => {
  const [filter, setFilter] = useState<'projects' | 'certificates' | 'gallery'>('projects');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isModalOpen || isProjectModalOpen || isGalleryModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen, isProjectModalOpen, isGalleryModalOpen]);

  if (!mounted) return null;

  return (
    <section id="library" className="relative z-10 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 relative z-20">
          <div className="space-y-4 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Creative Repository
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black leading-[0.9] text-white tracking-tighter uppercase"
            >
              Library{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                & Archives.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-sm md:text-right text-sm text-slate-400 font-light leading-relaxed"
          >
            Digital archive of creative engineering, professional certifications, career gallery, and technical explorations.
          </motion.p>
        </div>

        {/* ── Navigation Tabs ── */}
        <div className="flex justify-start mb-10 overflow-x-auto pb-2 no-scrollbar">
          <LayoutGroup>
            <nav className="flex items-center gap-4">
              {[
                { id: 'projects', label: 'Projects', icon: Box },
                { id: 'certificates', label: 'Certificates', icon: Award },
                { id: 'gallery', label: 'Gallery', icon: Image },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as typeof filter)}
                  className={`group relative flex items-center gap-2 py-2.5 px-1 text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 ${filter === tab.id ? 'text-white' : 'text-slate-500 hover:text-white'
                    }`}
                >
                  <tab.icon
                    size={13}
                    className={`relative z-10 transition-colors ${filter === tab.id ? 'text-cyan-400' : 'group-hover:text-cyan-400/50'
                      }`}
                  />
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>

                  {filter === tab.id && (
                    <motion.div
                      layoutId="active-tab-line"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="absolute inset-x-0 inset-y-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-lg -z-10" />
                </button>
              ))}
            </nav>
          </LayoutGroup>
        </div>

        {/* ── Content Section ── */}
        <AnimatePresence mode="wait">

          {/* ─── Projects Grid ─── */}
          {filter === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => {
                    setSelectedProject(project);
                    setIsProjectModalOpen(true);
                  }}
                >
                  <TiltCard className="h-[200px] sm:h-[220px] w-full relative group cursor-pointer overflow-hidden rounded-2xl border border-white/5 shadow-xl">
                    <div className="absolute inset-0">
                      <ImageWithLoader
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-60 transition-[filter,opacity] duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    </div>

                    <div className="absolute inset-0 p-4 flex flex-col justify-end text-left">
                      <span className="px-1.5 py-0.5 w-fit bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-mono uppercase tracking-[0.2em] rounded mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tighter leading-tight mb-1.5">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-mono text-slate-400 uppercase tracking-widest px-1.5 py-0.5 bg-white/5 rounded border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest px-1.5 py-0.5 bg-white/5 rounded border border-white/5">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="absolute top-3 right-3">
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center -translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 backdrop-blur-sm">
                        <ArrowUpRight size={12} strokeWidth={2.5} />
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ─── Certificates Grid ─── */}
          {filter === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => {
                    setSelectedCertificate(cert);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="group cursor-pointer p-5 rounded-2xl bg-[#0a0a12] border border-white/5 hover:border-cyan-500/25 transition-all duration-500 relative overflow-hidden">
                    {/* Left accent bar */}
                    <div className="absolute top-0 left-0 w-1 h-0 bg-cyan-500 group-hover:h-full transition-all duration-500 rounded-r" />
                    <div className="absolute inset-0 bg-grid-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative z-10 flex items-center gap-4 text-left">
                      <div className="w-12 h-12 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10 group-hover:border-cyan-500/20 bg-white/5 p-1.5 flex-shrink-0">
                        <ImageWithLoader src={cert.image} alt={cert.issuer} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-[0.15em] mb-1 block">
                          {cert.issuer} • {cert.date}
                        </span>
                        <h3 className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors leading-tight uppercase tracking-tighter truncate">
                          {cert.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ─── Gallery Grid (Masonry-ish) ─── */}
          {filter === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  onClick={() => {
                    setSelectedGallery(item);
                    setIsGalleryModalOpen(true);
                  }}
                >
                  <div className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/5 hover:border-cyan-500/25 transition-all duration-500 bg-[#0a0a12]">
                    <div className="relative overflow-hidden aspect-[1/1] sm:aspect-[4/3]">
                      <ImageWithLoader
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-[filter] duration-500"
                      />
                      {/* Overlay gradient - now always visible but darker on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500" />

                      {/* Category badge - always visible */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-1 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[8px] font-mono uppercase tracking-[0.2em] rounded-lg">
                          {item.category}
                        </span>
                      </div>

                      {/* Title & date overlay - always visible */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <h3 className="text-sm font-black text-white leading-tight mb-1 uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {item.date} · {item.location}
                        </p>
                      </div>

                      {/* Click-to-view indicator - still hover only for interaction hint */}
                      <div className="absolute top-3 right-3 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 z-10">
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <ArrowUpRight size={14} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════ MODALS ═══════════ */}

        {/* ── Project Modal ── */}
        {mounted && isProjectModalOpen && selectedProject &&
          createPortal(
            <AnimatePresence>
              <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsProjectModalOpen(false)}
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
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050508] via-[#050508]/60 to-transparent" />
                  </div>
                  <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative z-10">
                    <button
                      onClick={() => setIsProjectModalOpen(false)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
                    >
                      <X size={16} />
                    </button>
                    <span className="px-2.5 py-1 w-fit bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em] rounded-lg mb-5">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
                      {selectedProject.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {selectedProject.description || 'No detailed description provided for this project.'}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono text-slate-300 uppercase tracking-widest px-2.5 py-1 bg-white/5 rounded-lg border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 w-full py-3.5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-xl"
                    >
                      Initialize Demo{' '}
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </a>
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>,
            document.body
          )}

        {/* ── Certificate Modal ── */}
        {mounted && isModalOpen && selectedCertificate &&
          createPortal(
            <AnimatePresence>
              <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
                />
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 40 }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="relative max-w-3xl w-full bg-[#050508] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] z-[100001]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-white/20 z-10"
                  >
                    <X size={16} />
                  </button>
                  <div className="p-4 md:p-6 flex items-center justify-center bg-black/50">
                    <img
                      src={selectedCertificate.certificateImage}
                      alt={selectedCertificate.title}
                      className="w-full h-auto max-h-[65vh] object-contain rounded-lg"
                    />
                  </div>
                  <div className="px-6 pb-6">
                    <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em] rounded-lg">
                      {selectedCertificate.issuer} • {selectedCertificate.date}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white mt-3 uppercase tracking-tighter leading-none">
                      {selectedCertificate.title}
                    </h3>
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>,
            document.body
          )}

        {/* ── Gallery Modal (with detailed info) ── */}
        {mounted && isGalleryModalOpen && selectedGallery &&
          createPortal(
            <AnimatePresence>
              <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-6 pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
                />
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 40 }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="relative max-w-4xl w-full bg-[#050508] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] z-[100001] max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 z-20"
                  >
                    <X size={16} />
                  </button>

                  {/* Image Section */}
                  <div className="relative w-full">
                    <img
                      src={selectedGallery.image}
                      alt={selectedGallery.title}
                      className="w-full h-auto max-h-[55vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                  </div>

                  {/* Detail Section */}
                  <div className="p-6 md:p-8 -mt-8 relative z-10">
                    {/* Category badge */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em] rounded-lg mb-4">
                      <Tag size={10} />
                      {selectedGallery.category}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                      {selectedGallery.title}
                    </h3>

                    {/* Meta info row */}
                    <div className="flex flex-wrap items-center gap-4 mb-5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar size={13} className="text-cyan-400" />
                        <span className="text-xs font-mono">{selectedGallery.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin size={13} className="text-purple-400" />
                        <span className="text-xs font-mono">{selectedGallery.location}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-cyan-500/20 via-white/5 to-transparent mb-5" />

                    {/* Description */}
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
                      {selectedGallery.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>,
            document.body
          )}

      </div>
    </section>
  );
};

export default React.memo(Library);