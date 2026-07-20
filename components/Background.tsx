'use client';

import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ShootingStarProps {
  delay: number;
  top: string;
  left: string;
  duration: number;
  color: string;
  trailColor: string;
  repeatDelay: number;
}

const ShootingStar = React.memo(({ delay, top, left, duration, color, trailColor, repeatDelay }: ShootingStarProps) => (
  <motion.div
    initial={{ x: 0, y: 0, opacity: 0 }}
    animate={{
      x: [0, -800],
      y: [0, 800],
      opacity: [0, 1, 1, 0]
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      repeatDelay: repeatDelay,
      ease: "linear"
    }}
    className={`absolute w-[2px] h-[2px] rounded-full ${color}`}
    style={{
      top,
      left,
      boxShadow: `0 0 15px 2px currentColor`,
      willChange: 'transform, opacity'
    }}
  >
    <div className={`absolute top-0 left-0 w-[150px] h-[1px] bg-gradient-to-l ${trailColor} to-transparent -rotate-45 origin-left`} />
  </motion.div>
));

ShootingStar.displayName = 'ShootingStar';

/**
 * Lightweight seeded PRNG (mulberry32) — deterministic on both SSR and client.
 * Eliminates hydration mismatch caused by Math.random().
 */
function createSeededRandom(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = s + 0x6d2b79f5 | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const Background: React.FC = () => {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 10000], [0, -2500]);
  const y2 = useTransform(scrollY, [0, 10000], [0, -1500]);
  const y3 = useTransform(scrollY, [0, 10000], [0, -800]);

  // Each layer uses a fixed seed so SSR and client produce identical values
  const stars1 = useMemo(() => {
    const rng = createSeededRandom(42);
    return Array.from({ length: 500 }, (_, i) => ({
      id: `s1-${i}`,
      width: rng() * 2,
      height: rng() * 2,
      top: rng() * 100,
      left: rng() * 100,
    }));
  }, []);

  const stars2 = useMemo(() => {
    const rng = createSeededRandom(137);
    return Array.from({ length: 400 }, (_, i) => ({
      id: `s2-${i}`,
      width: rng() * 3,
      height: rng() * 3,
      top: rng() * 100,
      left: rng() * 100,
    }));
  }, []);

  const stars3 = useMemo(() => {
    const rng = createSeededRandom(2048);
    return Array.from({ length: 200 }, (_, i) => ({
      id: `s3-${i}`,
      width: rng() * 4,
      height: rng() * 4,
      top: rng() * 100,
      left: rng() * 100,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020205]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f0c29_0%,_#020205_100%)] opacity-100" />
      <motion.div
        animate={{
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_30%_30%,_rgba(34,211,238,0.1)_0%,_transparent_50%)]"
        style={{ willChange: 'opacity, transform' }}
      />

      <motion.div style={{ y: y1 }} className="absolute top-0 left-0 h-[1000%] w-full z-0">
        {stars1.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-40"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute top-0 left-0 h-[1000%] w-full z-0">
        {stars2.map((star) => (
          <div
            key={star.id}
            className="absolute bg-cyan-200 rounded-full opacity-30 shadow-[0_0_5px_rgba(34,211,238,0.3)]"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ y: y3 }} className="absolute top-0 left-0 h-[1000%] w-full z-0">
        {stars3.map((star) => (
          <div
            key={star.id}
            className="absolute bg-blue-400 rounded-full opacity-20 shadow-[0_0_8px_rgba(59,130,246,0.4)]"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
          />
        ))}
      </motion.div>

      <ShootingStar
        delay={5}
        repeatDelay={15}
        top="5%"
        left="95%"
        duration={1.2}
        color="text-cyan-400"
        trailColor="from-cyan-400"
      />
      <ShootingStar
        delay={12}
        repeatDelay={25}
        top="20%"
        left="85%"
        duration={2}
        color="text-purple-400"
        trailColor="from-purple-400"
      />
      <ShootingStar
        delay={25}
        repeatDelay={30}
        top="45%"
        left="98%"
        duration={1.5}
        color="text-pink-400"
        trailColor="from-pink-400"
      />

      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
    </div>
  );
};

export default React.memo(Background);