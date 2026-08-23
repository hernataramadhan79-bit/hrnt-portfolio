'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { innerSkills, outerSkills, detailedSkills } from '../constants';
import { DetailedSkill } from '../types';

const proficiencyBadgeStyles: Record<string, { bg: string; text: string; border: string }> = {
  Expert: { bg: 'bg-cyan-500/15', text: 'text-cyan-300', border: 'border-cyan-500/30' },
  Advanced: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/30' },
  Proficient: { bg: 'bg-slate-500/15', text: 'text-slate-200', border: 'border-slate-500/30' },
};

const SkillPills = ({ type, items, color }: { type: string; items: DetailedSkill[]; color: 'cyan' | 'purple' }) => {
  const isCyan = color === 'cyan';
  const borderHoverClass = isCyan 
    ? 'hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.22)]' 
    : 'hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.22)]';

  return (
    <div className="mb-4 lg:mb-5 xl:mb-6">
      <div className="flex items-center gap-2.5 mb-3 lg:mb-3.5">
        <div className={`w-1.5 h-1.5 rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-purple-400'} animate-pulse shadow-[0_0_10px_currentColor]`} />
        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">{type}</h3>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {items.map((skill, i) => {
          const badge = proficiencyBadgeStyles[skill.proficiency] || proficiencyBadgeStyles.Proficient;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -3, scale: 1.04 }}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 ${borderHoverClass} hover:bg-white/[0.08] transition-all duration-300 cursor-default`}
            >
              <skill.icon size={14} className={`${skill.color} group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300 drop-shadow-md`} />
              <span className="text-[11px] xl:text-xs font-bold text-slate-200 group-hover:text-white transition-colors tracking-wide uppercase">
                {skill.name}
              </span>
              <span className={`text-[9px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badge.bg} ${badge.text} ${badge.border} group-hover:scale-105 transition-transform`}>
                {skill.proficiency}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * OrbitLayer — CSS animation instead of framer-motion rotate.
 */
const OrbitLayer = ({ skills, radius, duration, direction, color }: any) => {
  const animStyle: React.CSSProperties = {
    width: radius * 2,
    height: radius * 2,
    animationDuration: `${duration}s`,
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Static orbit track border */}
      <div
        className="absolute rounded-full border border-white/5"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      {/* Rotating dashed track — CSS only, continuous orbit */}
      <div
        className={`absolute rounded-full border border-dashed opacity-40 ${direction === 1 ? 'orbit-spin-cw' : 'orbit-spin-ccw'}`}
        style={{ ...animStyle, borderColor: color }}
      />

      {/* Icon container — CSS continuous orbit spin */}
      <div
        className={`absolute flex items-center justify-center ${direction === 1 ? 'orbit-spin-cw' : 'orbit-spin-ccw'}`}
        style={{ width: radius * 2, height: radius * 2, animationDuration: `${duration}s` }}
      >
        {skills.map((skill: any, index: number) => {
          const angle = (index / skills.length) * 2 * Math.PI;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={skill.name}
              className="absolute pointer-events-auto"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {/* Counter-rotate the icon so it stays upright — continuous rotation */}
              <div
                className={`group relative ${direction === 1 ? 'orbit-spin-ccw' : 'orbit-spin-cw'}`}
                style={{ animationDuration: `${duration}s` }}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                  <div className="px-2.5 py-1 rounded-lg bg-black/90 border border-white/10 shadow-2xl">
                    <span className="text-[8px] xl:text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-black/90 border-r border-b border-white/10 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>

                <div className="absolute inset-0 rounded-full blur-md opacity-25 group-hover:opacity-80 transition-opacity" style={{ backgroundColor: color }} />
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-full bg-[#07070d]/90 border border-white/15 flex items-center justify-center hover:border-white/50 hover:scale-115 active:scale-95 transition-all shadow-2xl cursor-pointer">
                  <img src={skill.icon} alt={skill.name} width={22} height={22} className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 xl:w-5.5 xl:h-5.5 object-contain" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [winHeight, setWinHeight] = useState(1080);

  useEffect(() => {
    // Debounced resize — only check breakpoints, no setState on every resize
    const checkBreakpoint = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setWinHeight(window.innerHeight);
    };
    checkBreakpoint();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkBreakpoint, 200); // debounce 200ms
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const isCompactHeight = winHeight < 780;
  const isUltraCompact = winHeight < 680;
  const innerRadius = isMobile ? 110 : isTablet ? 125 : isUltraCompact ? 120 : isCompactHeight ? 135 : 155;
  const outerRadius = isMobile ? 175 : isTablet ? 195 : isUltraCompact ? 185 : isCompactHeight ? 210 : 250;

  return (
    <section ref={sectionRef} id="skills" className="relative z-10 min-h-[calc(100dvh-4.5rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden py-6 lg:py-2 xl:py-6 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-20 flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-14 items-center">

        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-4 lg:mb-6 xl:mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2.5 mb-2.5">
              <div className="w-6 h-[2px] bg-cyan-500/50" />
              <span className="text-[10px] xl:text-[11px] font-mono text-cyan-400 uppercase tracking-[0.3em]">Core Capabilities & Architecture</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95]">
              TECHNICAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">FOUNDATIONS</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-3 lg:mt-4 leading-relaxed max-w-md font-normal">
              A comprehensive technical stack engineered for high performance, modular architecture, and resilient production systems across the entire product lifecycle.
            </p>
          </div>

          <div>
            <SkillPills type="Frontend / UI" items={detailedSkills.frontend} color="cyan" />
            <SkillPills type="Backend / Systems" items={detailedSkills.backend} color="purple" />
          </div>
        </div>

        {/* RIGHT COLUMN: Orbit */}
        <div className="w-full lg:w-[55%] flex items-center justify-center order-1 lg:order-2 py-4 lg:py-0">
          <div className="relative w-full aspect-square max-w-[85vw] sm:max-w-[420px] lg:max-w-[500px] xl:max-w-[580px] flex items-center justify-center">
            {/* Central Core */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <div className="w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] xl:w-[220px] xl:h-[220px] bg-cyan-500/10 rounded-full blur-[50px]" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-36 xl:h-36 rounded-full p-1 bg-gradient-to-br from-cyan-400/80 via-white/10 to-purple-500/80 shadow-[0_0_60px_rgba(34,211,238,0.2)] pointer-events-auto group cursor-crosshair">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#030305] relative bg-black">
                  <img src="/profile2.jpg" alt="Hernata Ramadhan Core Skill Matrix Visualizer" width={160} height={160} className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-purple-500/30 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                </div>
                {/* CSS-only core rings */}
                <div className="absolute -inset-2.5 lg:-inset-3 border border-cyan-500/40 rounded-full animate-[spin_8s_linear_infinite]" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)' }} />
                <div className="absolute -inset-5 lg:-inset-6 border border-purple-500/20 rounded-full animate-[spin_12s_linear_infinite_reverse] border-dashed" />
              </div>
            </div>

            {/* Orbit Tracks & Icons — CSS continuous animated */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <OrbitLayer skills={innerSkills} radius={innerRadius} duration={40} direction={1} color="rgba(34,211,238,0.8)" />
              <OrbitLayer skills={outerSkills} radius={outerRadius} duration={60} direction={-1} color="rgba(192,132,252,0.8)" />
            </div>

            {/* Radar sweep — CSS only, single element */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 mix-blend-screen orbit-spin-cw" style={{ animationDuration: '8s' }}>
              <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <div className="w-[1px] h-[120%] bg-gradient-to-b from-transparent via-purple-400/50 to-transparent absolute" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default React.memo(Skills);
