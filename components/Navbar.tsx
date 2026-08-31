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
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main navigation"
          className={`pointer-events-auto h-12 flex items-center justify-between gap-3 md:gap-6 px-3.5 md:px-5 rounded-full border transition-[background-color,border-color,box-shadow] duration-200 ${
            isScrolled
              ? 'bg-neutral-950/90 border-neutral-800 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl'
              : 'bg-neutral-950/80 border-neutral-800/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
          }`}
          style={{
            willChange: 'transform, opacity',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* HRNT Logo Wordmark with Focused Cyan Diamond */}
          <button
            onClick={() => handleSelectTab('dashboard')}
            className="flex items-center group pointer-events-auto select-none py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg active:scale-95 transition-transform"
            aria-label="Go to dashboard"
          >
            <span className="text-white font-black tracking-tighter text-xl leading-none transition-colors duration-200 group-hover:text-cyan-400">
              HRNT
            </span>
            <div className="w-2 h-2 border-[1.5px] border-cyan-400 bg-transparent rotate-45 ml-1.5 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300 ease-[0.22,1,0.36,1] group-hover:bg-cyan-400 group-hover:scale-110 group-hover:rotate-[225deg]" />
          </button>

          {/* Nav Items List (Hidden on Mobile) */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleSelectTab(item.id)}
                    className={`relative px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-150 ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        initial={false}
                        className="absolute inset-0 bg-neutral-800/80 border border-neutral-700/80 rounded-full -z-10 shadow-sm"
                        transition={{ type: 'tween', duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Action Forum Button & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectTab('forum')}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-150 hover:brightness-110 active:scale-[0.98] ${
                activeTab === 'forum'
                  ? 'bg-cyan-400 text-neutral-950 font-bold shadow-[0_0_16px_rgba(34,211,238,0.4)]'
                  : 'bg-neutral-800/80 hover:bg-neutral-750 text-neutral-200 border border-neutral-700/60'
              }`}
            >
              <MessageSquare size={13} strokeWidth={2} />
              <span>Forum</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-neutral-400 hover:text-white rounded-full bg-neutral-900/60 border border-neutral-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Slide-down Glass Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden glass-card p-4 bg-neutral-950/95 backdrop-blur-2xl border border-neutral-800 shadow-2xl rounded-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'bg-neutral-900/40 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800/40'
                    }`}
                  >
                    <Icon size={15} className={isActive ? 'text-cyan-400' : 'text-neutral-500'} />
                    <span className="text-xs font-semibold uppercase tracking-wider">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-mono">HRNT Portfolio</span>
              <button
                onClick={() => handleSelectTab('forum')}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === 'forum'
                    ? 'bg-cyan-400 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                }`}
              >
                <MessageSquare size={13} strokeWidth={2} />
                <span>Forum</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

