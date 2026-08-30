'use client';

import React from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Deep Obsidian Foundation */}
      <div className="absolute inset-0 bg-[#090A0F]" />

      {/* Atmospheric Cyan & Purple Ambient Orbs matching old portfolio */}
      <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] bg-cyan-600/[0.03] rounded-full blur-[140px]" />
      <div className="absolute top-[30%] -right-[15%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] bg-sky-500/[0.025] rounded-full blur-[130px]" />
      <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] bg-purple-600/[0.02] rounded-full blur-[150px]" />

      {/* Precision Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
        }}
      />

      {/* Top Edge Ambient Highlight Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
    </div>
  );
}
