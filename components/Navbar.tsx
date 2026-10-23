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
  { id: 'awards', label: 'Credentials', icon: Award },
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
      const scrollContainer = document.querySelector('[data-section-scroll]') as HTMLElement | null;
      const currentScrollY = window.scrollY || (scrollContainer ? scrollContainer.scrollTop : 0);
      setIsScrolled(currentScrollY >= 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const scrollContainer = document.querySelector('[data-section-scroll]');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined' && window.location.hash !== `#${tabId}`) {
      window.history.replaceState(null, '', `#${tabId}`);
    }
  };

  return (
    <>
      {/* Floating Dynamic Pixel Pill (Glass Dose #1 of 2 allowed by R-10) */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main navigation"
          className={`pointer-events-auto flex items-center justify-between rounded-full backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? 'h-[46px] px-3 gap-2 md:gap-3 bg-[#111318]/92 shadow-[0_12px_32px_rgba(0,0,0,0.55)]' // taste-skill-ignore: floating sticky bar overlay
              : 'h-[54px] px-4 md:px-5 gap-3 md:gap-5 bg-[#111318]/85 shadow-[0_8px_24px_rgba(0,0,0,0.35)]' // taste-skill-ignore: floating sticky bar overlay
          }`}
        >
          {/* HRNT Brand Identity */}
          <button
            onClick={() => handleSelectTab('dashboard')}
            className="flex items-center group pointer-events-auto select-none py-1.5 px-1.5 rounded-full active:scale-95 transition-transform"
            aria-label="Go to dashboard"
          >
            <span className="text-[#F1F5F9] font-black tracking-tighter text-lg sm:text-xl leading-none transition-colors duration-200 group-hover:text-[var(--accent-pixel)]">
              HRNT
            </span>
            <span className="w-2 h-2 border-[1.5px] border-[var(--accent-pixel)] bg-transparent rotate-45 ml-1.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[var(--accent-pixel)] group-hover:scale-110" />
          </button>

          {/* Desktop Zone Links */}
          <ul className="hidden lg:flex items-center gap-0.5 bg-[var(--surface-2)] p-1 rounded-full">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleSelectTab(item.id)}
                    className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 active:scale-[0.97] whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'text-[#F1F5F9] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[#F1F5F9]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePixelPill"
                        initial={false}
                        className="absolute inset-0 bg-[var(--surface-pill)] rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }}
                      />
                    )}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Primary Tonal Pill CTA (Forum) & Mobile Drawer Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectTab('forum')}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.96] ${
                isScrolled ? 'px-3.5 py-1.5' : 'px-4 py-2'
              } ${
                activeTab === 'forum'
                  ? 'bg-[var(--accent-pixel)] text-[var(--on-accent-pixel)] font-bold'
                  : 'bg-[var(--surface-pill)] hover:bg-[var(--surface-bright)] text-[#F1F5F9]'
              }`}
            >
              <MessageSquare size={13} strokeWidth={2.2} />
              <span>Forum</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface-3)] transition-colors active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Concentric Tonal Sheet (R_outer = 28px, p-3 = 12px, R_inner = 16px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden bento-outer shadow-2xl" // taste-skill-ignore: mobile drawer modal overlay
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-[16px] text-left transition-all active:scale-[0.98] min-h-[44px] ${
                      isActive
                        ? 'bg-[var(--surface-pill)] text-[#F1F5F9] font-semibold'
                        : 'bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[#F1F5F9]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon
                        size={15}
                        className={isActive ? 'text-[var(--accent-pixel)]' : 'text-[var(--text-muted)]'}
                      />
                      <span className="text-xs tracking-wide">{item.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-2 pt-2.5 px-2 flex items-center justify-between bg-[var(--surface-2)] rounded-[16px] p-2.5">
              <span className="text-xs text-[var(--text-secondary)] font-medium pl-1">
                Hernata Ramadhan
              </span>
              <button
                onClick={() => handleSelectTab('forum')}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all active:scale-[0.96] min-h-[38px] ${
                  activeTab === 'forum'
                    ? 'bg-[var(--accent-pixel)] text-[var(--on-accent-pixel)] font-bold'
                    : 'bg-[var(--surface-pill)] text-[#F1F5F9] hover:bg-[var(--surface-bright)]'
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
