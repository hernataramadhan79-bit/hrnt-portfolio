'use client';

import React, { useEffect, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const Background = dynamic(() => import('@/components/Background'), { ssr: false });

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
              className="px-5 py-2.5 bg-cyan-500 rounded-full hover:bg-cyan-600 transition-colors text-sm"
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

const loadLanding = () => import('@/sections/Landing');
const loadExperience = () => import('@/sections/Experience');
const loadSkills = () => import('@/sections/Skills');
const loadPerformance = () => import('@/sections/Performance');
const loadLibrary = () => import('@/sections/Library');
const loadContact = () => import('@/sections/Contact');
const loadForum = () => import('@/sections/Forum');

const Landing = React.lazy(loadLanding);
const Experience = React.lazy(loadExperience);
const Skills = React.lazy(loadSkills);
const Performance = React.lazy(loadPerformance);
const Library = React.lazy(loadLibrary);
const Contact = React.lazy(loadContact);
const Forum = React.lazy(loadForum);

const sectionFallback = (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-cyan-400 font-mono text-sm">Loading...</span>
    </div>
  </div>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const preloadAll = () => {
      loadExperience();
      loadSkills();
      loadPerformance();
      loadLibrary();
      loadContact();
      loadForum();
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(preloadAll);
    } else {
      setTimeout(preloadAll, 2000);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'experience', 'skills', 'performance', 'library', 'contact', 'forum'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
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

    // Pause Lenis RAF when tab is hidden to save GPU/CPU
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Background />
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Suspense fallback={sectionFallback}>
          <main id="main-content" className="relative z-10 w-full overflow-x-clip min-h-[100dvh] pt-20 md:pt-24 pb-0">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <SectionErrorBoundary>
                    <Landing />
                  </SectionErrorBoundary>
                </motion.div>
              )}
              {activeTab === 'experience' && (
                <motion.div key="experience" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <SectionErrorBoundary>
                    <Experience />
                  </SectionErrorBoundary>
                </motion.div>
              )}
              {activeTab === 'skills' && (
                <motion.div key="skills" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <SectionErrorBoundary>
                    <Skills />
                  </SectionErrorBoundary>
                </motion.div>
              )}
              {activeTab === 'performance' && (
                <motion.div key="performance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <SectionErrorBoundary>
                    <Performance />
                  </SectionErrorBoundary>
                </motion.div>
              )}
              {activeTab === 'library' && (
                <motion.div key="library" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <SectionErrorBoundary>
                    <Library />
                  </SectionErrorBoundary>
                </motion.div>
              )}
              {activeTab === 'contact' && (
                <motion.div key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <SectionErrorBoundary>
                    <Contact />
                  </SectionErrorBoundary>
                </motion.div>
              )}
              {activeTab === 'forum' && (
                <motion.div key="forum" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                  <SectionErrorBoundary>
                    <Forum />
                  </SectionErrorBoundary>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </Suspense>
      </motion.div>
    </>
  );
}