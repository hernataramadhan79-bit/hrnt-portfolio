'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, User, Code, BookOpen, Mail, Briefcase, Activity, Menu, X, Terminal, ArrowRight, MessageSquare } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, sectionId: 'home' },
  { id: 'experience', label: 'Experience', icon: Briefcase, sectionId: 'experience' },
  { id: 'skills', label: 'Skills', icon: Code, sectionId: 'skills' },
  { id: 'performance', label: 'Performance', icon: Activity, sectionId: 'performance' },
  { id: 'library', label: 'Library', icon: BookOpen, sectionId: 'library' },
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

  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Keep visible at all times as per user request to avoid disappearing glitches
    setIsVisible(true);
    setIsScrolled(latest > 20);
    lastScrollY.current = latest;
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

  const scrollToSection = (id: string, sectionId: string) => {
    setActiveTab(id);
    window.location.hash = id;
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className="navbar fixed top-0 left-0 right-0 z-[100] bg-black/0"
        initial={{ y: -160 }}
        animate={{
          y: isVisible ? 0 : -160,
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: isScrolled ? 'blur(24px)' : 'blur(0px)',
          borderBottomWidth: isScrolled ? '1px' : '0px',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          paddingTop: isScrolled ? '1.25rem' : '2.5rem',
          paddingBottom: isScrolled ? '1.25rem' : '2.5rem'
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center h-full relative">
          {/* Brand - Left Side (Flexible container to push center) */}
          <div className="flex-1 flex justify-start items-center z-20">
            <button
              onClick={() => scrollToSection('home', 'home')}
              className="flex items-center group pointer-events-auto"
            >
              <span className="text-white font-black tracking-tighter text-2xl md:text-3xl leading-none transition-all duration-300 group-hover:text-cyan-400">
                HRNT
              </span>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 border-2 border-cyan-400 bg-transparent rotate-45 ml-2 md:ml-3 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:bg-cyan-400 group-hover:scale-110" />
            </button>
          </div>

          {/* Main Navigation - ABSOLUTE CENTER */}
          <nav className="hidden lg:flex items-center gap-0.5 z-30 relative px-4">
            {navItems.filter(item => item.id !== 'forum').map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.sectionId)}
                  className={`group relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap pointer-events-auto ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-200'
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon size={12} className={`transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400/70'}`} />
                    {item.label}
                  </span>

                  {/* Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Hover Trace */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-md -z-10" />
                </button>
              );
            })}
          </nav>

          {/* Right Side - Balanced Spacer (Flexible container to push center) */}
          <div className="flex-1 flex justify-end items-center z-20 gap-2 md:gap-4">
            {/* Forum Button */}
            <button
              onClick={() => scrollToSection('forum', 'forum')}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 pointer-events-auto group ${activeTab === 'forum'
                ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]'
                : 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                }`}
            >
              <MessageSquare size={14} className={`transition-colors hidden md:block ${activeTab === 'forum' ? 'text-cyan-400 animate-pulse' : 'text-cyan-400/70 group-hover:text-cyan-400'}`} />
              <MessageSquare size={12} className={`transition-colors block md:hidden ${activeTab === 'forum' ? 'text-cyan-400 animate-pulse' : 'text-cyan-400/70 group-hover:text-cyan-400'}`} />
              <span className="hidden md:block">Forum</span>
              <span className="block md:hidden">Forum</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 md:p-3 bg-white/5 border border-white/10 rounded-md text-white hover:bg-white/10 transition-colors pointer-events-auto flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Modern Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#020617] lg:hidden overflow-hidden"
          >
            {/* Background Aesthetics */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[80%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[60%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full" />

            {/* Content Container */}
            <div className="relative h-full flex flex-col px-4 sm:px-10 pt-20 sm:pt-28 pb-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6 sm:mb-16">
                <div className="flex flex-col">
                  <span className="text-white font-black text-xl sm:text-2xl tracking-tighter uppercase">Menu <span className="text-cyan-500">Nav</span></span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-2">Operational Systems</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => scrollToSection(item.id, item.sectionId)}
                      className="group flex flex-col py-4 sm:py-6 relative"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest leading-none">0{index + 1}</span>
                        <span className={`text-2xl sm:text-4xl font-black uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-cyan-400 translate-x-4' : 'text-white/40 group-hover:text-white'
                          }`}>
                          {item.label}
                        </span>
                      </div>
                      <div className={`mt-2 h-0.5 bg-cyan-500/20 transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-1/4'}`} />
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-auto space-y-4">
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => scrollToSection('contact', 'contact')}>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg uppercase tracking-tight">Got a project?</span>
                    <span className="text-slate-500 text-xs">Let's create something meaningful</span>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-cyan-400 group-hover:rotate-45 transition-all duration-500 shadow-xl">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Navbar);
