'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Mail, Briefcase, Github, Clock, Star, Terminal, Activity, FileDown } from 'lucide-react';
import Marquee from '../components/Marquee';
import { projects, innerSkills, outerSkills, experiences, detailedSkills } from '../constants';
import { fetchGithubData, fetchWakaTimeData } from '../lib/clientDataCache';

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
                const [ghData, wkData] = await Promise.all([
                    fetchGithubData().catch(() => null),
                    fetchWakaTimeData().catch(() => null)
                ]);
                
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
    const allTags = [...detailedSkills.frontend, ...detailedSkills.backend].flatMap(d => d.tags);    return (
        <section id="home" className="relative z-10 flex flex-col justify-center w-full min-h-[calc(100dvh-4.5rem)] lg:min-h-[calc(100vh-5rem)] py-4 lg:py-2 xl:py-4 px-4 sm:px-6">
            {/* Unified Backdrop */}
            <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden rounded-3xl">
                <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] bg-cyan-700/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] xl:w-[450px] xl:h-[450px] bg-purple-700/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto w-full h-full relative z-20 flex flex-col p-1 sm:p-2">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-3 gap-3 lg:gap-3.5 xl:gap-4 flex-1 min-h-0 h-full"
                >
                    {/* HERO TEXT: col-span-2, row-span-2 */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2 flex flex-col justify-center p-2 lg:pr-6 space-y-3 lg:space-y-3 xl:space-y-4">
                        <div className="flex flex-col items-start">
                            <div className="flex items-center gap-3">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-black tracking-tighter leading-none text-white select-none filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center">
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
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 border-[2.5px] border-cyan-400 bg-transparent rounded-sm rotate-45 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                                    animate={{ rotate: 225 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                            </div>

                            {/* Full name — Sans-serif flush left alignment matching HRNT, bold & enlarged */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-sm sm:text-base md:text-lg font-black text-slate-200 uppercase tracking-[0.22em] mt-2 leading-none"
                            >
                                Hernata Ramadhan
                            </motion.p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <div className="px-3.5 py-1.5 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md">
                                <span className="text-[10px] xl:text-[11px] font-bold tracking-[0.18em] text-cyan-300 uppercase leading-none">
                                    Full-Stack Software Engineer
                                </span>
                            </div>

                            {/* Availability Status Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                </span>
                                <span className="text-[10px] xl:text-[11px] font-mono text-emerald-300 font-semibold tracking-wider leading-none">
                                    Available: Full-Time • Remote • Contract
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] xl:text-[11px] uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                                <span>Based in Indonesia (UTC+7)</span>
                            </div>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black text-white leading-[1.15] tracking-tight">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">high-performance</span><br />
                            web architectures, <span className="text-white relative inline-block">end to end.</span>
                        </h2>

                        <p className="text-xs sm:text-sm lg:text-xs xl:text-sm text-slate-300 font-normal leading-relaxed max-w-lg">
                            Full-Stack Engineer specializing in React, Next.js, Node.js, and TypeScript.
                            From scalable system architecture to pixel-precise user interfaces — building resilient products.
                        </p>

                        {/* Tech stack subtitle */}
                        <div className="flex flex-wrap gap-2 pt-0.5">
                            {['React 19', 'Next.js 16', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
                                <span key={tech} className="text-[10px] font-mono text-slate-300 font-medium uppercase tracking-wider px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-md">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-row flex-wrap gap-3 pt-2 mb-2 lg:mb-3">
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: 'projects' } })); }}
                                className="group relative px-5 py-3 lg:px-4 lg:py-2.5 xl:px-6 xl:py-3 bg-white text-black rounded-xl font-bold uppercase tracking-[0.15em] overflow-hidden text-[10px] xl:text-[11px] shadow-2xl transition-all"
                            >
                                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Projects <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.a>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: 'contact' } })); }}
                                className="group relative px-5 py-3 lg:px-4 lg:py-2.5 xl:px-6 xl:py-3 bg-white/5 border border-white/15 rounded-xl font-bold uppercase tracking-[0.15em] text-white hover:border-cyan-400/60 hover:bg-white/[0.08] transition-all text-[10px] xl:text-[11px]"
                            >
                                <span className="relative z-10 transition-colors group-hover:text-cyan-300 flex items-center gap-2">
                                    Contact Me <Mail size={13} />
                                </span>
                            </motion.a>
                            <motion.a
                                href="/Hernata%20CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative px-5 py-3 lg:px-4 lg:py-2.5 xl:px-6 xl:py-3 bg-white/5 border border-white/15 rounded-xl font-bold uppercase tracking-[0.15em] text-slate-300 hover:border-white/30 hover:text-white hover:bg-white/[0.08] transition-all text-[10px] xl:text-[11px]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Curriculum Vitae <FileDown size={13} />
                                </span>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* PROFILE IMAGE: col-span-1, row-span-2 */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 lg:row-span-2 relative flex items-center justify-center h-[300px] lg:h-full py-1">
                        <div className="relative group perspective-2000 pointer-events-auto h-full w-full max-w-[280px] lg:max-w-none">
                            <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-[2.5rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <motion.div
                                style={{
                                    rotateX: cardRotateX,
                                    rotateY: cardRotateY,
                                    transformStyle: 'preserve-3d'
                                }}
                                className="relative h-full w-full rounded-2xl lg:rounded-[2rem] overflow-hidden bg-[#030305] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-colors duration-700 group-hover:border-white/20"
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

                                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 p-4 lg:p-6">
                                    <div className="absolute top-4 left-4 lg:top-6 lg:left-6 w-3.5 h-3.5 border-t border-l border-cyan-400/50 rounded-tl" />
                                    <div className="absolute top-4 right-4 lg:top-6 lg:right-6 w-3.5 h-3.5 border-t border-r border-cyan-400/50 rounded-tr" />
                                    <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 w-3.5 h-3.5 border-b border-l border-purple-400/50 rounded-bl" />
                                    <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 w-3.5 h-3.5 border-b border-r border-purple-400/50 rounded-br" />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 pb-5 lg:pb-6 px-4 lg:px-5 z-30" style={{ transform: 'translateZ(40px)' }}>
                                    <div className="space-y-1">
                                        <div className="h-0.5 w-8 bg-cyan-400 rounded-full" />
                                        <h3 className="text-lg lg:text-xl xl:text-2xl font-black text-white tracking-tighter leading-[0.85] select-none">
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
                        whileHover={{ y: -6, scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: 'performance' } })); }}
                        className="lg:col-span-1 lg:row-span-1 group relative rounded-2xl lg:rounded-3xl bg-[#0d1117]/90 border border-white/10 overflow-hidden cursor-pointer p-3.5 sm:p-4 xl:p-5 flex flex-col hover:border-emerald-500/50 hover:shadow-[0_15px_35px_-10px_rgba(16,185,129,0.2)] transition-all duration-500 h-[220px] lg:h-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="relative z-10 flex justify-between items-start mb-1.5">
                            <div className="flex items-center gap-2">
                                <Activity size={16} className="text-slate-300 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300" />
                                <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Performance</span>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
                                <ArrowRight size={13} className="text-slate-500 -rotate-45 group-hover:text-emerald-400 group-hover:rotate-0 group-hover:translate-x-0.5 transition-all duration-300" />
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex-1 flex flex-col justify-end w-full gap-2 mt-2">
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex flex-col justify-center items-center shadow-inner group-hover:border-emerald-500/20 group-hover:bg-white/[0.08] transition-all duration-300">
                                    {loadingStats ? (
                                        <div className="w-10 h-6 bg-white/10 rounded animate-pulse mb-1" />
                                    ) : (
                                        <span className="text-xl sm:text-2xl xl:text-3xl font-black text-white group-hover:text-emerald-300 transition-colors">{realStats.github.totalContributions}</span>
                                    )}
                                    <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider mt-0.5">Commits</span>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex flex-col justify-center items-center shadow-inner group-hover:border-yellow-500/20 group-hover:bg-white/[0.08] transition-all duration-300">
                                    {loadingStats ? (
                                        <div className="w-8 h-6 bg-white/10 rounded animate-pulse mb-1" />
                                    ) : (
                                        <span className="text-xl sm:text-2xl xl:text-3xl font-black text-white group-hover:text-yellow-300 transition-colors">{realStats.github.repos}</span>
                                    )}
                                    <span className="text-[10px] text-yellow-300 font-bold uppercase tracking-wider mt-0.5">Repos</span>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-lg p-2 flex items-center justify-between shadow-inner group-hover:border-cyan-500/20 group-hover:bg-white/[0.08] transition-all duration-300">
                                <div className="flex items-center gap-1.5">
                                    <Clock size={13} className="text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
                                    <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider group-hover:text-white">Coding Time</span>
                                </div>
                                {loadingStats ? (
                                    <div className="w-12 h-3 bg-white/10 rounded animate-pulse" />
                                ) : (
                                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate max-w-[120px]">{realStats.wakatime.totalTime}</span>
                                )}
                            </div>
                        </div>
                    </motion.a>

                    {/* SKILLS STACK: col-span-1, row-span-1 */}
                    <motion.a 
                        href="#skills"
                        variants={itemVariants}
                        whileHover={{ y: -6, scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: 'skills' } })); }}
                        className="lg:col-span-1 lg:row-span-1 group relative rounded-2xl lg:rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden cursor-pointer p-3.5 sm:p-4 xl:p-5 flex flex-col hover:border-pink-500/40 hover:bg-white/[0.06] hover:shadow-[0_15px_35px_-10px_rgba(236,72,153,0.18)] transition-all duration-500 h-[220px] lg:h-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <div className="relative z-10 flex justify-between items-start mb-1.5">
                            <div className="flex items-center gap-2">
                                <Terminal size={16} className="text-slate-300 group-hover:text-pink-400 group-hover:scale-110 transition-all duration-300" />
                                <h3 className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Tech Stack</h3>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-pink-500/20 flex items-center justify-center transition-colors">
                                <ArrowRight size={13} className="text-slate-500 -rotate-45 group-hover:text-pink-400 group-hover:rotate-0 group-hover:translate-x-0.5 transition-all duration-300" />
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex-1 flex flex-col justify-end w-full mt-1.5">
                            <div className="flex flex-wrap gap-1.5 xl:gap-2">
                                {[...innerSkills, ...outerSkills].slice(0, 10).map((skill, i) => (
                                    <div key={i} className="group/skill relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 hover:border-pink-500/40 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 shadow-inner">
                                        <img src={skill.icon} alt={skill.name} className="w-4 h-4 sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 object-contain opacity-90 group-hover/skill:opacity-100 group-hover/skill:scale-110 transition-all duration-300" />
                                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#030305] rounded border border-white/10 text-[10px] font-bold text-white opacity-0 group-hover/skill:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                                            {skill.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.a>

                    {/* PROJECTS: col-span-2, row-span-1 */}
                    <motion.a 
                        href="#projects"
                        variants={itemVariants}
                        whileHover={{ y: -6, scale: 1.012 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: 'projects' } })); }}
                        className="lg:col-span-2 lg:row-span-1 group relative rounded-2xl lg:rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden cursor-pointer p-4 sm:p-5 xl:p-6 flex flex-col justify-between hover:bg-white/[0.06] hover:border-cyan-500/40 hover:shadow-[0_15px_40px_-10px_rgba(34,211,238,0.18)] transition-all duration-500 h-[220px] lg:h-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-row items-center justify-between w-full h-full gap-3">
                            {/* Text Area (Left) */}
                            <div className="flex flex-col justify-between h-full max-w-[45%]">
                                <div>
                                    <h3 className="text-base sm:text-lg xl:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-1">Featured Works</h3>
                                    <p className="text-[11px] xl:text-xs text-slate-400 leading-relaxed line-clamp-2">Discover my latest digital creations and case studies.</p>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-auto">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all duration-300">
                                        <ArrowRight size={13} className="-rotate-45 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <span className="text-[9px] xl:text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">View All</span>
                                </div>
                            </div>
                            
                            {/* Images Stack Area (Right) */}
                            <div className="relative flex-1 h-full flex items-center justify-end pr-2">
                                {projects.slice(0, 3).map((project, idx) => (
                                    <div 
                                        key={project.id} 
                                        className={`absolute w-28 sm:w-32 lg:w-36 xl:w-44 h-18 sm:h-20 lg:h-22 xl:h-28 rounded-xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-700 ease-out group-hover:-translate-y-3
                                        ${idx === 0 ? 'right-[36%] lg:right-[32%] z-10 rotate-[-12deg] group-hover:rotate-[-18deg] group-hover:scale-105' : 
                                          idx === 1 ? 'right-[18%] lg:right-[15%] z-20 rotate-[-4deg] group-hover:rotate-[-8deg] group-hover:scale-108' : 
                                          'right-[0%] z-30 rotate-[4deg] group-hover:rotate-[2deg] group-hover:scale-110'}`}
                                    >
                                        <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 150px, 200px" className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                                        <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="text-[8px] xl:text-[9px] font-black text-white truncate drop-shadow-md">{project.title}</span>
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
                        whileHover={{ y: -6, scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: 'experience' } })); }}
                        className="lg:col-span-1 lg:row-span-1 group relative rounded-2xl lg:rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden cursor-pointer p-3.5 sm:p-4 xl:p-5 flex flex-col hover:bg-white/[0.06] hover:border-purple-500/40 hover:shadow-[0_15px_35px_-10px_rgba(168,85,247,0.18)] transition-all duration-500 h-[220px] lg:h-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <div className="relative z-10 flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/30 flex items-center justify-center transition-all duration-300">
                                    <Briefcase size={14} />
                                </div>
                                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Experience</h3>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-purple-500/20 flex items-center justify-center transition-colors">
                                <ArrowRight size={13} className="text-slate-500 -rotate-45 group-hover:text-purple-400 group-hover:rotate-0 group-hover:translate-x-0.5 transition-all duration-300" />
                            </div>
                        </div>
                        
                        <div className="relative z-10 flex-1 flex flex-col justify-center gap-2.5">
                            {experiences.slice(0, 2).map((exp, i) => (
                                <div key={i} className="flex flex-col border-l-2 border-purple-500/40 pl-3 group-hover:border-purple-400 group-hover:translate-x-0.5 transition-all duration-300">
                                    <div className="text-[8px] xl:text-[9px] font-mono text-purple-400 mb-0.5 uppercase tracking-widest">{exp.period}</div>
                                    <h3 className="text-xs font-bold text-white leading-tight mb-0.5 truncate group-hover:text-white">{exp.role}</h3>
                                    <p className="text-[10px] text-slate-400 truncate">{exp.company}</p>
                                </div>
                            ))}
                        </div>
                    </motion.a>

                    {/* CONTACT CTA: col-span-1, row-span-1 */}
                    <motion.a 
                        href="#contact"
                        variants={itemVariants}
                        whileHover={{ y: -6, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: 'contact' } })); }}
                        className="lg:col-span-1 lg:row-span-1 group relative rounded-2xl lg:rounded-3xl bg-gradient-to-br from-cyan-600 to-purple-700 border border-white/20 overflow-hidden cursor-pointer p-4 sm:p-5 xl:p-6 flex flex-col justify-center items-start text-left transition-all duration-500 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_20px_50px_rgba(34,211,238,0.4)] h-[180px] lg:h-auto"
                    >
                        <div className="absolute -right-6 -bottom-6 text-white/10 group-hover:text-white/25 rotate-[-15deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                            <Mail size={120} />
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-start w-full">
                            <h3 className="text-xl sm:text-2xl xl:text-3xl font-black text-white tracking-tight mb-1 leading-tight group-hover:translate-x-0.5 transition-transform">
                                Let's build <br/> together.
                            </h3>
                            <p className="text-[9px] xl:text-[10px] text-white/80 mb-3 sm:mb-4 max-w-[85%] font-light">Open for new opportunities and exciting projects.</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-black text-[9px] xl:text-[10px] uppercase tracking-wider group-hover:scale-105 group-hover:bg-cyan-300 transition-all duration-300 shadow-xl">
                                <span>Start Project</span>
                                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default React.memo(Landing);
