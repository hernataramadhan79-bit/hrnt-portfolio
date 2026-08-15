'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, User, Code, BookOpen, Mail, Briefcase, Activity, Menu, X, Terminal, ArrowRight, MessageSquare } from 'lucide-react';
import { NavItem } from '../types';
import VisuallyHidden from './__a11y/VisuallyHidden';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, sectionId: 'home' },
  { id: 'skills', label: 'Skills', icon: Code, sectionId: 'skills' },
  { id: 'projects', label: 'Projects', icon: BookOpen, sectionId: 'projects' },
  { id: 'services', label: 'Services', icon: Terminal, sectionId: 'services' },
  { id: 'experience', label: 'Experience', icon: Briefcase, sectionId: 'experience' },
  { id: 'stats', label: 'Stats', icon: Activity, sectionId: 'stats' },
  { id: 'contact', label: 'Contact', icon: Mail, sectionId: 'contact' },
  { id: 'forum', label: 'Forum', icon: MessageSquare, sectionId: 'forum' },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(true);
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: id } }));
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`navbar fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-[0.22,1,0.36,1]
          ${
            isScrolled
              ? 'bg-black/70 backdrop-blur-2xl border-b border-white/5 py-5'
              : 'bg-transparent py-10'
          }
        `}
        initial={{ y: -160 }}
        animate={{ y: isVisible ? 0 : -160 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center h-full relative">
          {/* Brand */}
          <div className="flex-1 flex justify-start items-center z-20">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="flex items-center group pointer-events-auto"
              aria-label="Go to home"
            >
              <span className="text-white font-black tracking-tighter text-2xl md:text-3xl leading-none transition-all duration-300 group-hover:text-cyan-400">
                HRNT
              </span>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 border-2 border-cyan-400 bg-transparent rotate-45 ml-2 md:ml-3 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:bg-cyan-400 group-hover:scale-110" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5 z-30 relative px-4">
            {navItems.filter(item => item.id !== 'forum').map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.sectionId}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  className={`group relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap pointer-events-auto ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-200'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon size={12} className={`transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400/70'}`} />
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-md -z-10" />
                </a>
              );
            })}
          </nav>

          {/* Right Side — Standalone Forum Button + Mobile Menu */}
          <div className="flex-1 flex justify-end items-center z-20 gap-2 md:gap-3">
            {/* Standalone Forum Button */}
            <a
              href="#forum"
              onClick={(e) => { e.preventDefault(); scrollToSection('forum'); }}
              className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 pointer-events-auto group border ${
                activeTab === 'forum'
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.5)]'
                  : 'bg-white/5 hover:bg-cyan-500/10 border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                }`}
              aria-label="Open forum"
            >
              <MessageSquare size={13} className={`transition-colors ${activeTab === 'forum' ? 'text-cyan-400' : 'text-cyan-400/80 group-hover:text-cyan-300'}`} />
              <span>Forum</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 md:p-3 bg-white/5 border border-white/10 rounded-md text-white hover:bg-white/10 transition-colors pointer-events-auto flex items-center justify-center"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#020617] lg:hidden overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[80%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[60%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full" />

            <div className="relative h-full flex flex-col px-4 sm:px-10 pt-20 sm:pt-28 pb-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6 sm:mb-16">
                <div className="flex flex-col">
                  <span className="text-white font-black text-xl sm:text-2xl tracking-tighter uppercase">Menu <span className="text-cyan-500">Nav</span></span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-2">Operational Systems</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
                  aria-label="Close navigation menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="grid grid-cols-1 gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeTab === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={`#${item.sectionId}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                      className="group flex flex-col py-4 sm:py-6 relative"
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest leading-none">0{index + 1}</span>
                        <span className={`text-2xl sm:text-4xl font-black uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-cyan-400 translate-x-4' : 'text-white/40 group-hover:text-white'
                          }`}>
                          {item.label}
                        </span>
                      </div>
                      <div className={`mt-2 h-0.5 bg-cyan-500/20 transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-1/4'}`} />
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-4">
                <div className="h-px bg-white/5" />
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg uppercase tracking-tight">Got a project?</span>
                    <span className="text-slate-500 text-xs">Let's create something meaningful</span>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-cyan-400 group-hover:rotate-45 transition-all duration-500 shadow-xl">
                    <ArrowRight size={24} />
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Navbar);