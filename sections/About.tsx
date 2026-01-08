import React from 'react';
import TiltCard from '../components/TiltCard';
import { MapPin, ArrowRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="relative z-10 py-12 md:py-20 px-4 sm:px-6 overflow-visible">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* --- LEFT COLUMN: 3D Profile Card --- */}
        <div className="lg:col-span-5 perspective-1000">
          <TiltCard className="aspect-[4/5] w-full relative group">
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* Layer 0: BASE */}
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden bg-[#050508] border border-white/10 shadow-2xl" style={{ transform: "translateZ(0px)" }}>
                <img
                     src="/profile.jpg"
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     alt="Profile"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
              </div>

              {/* Layer 1: Floating Frame */}
              <div
                className="absolute inset-6 rounded-[2.5rem] border border-white/10 bg-white/[0.01] transition-all duration-500 group-hover:inset-5 group-hover:border-cyan-500/20"
                style={{ transform: "translateZ(20px)" }}
              />

              {/* Layer 2: Accents */}
              <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/30 rounded-tr-3xl pointer-events-none" style={{ transform: "translateZ(30px)" }} />
              <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-white/30 rounded-bl-3xl pointer-events-none" style={{ transform: "translateZ(30px)" }} />

              {/* Layer 3: Status & Content */}
              <div className="absolute top-10 right-10" style={{ transform: "translateZ(40px)" }}>
                 <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-xl">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                 </div>
              </div>

              <div className="absolute bottom-12 left-10 right-10 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] text-slate-300 font-mono mb-4 w-fit">
                   <MapPin size={12} className="text-cyan-400" />
                   <span>Madiun, ID</span>
                </div>
                <h3 className="text-4xl font-black text-white mb-2 leading-[0.9] drop-shadow-2xl">Hernata<br/>Ramadhan</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-transparent mt-4 rounded-full group-hover:w-24 transition-all duration-500"></div>
              </div>
              
              {/* Layer 4: Vertical Text (Subtle) */}
              <div 
                className="absolute -right-8 top-20 rotate-90 origin-top-left opacity-0 group-hover:opacity-40 transition-opacity duration-500" 
                style={{ transform: "translateZ(40px)" }}
              >
                 <span className="text-5xl font-black text-white/10 tracking-tighter">HRNT.</span>
              </div>
            </div>
          </TiltCard>
          
          <div className="absolute -z-10 inset-4 bg-cyan-500/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
        </div>
        
        {/* --- RIGHT COLUMN --- */}
        <div className="lg:col-span-7 space-y-10">
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">Crafting digital <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-700">masterpieces.</span></h2>
           </motion.div>
           
           <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl"
           >
             As a Fullstack Developer, this motto guides my workflow. I see software development as a form of digital architecture—where the "shapes" of our code and interfaces define the user's journey. I am dedicated to writing clean, scalable code and designing intuitive interfaces that communicate value through every interaction.
           </motion.p>
           
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
           >
              {[{ label: 'Experience', val: '3+ Years' }, { label: 'Projects Completed', val: '40+' }].map((stat, i) => (
                <div key={stat.label} className="group p-6 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-md hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300">
                   <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">{stat.val}</div>
                      <ArrowRight className="text-white/20 group-hover:text-cyan-400 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                   </div>
                   <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
           </motion.div>

           {/* Education Journey */}
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
           >
             <h3 className="text-xl font-bold text-white mb-4">Education Journey</h3>
             {[
               { institution: 'Vocational High School SMKN 1 Wonoasri', period: '2022-2025', type: 'High School' },
               { institution: 'University of PGRI Madiun', period: '2025-Present', type: 'University' }
             ].map((edu, index) => (
               <motion.div
                 key={edu.institution}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.7 + index * 0.1 }}
                 className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-300 cursor-pointer"
                 whileHover={{ scale: 1.02 }}
               >
                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                   <GraduationCap size={18} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="text-sm font-medium text-white group-hover:text-cyan-50 transition-colors">{edu.institution}</div>
                   <div className="text-xs text-slate-400 font-mono uppercase tracking-wide">{edu.period}</div>
                 </div>
                 <div className="flex-shrink-0 text-xs text-slate-500 font-mono uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                   {edu.type}
                 </div>
               </motion.div>
             ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;