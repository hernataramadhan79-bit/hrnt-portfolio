'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, Award, Box, Image as ImageIcon, MapPin, Calendar, Tag, LayoutDashboard, Github } from 'lucide-react';
import TiltCard from '../../components/TiltCard';
import ImageWithLoader from './ImageWithLoader';
import ProjectModal from './ProjectModal';
import CertificateModal from './CertificateModal';
import GalleryModal from './GalleryModal';
import { projects, certificates, galleryItems } from '../../constants';
import { Certificate, Project, GalleryItem } from '../../types';
import { WakaTimeWidget, GithubWidget } from './BentoWidgets';

const Projects: React.FC = () => {
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
    <section id="projects" className="relative z-10 min-h-[calc(100dvh-4.5rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col justify-start w-full py-4 sm:py-6 lg:pt-14 lg:pb-4 xl:pt-16 xl:pb-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full justify-start">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 sm:mb-4 lg:mb-5 gap-3 lg:gap-6 relative z-20 shrink-0">
          <div className="space-y-2 lg:space-y-3 max-w-xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[9px] xl:text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Project Repository
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl font-black leading-[0.95] text-white tracking-tighter uppercase">
              Projects <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">& Archives.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-sm md:text-right text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
            Digital archive of creative engineering, professional certifications, career gallery, and technical explorations.
          </motion.p>
        </div>

        <div className="flex justify-center sm:justify-start mb-3 sm:mb-4 lg:mb-5 w-full shrink-0">
          <LayoutGroup>
            <nav className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto bg-[#0a0a12]/50 sm:bg-transparent p-1 sm:p-0 rounded-xl sm:rounded-none border border-white/5 sm:border-none backdrop-blur-sm" role="tablist" aria-label="Filter library content">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'projects', label: 'Projects', icon: Box },
                { id: 'certificates', label: 'Certificates', icon: Award },
                { id: 'gallery', label: 'Gallery', icon: ImageIcon },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setFilter(tab.id as typeof filter)}
                  role="tab" aria-selected={filter === tab.id} aria-controls={`library-panel-${tab.id}`}
                  className={`group relative flex items-center justify-center py-2 sm:px-1 transition-all duration-500 ease-out rounded-lg sm:rounded-none overflow-hidden
                    ${filter === tab.id ? 'text-white bg-white/5 sm:bg-transparent flex-[2] sm:flex-none px-3' : 'text-slate-500 hover:text-white flex-1 sm:flex-none px-0'}`}>
                  
                  <tab.icon size={13} className={`relative z-10 shrink-0 transition-colors duration-500 ${filter === tab.id ? 'text-cyan-400' : 'group-hover:text-cyan-400/50'}`} />
                  
                  {/* Desktop text: always visible */}
                  <span className="relative z-10 whitespace-nowrap text-[9px] xl:text-[10px] font-black uppercase tracking-[0.25em] hidden sm:block ml-2">
                    {tab.label}
                  </span>

                  {/* Mobile text: expands with pure CSS */}
                  <span
                    className={`relative z-10 whitespace-nowrap sm:hidden text-[9px] font-black uppercase tracking-[0.25em] overflow-hidden transition-all duration-500 ease-out
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
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-3.5 xl:gap-4 flex-1 min-h-0 pt-2 px-1 pb-4">
              
              {/* Featured Project */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                className="md:col-span-2 lg:col-span-2 min-h-[190px] h-auto sm:h-[190px] xl:h-[220px]"
                onClick={() => { setSelectedProject(projects[0]); setIsProjectModalOpen(true); }}>
                <article className="h-full w-full relative group cursor-pointer overflow-hidden rounded-2xl border border-white/5 hover:border-cyan-500/40 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.6),0_4px_20px_rgba(34,211,238,0.12)] hover:-translate-y-1 transition-all duration-300 ease-out">
                  <div className="absolute inset-0 pointer-events-none">
                    <ImageWithLoader src={projects[0].image} alt={projects[0].title}
                      className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/70 to-transparent" />
                  </div>
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-left z-10">
                    <span className="px-2 py-0.5 w-fit bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[8px] xl:text-[9px] font-mono uppercase tracking-[0.2em] rounded mb-1.5">
                      Featured • {projects[0].category}
                    </span>
                    <h3 className="text-lg sm:text-xl xl:text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tighter leading-tight mb-1">
                      {projects[0].title}
                    </h3>
                    <p className="text-[11px] xl:text-xs text-slate-400 line-clamp-2 max-w-md">{projects[0].description}</p>
                  </div>
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-slate-400 group-hover:text-cyan-400 border border-white/10 flex items-center justify-center transition-colors">
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </div>
                  </div>
                </article>
              </motion.div>

              {/* Stats Widgets */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                className="min-h-[210px] h-auto sm:h-[190px] xl:h-[220px]">
                <WakaTimeWidget />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                className="min-h-[210px] h-auto sm:h-[190px] xl:h-[220px]">
                <GithubWidget />
              </motion.div>

              {/* Recent Certificate */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.4 }}
                className="md:col-span-1 lg:col-span-2 h-[105px] sm:h-[115px] xl:h-[120px]"
              >
                <article
                  className="h-full bg-[#0a0a12] border border-white/5 rounded-2xl p-3.5 flex items-center gap-3.5 group cursor-pointer hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_4px_15px_rgba(34,211,238,0.12)] transition-all duration-300 ease-out overflow-hidden relative"
                  onClick={() => { setSelectedCertificate(certificates[0]); setIsModalOpen(true); }}
                >
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <ImageWithLoader src={certificates[0].certificateImage} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12] via-[#0a0a12]/80 to-transparent" />
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-black/80 backdrop-blur-md border border-white/10 p-2 shrink-0 relative z-10">
                     <ImageWithLoader src={certificates[0].image} alt={`Issuer logo for ${certificates[0].issuer}`} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 z-10">
                    <span className="text-[9px] xl:text-[10px] text-cyan-400 font-mono uppercase tracking-widest mb-0.5 block">Recent Certification</span>
                    <h3 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-cyan-400 transition-colors">{certificates[0].title}</h3>
                    <p className="text-[11px] text-slate-400 truncate">{certificates[0].issuer} • {certificates[0].date}</p>
                  </div>
                  <ArrowUpRight size={15} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 mr-1.5 z-10" />
                </article>
              </motion.div>

              {/* Recent Gallery Item */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                className="md:col-span-2 lg:col-span-2 h-[105px] sm:h-[115px] xl:h-[120px]">
                <article
                  className="h-full bg-[#0a0a12] border border-white/5 hover:border-pink-500/40 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_4px_15px_rgba(236,72,153,0.12)] transition-all duration-300 ease-out rounded-2xl overflow-hidden group cursor-pointer relative"
                  onClick={() => { setSelectedGallery(galleryItems[0]); setIsGalleryModalOpen(true); }}>
                  <div className="absolute inset-0 opacity-25 pointer-events-none">
                    <ImageWithLoader src={galleryItems[0].image} alt={galleryItems[0].title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12] via-[#0a0a12]/80 to-transparent" />
                  </div>
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-center z-10">
                     <span className="text-[9px] xl:text-[10px] text-pink-400 font-mono uppercase tracking-widest mb-0.5 block">Latest from Gallery</span>
                     <h3 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-pink-400 transition-colors">{galleryItems[0].title}</h3>
                     <p className="text-[11px] text-slate-400 truncate mt-0.5 flex items-center gap-1.5"><MapPin size={10} /> {galleryItems[0].location}</p>
                  </div>
                </article>
              </motion.div>

            </motion.div>
          )}

          {filter === 'projects' && (
            <motion.div key="projects" role="tabpanel" id="library-panel-projects"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar pt-2.5 px-1.5 pb-6">
              {projects.map((project, index) => (
                <motion.div key={project.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                  onClick={() => { setSelectedProject(project); setIsProjectModalOpen(true); }}>
                  <article className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0a0a12] border border-white/5 hover:border-cyan-500/40 hover:bg-[#0c0c16] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-5px_rgba(34,211,238,0.15)] transition-all duration-300 cursor-pointer overflow-hidden">
                    {/* Hover Image Reveal Background (Static, Smooth Fade) */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" style={{ WebkitMaskImage: 'linear-gradient(to left, black, transparent)' }}>
                      <ImageWithLoader src={project.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0 relative z-10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                      <div className="w-12 shrink-0 hidden sm:block">
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 uppercase tracking-widest transition-colors font-bold">0{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors uppercase tracking-tight truncate">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[8px] font-mono uppercase tracking-widest rounded border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                            {project.category}
                          </span>
                          {project.metrics && project.metrics[0] && (
                            <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-300 text-[8px] font-mono uppercase tracking-wider rounded border border-emerald-500/20">
                              {project.metrics[0].label}: {project.metrics[0].value}
                            </span>
                          )}
                          <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors truncate hidden md:inline-block max-w-xs">
                            {project.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 flex-wrap sm:flex-nowrap">
                        {project.githubUrl && (
                          <span className="p-1 rounded-md bg-white/5 border border-white/10 text-slate-400 group-hover:text-white" title="Repository available">
                            <Github size={11} />
                          </span>
                        )}
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[9px] font-mono text-slate-400 group-hover:text-slate-300 uppercase tracking-widest px-2 py-1 bg-white/5 rounded-lg border border-white/5 group-hover:border-cyan-500/20 transition-colors">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="ml-4 shrink-0 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-cyan-500/20 border border-transparent group-hover:border-cyan-500/40 flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight size={14} className="text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-y-auto custom-scrollbar pt-3 px-1.5 pb-6">
              {certificates.map((cert, index) => (
                <motion.div 
                  key={cert.id} 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.05 }}
                  onClick={() => { setSelectedCertificate(cert); setIsModalOpen(true); }}
                  className="h-full"
                >
                  <article className="group cursor-pointer rounded-2xl bg-[#090912] border border-white/5 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.6),0_4px_20px_rgba(34,211,238,0.12)] transition-all duration-300 ease-out overflow-hidden flex flex-col h-full">
                    {/* Static Certificate Document Preview */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/60">
                      <ImageWithLoader
                        src={cert.certificateImage}
                        alt={`Certificate preview of ${cert.title}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090912] via-transparent to-transparent opacity-70" />
                      
                      {/* Issuer logo badge */}
                      <div className="absolute top-3 left-3 w-9 h-9 rounded-xl overflow-hidden bg-black/80 backdrop-blur-md border border-white/10 p-1.5 shrink-0 z-10">
                        <ImageWithLoader src={cert.image} alt={cert.issuer} className="w-full h-full object-contain" />
                      </div>

                      <div className="absolute top-3 right-3 z-10">
                        <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center justify-center">
                          <ArrowUpRight size={13} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-snug uppercase tracking-tight mb-3">
                        {cert.title}
                      </h3>
                      
                      <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                         <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest truncate max-w-[140px]">
                            {cert.issuer}
                         </span>
                         <span className="text-[9px] font-mono text-cyan-400 px-2 py-0.5 bg-cyan-500/10 rounded-md border border-cyan-500/20">
                            {cert.date}
                         </span>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filter === 'gallery' && (
            <motion.div key="gallery" role="tabpanel" id="library-panel-gallery"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-y-auto custom-scrollbar pt-3 px-1.5 pb-6">
              {galleryItems.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                  onClick={() => { setSelectedGallery(item); setIsGalleryModalOpen(true); }}
                  className="h-full">
                  <article className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/5 hover:border-pink-500/40 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.6),0_4px_20px_rgba(236,72,153,0.12)] transition-all duration-300 ease-out bg-[#0a0a12]">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <ImageWithLoader src={item.image} alt={item.title}
                        className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/40 to-transparent opacity-85" />
                      
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-1 bg-black/70 backdrop-blur-md border border-pink-500/30 text-pink-300 text-[9px] font-mono uppercase tracking-[0.2em] rounded-lg">
                          {item.category}
                        </span>
                      </div>
                      
                      <div className="absolute top-3 right-3 z-10">
                        <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-slate-400 group-hover:text-pink-400 transition-colors flex items-center justify-center">
                          <ArrowUpRight size={13} strokeWidth={2.5} />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <h3 className="text-sm font-bold text-white leading-snug mb-1.5 group-hover:text-pink-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3 text-[9px] text-slate-400 font-mono uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Calendar size={10} className="text-pink-400" /> {item.date}</span>
                          <span className="flex items-center gap-1 truncate"><MapPin size={10} className="text-pink-400" /> {item.location}</span>
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

export default React.memo(Projects);