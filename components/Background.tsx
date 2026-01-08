import React from 'react';
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

const ShootingStar = ({ delay, top, left, duration, color, trailColor, repeatDelay }: ShootingStarProps) => (
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
      boxShadow: `0 0 15px 2px currentColor`
    }}
  >
    {/* Comet Trail */}
    <div className={`absolute top-0 left-0 w-[150px] h-[1px] bg-gradient-to-l ${trailColor} to-transparent -rotate-45 origin-left`} />
  </motion.div>
);

const Background: React.FC = () => {
  const { scrollY } = useScroll();

  // Parallax values for different star layers
  const y1 = useTransform(scrollY, [0, 5000], [0, -1000]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -600]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -300]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020205]">
      {/* 1. Base Gradient & Nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f0c29_0%,_#020205_100%)] opacity-100" />
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_30%_30%,_rgba(34,211,238,0.1)_0%,_transparent_50%)]" 
      />

      {/* 2. Parallax Starfield Layers */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={`s1-${i}`}
            className="absolute bg-white rounded-full opacity-40"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 200 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute inset-0 z-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div 
            key={`s2-${i}`}
            className="absolute bg-cyan-200 rounded-full opacity-30 shadow-[0_0_5px_rgba(34,211,238,0.3)]"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 200 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ y: y3 }} className="absolute inset-0 z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={`s3-${i}`}
            className="absolute bg-blue-400 rounded-full opacity-20 shadow-[0_0_8px_rgba(59,130,246,0.4)]"
            style={{
              width: Math.random() * 4 + 'px',
              height: Math.random() * 4 + 'px',
              top: Math.random() * 200 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </motion.div>

      {/* 3. Shooting Stars (Komet Jatuh) - Fewer and more randomized */}
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

      {/* 4. Textures & Overlays */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
    </div>
  );
};

export default Background;