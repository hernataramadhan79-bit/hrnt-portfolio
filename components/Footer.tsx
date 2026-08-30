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
    <footer className="w-full mt-auto border-t border-white/[0.08] bg-[#090A0F]/60 backdrop-blur-md relative z-20">
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
              <span className="text-white font-black tracking-tighter text-xl leading-none transition-colors duration-200 group-hover:text-cyan-400">
                HRNT
              </span>
              <div className="w-2 h-2 border-2 border-cyan-400 bg-transparent rotate-45 ml-2 shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all duration-300 ease-[0.22,1,0.36,1] group-hover:bg-cyan-400 group-hover:scale-110 group-hover:rotate-[225deg]" />
            </button>
            <span className="text-white/20 text-xs hidden xs:inline">•</span>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#8e9192]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              <span>Full-Stack Engineer</span>
            </div>
          </div>

          {/* Center: Minimalist Copyright */}
          <div className="text-center text-xs text-[#8e9192] font-mono order-3 sm:order-2">
            <span>&copy; {new Date().getFullYear()} Hernata Ramadhan.</span>{' '}
            <span className="text-white/40 hidden md:inline">All rights reserved.</span>
          </div>

          {/* Right: Essential Channels & Quick Scroll to Top */}
          <div className="flex items-center gap-2 order-2 sm:order-3">
            <a
              href="https://github.com/hernataramadhan79-bit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200 hover:-translate-y-0.5"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/hernata-ramadhan-614725350/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200 hover:-translate-y-0.5"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:hernataramadhan79@gmail.com"
              className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#c4c7c8] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200 hover:-translate-y-0.5"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="h-8 px-2.5 rounded-full bg-white/[0.03] border border-white/10 flex items-center gap-1 text-[11px] font-mono text-[#8e9192] hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200 hover:-translate-y-0.5 ml-1"
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
