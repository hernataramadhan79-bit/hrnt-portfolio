'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Lightweight seeded PRNG (mulberry32) — deterministic, avoids hydration mismatch.
 */
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0; s = s + 0x6d2b79f5 | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  x: number; y: number;
  r: number; opacity: number; speed: number;
}

/**
 * Background — Performance-optimised version.
 *
 * Changes vs. previous implementation:
 * - 300 individual DOM <div> stars replaced by a single <canvas> (1 GPU composite layer)
 * - Removed h-[1000%] parallax containers (no more 10× viewport memory allocation)
 * - Removed scale animation on oversized element (was causing constant GPU repaint)
 * - Removed SVG feTurbulence noise (was expensive & tiled full-screen)
 * - Parallax now runs entirely on canvas — zero DOM reflows
 * - Canvas renders only when tab is visible (Page Visibility API)
 */
const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rng = mulberry32(42);

    // Build star data once — 200 stars total across 3 virtual layers
    const stars: Star[] = Array.from({ length: 200 }, (_, i) => ({
      x: rng(),           // normalised [0,1]
      y: rng(),           // normalised [0,1]
      r: rng() * 1.5 + 0.3,
      opacity: rng() * 0.5 + 0.1,
      speed: i < 100 ? 0.04 : i < 160 ? 0.02 : 0.01,  // parallax depth tiers
    }));

    let scrollY = 0;
    let rafId: number;
    let isVisible = true;

    // Track scroll without triggering layout
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Pause rendering when tab is hidden — major battery/GPU saver
    const onVisibility = () => { isVisible = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', onVisibility);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight, document.documentElement.clientHeight);
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!isVisible) return;

      const W = window.innerWidth;
      const H = window.innerHeight;

      ctx.clearRect(0, 0, W, H);

      // Dark radial base gradient — drawn once per frame (cheap, replaces complex DOM layers)
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.8);
      bg.addColorStop(0, '#0f0c29');
      bg.addColorStop(1, '#020205');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Subtle cyan glow in top-left — replaces the animated oversized motion.div
      const glow = ctx.createRadialGradient(W * 0.3, H * 0.3, 0, W * 0.3, H * 0.3, W * 0.5);
      glow.addColorStop(0, 'rgba(34,211,238,0.06)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Stars — parallax offset based on scroll
      stars.forEach(star => {
        const parallaxOffset = (scrollY * star.speed) % H;
        const sx = star.x * W;
        const sy = ((star.y * H * 10 - parallaxOffset) % (H * 10) + H * 10) % (H * 10);
        if (sy < 0 || sy > H) return; // skip off-screen

        ctx.beginPath();
        ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020205]">
      {/* Single canvas layer replaces 300 DOM star divs + 3 motion.div layers */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* CSS-only shooting stars — no JavaScript, no framer-motion, 0 extra JS bundle */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="shooting-star shooting-star--1" />
        <span className="shooting-star shooting-star--2" />
        <span className="shooting-star shooting-star--3" />
      </div>
    </div>
  );
};

export default React.memo(Background);