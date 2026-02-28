'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, GraduationCap, User, Mail, Github } from 'lucide-react';
import Marquee from '../components/Marquee';

const Landing: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const [mounted, setMounted] = useState(false);
    const [winSize, setWinSize] = useState({ w: 1920, h: 1080 });

    useEffect(() => {
        setMounted(true);
        setWinSize({ w: window.innerWidth, h: window.innerHeight });

        const handleResize = () => {
            setWinSize({ w: window.innerWidth, h: window.innerHeight });
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

    const xTransform = useTransform(smoothX, [-winSize.w / 2, winSize.w / 2], [-20, 20]);
    const yTransform = useTransform(smoothY, [-winSize.h / 2, winSize.h / 2], [-20, 20]);

    const titleXTransform = useTransform(smoothX, x => x * -0.02);
    const titleYTransform = useTransform(smoothY, y => y * -0.02);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        },
    };

    const text = "HRNT";

    // Show content even before mount to prevent SSR hydration issues
    // Animations will be handled by Framer Motion's initial/animate props

    return (
        <section id="home" className="relative z-10 min-h-screen flex flex-col justify-center overflow-visible pt-32 pb-20">
            {/* Unified Backdrop */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen overflow-hidden"
                style={{ x: xTransform, y: yTransform }}
            >
                <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-cyan-700/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[120px]" />
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* LEFT COLUMN: HERO AREA */}
                    <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {/* Interactive Hero Title */}
                            <motion.div
                                className="relative inline-block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-baseline">
                                        {text.split("").map((char, index) => (
                                            <motion.h1
                                                key={index}
                                                className="text-7xl sm:text-8xl md:text-[120px] font-black tracking-tighter leading-none text-white select-none filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                            >
                                                {char}
                                            </motion.h1>
                                        ))}
                                    </div>
                                    <motion.div
                                        className="w-4 h-4 sm:w-8 sm:h-8 border-[4px] border-cyan-400 bg-transparent rounded-sm rotate-45 shadow-[0_0_30px_rgba(34,211,238,0.6)]"
                                        animate={{ rotate: 225 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 lg:gap-6">
                                <div className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
                                    <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-cyan-400 uppercase">
                                        Creative Developer
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500/50" />
                                    <span>Based in Madiun, ID</span>
                                </div>
                            </motion.div>

                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight"
                            >
                                Designing with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">precision</span>,<br />
                                building with <span className="text-white relative inline-block">passion.</span>
                            </motion.h2>

                            <motion.p
                                variants={itemVariants}
                                className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl"
                            >
                                Engineering digital masterpieces where the "shapes" of code and interfaces define the journey.
                                Specializing in full-stack development with a focus on high-performance architecture
                                and immersive UI/UX experiences.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-6 pt-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { window.location.hash = 'library'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="group relative px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] overflow-hidden text-[10px] shadow-2xl transition-all"
                                >
                                    <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore Works <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { window.location.hash = 'contact'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="group relative px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-[0.2em] text-white hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all text-[10px]"
                                >
                                    <span className="relative z-10 transition-colors group-hover:text-cyan-400 flex items-center gap-2">
                                        Contact Me <Mail size={14} />
                                    </span>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: ABOUT PREVIEW */}
                    <div id="about" className="lg:col-span-5 relative order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {/* Profile Card Fragment from About.tsx */}
                            {/* Advanced Cinematic Profile Card */}
                            <div className="relative group perspective-2000">
                                {/* Dynamic Energy Field */}
                                <div className="absolute -inset-16 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />

                                <motion.div
                                    whileHover={{
                                        rotateY: 12,
                                        rotateX: -8,
                                        scale: 1.02
                                    }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    style={{
                                        transformStyle: "preserve-3d",
                                        WebkitMaskImage: '-webkit-radial-gradient(white, black)' // Fix for Safari/Chrome overflow glitches
                                    }}
                                    className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-[3rem] overflow-visible bg-[#050508] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_80px_rgba(34,211,238,0.1)] isolate transform-gpu mb-6"
                                >
                                    {/* Main Image Layer */}
                                    <motion.div
                                        className="absolute inset-0"
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <img
                                            src="/profile.jpg"
                                            className="w-full h-full object-cover grayscale brightness-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-110"
                                            alt="Profile"
                                        />
                                        {/* Holographic Glitch Mask */}
                                        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                                    </motion.div>

                                    {/* Scan Line Animation */}
                                    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                                        <motion.div
                                            animate={{
                                                top: ["-5%", "105%"]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)] opacity-0 group-hover:opacity-50"
                                        />
                                    </div>

                                    {/* Floating Data Nodes (Hologram Effect) */}
                                    <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110">
                                        <div className="absolute top-10 left-10 p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-xl">
                                            <div className="text-[8px] font-mono text-cyan-400/70 tracking-tighter mb-1">NODE ID: 1510</div>
                                            <div className="h-0.5 w-8 bg-cyan-500/50" />
                                        </div>
                                    </div>

                                    {/* Bottom Glass Content */}
                                    <div className="absolute bottom-0 left-0 right-0 pb-8 px-5 z-30">
                                        <div className="space-y-2">
                                            <motion.div
                                                className="hidden"
                                                whileHover={{ x: 10 }}
                                            >
                                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                                                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]" />
                                                    <span className="text-[8px] font-black text-white/80 tracking-widest uppercase">Identity Confirmed</span>
                                                </div>
                                            </motion.div>

                                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-none select-none">
                                                HERNATA<br />
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">RAMADHAN</span>
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Cybernetic Frame Overlays */}
                                    <div className="absolute inset-8 border border-white/5 rounded-[2rem] pointer-events-none group-hover:inset-6 group-hover:border-cyan-500/20 transition-all duration-700" />
                                    <div className="absolute top-12 right-12 flex flex-col gap-1 items-end opacity-40 group-hover:opacity-100">
                                        <div className="w-1 h-8 bg-cyan-500" />
                                        <div className="w-1 h-2 bg-white" />
                                    </div>
                                </motion.div>

                                {/* Floating Elements - Alternative to Processing Core */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-8 -right-8 z-40 hidden md:block"
                                >
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 backdrop-blur-md flex items-center justify-center group-hover:border-cyan-400/50 transition-colors">
                                            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse" />
                                        </div>
                                        <motion.div
                                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Extended Stats Section (Mini-About) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-16 max-w-4xl mx-auto"
                >
                    {[
                        { label: 'Pro Experience', val: '3+', sub: 'Years Pro', color: 'cyan' },
                        { label: 'Completed Projects', val: '40+', sub: 'Projects Done', color: 'purple' },
                        { label: 'Client Satisfaction', val: '100%', sub: 'Satisfaction', color: 'white' }
                    ].map((stat, i) => (
                        <div key={i} className="group p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="text-2xl lg:text-3xl font-black text-white group-hover:scale-110 transition-transform duration-500 tracking-tighter">
                                    {stat.val}
                                </div>
                                <div className="mt-1 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
                                <div className="text-[8px] text-cyan-400 font-mono mt-0.5 opacity-60">{stat.sub}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Academic Journey Integration */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 max-w-3xl mx-auto"
                >
                    <div className="flex items-center gap-4 mb-6 overflow-hidden">
                        <div className="h-px bg-white/10 flex-1" />
                        <h3 className="text-[10px] sm:text-xs font-black text-white/40 tracking-[0.5em] uppercase whitespace-nowrap">Academic Journey</h3>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <div className="grid gap-3">
                        {[
                            { institution: 'Vocational High School SMKN 1 Wonoasri', period: '2022-2025', type: 'High School' },
                            { institution: 'University of PGRI Madiun', period: '2025-Present', type: 'University' }
                        ].map((edu, index) => (
                            <div
                                key={index}
                                className="group relative p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-cyan-500/30 transition-all duration-500"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors shrink-0">
                                            <GraduationCap size={16} className="text-slate-500 group-hover:text-cyan-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-50 transition-colors">{edu.institution}</div>
                                            <div className="text-[10px] sm:text-xs text-slate-500 font-mono tracking-widest">{edu.period}</div>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1.5 w-fit rounded-lg bg-white/5 border border-white/10 text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-black group-hover:border-cyan-500/20 group-hover:text-cyan-400">
                                        {edu.type}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Marquee at the transition point */}
            <div className="mt-32">
                <Marquee />
            </div>
        </section>
    );
};

export default React.memo(Landing);
