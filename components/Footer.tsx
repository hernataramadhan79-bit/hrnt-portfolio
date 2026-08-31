'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    const el = document.querySelector('[data-section-scroll]') as HTMLElement | null;
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full mt-auto border-t border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md relative z-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Logo HRNT + Identitas Singkat */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onNavigate?.('dashboard');
                scrollToTop();
              }}
              className="flex items-center group select-none focus-visible:outline-none"
              aria-label="Back to dashboard"
            >
              <span className="text-white font-extrabold tracking-tighter text-xl leading-none transition-colors duration-200 group-hover:text-cyan-400">
                HRNT
              </span>
              <div className="w-2 h-2 border-2 border-cyan-400 bg-transparent rotate-45 ml-2 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300 ease-[0.22,1,0.36,1] group-hover:bg-cyan-400 group-hover:scale-110" />
            </button>
            <span className="text-neutral-700 text-xs hidden xs:inline">•</span>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              <span>Full-Stack Engineer</span>
            </div>
          </div>

          {/* Center: Minimalist Copyright */}
          <div className="text-center text-xs text-neutral-500 font-mono order-3 sm:order-2">
            <span>&copy; {new Date().getFullYear()} Hernata Ramadhan.</span>{' '}
            <span className="text-neutral-600 hidden md:inline">All rights reserved.</span>
          </div>

          {/* Right: Essential Channels & Quick Scroll to Top */}
          <div className="flex items-center gap-2 order-2 sm:order-3">
            <a
              href="https://github.com/hernataramadhan79-bit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-150 active:scale-[0.95]"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/hernata-ramadhan-614725350/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-150 active:scale-[0.95]"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:hernataramadhan79@gmail.com"
              className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-150 active:scale-[0.95]"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="h-8 px-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-150 active:scale-[0.95] ml-1"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp size={12} className="text-cyan-400" />
              <span className="hidden xs:inline">Top</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}

