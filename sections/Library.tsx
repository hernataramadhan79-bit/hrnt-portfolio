'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, Award, Box, X } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { projects, certificates } from '../constants';
import { Certificate } from '../types';

const Library: React.FC = () => {
  const [filter, setFilter] = useState<'projects' | 'certificates'>('projects');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="library" className="relative z-10 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 relative z-20">
          <div className="space-y-6 max-w-2xl">
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
              className="text-5xl md:text-7xl font-black leading-[0.9] text-white tracking-tighter uppercase"
            >
              Library <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">& Archives.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md lg:text-right"
          >
            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
              Digital archive of creative engineering, professional certifications, and technical explorations.
            </p>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-start mb-16 overflow-x-auto pb-4 no-scrollbar">
          <LayoutGroup>
            <nav className="flex items-center gap-6">
              {[
                { id: 'projects', label: 'Projects', icon: Box },
                { id: 'certificates', label: 'Certificates', icon: Award }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`group relative flex items-center gap-3 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${filter === tab.id ? 'text-white' : 'text-slate-500 hover:text-white'
                    }`}
                >
                  <tab.icon size={14} className={`relative z-10 transition-colors ${filter === tab.id ? 'text-cyan-400' : 'group-hover:text-cyan-400/50'}`} />
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>

                  {filter === tab.id && (
                    <motion.div
                      layoutId="active-tab-line"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover background trace */}
                  <div className="absolute inset-x-0 inset-y-1 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-lg -z-10" />
                </button>
              ))}
            </nav>
          </LayoutGroup>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {filter === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <TiltCard className="h-[450px] w-full relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl">
                      <div className="absolute inset-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      </div>

                      <div className="absolute inset-0 p-10 flex flex-col justify-end text-left">
                        <div className="mb-4">
                          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] rounded-lg">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors uppercase italic tracking-tighter leading-tight">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-2 py-1 bg-white/5 rounded-md border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="absolute top-10 right-10">
                        <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <ArrowUpRight size={20} strokeWidth={2.5} />
                        </div>
                      </div>
                    </TiltCard>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filter === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => { setSelectedCertificate(cert); setIsModalOpen(true); }}
                >
                  <div className="group cursor-pointer p-8 rounded-[2.5rem] bg-[#050508] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-0 bg-cyan-500 group-hover:h-full transition-all duration-500" />
                    <div className="absolute inset-0 bg-grid-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-6 text-left">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10 group-hover:border-cyan-500/20 bg-white/5 p-2">
                        <img src={cert.image} alt={cert.issuer} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.2em] mb-2 block">
                          {cert.issuer} • {cert.date}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight uppercase tracking-tighter">
                          {cert.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate Modal */}
        {mounted && isModalOpen && selectedCertificate && createPortal(
          <AnimatePresence>
            <div
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#020617]/95 backdrop-blur-3xl p-4"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  <X size={20} />
                </button>
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_100px_rgba(34,211,238,0.2)]">
                  <img
                    src={selectedCertificate.certificateImage}
                    alt={selectedCertificate.title}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
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