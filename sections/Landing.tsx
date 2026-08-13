'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Mail, Briefcase, Github, Clock, Star, Terminal } from 'lucide-react';
import Marquee from '../components/Marquee';
import { projects, innerSkills, outerSkills, experiences, githubStats, wakaTimeStats, detailedSkills } from '../constants';

const Landing: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const [mounted, setMounted] = useState(false);
    const [winSize, setWinSize] = useState({ w: 1920, h: 1080 });
    const [loadingStats, setLoadingStats] = useState(true);
    const [realStats, setRealStats] = useState({
        github: { totalContributions: 0, repos: 0 },
        wakatime: { totalTime: '0 hrs 0 mins' }
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ghRes, wkRes] = await Promise.all([
                    fetch('/api/github').catch(() => null),
                    fetch('/api/wakatime').catch(() => null)
                ]);
                
                let ghData = null;
                let wkData = null;
                
                if (ghRes && ghRes.ok) ghData = await ghRes.json();
                if (wkRes && wkRes.ok) wkData = await wkRes.json();
                
                if (ghData || wkData) {
                    setRealStats({
                        github: {
                            totalContributions: ghData?.profile?.totalContributions || 0,
                            repos: ghData?.profile?.repos || 0
                        },
                        wakatime: {
                            totalTime: wkData?.totalTime || '0 hrs 0 mins'
                        }
                    });
                }
            } catch (e) {
                console.error("Failed to fetch real stats", e);
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, []);

    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth >= 768) {
                mouseX.set(e.clientX - window.innerWidth / 2);
                mouseY.set(e.clientY - window.innerHeight / 2);
            }
        };

        // Debounced resize: use ref to store size, only force re-render when
        // it actually changes (avoids re-rendering 436 lines on every pixel resize)
        let resizeTimer: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setWinSize({ w: window.innerWidth, h: window.innerHeight });
            }, 200);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(resizeTimer);
        };
    }, [mouseX, mouseY]);

    // These transforms are declared at component body level (NOT inside JSX)
    // so they are created once and memoized by framer-motion.
    const xTransform = useTransform(smoothX, [-winSize.w / 2, winSize.w / 2], [-20, 20]);
    const yTransform = useTransform(smoothY, [-winSize.h / 2, winSize.h / 2], [-20, 20]);

    // Derived card transforms — declared here at body level, NOT inside the JSX style prop
    const cardRotateX = useTransform(yTransform, [-25, 25], [6, -6]);
    const cardRotateY = useTransform(xTransform, [-25, 25], [-6, 6]);
    const imageX = useTransform(xTransform, [-25, 25], [-8, 8]);
    const imageY = useTransform(yTransform, [-25, 25], [-8, 8]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        },
    };

    const text = "HRNT";
    
    // Extract tags for the third skills marquee row
    const allTags = [...detailedSkills.frontend, ...detailedSkills.backend].flatMap(d => d.tags);

    return (
        <section id="home" className="relative z-10 flex flex-col justify-center w-full min-h-[calc(100dvh-5rem)] lg:h-[calc(100vh-6rem)] lg:min-h-0 py-6 lg:py-4 px-4 sm:px-6">
            {/* Unified Backdrop */}
            <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden rounded-3xl">
                <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] bg-cyan-700/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] xl:w-[450px] xl:h-[450px] bg-purple-700/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto w-full h-full relative z-20 flex flex-col p-2">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-3 gap-4 lg:gap-5 flex-1 min-h-0 h-full"
                >
                    {/* HERO TEXT: col-span-2, row-span-2 */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2 flex flex-col justify-center p-2 lg:pr-8 space-y-4 lg:space-y-6">
                        <div className="flex items-center gap-4">
                            <h1 className="text-6xl sm:text-7xl md:text-[80px] lg:text-[75px] xl:text-[95px] font-black tracking-tighter leading-none text-white select-none filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] flex">
                                {text.split("").map((char, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </h1>
                            <motion.div
                                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-[3px] border-cyan-400 bg-transparent rounded-sm rotate-45 shadow-[0_0_30px_rgba(34,211,238,0.6)]"
                                animate={{ rotate: 225 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="px-4 py-1.5 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
                                <span className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase leading-none">
                                    Creative Developer
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500/50" />
                                <span>Based in Madiun, ID</span>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-3xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight">
                            Designing with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">precision</span>,<br />
                            building with <span className="text-white relative inline-block">passion.</span>
                        </h2>

                        <p className="text-sm md:text-base lg:text-sm xl:text-base text-slate-400 font-light leading-relaxed max-w-lg">
                            Engineering digital masterpieces where the "shapes" of code and interfaces define the journey.
                            Specializing in full-stack development with a focus on architecture and immersive UI/UX experiences.
                        </p>

                        <div className="flex flex-row flex-wrap gap-4 pt-2 xl:pt-4 mb-4 lg:mb-6">
                            <motion.a
                                href="#library"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.preventDefault(); window.location.hash = 'library'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="group relative px-6 py-4 bg-white text-black rounded-xl font-black uppercase tracking-[0.2em] overflow-hidden text-[10px] shadow-2xl transition-all"
                            >
                                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Works <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.a>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.preventDefault(); window.location.hash = 'contact'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="group relative px-6 py-4 bg-white/5 border border-white/10 rounded-xl font-black uppercase tracking-[0.2em] text-white hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all text-[10px]"
                            >
                                <span className="relative z-10 transition-colors group-hover:text-cyan-400 flex items-center gap-2">
                                    Contact Me <Mail size={14} />
                                </span>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* PROFILE IMAGE: col-span-1, row-span-2 */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 lg:row-span-2 relative flex items-center justify-center h-[350px] lg:h-full py-2">
                        <div className="relative group perspective-2000 pointer-events-auto h-full w-full max-w-[280px] lg:max-w-none">
                            <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-[2.5rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <motion.div
                                style={{
                                    rotateX: cardRotateX,
                                    rotateY: cardRotateY,
                                    transformStyle: 'preserve-3d'
                                }}
                                className="relative h-full w-full rounded-3xl lg:rounded-[2.5rem] overflow-hidden bg-[#030305] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-colors duration-700 group-hover:border-white/20"
                            >
                                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                                    style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))', backgroundSize: '100% 4px, 3px 100%' }} />

                                <motion.div
                                    className="absolute -inset-4"
                                    style={{
                                        x: imageX,
                                        y: imageY,
                                        scale: 1.05
                                    }}
                                >
                                    <Image
                                        src="/profile.jpg"
                                        alt="Hernata Ramadhan — Creative Developer"
                                        fill
                                        sizes="(max-width: 1024px) 280px, 400px"
                                        className="object-cover grayscale-[0.3] brightness-90 contrast-110 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-110 group-hover:contrast-125"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
                                </motion.div>

                                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 p-6">
                                    <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-cyan-400/50 rounded-tl" />
                                    <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-cyan-400/50 rounded-tr" />
                                    <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-purple-400/50 rounded-bl" />
                                    <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-purple-400/50 rounded-br" />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 pb-8 px-6 z-30" style={{ transform: 'translateZ(40px)' }}>
                                    <div className="space-y-1">
                                        <div className="h-0.5 w-10 bg-cyan-400 rounded-full" />
                                        <h3 className="text-xl lg:text-3xl font-black text-white tracking-tighter leading-[0.85] select-none">
                                            HERNATA<br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">RAMADHAN</span>
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* PERFORMANCE STATS: col-span-1, row-span-1 */}
                    <motion.a 
                        href="#performance"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        onClick={(e) => { e.preventDefault(); window.location.hash = 'performance'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="lg:col-span-1 lg:row-span-1 group relative rounded-3xl bg-[#0d1117] border border-white/10 overflow-hidden cursor-pointer p-6 flex flex-col hover:border-green-500/50 transition-all h-[250px] lg:h-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <Github size={20} className="text-slate-300 group-hover:text-green-400 transition-colors" />
                                <span className="text-sm font-medium text-slate-300">Performance</span>
                            </div>
                            <ArrowRight size={16} className="text-slate-500 -rotate-45 group-hover:text-green-400 group-hover:rotate-0 transition-all" />
                        </div>
                        
                        <div className="relative z-10 flex-1 flex flex-col justify-end w-full gap-3 mt-4">
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center shadow-inner">
                                    {loadingStats ? (
                                        <div className="w-12 h-8 bg-white/10 rounded animate-pulse mb-1" />
                                    ) : (
                                        <span className="text-3xl font-black text-white">{realStats.github.totalContributions}</span>
                                    )}
                                    <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-1">Commits</span>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center shadow-inner">
                                    {loadingStats ? (
                                        <div className="w-8 h-8 bg-white/10 rounded animate-pulse mb-1" />
                                    ) : (
                                        <span className="text-3xl font-black text-white">{realStats.github.repos}</span>
                                    )}
                                    <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest mt-1">Repos</span>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between shadow-inner">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-blue-400" />
                                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Time Coded</span>
                                </div>
                                {loadingStats ? (
                                    <div className="w-16 h-4 bg-white/10 rounded animate-pulse" />
                                ) : (
                                    <span className="text-xs font-bold text-white">{realStats.wakatime.totalTime}</span>
                                )}
                            </div>
                        </div>
                    </motion.a>

                    {/* SKILLS STACK: col-span-1, row-span-1 */}
                    <motion.a 
                        href="#skills"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        onClick={(e) => { e.preventDefault(); window.location.hash = 'skills'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="lg:col-span-1 lg:row-span-1 group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer p-6 flex flex-col hover:bg-white/[0.08] transition-all h-[250px] lg:h-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <Terminal size={20} className="text-slate-300 group-hover:text-pink-400 transition-colors" />
                                <h3 className="text-sm font-medium text-slate-300">Tech Stack</h3>
                            </div>
                            <ArrowRight size={16} className="text-slate-500 -rotate-45 group-hover:text-pink-400 group-hover:rotate-0 transition-all" />
                        </div>
                        
                        <div className="relative z-10 flex-1 flex flex-col justify-end w-full mt-2">
                            <div className="flex flex-wrap gap-2.5">
                                {[...innerSkills, ...outerSkills].map((skill, i) => (
                                    <div key={i} className="group/skill relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-pink-500/30 transition-all shadow-inner">
                                        <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain filter grayscale group-hover/skill:grayscale-0 group-hover/skill:scale-110 transition-all duration-300" />
                                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#030305] rounded border border-white/10 text-[9px] font-bold text-white opacity-0 group-hover/skill:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                                            {skill.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.a>

                    {/* PROJECTS: col-span-2, row-span-1 */}
                    <motion.a 
                        href="#library"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        onClick={(e) => { e.preventDefault(); window.location.hash = 'library'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="lg:col-span-2 lg:row-span-1 group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] transition-all h-[250px] lg:h-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 flex flex-row items-center justify-between w-full h-full gap-4">
                            {/* Text Area (Left) */}
                            <div className="flex flex-col justify-between h-full max-w-[40%]">
                                <div>
                                    <h3 className="text-xl lg:text-3xl font-bold text-white mb-2">Featured Works</h3>
                                    <p className="text-xs lg:text-sm text-slate-400 leading-relaxed">Discover my latest digital creations and case studies.</p>
                                </div>
                                
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                                        <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">View All Projects</span>
                                </div>
                            </div>
                            
                            {/* Images Stack Area (Right) */}
                            <div className="relative flex-1 h-full flex items-center justify-end pr-4">
                                {projects.slice(0, 3).map((project, idx) => (
                                    <div 
                                        key={project.id} 
                                        className={`absolute w-36 lg:w-44 h-24 lg:h-28 rounded-xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-500 group-hover:-translate-y-2
                                        ${idx === 0 ? 'right-[40%] lg:right-[35%] z-10 rotate-[-12deg] group-hover:rotate-[-16deg] group-hover:right-[40%]' : 
                                          idx === 1 ? 'right-[20%] lg:right-[15%] z-20 rotate-[-4deg] group-hover:rotate-[-8deg] group-hover:right-[20%]' :
                                          'right-[0%] lg:right-[-5%] z-30 rotate-[4deg] group-hover:rotate-[0deg] group-hover:right-[0%]'}`}
                                    >
                                        <Image src={project.image} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="text-[9px] font-black text-white truncate drop-shadow-md">{project.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.a>

                    {/* EXPERIENCE: col-span-1, row-span-1 */}
                    <motion.a 
                        href="#experience"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        onClick={(e) => { e.preventDefault(); window.location.hash = 'experience'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="lg:col-span-1 lg:row-span-1 group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer p-6 flex flex-col hover:bg-white/[0.08] transition-all h-[250px] lg:h-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex justify-between items-start mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                    <Briefcase size={16} />
                                </div>
                                <h3 className="text-lg font-bold text-white">Experience</h3>
                            </div>
                            <ArrowRight size={16} className="text-slate-500 -rotate-45 group-hover:text-purple-400 group-hover:rotate-0 transition-all" />
                        </div>
                        
                        <div className="relative z-10 flex-1 flex flex-col justify-center gap-4">
                            {experiences.slice(0, 2).map((exp, i) => (
                                <div key={i} className="flex flex-col border-l-2 border-purple-500/40 pl-4 group-hover:border-purple-400 transition-colors">
                                    <div className="text-[9px] font-mono text-purple-400 mb-1 uppercase tracking-widest">{exp.period}</div>
                                    <h3 className="text-sm font-bold text-white leading-tight mb-0.5">{exp.role}</h3>
                                    <p className="text-[11px] text-slate-400 truncate">{exp.company}</p>
                                </div>
                            ))}
                        </div>
                    </motion.a>

                    {/* CONTACT CTA: col-span-1, row-span-1 */}
                    <motion.a 
                        href="#contact"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        onClick={(e) => { e.preventDefault(); window.location.hash = 'contact'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="lg:col-span-1 lg:row-span-1 group relative rounded-3xl bg-gradient-to-br from-cyan-600 to-purple-700 border border-white/20 overflow-hidden cursor-pointer p-6 md:p-8 flex flex-col justify-center items-start text-left transition-all shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_50px_rgba(34,211,238,0.3)] h-[200px] lg:h-auto"
                    >
                        <div className="absolute -right-8 -bottom-8 text-white/10 group-hover:text-white/20 rotate-[-15deg] group-hover:rotate-0 transition-all duration-700 pointer-events-none">
                            <Mail size={160} />
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-start w-full">
                            <h3 className="text-3xl font-black text-white tracking-tight mb-2 leading-tight">
                                Let's build <br/> together.
                            </h3>
                            <p className="text-[11px] text-white/70 mb-6 max-w-[80%]">Open for new opportunities and exciting projects.</p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-wider group-hover:scale-105 transition-transform shadow-xl">
                                Start Project <ArrowRight size={12} />
                            </div>
                        </div>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default React.memo(Landing);
