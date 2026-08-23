'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Landing from '@/sections/Landing';
import Experience from '@/sections/Experience';
import Skills from '@/sections/Skills';
import Stats from '@/sections/Stats';
import Projects from '@/sections/Projects';
import Services from '@/sections/Services';
import Contact from '@/sections/Contact';
import { printDevToolsBanner } from '@/lib/console-banner';

// Lazy-load Forum so Firebase Auth SDK is isolated and only fetched on-demand when visiting #forum
const Forum = dynamic(() => import('@/sections/Forum'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
    </div>
  ),
});

// Pure visual client components with no DOM dependencies needed on initial SSR HTML
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const Background = dynamic(() => import('@/components/Background'), { ssr: false });

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SectionErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Section error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[40vh] flex items-center justify-center bg-[#020617] text-white">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-3">Section failed to load</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-5 py-2.5 bg-cyan-500 rounded-full hover:bg-cyan-600 transition-colors text-sm font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function PortfolioView() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const normalizeTab = (raw: string) => {
      if (raw === 'library') return 'projects';
      if (raw === 'performance') return 'stats';
      return raw;
    };

    const handleHashChange = () => {
      const hash = normalizeTab(window.location.hash.replace('#', ''));
      if (['home', 'experience', 'skills', 'stats', 'projects', 'services', 'contact', 'forum'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    const handleNavigate = (e: CustomEvent<{ tab: string }>) => {
      const tab = normalizeTab(e.detail.tab);
      setActiveTab(tab);
      window.location.hash = tab;
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('navigate', handleNavigate as EventListener);
    if (window.location.hash) {
      handleHashChange();
    }
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('navigate', handleNavigate as EventListener);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(raf);
      }
    };

    rafId = requestAnimationFrame(raf);
    document.addEventListener('visibilitychange', onVisibility);

    const resizeObserver = new ResizeObserver(() => lenis.resize());
    resizeObserver.observe(document.body);

    // DevTools OpenCode / Claude Code Style Terminal Banner & Copyright
    printDevToolsBanner();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', onVisibility);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Background />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="relative z-10 w-full overflow-x-clip min-h-[100dvh] pt-16 sm:pt-20 lg:pt-[4.5rem] pb-0">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <SectionErrorBoundary>
                <Landing />
              </SectionErrorBoundary>
            </motion.div>
          )}
          {activeTab === 'experience' && (
            <motion.div key="experience" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <SectionErrorBoundary>
                <Experience />
              </SectionErrorBoundary>
            </motion.div>
          )}
          {activeTab === 'skills' && (
            <motion.div key="skills" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <SectionErrorBoundary>
                <Skills />
              </SectionErrorBoundary>
            </motion.div>
          )}
          {(activeTab === 'stats' || activeTab === 'performance') && (
            <motion.div key="stats" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <SectionErrorBoundary>
                <Stats />
              </SectionErrorBoundary>
            </motion.div>
          )}
          {(activeTab === 'projects' || activeTab === 'library') && (
            <motion.div key="projects" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <SectionErrorBoundary>
                <Projects />
              </SectionErrorBoundary>
            </motion.div>
          )}
          {activeTab === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <SectionErrorBoundary>
                <Services />
              </SectionErrorBoundary>
            </motion.div>
          )}
          {activeTab === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <SectionErrorBoundary>
                <Contact />
              </SectionErrorBoundary>
            </motion.div>
          )}
          {activeTab === 'forum' && (
            <motion.div key="forum" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
              <SectionErrorBoundary>
                <Forum />
              </SectionErrorBoundary>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
