'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
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

const Background = dynamic(() => import('../components/Background'), { ssr: false });

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const resetScroll = useCallback(() => {
    // Scroll the active section container back to top on tab change
    const activeEl = document.querySelector('[data-section-scroll]') as HTMLElement | null;
    if (activeEl) activeEl.scrollTop = 0;
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

  // Print DevTools Signature & Intellectual Property Banner
  useEffect(() => {
    printDevToolsBanner();
  }, []);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    resetScroll();
  };

  return (
    <div className="relative h-dvh overflow-hidden bg-[#090A0F] text-[#e3e1e9] selection:bg-white/10 selection:text-white flex flex-col">
      <Background />

      {/* Floating Pill Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main View Transition Container — fills remaining h-dvh, no document scroll */}
      <main className="flex-1 relative z-10 w-full overflow-hidden">
        <AnimatePresence initial={false}>
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-section-scroll
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-section-scroll
            >
              <Work onSelectProject={setSelectedProject} />
            </motion.div>
          )}

          {activeTab === 'capabilities' && (
            <motion.div
              key="capabilities"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-section-scroll
            >
              <Capabilities />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-section-scroll
            >
              <About />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-section-scroll
            >
              <Stats />
            </motion.div>
          )}

          {activeTab === 'awards' && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-section-scroll
            >
              <Recognitions onSelectCertificate={setSelectedCert} />
            </motion.div>
          )}

          {activeTab === 'forum' && (
            <motion.div
              key="forum"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-section-scroll
            >
              <Forum />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              data-section-scroll
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

    </div>
  );
}
