'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  User,
  Activity,
  Award,
  MessageSquare,
  Mail,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'work', label: 'Work', icon: FolderGit2 },
  { id: 'capabilities', label: 'Stack', icon: Cpu },
  { id: 'about', label: 'About', icon: User },
  { id: 'stats', label: 'Stats', icon: Activity },
  { id: 'awards', label: 'Awards', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    if (window.location.hash !== `#${tabId}`) {
      window.history.replaceState(null, '', `#${tabId}`);
    }
  };

  return (
    <>
      {/* Desktop Floating Pill Navbar */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main navigation"
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 py-2 rounded-full border transition-[background-color,border-color,box-shadow] duration-200 ${
            isScrolled
              ? 'bg-[#090A0F]/90 border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl'
              : 'bg-white/[0.04] border-white/10 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          }`}
          style={{
            willChange: 'transform, opacity',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Exact 1:1 HRNT Logo Wordmark with Rotating Cyan Diamond */}
          <button
            onClick={() => handleSelectTab('dashboard')}
            className="flex items-center group pointer-events-auto select-none py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg active:scale-95 transition-transform"
            aria-label="Go to dashboard"
          >
            <span className="text-white font-black tracking-tighter text-2xl leading-none transition-colors duration-200 group-hover:text-cyan-400">
              HRNT
            </span>
            <div className="w-2.5 h-2.5 border-2 border-cyan-400 bg-transparent rotate-45 ml-2 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 ease-[0.22,1,0.36,1] group-hover:bg-cyan-400 group-hover:scale-110 group-hover:rotate-[225deg] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
          </button>

          {/* Nav Items List (Hidden on Mobile) */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleSelectTab(item.id)}
                    className={`relative px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-200 ${
                      isActive ? 'text-cyan-200' : 'text-[#8e9192] hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        initial={false}
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-cyan-400/25 to-cyan-500/20 border border-cyan-400/50 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.35),inset_0_0_12px_rgba(34,211,238,0.15)] -z-10"
                        transition={{ type: 'tween', duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Action Forum Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSelectTab('forum')}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full transition-all hover:scale-[1.03] active:scale-[0.97] ${
                activeTab === 'forum'
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)] font-black'
                  : 'bg-gradient-to-r from-cyan-400/90 to-sky-400/90 text-black hover:brightness-110 shadow-[0_0_15px_rgba(34,211,238,0.35)]'
              }`}
            >
              <MessageSquare size={13} strokeWidth={2.2} />
              <span>Forum</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#c4c7c8] hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Slide-down Glass Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden glass-card p-5 bg-[#090A0F]/95 backdrop-blur-2xl border border-white/15 shadow-2xl rounded-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                        : 'bg-white/[0.02] text-[#c4c7c8] hover:bg-white/5 hover:text-white border border-white/5'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-cyan-400' : 'text-[#8e9192]'} />
                    <span className="text-xs font-semibold uppercase tracking-wider">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#8e9192] font-mono">HRNT Portfolio</span>
              <button
                onClick={() => handleSelectTab('forum')}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all ${
                  activeTab === 'forum'
                    ? 'bg-cyan-400 text-black font-black shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    : 'bg-gradient-to-r from-cyan-400 to-sky-400 text-black hover:brightness-110'
                }`}
              >
                <MessageSquare size={13} strokeWidth={2.2} />
                <span>Forum</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
