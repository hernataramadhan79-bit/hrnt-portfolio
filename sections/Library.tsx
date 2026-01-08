import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { projects } from '../constants';

const Library: React.FC = () => {
  return (
    <section id="library" className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter">Library <span className="text-white/10">&</span> <br/>Works</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard className="h-[500px] w-full relative group cursor-pointer">
                {/* 3D Context Container */}
                <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
                    
                    {/* Layer 0: BASE CARD (Background & Image) - Clipped */}
                    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-[#050508] border border-white/10 shadow-2xl" style={{ transform: "translateZ(0px)" }}>
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40 grayscale group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent opacity-90" />
                    </div>

                    {/* Layer 1: Glass Frame Border */}
                    <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none transition-all duration-500 group-hover:border-white/10" style={{ transform: "translateZ(20px)" }} />

                    {/* Layer 2: Category Tag */}
                    <div className="absolute top-10 left-10" style={{ transform: "translateZ(30px)" }}>
                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-md shadow-lg group-hover:bg-cyan-500/10 transition-colors duration-300">
                            {project.category}
                        </span>
                    </div>

                    {/* Layer 3: Tech Lines (Subtle) */}
                    <div className="absolute bottom-10 right-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: "translateZ(25px)" }} />
                    <div className="absolute bottom-10 right-10 h-24 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" style={{ transform: "translateZ(25px)" }} />

                    {/* Layer 4: Main Content (Pop out) */}
                    <div className="absolute bottom-12 left-10 right-12 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                        <h3 className="text-4xl font-black text-white mb-6 leading-tight drop-shadow-xl group-hover:text-cyan-50 transition-colors duration-300">
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

                    {/* Layer 5: Action Button */}
                    <div className="absolute top-8 right-8" style={{ transform: "translateZ(60px)" }}>
                        <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center scale-75 opacity-0 -rotate-45 group-hover:rotate-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out shadow-lg">
                            <ArrowUpRight size={24} strokeWidth={2.5} />
                        </div>
                    </div>

                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;