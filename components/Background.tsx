'use client';

import React from 'react';

/**
 * Whisper-quiet solid obsidian canvas (--surface-canvas: #090A0D).
 * Pure solid tone surface without decorative blobs or AI grid lines.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[var(--surface-canvas)]" />
  );
}
