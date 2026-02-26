'use client';

import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Layout, Server } from 'lucide-react';
import { innerSkills, outerSkills, detailedSkills } from '../constants';

const SkillCard = React.memo(({ type }: { type: 'frontend' | 'backend' }) => {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const isFrontend = type === 'frontend';
  const Icon = isFrontend ? Layout : Server;
  const skills = detailedSkills[type];

  const spotlight = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.03), transparent 80%)`;
  const borderLight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${isFrontend ? 'rgba(34,211,238,0.3)' : 'rgba(192,132,252,0.3)'}, transparent 80%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-[2rem] bg-[#030305] border border-white/5 transition-all duration-700 overflow-hidden"
    >
      {/* Dynamic Border Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{ background: borderLight }}
      />

      <div className="relative h-full bg-[#050508]/80 backdrop-blur-xl rounded-[1.95rem] overflow-hidden m-[1px] p-8 md:p-10 flex flex-col">
        {/* Spotlighting Background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
          style={{ background: spotlight }}
        />

        {/* Cyber Header */}
        <div className="flex items-center justify-between mb-12 relative z-20">
          <div className="flex items-center gap-6">
            <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-700 ${isFrontend ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/50' : 'bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:border-purple-400/50'}`}>
              <Icon size={32} />
              <div className={`absolute -inset-1 blur-lg opacity-0 group-hover:opacity-20 transition-opacity ${isFrontend ? 'bg-cyan-500' : 'bg-purple-500'}`} />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">{type}</h3>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">System.active()</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest leading-none mb-1">Module ID</div>
            <div className="text-xs font-black text-white/20 tracking-tighter">0X-{type === 'frontend' ? 'FE' : 'BE'}-2026</div>
          </div>
        </div>

        {/* Skills Table-like List */}
        <div className="space-y-4 relative z-20 flex-1">
          {skills.map((skill: any, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              className="group/item relative rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 p-4 overflow-hidden"
            >
              {/* Row Interactive Line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${activeIdx === i ? (isFrontend ? 'bg-cyan-400 h-full' : 'bg-purple-400 h-full') : 'bg-transparent h-0'}`} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center transition-all duration-500 ${activeIdx === i ? 'scale-110 -rotate-6 border-white/20 shadow-lg' : ''}`}>
                    <skill.icon size={18} className={skill.color} />
                  </div>
                  <div>
                    <span className={`block font-bold transition-colors duration-300 ${activeIdx === i ? 'text-white' : 'text-slate-400'}`}>
                      {skill.name}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {skill.tags.map((tag: string) => (
                        <span key={tag} className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 transform group-hover/item:translate-x-1 transition-transform">
                  <div className={`w-1 h-1 rounded-full ${isFrontend ? 'bg-cyan-500' : 'bg-purple-500'} opacity-0 group-hover/item:opacity-100 transition-opacity`} />
                  <div className={`w-1 h-1 rounded-full ${isFrontend ? 'bg-cyan-500' : 'bg-purple-500'} opacity-0 group-hover/item:opacity-40 transition-opacity delay-75`} />
                  <div className={`w-1 h-1 rounded-full ${isFrontend ? 'bg-cyan-500' : 'bg-purple-500'} opacity-0 group-hover/item:opacity-20 transition-opacity delay-150`} />
                </div>
              </div>

              {/* Expansion Detail */}
              <div className={`grid transition-all duration-500 ease-in-out ${activeIdx === i ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stat Bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000">
          <div className="flex gap-4">
            <div className="h-1 w-8 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full ${isFrontend ? 'bg-cyan-500' : 'bg-purple-500'} w-[60%]`} />
            </div>
            <div className="h-1 w-8 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full ${isFrontend ? 'bg-cyan-500' : 'bg-purple-500'} w-[80%]`} />
            </div>
            <div className="h-1 w-8 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full ${isFrontend ? 'bg-cyan-500' : 'bg-purple-500'} w-[40%]`} />
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.4em]">Optimized Core</span>
        </div>
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

const Skills: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const innerX = useTransform(springX, (x) => x * 0.02);
  const innerY = useTransform(springY, (y) => y * 0.02);
  const outerX = useTransform(springX, (x) => x * 0.04);
  const outerY = useTransform(springY, (y) => y * 0.04);
  const centerPhotoX = useTransform(springX, (x) => x * 0.01);
  const centerPhotoY = useTransform(springY, (y) => y * 0.01);

  return (
    <section id="skills" className="relative z-10 py-12 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="text-center mb-16 relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Technical Stack
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Architecture</span></h2>
            <p className="text-slate-400 text-lg font-light max-w-xl mx-auto">Core technologies and frameworks powering my dynamic digital solutions.</p>
          </motion.div>
        </div>

        <div className="relative h-[280px] sm:h-[360px] md:h-[460px] lg:h-[560px] w-full flex items-center justify-center mb-12 md:mb-16 overflow-visible">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center scale-50 sm:scale-75 md:scale-100" style={{ willChange: 'transform' }}
          >
            <motion.div style={{ x: centerPhotoX, y: centerPhotoY }} className="absolute z-20 w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 bg-black/40 backdrop-blur-md p-2 md:p-3 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
              <div className="w-full h-full rounded-full overflow-hidden relative border border-white/10">
                <img src="/profile2.png" alt="Core" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ x: innerX, y: innerY }}
              initial={{ rotate: -90, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="absolute w-[320px] h-[320px] border border-white/5 rounded-full border-dashed" />
              <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}>
                {innerSkills.map((skill, index) => {
                  const angle = (index / innerSkills.length) * 2 * Math.PI;
                  const radius = 160;
                  return (
                    <motion.div key={skill.name} className="absolute" style={{ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }}>
                      <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}>
                        <div className="relative group pointer-events-auto">
                          <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity" style={{ backgroundColor: skill.color }} />
                          <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                            <img src={skill.icon} alt={skill.name} className="w-7 h-7 object-contain" />
                          </div>
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                            <div className="px-3 py-1.5 bg-white text-black text-[10px] font-bold rounded-lg shadow-xl whitespace-nowrap uppercase tracking-widest">
                              {skill.name}
                            </div>
                            <div className="w-2 h-2 bg-white rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ x: outerX, y: outerY }}
              initial={{ rotate: 90, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
            >
              <div className="absolute w-[560px] h-[560px] border border-white/5 rounded-full" />
              <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                {outerSkills.map((skill, index) => {
                  const angle = (index / outerSkills.length) * 2 * Math.PI;
                  const radius = 280;
                  return (
                    <motion.div key={skill.name} className="absolute" style={{ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                        <div className="relative group pointer-events-auto">
                          <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity" style={{ backgroundColor: skill.color }} />
                          <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                            <img src={skill.icon} alt={skill.name} className="w-7 h-7 object-contain" />
                          </div>
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                            <div className="px-3 py-1.5 bg-white text-black text-[10px] font-bold rounded-lg shadow-xl whitespace-nowrap uppercase tracking-widest">
                              {skill.name}
                            </div>
                            <div className="w-2 h-2 bg-white rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkillCard type="frontend" />
          <SkillCard type="backend" />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Skills);