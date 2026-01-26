import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Layout, Server } from 'lucide-react';
import { innerSkills, outerSkills, detailedSkills } from '../constants';

const SkillCard = React.memo(({ type }: { type: 'frontend' | 'backend' }) => {
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

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)`;
  const borderLight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${isFrontend ? 'rgba(34,211,238,0.5)' : 'rgba(192,132,252,0.5)'}, transparent 80%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-[3.5rem] bg-[#050508] border border-white/5 transition-all duration-500 hover:shadow-2xl overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: borderLight }}
      />

      <div className="relative h-full bg-[#050508] rounded-[3.4rem] overflow-hidden m-[1px]">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: spotlight }}
        />

        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
        <div
          className={`absolute inset-0 bg-grid-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]`}
        />

        <div
          className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 ${isFrontend ? 'bg-cyan-500' : 'bg-purple-500'}`}
        />

        <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
          <div className="flex items-center gap-5 mb-8 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:rotate-3 ${isFrontend ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:shadow-cyan-500/20' : 'bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:shadow-purple-500/20'}`}>
              <Icon size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{type}</h3>
              <p className="text-white/40 text-sm font-mono tracking-widest uppercase">Mainframe System</p>
            </div>
          </div>

          <div className="space-y-8">
            {skills.map((skill, i) => (
              <div key={i} className="group/item">
                <div className="flex justify-between items-end mb-3">
                  <div className="flex items-center gap-3">
                    <skill.icon size={18} className={`${skill.color} opacity-60 group-hover/item:opacity-100 transition-opacity group-hover/item:scale-110 duration-300`} />
                    <span className="text-base font-bold text-slate-300 group-hover/item:text-white transition-colors">{skill.name}</span>
                  </div>
                  <span className={`text-sm font-black font-mono ${skill.color}`}>{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner relative">
                  <div className="absolute inset-0 w-full h-full opacity-0 group-hover/item:opacity-20 transition-opacity duration-300 bg-white" />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${skill.barColor} relative shadow-[0_0_15px_currentColor]`}
                  >
                    <div className="absolute top-0 right-0 w-[2px] h-full bg-white animate-pulse" />
                  </motion.div>
                </div>
                <div className="flex gap-2 mt-2 opacity-0 max-h-0 group-hover/item:max-h-20 group-hover/item:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                  {skill.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-slate-500 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">Tech <span className="text-white/20">Mainframes</span></h2>
          <p className="text-slate-400 text-base">My Tools and Technologies.</p>
        </div>

        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] w-full flex items-center justify-center mb-16 md:mb-24 overflow-visible">
          <div className="relative w-full h-full flex items-center justify-center scale-50 sm:scale-75 md:scale-100" style={{ willChange: 'transform' }}>
            <motion.div style={{ x: centerPhotoX, y: centerPhotoY }} className="absolute z-20 w-40 h-40 md:w-52 md:h-52 rounded-full border border-white/10 bg-black/40 backdrop-blur-md p-3 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
              <div className="w-full h-full rounded-full overflow-hidden relative border border-white/10">
                <img src="/profile2.png" alt="Core" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ x: innerX, y: innerY }}>
              <div className="absolute w-[350px] h-[350px] border border-white/5 rounded-full border-dashed" />
              <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}>
                {innerSkills.map((skill, index) => {
                  const angle = (index / innerSkills.length) * 2 * Math.PI;
                  const radius = 175;
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

            <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ x: outerX, y: outerY }}>
              <div className="absolute w-[580px] h-[580px] border border-white/5 rounded-full" />
              <motion.div className="absolute inset-0 flex items-center justify-center" animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}>
                {outerSkills.map((skill, index) => {
                  const angle = (index / outerSkills.length) * 2 * Math.PI;
                  const radius = 290;
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
          </div>
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