'use client';

import React from 'react';

/**
 * Whisper-quiet ambient canvas (--surface-canvas: #090A0D).
 * Purpose (R-07): Subtle top-viewport tonal luminance and 0.02 opacity coordinate grid
 * establish spatial depth between the #090A0D canvas and #111318 Bento containers
 * without visual noise or GPU-draining orbs.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[var(--surface-canvas)]">
      {/* Top Viewport Tonal Luminance */}
      <div
        className="absolute -top-[18%] left-1/2 -translate-x-1/2 w-[1100px] h-[420px] rounded-full opacity-[0.045] blur-[120px]"
        style={{
          background: 'radial-gradient(ellipse at center, #A8C7FA 0%, transparent 72%)',
        }}
      />

      {/* Barely-perceptible architectural coordinate texture (opacity 0.02) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F1F5F9 1px, transparent 1px), linear-gradient(to bottom, #F1F5F9 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
