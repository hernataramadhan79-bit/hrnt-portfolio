'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Dashboard from '../sections/Dashboard';
import Work from '../sections/Work';
import Recognitions from '../sections/Recognitions';
import Contact from '../sections/Contact';
import ProjectModal from '../components/ProjectModal';
import CertificateModal from '../components/CertificateModal';
import Background from '../components/Background';
import Footer from '../components/Footer';
import { ForumSkeleton } from '../components/Skeletons';
import { Project, Certificate } from '../types';
import { printDevToolsBanner } from '../lib/console-banner';

// Lazy-load Forum to isolate Firebase Auth & Firestore SDK with concentric Skeleton Fallback
const Forum = dynamic(() => import('../sections/Forum'), {
  ssr: false,
  loading: () => <ForumSkeleton />,
});

const VALID_SECTIONS = [
  'dashboard',
  'about',
  'stats',
  'capabilities',
  'work',
  'awards',
  'contact',
  'forum',
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);

  // Background prewarming during idle for instant Forum hydration
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

  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof window === 'undefined') return;
    if (sectionId === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      const yOffset = -84;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }, []);

  // Hash Navigation Listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_SECTIONS.includes(hash)) {
        setActiveTab(hash);
        scrollToSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scrollToSection]);

  // Scroll-Spy Observer to keep Dynamic Pixel Pill indicator synced with viewport position
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 180;
      const primaryZones = ['dashboard', 'work', 'awards', 'contact'];
      let currentZone = 'dashboard';

      for (const zoneId of primaryZones) {
        const el = document.getElementById(zoneId);
        if (el && el.offsetTop <= scrollPos) {
          currentZone = zoneId;
        }
      }

      setActiveTab((prev) => {
        // Preserve sub-zone selection if still near top of Zone 1
        if (
          currentZone === 'dashboard' &&
          ['dashboard', 'about', 'stats', 'capabilities'].includes(prev) &&
          window.scrollY < 400
        ) {
          return prev;
        }
        if (currentZone === 'contact' && prev === 'forum') {
          return 'forum';
        }
        return currentZone;
      });
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Print DevTools Signature & Intellectual Property Banner
  useEffect(() => {
    printDevToolsBanner();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    scrollToSection(tab);
  };

  return (
    <div
      className="relative min-h-dvh bg-[var(--surface-canvas)] text-[#F1F5F9] flex flex-col justify-between"
      data-section-scroll
    >
      <Background />

      {/* Floating Pill Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* 4 Cohesive Spatial Zones Macro-Layout */}
      <main className="flex-1 relative z-10 w-full space-y-4">
        {/* ZONE 01: Command Hub (Dashboard + About + Stats + Capabilities) */}
        <Dashboard
          onSelectProject={setSelectedProject}
          onNavigate={handleTabChange}
          selectedTechFilter={selectedTechFilter}
          onSelectTechFilter={setSelectedTechFilter}
        />

        {/* ZONE 02: Engineering Showcase (3-Tier Hierarchy) */}
        <Work
          onSelectProject={setSelectedProject}
          selectedTechFilter={selectedTechFilter}
          onClearTechFilter={() => setSelectedTechFilter(null)}
        />

        {/* ZONE 03: Professional Credentials Stack */}
        <Recognitions onSelectCertificate={setSelectedCert} />

        {/* ZONE 04: Engineering Communication Hub */}
        <section
          aria-label="Zone 04: Engineering Communication Hub"
          className="w-full max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <div className="px-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F1F5F9] tracking-tight">
              Engineering Communication Hub
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
              Direct email dispatch, collaboration briefs, and live community guestbook thread.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-5">
              <Contact embedded />
            </div>
            <div className="lg:col-span-7">
              <Forum embedded />
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={handleTabChange} />

      {/* Inspection Sheet Modals */}
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
