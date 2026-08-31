'use client';

import React from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Deep Carbon Black Foundation */}
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* Lightweight Subtle Dot-Grid */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 40%, transparent 85%)',
        }}
      />

      {/* Top Peripheral Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-cyan-500/[0.025] rounded-full blur-[120px]" />

      {/* Subtle Hairline Border at Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800/80 to-transparent" />
    </div>
  );
}

