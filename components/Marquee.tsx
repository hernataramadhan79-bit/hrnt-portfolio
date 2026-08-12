'use client';

import React from 'react';

/**
 * Marquee — Optimised version.
 *
 * Changes:
 * - Reduced from 20 spans to 4 spans (2 pairs for seamless loop)
 * - Removed `bg-clip-text` gradient on every span (expensive per-character clip).
 *   Replaced with a single CSS mask-image fade on the container.
 * - Removed `backdrop-blur-md` from wrapper (unnecessary blur on a simple text band)
 * - Content rendered once: "Creative Developer • Fullstack • UI/UX • " × 2 in each set
 */
const MARQUEE_TEXT = "Creative Developer • Fullstack • UI/UX • Design Engineer • ";

const Marquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden flex items-center bg-[#020205]/30 border-y border-white/5 py-6 select-none z-20"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      {/* Only 2 spans per set instead of 20 — browser repeats via animation */}
      <div className="flex whitespace-nowrap gap-12 animate-marquee shrink-0" aria-hidden="true">
        <span className="text-4xl md:text-6xl font-black uppercase text-white/15 tracking-tighter">{MARQUEE_TEXT}</span>
        <span className="text-4xl md:text-6xl font-black uppercase text-white/15 tracking-tighter">{MARQUEE_TEXT}</span>
      </div>
      <div className="flex whitespace-nowrap gap-12 animate-marquee shrink-0" aria-hidden="true">
        <span className="text-4xl md:text-6xl font-black uppercase text-white/15 tracking-tighter">{MARQUEE_TEXT}</span>
        <span className="text-4xl md:text-6xl font-black uppercase text-white/15 tracking-tighter">{MARQUEE_TEXT}</span>
      </div>
    </div>
  );
};

export default React.memo(Marquee);