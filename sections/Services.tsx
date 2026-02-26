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
        title: "Scaleable Backend",
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
    const colorMap = {
        cyan: 'text-cyan-400 group-hover:text-cyan-300 border-cyan-400/20 group-hover:border-cyan-400/50 bg-cyan-400/5 group-hover:bg-cyan-400/10',
        purple: 'text-purple-400 group-hover:text-purple-300 border-purple-400/20 group-hover:border-purple-400/50 bg-purple-400/5 group-hover:bg-purple-400/10',
        pink: 'text-pink-400 group-hover:text-pink-300 border-pink-400/20 group-hover:border-pink-400/50 bg-pink-400/5 group-hover:bg-pink-400/10',
        yellow: 'text-yellow-400 group-hover:text-yellow-300 border-yellow-400/20 group-hover:border-yellow-400/50 bg-yellow-400/5 group-hover:bg-yellow-400/10',
        emerald: 'text-emerald-400 group-hover:text-emerald-300 border-emerald-400/20 group-hover:border-emerald-400/50 bg-emerald-400/5 group-hover:bg-emerald-400/10',
        blue: 'text-blue-400 group-hover:text-blue-300 border-blue-400/20 group-hover:border-blue-400/50 bg-blue-400/5 group-hover:bg-blue-400/10',
    };

    const accentGlow = {
        cyan: 'bg-cyan-400/10',
        purple: 'bg-purple-400/10',
        pink: 'bg-pink-400/10',
        yellow: 'bg-yellow-400/10',
        emerald: 'bg-emerald-400/10',
        blue: 'bg-blue-400/10',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative flex flex-col p-6 rounded-[1.5rem] bg-[#050508] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden h-full shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.05)]"
        >
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full transition-all duration-700 opacity-0 group-hover:opacity-100 ${accentGlow[service.color as keyof typeof accentGlow]} translate-x-1/2 -translate-y-1/2`} />
            <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
            <div className="absolute inset-0 bg-grid-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 mb-6 shadow-md relative z-10 bg-[#050508] ${colorMap[service.color as keyof typeof colorMap]} group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                <service.icon size={22} strokeWidth={1.5} />
            </div>

            <div className="flex-1 space-y-3 relative z-10">
                <h3 className="text-xl font-black text-white transition-colors duration-300 tracking-tighter uppercase">
                    {service.title}
                </h3>

                <p className="text-[13px] text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {service.description}
                </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-all duration-500 relative z-10">
                <div className="flex items-center gap-3">
                    <p className={`text-[9px] font-mono text-${service.color}-400 uppercase tracking-[0.2em] font-bold`}>Protocol 0{index + 1}</p>
                </div>
                <div className={`w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:bg-${service.color}-400 group-hover:text-black transition-all duration-500 transform group-hover:rotate-45 shadow-sm`}>
                    <ArrowUpRight size={16} strokeWidth={2} />
                </div>
            </div>
        </motion.div>
    );
};

const Services: React.FC = () => {
    return (
        <section id="services" className="relative z-10 py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 relative z-10">
                    <div className="space-y-4 max-w-2xl">
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
                            className="text-4xl md:text-6xl font-black leading-tight text-white tracking-tighter"
                        >
                            Excellence <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">In Every Layer.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-sm lg:text-right"
                    >
                        <p className="text-base text-slate-400 font-light leading-relaxed">
                            Delivering mission-critical digital products by fusing solid architecture with sophisticated design aesthetics.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 relative z-10">
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

