'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TiltCard — Optimised version.
 *
 * Changes:
 * - Removed `useMotionTemplate` radial-gradient (800px) that updated on every
 *   mousemove pixel — major GPU bottleneck. Replaced with a static CSS gradient
 *   overlay on hover (single paint, no per-frame updates).
 * - Kept the 3D tilt spring physics (mild, only updates on pointer move over card,
 *   not a global window listener — acceptable cost).
 * - preserve-3d kept only on the outer wrapper, not nested children.
 */
const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useMotionTemplate`${ySpring}deg`;
  const rotateY = useMotionTemplate`${xSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct * 20);
    y.set(yPct * -20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className={`relative group ${className}`}
    >
      <div className="relative z-10 h-full w-full rounded-[inherit]">
        {children}
      </div>

      {/* CSS-only hover shimmer — replaces 800px useMotionTemplate radial-gradient */}
      <div
        className="absolute inset-0 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
          transform: 'translateZ(1px)',
        }}
      />

      <div className="absolute inset-0 z-50 rounded-[inherit] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="absolute inset-0 rounded-[inherit] border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />

      <div className="absolute inset-4 -z-10 bg-black/60 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]" />
    </motion.div>
  );
};

export default React.memo(TiltCard);