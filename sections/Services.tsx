'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, MonitorSmartphone, Zap, Database, Palette, Layers, ArrowUpRight } from 'lucide-react';

const services = [
    {
        icon: MonitorSmartphone,
        title: "Adaptive Frontend",
        description: "Pixel-perfect, high-performance interfaces engineered for absolute consistency across every modern display and resolution.",
        color: "cyan"
    },
    {
        icon: Database,
        title: "Scalable Backend",
        description: "Robust server-side architecture featuring secure data management and high-throughput API protocols for massive growth.",
        color: "purple"
    },
    {
        icon: Palette,
        title: "Experience Design",
        description: "Immersive user journeys meticulously crafted with focus on aesthetic elegance, usability and strategic brand cohesion.",
        color: "pink"
    },
    {
        icon: Zap,
        title: "Core Optimization",
        description: "Refining complex environments for ultra-fast load times, fluid micro-interactions, and superior technical vitals.",
        color: "yellow"
    },
    {
        icon: Layers,
        title: "Full-Stack Agency",
        description: "Comprehensive end-to-end development services—from conceptual intelligence to production scaling and global deployment.",
        color: "emerald"
    },
    {
        icon: Code2,
        title: "Smart Integrations",
        description: "Seamless harmonization with third-party ecosystems, secure payment channels, and customized API middleware solutions.",
        color: "blue"
    }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
    const colorStyles = {
        cyan: {
            icon: 'text-cyan-400 border-cyan-400/20 bg-cyan-500/10 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/20',
            cardHover: 'hover:border-cyan-500/40 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.7),0_4px_20px_rgba(34,211,238,0.12)]',
            glow: 'bg-cyan-500/10',
            title: 'group-hover:text-cyan-300',
            tag: 'text-cyan-400',
            arrow: 'group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400',
        },
        purple: {
            icon: 'text-purple-400 border-purple-400/20 bg-purple-500/10 group-hover:border-purple-400/40 group-hover:bg-purple-500/20',
            cardHover: 'hover:border-purple-500/40 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.7),0_4px_20px_rgba(168,85,247,0.12)]',
            glow: 'bg-purple-500/10',
            title: 'group-hover:text-purple-300',
            tag: 'text-purple-400',
            arrow: 'group-hover:bg-purple-400 group-hover:text-black group-hover:border-purple-400',
        },
        pink: {
            icon: 'text-pink-400 border-pink-400/20 bg-pink-500/10 group-hover:border-pink-400/40 group-hover:bg-pink-500/20',
            cardHover: 'hover:border-pink-500/40 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.7),0_4px_20px_rgba(236,72,153,0.12)]',
            glow: 'bg-pink-500/10',
            title: 'group-hover:text-pink-300',
            tag: 'text-pink-400',
            arrow: 'group-hover:bg-pink-400 group-hover:text-black group-hover:border-pink-400',
        },
        yellow: {
            icon: 'text-amber-400 border-amber-400/20 bg-amber-500/10 group-hover:border-amber-400/40 group-hover:bg-amber-500/20',
            cardHover: 'hover:border-amber-500/40 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.7),0_4px_20px_rgba(245,158,11,0.12)]',
            glow: 'bg-amber-500/10',
            title: 'group-hover:text-amber-300',
            tag: 'text-amber-400',
            arrow: 'group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400',
        },
        emerald: {
            icon: 'text-emerald-400 border-emerald-400/20 bg-emerald-500/10 group-hover:border-emerald-400/40 group-hover:bg-emerald-500/20',
            cardHover: 'hover:border-emerald-500/40 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.7),0_4px_20px_rgba(16,185,129,0.12)]',
            glow: 'bg-emerald-500/10',
            title: 'group-hover:text-emerald-300',
            tag: 'text-emerald-400',
            arrow: 'group-hover:bg-emerald-400 group-hover:text-black group-hover:border-emerald-400',
        },
        blue: {
            icon: 'text-blue-400 border-blue-400/20 bg-blue-500/10 group-hover:border-blue-400/40 group-hover:bg-blue-500/20',
            cardHover: 'hover:border-blue-500/40 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.7),0_4px_20px_rgba(59,130,246,0.12)]',
            glow: 'bg-blue-500/10',
            title: 'group-hover:text-blue-300',
            tag: 'text-blue-400',
            arrow: 'group-hover:bg-blue-400 group-hover:text-black group-hover:border-blue-400',
        },
    };

    const style = colorStyles[service.color as keyof typeof colorStyles] || colorStyles.cyan;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: Math.min(index * 0.06, 0.25) }}
            className={`group relative flex flex-col p-5 sm:p-6 rounded-2xl bg-[#050508] border border-white/5 ${style.cardHover} hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]`}
        >
            {/* Subtle Ambient Hover Glow */}
            <div className={`absolute top-0 right-0 w-48 h-48 blur-3xl rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${style.glow} -mr-12 -mt-12 pointer-events-none`} />

            {/* Icon Header */}
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 mb-5 shadow-sm relative z-10 ${style.icon}`}>
                <service.icon size={20} strokeWidth={1.75} className="sm:w-[22px] sm:h-[22px]" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2 relative z-10">
                <h3 className={`text-base sm:text-lg font-black text-white ${style.title} transition-colors duration-300 tracking-tight uppercase`}>
                    {service.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {service.description}
                </p>
            </div>

            {/* Footer Row */}
            <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                <p className={`text-[9px] font-mono uppercase tracking-[0.2em] font-bold ${style.tag}`}>
                    Protocol 0{index + 1}
                </p>
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 ${style.arrow} transition-all duration-300`}>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
            </div>
        </motion.article>
    );
};

const Services: React.FC = () => {
    return (
        <section id="services" className="relative z-10 py-8 sm:py-12 md:py-16 px-4 sm:px-6 overflow-visible">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6 relative z-10">
                    <div className="space-y-3 sm:space-y-4 max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-sm"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            Engineering Solutions
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight text-white tracking-tighter"
                        >
                            Excellence <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">In Every Layer.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-sm lg:text-right"
                    >
                        <p className="text-xs sm:text-base text-slate-400 font-light leading-relaxed">
                            Delivering mission-critical digital products by fusing solid architecture with sophisticated design aesthetics.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 relative z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Services);

