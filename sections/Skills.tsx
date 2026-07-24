'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { innerSkills, outerSkills, detailedSkills } from '../constants';

const SkillPills = ({ type, items, color }: { type: string, items: any[], color: 'cyan' | 'purple' }) => {
  const isCyan = color === 'cyan';
  return (
    <div className="mb-8 lg:mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-1.5 h-1.5 rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-purple-400'} animate-pulse shadow-[0_0_10px_currentColor]`} />
        <h3 className="text-xs lg:text-sm font-black text-white uppercase tracking-[0.3em] opacity-80">{type}</h3>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      <div className="flex flex-wrap gap-2.5">
        {items.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2, scale: 1.02 }}
            className={`group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.03] border border-white/5 hover:border-${isCyan ? 'cyan' : 'purple'}-500/30 hover:bg-white/[0.08] transition-all duration-300 cursor-default`}
          >
            <skill.icon size={14} className={`${skill.color} opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-md`} />
            <span className="text-[11px] font-bold text-white/70 group-hover:text-white transition-colors tracking-widest uppercase">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const OrbitLayer = ({ skills, radius, duration, direction, color, isHovered }: any) => {
  const dynamicDuration = isHovered ? duration * 3 : duration;
  
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center">
      {/* Visible Thin Orbit Track */}
      <div 
        className="absolute rounded-full border border-white/5" 
        style={{ width: radius * 2, height: radius * 2 }} 
      />
      {/* Rotating Dashed Track */}
      <motion.div 
        animate={{ rotate: 360 * direction }}
        transition={{ duration: duration * 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border border-dashed border-white/10 opacity-40"
        style={{ width: radius * 2, height: radius * 2, borderColor: color }} 
      />
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center transform-gpu"
        animate={{ rotate: 360 * direction }}
        transition={{ duration: dynamicDuration, repeat: Infinity, ease: "linear" }}
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
                transition={{ duration: dynamicDuration, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.25, zIndex: 50 }}
                className="group relative"
              >
                {/* Tech Name Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                  <div className="px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-black/90 border-r border-b border-white/10 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>

                <div className="absolute inset-0 rounded-full blur-md opacity-20 group-hover:opacity-60 transition-opacity" style={{ backgroundColor: color }} />
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#050508]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-white/30 transition-all shadow-2xl cursor-pointer">
                  <img src={skill.icon} alt={skill.name} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
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

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isOrbitHovered, setIsOrbitHovered] = useState(false);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
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

  const innerRadius = isMobile ? 115 : isTablet ? 130 : 160;
  const outerRadius = isMobile ? 180 : isTablet ? 210 : 260;
  
  const orbitX = useTransform(springX, (x) => x * 0.015);
  const orbitY = useTransform(springY, (y) => y * 0.015);

  return (
    <section id="skills" className="relative z-10 min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden py-12 lg:py-16">
      {/* Background HUD Ambience - Now transparent to let global background shine */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-20 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Typography & Skill Pills (45% width) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center order-2 lg:order-1">
          {/* Header Area */}
          <div className="mb-10 lg:mb-14">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-cyan-500/50" />
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.4em]">Core.Competencies</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              TECH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">MATRIX</span>
            </h2>
            <p className="text-slate-400 text-sm mt-6 leading-relaxed max-w-md font-light">
              A meticulously curated arsenal of modern technologies. Engineered for high performance, scalability, and seamless user experiences across the stack.
            </p>
          </div>

          {/* Skill Pills */}
          <div>
            <SkillPills type="Frontend / UI" items={detailedSkills.frontend} color="cyan" />
            <SkillPills type="Backend / Systems" items={detailedSkills.backend} color="purple" />
          </div>
        </div>

        {/* RIGHT COLUMN: The Quantum Nexus Orbit (55% width) */}
        <div className="w-full lg:w-[55%] flex items-center justify-center order-1 lg:order-2 py-8 lg:py-0">
          <motion.div
            style={{ x: orbitX, y: orbitY }}
            onHoverStart={() => setIsOrbitHovered(true)}
            onHoverEnd={() => setIsOrbitHovered(false)}
            className="relative w-full aspect-square max-w-[85vw] sm:max-w-[450px] lg:max-w-[600px] flex items-center justify-center"
          >
            {/* Central Core: The Nexus */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              {/* Core Glow Pulse */}
              <div className="w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] bg-cyan-500/10 rounded-full blur-[60px] animate-pulse" />
              
              {/* The Core Container */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-40 lg:h-40 rounded-full p-1 lg:p-1.5 bg-gradient-to-br from-cyan-400/80 via-white/10 to-purple-500/80 backdrop-blur-md shadow-[0_0_80px_rgba(34,211,238,0.2)] pointer-events-auto group cursor-crosshair">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#030305] relative bg-black">
                  <img src="/profile2.jpg" alt="Core" className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-purple-500/30 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                </div>
                {/* Techy Core Rings */}
                <div className="absolute -inset-3 lg:-inset-4 border border-cyan-500/40 rounded-full animate-[spin_8s_linear_infinite]" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)' }} />
                <div className="absolute -inset-6 lg:-inset-8 border border-purple-500/20 rounded-full animate-[spin_12s_linear_infinite_reverse] border-dashed" />
              </div>
            </div>

            {/* Orbit Tracks & Icons */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <OrbitLayer skills={innerSkills} radius={innerRadius} duration={40} direction={1} color="rgba(34,211,238,0.8)" isHovered={isOrbitHovered} />
              <OrbitLayer skills={outerSkills} radius={outerRadius} duration={60} direction={-1} color="rgba(192,132,252,0.8)" isHovered={isOrbitHovered} />
            </div>
            
            {/* Radar Sweep Effect */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 mix-blend-screen"
            >
               <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
               <div className="w-[1px] h-[120%] bg-gradient-to-b from-transparent via-purple-400/50 to-transparent absolute" />
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default React.memo(Skills);
