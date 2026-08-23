'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Code, BookOpen, Mail, Briefcase, Activity, X, Terminal, ArrowRight, MessageSquare } from 'lucide-react';
import { NavItem } from '../types';

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

const navItemOrder: Record<string, number> = {
  home: 0,
  skills: 1,
  projects: 2,
  services: 3,
  experience: 4,
  stats: 5,
  contact: 6,
  forum: 7,
};

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const prevTabRef = useRef(activeTab);

  // Calculate physical distance between previous tab and new tab
  const prevIndex = navItemOrder[prevTabRef.current] ?? 0;
  const currIndex = navItemOrder[activeTab] ?? 0;
  const distance = Math.abs(currIndex - prevIndex);

  useEffect(() => {
    prevTabRef.current = activeTab;
  }, [activeTab]);

  // Physics calculations for Boundary Walls (Left Wall: Home (0), Right Wall: Contact (6))
  const isHittingLeftWall = currIndex === 0 && prevIndex > 0;
  const isHittingRightWall = currIndex === 6 && prevIndex < 6;

  // Harmonized spring physics with natural fluid momentum & graceful flight:
  const dynamicSpring = useMemo(() => {
    // Colliding with an edge wall (Home or Contact)
    if (isHittingLeftWall || isHittingRightWall) {
      return {
        type: "spring" as const,
        stiffness: 280,
        damping: 26,
        mass: 0.8,
        restDelta: 0.001,
      };
    }
    // Interior step (Adjacent 1 step)
    if (distance <= 1) {
      return {
        type: "spring" as const,
        stiffness: 320,
        damping: 28,
        mass: 0.6,
        restDelta: 0.001,
      };
    }
    // Interior jump (2-3 steps)
    if (distance <= 3) {
      return {
        type: "spring" as const,
        stiffness: 290,
        damping: 26,
        mass: 0.75,
        restDelta: 0.001,
      };
    }
    // Long leap (4+ steps): Smooth, visible liquid glide with organic weight
    return {
      type: "spring" as const,
      stiffness: 250,
      damping: 24,
      mass: 0.85,
      restDelta: 0.001,
    };
  }, [distance, isHittingLeftWall, isHittingRightWall]);

  // Dynamic scroll tracking: completely transparent at top, elevates smoothly when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollPos > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setActiveTab(id);
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', `#${id}`);
    }
    window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: id } }));
    setIsMobileMenuOpen(false);
  }, [setActiveTab]);

  // Handle body scroll locking and Escape key for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`navbar fixed top-0 left-0 right-0 z-[100] transition-[background-color,border-color,padding,box-shadow,backdrop-filter] duration-300 ease-[0.16,1,0.3,1]
          ${
            isScrolled
              ? 'bg-[#020205]/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5 sm:py-3'
              : 'bg-transparent border-b border-transparent shadow-none backdrop-blur-none py-4 sm:py-5'
          }
        `}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between h-full relative">
          {/* Brand - Preserved 1:1 with Natural Spring Hover Interaction */}
          <div className="flex justify-start items-center z-20 shrink-0">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="flex items-center group pointer-events-auto py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg select-none active:scale-95 transition-transform"
              aria-label="Go to home"
            >
              <span className="text-white font-black tracking-tighter text-2xl md:text-3xl leading-none transition-colors duration-200 group-hover:text-cyan-400">
                HRNT
              </span>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 border-2 border-cyan-400 bg-transparent rotate-45 ml-2 md:ml-3 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:bg-cyan-400 group-hover:scale-125 group-hover:rotate-[225deg] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.9)]" />
            </a>
          </div>

          {/* Desktop Navigation - Fluid Dynamic Glass Pill Dock with Capsule Bubble Border */}
          <nav
            aria-label="Main navigation"
            className={`hidden lg:flex items-center gap-1 z-30 relative px-1.5 py-1 rounded-full transition-all duration-500 ease-[0.16,1,0.3,1] ${
              isScrolled
                ? 'bg-white/[0.04] border border-white/[0.1] backdrop-blur-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.35)]'
                : 'bg-white/[0.025] border border-white/[0.07] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.2)]'
            }`}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navItems.filter(item => item.id !== 'forum').map((item) => {
              const isActive = activeTab === item.id;
              const isHovered = hoveredTab === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.sectionId}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  className={`group relative px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 whitespace-nowrap pointer-events-auto rounded-full select-none active:scale-95 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive ? 'text-cyan-200' : 'text-slate-400 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Fluid Physics Active Pill Background with Wall Collision Squash & Rebound */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-cyan-400/25 to-cyan-500/20 border border-cyan-400/50 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.35),inset_0_0_12px_rgba(34,211,238,0.15)] pointer-events-none"
                      initial={
                        isHittingLeftWall || isHittingRightWall
                          ? { scaleX: 1.06 }
                          : { scaleX: 1 }
                      }
                      animate={{ scaleX: 1 }}
                      transition={{
                        layout: dynamicSpring,
                        scaleX: isHittingLeftWall || isHittingRightWall
                          ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                          : dynamicSpring,
                      }}
                      style={{
                        transformOrigin: isHittingLeftWall ? "left center" : isHittingRightWall ? "right center" : "center center",
                        willChange: "transform, opacity",
                        transform: "translateZ(0)",
                      }}
                    />
                  )}

                  {/* Fluid Magnetic Hover Pill */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="navbar-hover-pill"
                      className="absolute inset-0 bg-white/[0.06] border border-white/[0.08] rounded-full"
                      transition={{ type: "spring", stiffness: 480, damping: 30, mass: 0.35 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    <item.icon
                      size={13}
                      className={`transition-colors duration-200 ${
                        isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-300'
                      }`}
                    />
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right Side — Compact Dynamic Forum Action & Mobile Trigger */}
          <div className="flex justify-end items-center z-20 gap-2 sm:gap-3 shrink-0">
            {/* Dynamic Forum Button */}
            <a
              href="#forum"
              onClick={(e) => { e.preventDefault(); scrollToSection('forum'); }}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 pointer-events-auto group border select-none active:scale-95 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                activeTab === 'forum'
                  ? 'bg-gradient-to-r from-cyan-500/25 to-cyan-400/30 border-cyan-400 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.5)]'
                  : isScrolled
                  ? 'bg-white/[0.04] hover:bg-cyan-500/10 border-white/[0.1] hover:border-cyan-500/40 text-slate-300 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                  : 'bg-white/[0.025] hover:bg-cyan-500/10 border-white/[0.07] hover:border-cyan-500/30 text-slate-300 hover:text-white'
              }`}
              aria-label="Open forum"
            >
              <MessageSquare size={13} className={`transition-colors duration-300 ${activeTab === 'forum' ? 'text-cyan-300' : 'text-cyan-400/80 group-hover:text-cyan-300'}`} />
              <span>Forum</span>
            </a>

            {/* Mobile Menu Trigger — Geometric 3-Bar to X Morph */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-9 h-9 rounded-full text-white transition-all duration-200 pointer-events-auto flex flex-col items-center justify-center gap-1 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 select-none active:scale-90 hover:scale-105 ${
                isScrolled
                  ? 'bg-white/[0.04] border-white/[0.1] hover:bg-white/[0.08]'
                  : 'bg-white/[0.025] border-white/[0.07] hover:bg-white/[0.06]'
              }`}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-4 h-[1.5px] bg-white rounded-full origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-4 h-[1.5px] bg-white rounded-full origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-4 h-[1.5px] bg-white rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay — Single-Session Clean Slide & Fade */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-[#02040a] lg:hidden overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[80%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[60%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative h-full flex flex-col px-6 sm:px-10 pt-6 pb-6 overflow-y-auto">
              {/* Header inside Mobile Menu */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div className="flex items-center">
                  <span className="text-white font-black tracking-tighter text-2xl leading-none">
                    HRNT
                  </span>
                  <div className="w-2.5 h-2.5 border-2 border-cyan-400 bg-transparent rotate-45 ml-2 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.05] flex items-center justify-center text-white active:scale-90 transition-transform"
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items — Clean Single-Session Render, Zero Stagger */}
              <nav aria-label="Mobile navigation" className="grid grid-cols-1 gap-1.5 py-6">
                {navItems.map((item, index) => {
                  const isActive = activeTab === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.sectionId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className={`group flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.97] ${
                        isActive
                          ? 'bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.15)] text-cyan-200 font-black'
                          : 'hover:bg-white/[0.04] border border-transparent text-slate-300 hover:text-white'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className="flex items-center gap-3.5">
                        <item.icon
                          size={18}
                          className={`transition-colors duration-200 ${
                            isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-300'
                          }`}
                        />
                        <span className="text-lg font-bold uppercase tracking-wide">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest">
                        0{index + 1}
                      </span>
                    </a>
                  );
                })}
              </nav>

              {/* Mobile CTA Footer */}
              <div className="mt-auto pt-4 border-t border-white/[0.08]">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-white/[0.06] to-cyan-500/10 border border-white/[0.1] hover:border-cyan-400/40 group transition-all"
                >
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-base uppercase tracking-tight">Got a project?</span>
                    <span className="text-slate-400 text-xs">Let's create something meaningful</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center group-hover:rotate-45 transition-all duration-300 shadow-md">
                    <ArrowRight size={18} />
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