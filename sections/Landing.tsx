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
        <section id="home" className="relative z-10 min-h-screen lg:h-screen flex flex-col justify-center overflow-hidden pt-24 pb-10 lg:py-0">
            {/* Unified Backdrop */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen overflow-hidden"
                style={{ x: xTransform, y: yTransform }}
            >
                <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-cyan-700/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[120px]" />
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-20 flex flex-col justify-center h-full max-h-screen pt-12 lg:pt-20 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center flex-1">

                    {/* LEFT COLUMN: HERO AREA */}
                    <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6 lg:space-y-8"
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
                                                className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-none text-white select-none filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                            >
                                                {char}
                                            </motion.h1>
                                        ))}
                                    </div>
                                    <motion.div
                                        className="w-4 h-4 sm:w-6 sm:h-6 border-[3px] border-cyan-400 bg-transparent rounded-sm rotate-45 shadow-[0_0_30px_rgba(34,211,238,0.6)]"
                                        animate={{ rotate: 225 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                                <div className="px-4 py-1.5 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
                                    <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase leading-none">
                                        Creative Developer
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px] uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500/50" />
                                    <span>Based in Madiun, ID</span>
                                </div>
                            </motion.div>

                            <motion.h2
                                variants={itemVariants}
                                className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight"
                            >
                                Designing with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">precision</span>,<br />
                                building with <span className="text-white relative inline-block">passion.</span>
                            </motion.h2>

                            <motion.p
                                variants={itemVariants}
                                className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-xl"
                            >
                                Engineering digital masterpieces where the "shapes" of code and interfaces define the journey.
                                Specializing in full-stack development with a focus on architecture
                                and immersive UI/UX experiences.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-row flex-wrap gap-4 pt-2"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { window.location.hash = 'library'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="group relative px-6 py-4 bg-white text-black rounded-xl font-black uppercase tracking-[0.2em] overflow-hidden text-[9px] shadow-2xl transition-all"
                                >
                                    <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore Works <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { window.location.hash = 'contact'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="group relative px-6 py-4 bg-white/5 border border-white/10 rounded-xl font-black uppercase tracking-[0.2em] text-white hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all text-[9px]"
                                >
                                    <span className="relative z-10 transition-colors group-hover:text-cyan-400 flex items-center gap-2">
                                        Contact Me <Mail size={12} />
                                    </span>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: ABOUT PREVIEW */}
                    <div id="about" className="lg:col-span-12 xl:col-span-5 relative flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-[280px] lg:max-w-md"
                        >
                            <div className="relative group perspective-2000 pointer-events-auto">
                                {/* Ambient Glow Aura */}
                                <div className="absolute -inset-20 bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <motion.div
                                    style={{
                                        rotateX: useTransform(yTransform, [-25, 25], [10, -10]),
                                        rotateY: useTransform(xTransform, [-25, 25], [-10, 10]),
                                        transformStyle: 'preserve-3d'
                                    }}
                                    className="relative aspect-[3/4] rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden bg-[#030305] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-colors duration-700 group-hover:border-white/20"
                                >
                                    {/* Scanline / HUD Grid Overlay */}
                                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                                        style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))', backgroundSize: '100% 4px, 3px 100%' }} />

                                    {/* Image with Parallax Movement */}
                                    <motion.div
                                        className="absolute -inset-4"
                                        style={{
                                            x: useTransform(xTransform, [-25, 25], [-10, 10]),
                                            y: useTransform(yTransform, [-25, 25], [-10, 10]),
                                            scale: 1.1
                                        }}
                                    >
                                        <img
                                            src="/profile.jpg"
                                            className="w-full h-full object-cover grayscale-[0.3] brightness-90 contrast-110 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-110 group-hover:contrast-125"
                                            alt="Profile"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                                    </motion.div>

                                    {/* Ambient Inner Glow */}
                                    <div className="absolute inset-0 border border-white/5 rounded-[inherit] z-20 pointer-events-none group-hover:border-cyan-500/30 transition-colors duration-700" />

                                    {/* HUD Elements: Corners */}
                                    <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 p-8">
                                        <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-cyan-400/50 rounded-tl-lg" />
                                        <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-cyan-400/50 rounded-tr-lg" />
                                        <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-purple-400/50 rounded-bl-lg" />
                                        <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-purple-400/50 rounded-br-lg" />
                                    </div>

                                    {/* Main Name Label */}
                                    <div className="absolute bottom-0 left-0 right-0 pb-10 px-8 z-30" style={{ transform: 'translateZ(60px)' }}>
                                        <div className="space-y-1">
                                            <div className="h-0.5 w-12 bg-cyan-400 rounded-full" />
                                            <h3 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tighter leading-[0.85] select-none">
                                                HERNATA<br />
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">RAMADHAN</span>
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Light sweep effect */}
                                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[inherit]">
                                        <motion.div
                                            animate={{ x: ['-100%', '200%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar: Stats Only */}
                <div className="mt-auto pt-6 lg:pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                        {[
                            { label: 'Experience', val: '3+', color: 'cyan' },
                            { label: 'Projects', val: '40+', color: 'purple' },
                            { label: 'Success', val: '100%', color: 'white' }
                        ].map((stat, i) => (
                            <div key={i} className="group p-3 lg:p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all duration-500 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-xl lg:text-3xl font-black text-white tracking-tighter relative z-10">{stat.val}</div>
                                <div className="text-[8px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-4 text-slate-600 font-mono text-[9px] uppercase tracking-[0.4em]">
                        <span>System.Ready()</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Landing);
