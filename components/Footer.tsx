'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, Twitter, ArrowUpRight, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: 'https://github.com/hernataramadhan79-bit', label: 'Github' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Instagram, href: 'https://www.instagram.com/hrnt.dev/', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative z-10 pt-12 pb-8 px-4 sm:px-6 bg-[#020617]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                    {/* Left: Big CTA */}
                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.9]"
                        >
                            Let's craft <br />
                            <span className="text-white/20">something great</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = 'mailto:hernataramadhan79@gmail.com'}
                                className="group flex items-center gap-4 px-8 py-5 bg-white text-black rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
                            >
                                Get in Touch
                                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                                    <Mail size={18} />
                                </div>
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right: Info & Links */}
                    <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">Sections</h3>
                            <nav className="flex flex-col gap-4">
                                {['Home', 'Skills', 'Library', 'Contact'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => {
                                            const sectionId = item.toLowerCase();
                                            const element = document.getElementById(sectionId);
                                            if (element) {
                                                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                                                window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                                            }
                                        }}
                                        className="text-white/60 hover:text-cyan-400 transition-colors text-left font-bold uppercase tracking-[0.2em] text-[10px] w-fit"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">Social Media</h3>
                            <nav className="flex flex-col gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors uppercase tracking-wider text-sm font-medium w-fit"
                                    >
                                        {social.label}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <div className="flex items-center gap-3 group cursor-pointer" onClick={scrollToTop}>
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500 transition-all duration-500">
                                <Terminal size={18} className="group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black tracking-tighter text-white uppercase">HRN<span className="text-cyan-400">T</span></span>
                                <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest leading-none mt-0.5 group-hover:text-cyan-400/50 transition-colors">Alpha Protocol</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em]">
                            &copy; {currentYear} Digital Architecture. Built with Next.js 15.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">Local Time</span>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-xs font-bold text-white uppercase tracking-tighter">
                                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })} Madiun, ID
                                </span>
                            </div>
                        </div>
                        <div className="hidden sm:block w-px h-8 bg-white/10" />
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-500 hover:-rotate-6"
                                    title={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
