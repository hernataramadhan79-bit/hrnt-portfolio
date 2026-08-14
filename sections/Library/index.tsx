'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, Award, Box, Image as ImageIcon, MapPin, Calendar, Tag, LayoutDashboard } from 'lucide-react';
import TiltCard from '../../components/TiltCard';
import ImageWithLoader from './ImageWithLoader';
import ProjectModal from './ProjectModal';
import CertificateModal from './CertificateModal';
import GalleryModal from './GalleryModal';
import { projects, certificates, galleryItems } from '../../constants';
import { Certificate, Project, GalleryItem } from '../../types';
import { WakaTimeWidget, GithubWidget } from './BentoWidgets';

const Library: React.FC = () => {
  const [filter, setFilter] = useState<'overview' | 'projects' | 'certificates' | 'gallery'>('overview');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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
    <section id="library" className="relative z-10 min-h-[calc(100dvh-5rem)] lg:h-[calc(100vh-6rem)] lg:min-h-0 flex flex-col justify-center lg:justify-start w-full py-6 lg:pt-16 lg:pb-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full lg:justify-start">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-10 gap-4 lg:gap-6 relative z-20 shrink-0">
          <div className="space-y-4 max-w-xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Creative Repository
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black leading-[0.9] text-white tracking-tighter uppercase">
              Library <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">& Archives.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-sm md:text-right text-sm text-slate-400 font-light leading-relaxed">
            Digital archive of creative engineering, professional certifications, career gallery, and technical explorations.
          </motion.p>
        </div>

        <div className="flex justify-center sm:justify-start mb-6 lg:mb-10 w-full shrink-0">
          <LayoutGroup>
            <nav className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto bg-[#0a0a12]/50 sm:bg-transparent p-1.5 sm:p-0 rounded-xl sm:rounded-none border border-white/5 sm:border-none backdrop-blur-sm" role="tablist" aria-label="Filter library content">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'projects', label: 'Projects', icon: Box },
                { id: 'certificates', label: 'Certificates', icon: Award },
                { id: 'gallery', label: 'Gallery', icon: ImageIcon },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setFilter(tab.id as typeof filter)}
                  role="tab" aria-selected={filter === tab.id} aria-controls={`library-panel-${tab.id}`}
                  className={`group relative flex items-center justify-center py-2.5 sm:px-1 transition-all duration-500 ease-out rounded-lg sm:rounded-none overflow-hidden
                    ${filter === tab.id ? 'text-white bg-white/5 sm:bg-transparent flex-[2] sm:flex-none px-3' : 'text-slate-500 hover:text-white flex-1 sm:flex-none px-0'}`}>
                  
                  <tab.icon size={14} className={`relative z-10 shrink-0 transition-colors duration-500 ${filter === tab.id ? 'text-cyan-400' : 'group-hover:text-cyan-400/50'}`} />
                  
                  {/* Desktop text: always visible */}
                  <span className="relative z-10 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.25em] hidden sm:block ml-2">
                    {tab.label}
                  </span>

                  {/* Mobile text: expands with pure CSS to perfectly sync with flex container */}
                  <span
                    className={`relative z-10 whitespace-nowrap sm:hidden text-[10px] font-black uppercase tracking-[0.25em] overflow-hidden transition-all duration-500 ease-out
                      ${filter === tab.id ? 'max-w-[100px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'}`}
                  >
                    {tab.label}
                  </span>

                  {/* Desktop Active Line */}
                  {filter === tab.id && (
                    <motion.div layoutId="active-tab-line" className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                  
                  <div className="absolute inset-x-0 inset-y-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-lg -z-10 hidden sm:block" />
                </button>
              ))}
            </nav>
          </LayoutGroup>
        </div>

        <AnimatePresence mode="wait">
          {filter === 'overview' && (
            <motion.div key="overview" role="tabpanel" id="library-panel-overview"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1 min-h-0">
              
              {/* Featured Project */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                className="md:col-span-2 lg:col-span-2 h-[220px]"
                onClick={() => { setSelectedProject(projects[0]); setIsProjectModalOpen(true); }}>
                <article className="h-full w-full relative group cursor-pointer overflow-hidden rounded-2xl border border-white/5 shadow-xl">
                  <div className="absolute inset-0">
                    <ImageWithLoader src={projects[0].image} alt={projects[0].title}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 opacity-50 group-hover:opacity-80 transition-[filter,opacity] duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/60 to-transparent" />
                  </div>
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-left z-10">
                    <span className="px-2 py-1 w-fit bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[9px] font-mono uppercase tracking-[0.2em] rounded mb-2">
                      Featured • {projects[0].category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tighter leading-tight mb-2">
                      {projects[0].title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 max-w-md">{projects[0].description}</p>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 backdrop-blur-md">
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </div>
                  </div>
                </article>
              </motion.div>

              {/* Stats Widgets */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                className="h-[220px]">
                <WakaTimeWidget />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                className="h-[220px]">
                <GithubWidget />
              </motion.div>

              {/* Recent Certificate */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                className="md:col-span-1 lg:col-span-2 h-[120px]">
                <article
                  className="h-full bg-[#0a0a12] border border-white/5 rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:border-cyan-500/30 transition-all duration-500 overflow-hidden relative"
                  onClick={() => { setSelectedCertificate(certificates[0]); setIsModalOpen(true); }}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2 shrink-0 group-hover:border-cyan-500/30 transition-colors relative">
                     <ImageWithLoader src={certificates[0].image} alt={`Logo penerbit ${certificates[0].issuer}`} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 z-10">
                    <span className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest mb-1 block">Recent Certification</span>
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors">{certificates[0].title}</h3>
                    <p className="text-xs text-slate-500 truncate">{certificates[0].issuer} • {certificates[0].date}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0 mr-2 z-10" />
                </article>
              </motion.div>

              {/* Recent Gallery Item */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                className="md:col-span-2 lg:col-span-2 h-[120px]">
                <article
                  className="h-full bg-[#0a0a12] border border-white/5 rounded-2xl overflow-hidden group cursor-pointer relative"
                  onClick={() => { setSelectedGallery(galleryItems[0]); setIsGalleryModalOpen(true); }}>
                  <div className="absolute inset-0">
                    <ImageWithLoader src={galleryItems[0].image} alt={galleryItems[0].title} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 opacity-40 group-hover:opacity-70 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12] via-[#0a0a12]/80 to-transparent" />
                  </div>
                  <div className="absolute inset-0 p-5 flex flex-col justify-center z-10">
                     <span className="text-[10px] text-pink-400 font-mono uppercase tracking-widest mb-1 block">Latest from Gallery</span>
                     <h3 className="text-sm font-bold text-white truncate group-hover:text-pink-400 transition-colors">{galleryItems[0].title}</h3>
                     <p className="text-xs text-slate-400 truncate mt-1 flex items-center gap-1.5"><MapPin size={10} /> {galleryItems[0].location}</p>
                  </div>
                </article>
              </motion.div>

            </motion.div>
          )}

          {filter === 'projects' && (
            <motion.div key="projects" role="tabpanel" id="library-panel-projects"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
              {projects.map((project, index) => (
                <motion.div key={project.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                  onClick={() => { setSelectedProject(project); setIsProjectModalOpen(true); }}>
                  <article className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0a0a12] border border-white/5 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
                    {/* Hover Image Reveal Background (Subtle) */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ WebkitMaskImage: 'linear-gradient(to left, black, transparent)' }}>
                      <ImageWithLoader src={project.image} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                    
                    <div className="flex-1 min-w-0 relative z-10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                      <div className="w-16 shrink-0 hidden sm:block">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">0{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight truncate">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[8px] font-mono uppercase tracking-widest rounded border border-cyan-500/20">
                            {project.category}
                          </span>
                          <span className="text-xs text-slate-400 truncate hidden sm:block max-w-sm">
                            {project.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0 flex-wrap sm:flex-nowrap">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[9px] font-mono text-slate-400 uppercase tracking-widest px-2 py-1 bg-white/5 rounded-lg border border-white/5">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="ml-4 shrink-0 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-cyan-500/20 border border-transparent group-hover:border-cyan-500/30 flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight size={14} className="text-slate-500 group-hover:text-cyan-400" />
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filter === 'certificates' && (
            <motion.div key="certificates" role="tabpanel" id="library-panel-certificates"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
              {certificates.map((cert, index) => (
                <motion.div key={cert.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                  onClick={() => { setSelectedCertificate(cert); setIsModalOpen(true); }}
                  className="break-inside-avoid">
                  <article className="group cursor-pointer p-4 rounded-2xl bg-[#0a0a12] border border-white/5 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
                    
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 group-hover:border-cyan-500/30 bg-white/5 p-1.5 shrink-0 relative">
                        <ImageWithLoader src={cert.image} alt={`Logo penerbit ${cert.issuer}`} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug uppercase tracking-tight">
                          {cert.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                       <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest truncate max-w-[120px]">
                          {cert.issuer}
                       </span>
                       <span className="text-[9px] font-mono text-cyan-500 px-2 py-0.5 bg-cyan-500/10 rounded">
                          {cert.date}
                       </span>
                    </div>
                  </article>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filter === 'gallery' && (
            <motion.div key="gallery" role="tabpanel" id="library-panel-gallery"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
              {galleryItems.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                  onClick={() => { setSelectedGallery(item); setIsGalleryModalOpen(true); }}
                  className="break-inside-avoid">
                  <article className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all duration-500 bg-[#0a0a12]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <ImageWithLoader src={item.image} alt={item.title}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-[filter] duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/40 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-500" />
                      
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-1 bg-pink-500/20 backdrop-blur-md border border-pink-500/30 text-pink-300 text-[9px] font-mono uppercase tracking-[0.2em] rounded-lg">
                          {item.category}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <h3 className="text-sm font-bold text-white leading-snug mb-1.5 group-hover:text-pink-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3 text-[9px] text-slate-400 font-mono uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Calendar size={10} /> {item.date}</span>
                          <span className="flex items-center gap-1 truncate"><MapPin size={10} /> {item.location}</span>
                        </div>
                      </div>
                      
                      <div className="absolute top-3 right-3 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 z-10">
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <ArrowUpRight size={14} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <ProjectModal open={isProjectModalOpen} project={selectedProject} onClose={() => setIsProjectModalOpen(false)} mounted={mounted} />
        <CertificateModal open={isModalOpen} cert={selectedCertificate} onClose={() => setIsModalOpen(false)} mounted={mounted} />
        <GalleryModal open={isGalleryModalOpen} item={selectedGallery} onClose={() => setIsGalleryModalOpen(false)} mounted={mounted} />

      </div>
    </section>
  );
};

export default React.memo(Library);