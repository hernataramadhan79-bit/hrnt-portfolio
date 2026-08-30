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
import Background from '../components/Background';
import Footer from '../components/Footer';
import { ForumSkeleton } from '../components/Skeletons';
import { Project, Certificate } from '../types';
import { printDevToolsBanner } from '../lib/console-banner';

// Lazy-load Forum to isolate Firebase Auth & Firestore SDK with Obsidian Skeleton Fallback
const Forum = dynamic(() => import('../sections/Forum'), {
  ssr: false,
  loading: () => <ForumSkeleton />,
});

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Background Prewarming during idle: Memuat chunk Forum & data komentar sebelum tab diklik
  // Hasil: Ketika pengguna mengklik tab Forum, transisi terjadi instan 0.00ms (Zero Loading!)
  useEffect(() => {
    const prewarmChunks = () => {
      import('../sections/Forum');
      fetch('/api/comments', { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => {
          if (data?.comments && typeof window !== 'undefined') {
            try {
              localStorage.setItem('hrnt_comments_cache', JSON.stringify(data.comments));
            } catch {}
          }
        })
        .catch(() => {});
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(prewarmChunks);
      } else {
        const timer = setTimeout(prewarmChunks, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);
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
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col justify-between"
              data-section-scroll
            >
              <Dashboard
                onSelectProject={setSelectedProject}
                onNavigate={handleTabChange}
              />
              <Footer onNavigate={handleTabChange} />
            </motion.div>
          )}

          {activeTab === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col justify-between"
              data-section-scroll
            >
              <Work onSelectProject={setSelectedProject} />
              <Footer onNavigate={handleTabChange} />
            </motion.div>
          )}

          {activeTab === 'capabilities' && (
            <motion.div
              key="capabilities"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col justify-between"
              data-section-scroll
            >
              <Capabilities />
              <Footer onNavigate={handleTabChange} />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col justify-between"
              data-section-scroll
            >
              <About />
              <Footer onNavigate={handleTabChange} />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col justify-between"
              data-section-scroll
            >
              <Stats />
              <Footer onNavigate={handleTabChange} />
            </motion.div>
          )}

          {activeTab === 'awards' && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col justify-between"
              data-section-scroll
            >
              <Recognitions onSelectCertificate={setSelectedCert} />
              <Footer onNavigate={handleTabChange} />
            </motion.div>
          )}

          {activeTab === 'forum' && (
            <motion.div
              key="forum"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col justify-between"
              data-section-scroll
            >
              <Forum />
              <Footer onNavigate={handleTabChange} />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col justify-between"
              data-section-scroll
            >
              <Contact />
              <Footer onNavigate={handleTabChange} />
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
