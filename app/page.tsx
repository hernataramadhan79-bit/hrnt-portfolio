'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Dashboard from '../sections/Dashboard';
import Work from '../sections/Work';
import Capabilities from '../sections/Capabilities';
import About from '../sections/About';
import Stats from '../sections/Stats';
import Recognitions from '../sections/Recognitions';
import Contact from '../sections/Contact';
import ProjectModal from '../components/ProjectModal';
import CertificateModal from '../components/CertificateModal';
import { Project, Certificate } from '../types';
import { printDevToolsBanner } from '../lib/console-banner';

// Lazy-load Forum to isolate Firebase Auth & Firestore SDK loading until needed
const Forum = dynamic(() => import('../sections/Forum'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
    </div>
  ),
});

const CustomCursor = dynamic(() => import('../components/CustomCursor'), { ssr: false });
const Background = dynamic(() => import('../components/Background'), { ssr: false });

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const resetScroll = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, []);

  // Hash Navigation Listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validTabs = [
        'dashboard',
        'work',
        'capabilities',
        'about',
        'stats',
        'awards',
        'forum',
        'contact',
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
        resetScroll();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [resetScroll]);

  // Initialize Lenis Smooth Scrolling & DevTools Watermark
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Print DevTools Signature & Intellectual Property Banner
    printDevToolsBanner();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
    };
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    resetScroll();
  };

  return (
    <div className="relative min-h-screen bg-[#090A0F] text-[#e3e1e9] selection:bg-white/10 selection:text-white flex flex-col justify-between">
      <CustomCursor />
      <Background />

      {/* Floating Pill Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main View Transition Container */}
      <main className="flex-grow flex flex-col justify-center relative z-10 w-full overflow-x-clip">
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Dashboard
                onSelectProject={setSelectedProject}
                onNavigate={handleTabChange}
              />
            </motion.div>
          )}

          {activeTab === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Work onSelectProject={setSelectedProject} />
            </motion.div>
          )}

          {activeTab === 'capabilities' && (
            <motion.div
              key="capabilities"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Capabilities />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <About />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Stats />
            </motion.div>
          )}

          {activeTab === 'awards' && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Recognitions onSelectCertificate={setSelectedCert} />
            </motion.div>
          )}

          {activeTab === 'forum' && (
            <motion.div
              key="forum"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Forum />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      {/* Clean Footer with Authentic HRNT Logo */}
      <footer className="relative z-10 w-full py-8 border-t border-white/5 bg-[#090A0F]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e9192]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white tracking-tighter text-sm">HRNT</span>
              <div className="w-1.5 h-1.5 border border-cyan-400 bg-transparent rotate-45" />
            </div>
            <span>•</span>
            <span>Copyright &copy; 2023–2026 Hernata Ramadhan. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <a
              href="https://github.com/hernataramadhan79-bit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/hernata-ramadhan-176b68338"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="mailto:hernataramadhan79@gmail.com"
              className="hover:text-cyan-400 transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
