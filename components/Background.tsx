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
  color: string;
}

/**
 * Background — High-Performance Canvas background with rich dark space nebula gradient.
 */
const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rng = mulberry32(42);

    const colors = [
      'rgba(255, 255, 255,',     // White
      'rgba(165, 243, 252,',     // Cyan-200
      'rgba(147, 197, 253,',     // Blue-300
      'rgba(192, 132, 252,',     // Purple-300
    ];

    // Build star data once — 200 stars total across 3 virtual layers
    const stars: Star[] = Array.from({ length: 200 }, (_, i) => ({
      x: rng(),
      y: rng(),
      r: rng() * 1.6 + 0.4,
      opacity: rng() * 0.55 + 0.15,
      speed: i < 100 ? 0.04 : i < 160 ? 0.02 : 0.01,
      color: colors[Math.floor(rng() * colors.length)],
    }));

    let scrollY = 0;
    let rafId: number;
    let isVisible = true;

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onVisibility = () => { isVisible = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', onVisibility);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
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

      // 1. Rich dark space radial base gradient
      const bg = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, Math.max(W, H) * 0.85);
      bg.addColorStop(0, '#151c38');   // Rich dark slate indigo center
      bg.addColorStop(0.4, '#0d1326'); // Deep space dark blue
      bg.addColorStop(1, '#020617');   // Dark slate navy edges
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // 2. Cyan Nebula Glow (Top Left)
      const cyanGlow = ctx.createRadialGradient(W * 0.25, H * 0.25, 0, W * 0.25, H * 0.25, W * 0.65);
      cyanGlow.addColorStop(0, 'rgba(34, 211, 238, 0.22)');
      cyanGlow.addColorStop(0.4, 'rgba(34, 211, 238, 0.08)');
      cyanGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = cyanGlow;
      ctx.fillRect(0, 0, W, H);

      // 3. Purple Nebula Glow (Bottom Right)
      const purpleGlow = ctx.createRadialGradient(W * 0.75, H * 0.7, 0, W * 0.75, H * 0.7, W * 0.65);
      purpleGlow.addColorStop(0, 'rgba(168, 85, 247, 0.18)');
      purpleGlow.addColorStop(0.4, 'rgba(168, 85, 247, 0.06)');
      purpleGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = purpleGlow;
      ctx.fillRect(0, 0, W, H);

      // 4. Multi-colored parallax stars
      stars.forEach(star => {
        const parallaxOffset = (scrollY * star.speed) % H;
        const sx = star.x * W;
        const sy = ((star.y * H * 10 - parallaxOffset) % (H * 10) + H * 10) % (H * 10);
        if (sy < 0 || sy > H) return;

        ctx.beginPath();
        ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.opacity})`;
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
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="shooting-star shooting-star--1" />
        <span className="shooting-star shooting-star--2" />
        <span className="shooting-star shooting-star--3" />
      </div>
    </div>
  );
};

export default React.memo(Background);