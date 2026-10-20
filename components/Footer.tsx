'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const el = document.querySelector('[data-section-scroll]') as HTMLElement | null;
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const quickZones = [
    { id: 'dashboard', label: '01 Command Hub' },
    { id: 'work', label: '02 Selected Work' },
    { id: 'awards', label: '03 Credentials' },
    { id: 'contact', label: '04 Comm Hub' },
  ];

  return (
    <footer className="w-full mt-auto bg-[var(--surface-canvas)] pt-6 pb-8 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-[1280px] mx-auto bento-outer">
        <div className="bento-inner p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Intact HRNT Logo + Identity Pill */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              onClick={() => {
                onNavigate?.('dashboard');
                scrollToTop();
              }}
              className="flex items-center group select-none px-2 py-1 rounded-full"
              aria-label="Back to dashboard"
            >
              <span className="text-[#F1F5F9] font-extrabold tracking-tighter text-xl leading-none transition-colors duration-200 group-hover:text-[var(--accent-pixel)]">
                HRNT
              </span>
              <div className="w-2 h-2 border-2 border-[var(--accent-pixel)] bg-transparent rotate-45 ml-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[var(--accent-pixel)] group-hover:scale-110" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-3)] text-[11px] font-medium text-[var(--text-secondary)]">
              <span className="live-dot" />
              <span>Full-Stack Engineer</span>
            </div>

            {/* Developer Easter-Egg Badge Hinting at lib/console-banner.ts */}
            <div
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-1)] text-[11px] font-mono text-[var(--text-muted)] select-all"
              title="Open browser DevTools console (F12) to inspect terminal signature"
            >
              <Terminal size={12} className="text-[var(--accent-pixel)]" />
              <span>System Telemetry Ready // Inspect Console</span>
            </div>
          </div>

          {/* Center: Quick Spatial Zone Jump Pills + Copyright */}
          <div className="flex flex-col items-center gap-2 order-3 lg:order-2">
            <div className="hidden md:flex items-center gap-1.5">
              {quickZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => onNavigate?.(zone.id)}
                  className="px-3 py-1 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[11px] font-mono text-[var(--text-secondary)] hover:text-[#F1F5F9] transition-colors tabular-nums"
                >
                  {zone.label}
                </button>
              ))}
            </div>
            <div className="text-center text-xs text-[var(--text-secondary)] tabular-nums">
              <span>&copy; {new Date().getFullYear()} Hernata Ramadhan.</span>{' '}
              <span className="text-[var(--text-muted)] hidden sm:inline">All rights reserved.</span>
            </div>
          </div>

          {/* Right: Tonal Pill Social Channels & Back to Top */}
          <div className="flex items-center gap-2 order-2 lg:order-3">
            <a
              href="https://github.com/hernataramadhan79-bit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[var(--surface-3)] hover:bg-[var(--surface-pill)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] transition-all duration-200 active:scale-[0.95]"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/hernata-ramadhan-614725350/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[var(--surface-3)] hover:bg-[var(--surface-pill)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] transition-all duration-200 active:scale-[0.95]"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="mailto:hernataramadhan79@gmail.com"
              className="w-9 h-9 rounded-full bg-[var(--surface-3)] hover:bg-[var(--surface-pill)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] transition-all duration-200 active:scale-[0.95]"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>

            <button
              onClick={scrollToTop}
              className="h-9 px-3.5 rounded-full bg-[var(--surface-pill)] hover:bg-[var(--accent-pixel)] text-[#F1F5F9] hover:text-[var(--on-accent-pixel)] flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 active:scale-[0.95] ml-1"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp size={13} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
