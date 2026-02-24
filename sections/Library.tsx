import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { projects, certificates } from '../constants';
import { Certificate } from '../types';

const Library: React.FC = () => {
  const [filter, setFilter] = useState<'projects' | 'certificates'>('projects');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  return (
    <section id="library" className="relative z-10 py-12 md:py-20 px-4 sm:px-6" style={{ willChange: 'transform' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter">Library <span className="text-white/10">&</span> <br />Works</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-sm text-right leading-relaxed"
          >
            A curated exhibition of digital products and creative engineering.
          </motion.p>
        </div>

        <div className="flex justify-center mb-10">
          <LayoutGroup>
            <motion.nav
              layout
              className="flex items-center gap-1 p-1.5 bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
            >
              <motion.button
                layout
                onClick={() => setFilter('projects')}
                className={`relative flex items-center justify-center h-10 rounded-full text-sm font-medium transition-colors duration-300 ${filter === 'projects' ? 'text-black px-4' : 'text-slate-400 hover:text-white px-3 hover:bg-white/5'
                  }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {filter === 'projects' && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-cyan-500 rounded-full shadow-[0_2px_10px_rgba(34,211,238,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="whitespace-nowrap font-mono text-sm uppercase tracking-widest">
                    Projects
                  </span>
                </span>
              </motion.button>
              <motion.button
                layout
                onClick={() => setFilter('certificates')}
                className={`relative flex items-center justify-center h-10 rounded-full text-sm font-medium transition-colors duration-300 ${filter === 'certificates' ? 'text-black px-4' : 'text-slate-400 hover:text-white px-3 hover:bg-white/5'
                  }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {filter === 'certificates' && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-cyan-500 rounded-full shadow-[0_2px_10px_rgba(34,211,238,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="whitespace-nowrap font-mono text-sm uppercase tracking-widest">
                    Certificates
                  </span>
                </span>
              </motion.button>
            </motion.nav>
          </LayoutGroup>
        </div>

        <AnimatePresence mode="wait">
          {filter === 'projects' ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
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
                    <TiltCard className="h-[450px] w-full relative group cursor-pointer">
                      <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-[#050508] border border-white/10 shadow-2xl" style={{ transform: "translateZ(0px)" }}>
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60 grayscale group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent opacity-70" />
                        </div>

                        <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none transition-all duration-500 group-hover:border-white/10" style={{ transform: "translateZ(20px)" }} />

                        <div className="absolute top-10 left-10" style={{ transform: "translateZ(30px)" }}>
                          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-md shadow-lg group-hover:bg-cyan-500/10 transition-colors duration-300">
                            {project.category}
                          </span>
                        </div>

                        <div className="absolute bottom-10 right-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: "translateZ(25px)" }} />
                        <div className="absolute bottom-10 right-10 h-24 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" style={{ transform: "translateZ(25px)" }} />

                        <div className="absolute bottom-12 left-10 right-12 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                          <h3 className="text-3xl font-black text-white mb-4 leading-tight drop-shadow-xl group-hover:text-cyan-50 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            {project.tags.map(tag => (
                              <span key={tag} className="text-xs font-mono text-slate-300 tracking-wide pr-3 border-r border-white/20 last:border-0">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="absolute top-8 right-8" style={{ transform: "translateZ(60px)" }}>
                          <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center scale-75 opacity-0 -rotate-45 group-hover:rotate-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out shadow-lg">
                            <ArrowUpRight size={24} strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div onClick={() => { setSelectedCertificate(cert); setIsModalOpen(true); }}>
                    <TiltCard className="h-[350px] w-full relative group cursor-pointer">
                      <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-[#050508] border border-white/10 shadow-2xl" style={{ transform: "translateZ(0px)" }}>
                          <img
                            src={cert.image}
                            alt={cert.title}
                            loading="lazy"
                            className="w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60 grayscale group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent opacity-70" />
                        </div>

                        <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none transition-all duration-500 group-hover:border-white/10" style={{ transform: "translateZ(20px)" }} />

                        <div className="absolute top-10 left-10" style={{ transform: "translateZ(30px)" }}>
                          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-md shadow-lg group-hover:bg-cyan-500/10 transition-colors duration-300">
                            {cert.issuer}
                          </span>
                        </div>

                        <div className="absolute bottom-10 right-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: "translateZ(25px)" }} />
                        <div className="absolute bottom-10 right-10 h-24 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" style={{ transform: "translateZ(25px)" }} />

                        <div className="absolute bottom-12 left-10 right-12 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                          <h3 className="text-2xl font-black text-white mb-3 leading-tight drop-shadow-xl group-hover:text-cyan-50 transition-colors duration-300">
                            {cert.title}
                          </h3>
                          <div className="text-slate-300 text-sm font-mono mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            Issued: {cert.date}
                          </div>
                        </div>

                        <div className="absolute top-8 right-8" style={{ transform: "translateZ(60px)" }}>
                          <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center scale-75 opacity-0 -rotate-45 group-hover:rotate-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out shadow-lg">
                            <ArrowUpRight size={24} strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {isModalOpen && selectedCertificate && createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-[90vw] max-h-[90vh] md:max-w-5xl md:max-h-[85vh] flex items-center justify-center p-0 m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative inline-flex flex-col items-center justify-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute -top-12 md:-top-16 right-0 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
                <img
                  src={selectedCertificate.certificateImage}
                  alt={selectedCertificate.title}
                  loading="eager"
                  className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-[0_0_50px_rgba(34,211,238,0.15)] ring-1 ring-white/10"
                />
              </div>
            </motion.div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};

export default React.memo(Library);