'use client';

import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Layout, Server } from 'lucide-react';
import { innerSkills, outerSkills, detailedSkills } from '../constants';

const CategoryPanel = ({ type, items, color }: { type: string, items: any[], color: 'cyan' | 'purple' }) => {
  const isCyan = color === 'cyan';
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 lg:gap-4">
        <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-purple-400'} animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]`} />
        <h3 className="text-lg lg:text-2xl font-black text-white uppercase tracking-[0.3em] lg:tracking-[0.4em]">{type}</h3>
      </div>
      <div className="space-y-3">
        {items.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
            className="group relative p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${isCyan ? 'bg-cyan-500' : 'bg-purple-500'} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <skill.icon size={14} className={`${skill.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div>
                <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors leading-none">{skill.name}</p>
                <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-mono mt-1">{skill.tags[0]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const OrbitLayer = ({ skills, radius, duration, direction, color, xMove, yMove }: any) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center transition-transform duration-1000"
      style={{ x: xMove, y: yMove }}
    >
      <div className="absolute rounded-full border border-white/5" style={{ width: radius * 2, height: radius * 2 }} />
      <motion.div
        className="absolute inset-0 flex items-center justify-center transform-gpu"
        animate={{ rotate: 360 * direction }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {skills.map((skill: any, index: number) => {
          const angle = (index / skills.length) * 2 * Math.PI;
          return (
            <motion.div
              key={skill.name}
              className="absolute pointer-events-auto"
              style={{ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }}
            >
              <motion.div
                animate={{ rotate: -360 * direction }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.25 }}
                className="group relative"
              >
                {/* Tech Name Label - Appears on Hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-12 transition-all duration-300 pointer-events-none z-50">
                  <div className="px-2 py-0.5 lg:px-3 lg:py-1 rounded-lg bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <span className="text-[8px] lg:text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-black/80 border-r border-b border-white/10 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>

                <div className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: color }} />
                <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-[#050508]/60 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-white/30 transition-all cursor-pointer">
                  <img src={skill.icon} alt={skill.name} className="w-4 h-4 lg:w-6 lg:h-6 object-contain" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;

  const innerRadius = isMobile ? 115 : isTablet ? 120 : 150;
  const outerRadius = isMobile ? 190 : isTablet ? 200 : 250;
  const hubScale = isMobile ? 0.9 : isTablet ? 0.8 : 1;

  const innerX = useTransform(springX, (x) => x * 0.02);
  const innerY = useTransform(springY, (y) => y * 0.02);
  const outerX = useTransform(springX, (x) => x * 0.04);
  const outerY = useTransform(springY, (y) => y * 0.04);
  const centerPhotoX = useTransform(springX, (x) => x * 0.01);
  const centerPhotoY = useTransform(springY, (y) => y * 0.01);

  return (
    <section id="skills" className="relative z-10 lg:h-screen flex flex-col justify-center items-center overflow-hidden py-12 lg:py-0">
      {/* Background HUD Ambience - Now transparent to let global background shine */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="w-full max-w-[1600px] px-6 lg:px-16 relative z-20 flex flex-col h-full lg:h-[90vh]">

        {/* TOP HEADER: TACTICAL HUD STYLE */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 lg:mb-16 border-b border-white/5 pb-8">
          <div className="text-left">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="w-12 h-[1px] bg-cyan-500/50" />
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.5em]">System.Core.Interface</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8]">
              TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">MATRIX</span>
            </h2>
          </div>
          <div className="hidden md:block text-right font-mono text-[9px] text-slate-500 uppercase tracking-widest space-y-1">
            <p>System_Status: <span className="text-green-500">Online</span></p>
            <p>Tech_Stack_Module: v2.0.26</p>
          </div>
        </div>

        {/* MAIN DASHBOARD CONTENT */}
        <div className="relative flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-0">

          {/* LEFT: FRONTEND HUD PANEL */}
          <div className="w-full lg:col-span-3 lg:h-full flex flex-col justify-center order-2 lg:order-1">
            <CategoryPanel type="frontend" items={detailedSkills.frontend} color="cyan" />
          </div>

          {/* CENTER: MASSIVE ORBIT HUB */}
          <div className="w-full lg:col-span-6 lg:h-full flex items-center justify-center relative order-1 lg:order-2 py-12 lg:py-0 scale-[0.85] sm:scale-100 transition-transform">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: hubScale, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-square max-w-[85vw] sm:max-w-[450px] lg:max-w-[550px] flex items-center justify-center"
            >
              {/* Central Core Pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] bg-cyan-500/5 rounded-full blur-[60px] lg:blur-[100px] animate-pulse" />
                <motion.div
                  style={{ x: centerPhotoX, y: centerPhotoY }}
                  className="relative z-30 w-28 h-28 sm:w-36 sm:h-36 lg:w-48 lg:h-48 aspect-square rounded-full p-1.5 lg:p-2 bg-gradient-to-br from-cyan-500/20 via-white/5 to-purple-500/20 backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_rgba(34,211,238,0.1)]"
                >
                  <div className="w-full h-full rounded-full overflow-hidden border border-white/10 relative group cursor-crosshair aspect-square">
                    <img src="/profile2.png" alt="Core" className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors rounded-full" />
                  </div>
                  {/* Animated HUD ring */}
                  <div className="absolute -inset-4 lg:-inset-6 border border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite] border-dashed" />
                  <div className="absolute -inset-8 lg:-inset-10 border border-purple-500/10 rounded-full animate-[spin_25s_linear_infinite_reverse] border-dashed" />
                </motion.div>
              </div>

              {/* Orbit Layers */}
              <div className="absolute inset-0 pointer-events-none">
                <OrbitLayer skills={innerSkills} radius={innerRadius} duration={60} direction={1} xMove={innerX} yMove={innerY} color="rgba(34,211,238,0.4)" />
                <OrbitLayer skills={outerSkills} radius={outerRadius} duration={90} direction={-1} xMove={outerX} yMove={outerY} color="rgba(192,132,252,0.4)" />
              </div>
            </motion.div>
          </div>

          {/* RIGHT: BACKEND HUD PANEL */}
          <div className="w-full lg:col-span-3 lg:h-full flex flex-col justify-center order-3">
            <CategoryPanel type="backend" items={detailedSkills.backend} color="purple" />
          </div>

        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="mt-8 py-6 border-t border-white/5 flex items-center justify-between opacity-50">
          <div className="flex gap-12">
            <div className="space-y-1">
              <p className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Core.Processing</p>
              <div className="flex gap-1">
                {[...Array(12)].map((_, i) => <div key={i} className={`w-3 h-1 rounded-full ${i < 8 ? 'bg-cyan-500/40' : 'bg-white/5'}`} />)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.5em]">HRNT_DASHBOARD_v2.0</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Skills);
