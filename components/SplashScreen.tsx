import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // Cinematic fluid easing
  const cinematicEase = [0.76, 0, 0.24, 1] as [number, number, number, number];

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Faster, snappier stagger
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 50, filter: "blur(20px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: cinematicEase }
    }
  };

  const text = ["H", "R", "N", "T", "."];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100vh",
        borderBottomLeftRadius: "50%",
        borderBottomRightRadius: "50%",
        transition: { duration: 1.2, ease: cinematicEase }
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] md:w-[600px] h-[500px] md:h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse duration-[4000ms]" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen animate-pulse duration-[5000ms]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />

      {/* Technical HUD Crosshairs */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-overlay opacity-20">
        <div className="w-full h-[1px] bg-cyan-400 absolute" />
        <div className="h-full w-[1px] bg-cyan-400 absolute" />
        <div className="w-[300px] h-[300px] border border-cyan-400 rounded-full absolute" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">

        {/* Main Brand Logo */}
        <div className="relative">
          {/* Brackets */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1, ease: cinematicEase }}
            className="absolute -left-8 md:-left-12 top-0 bottom-0 flex items-center text-4xl md:text-6xl text-cyan-500/20 font-light"
          >
            [
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => {
              // Wait longer so the dot animation completes
              setTimeout(() => onComplete(), 2000);
            }}
            className="flex items-baseline overflow-visible py-4 px-2 relative"
          >
            {text.map((char, index) => {
              // Standard letters H, R, N, T
              if (char !== '.') {
                return (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{ textShadow: "0px 0px 20px rgba(255,255,255,0.5), 0px 0px 40px rgba(255,255,255,0.2)" }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-white"
                  >
                    {char}
                  </motion.span>
                );
              }
              return null; // Handle dot separately
            })}

            {/* Special Animating Dot */}
            <motion.span
              key="dot"
              initial={{ opacity: 0, x: -150, y: -100, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 1, 1],
                scale: [0, 1.5, 1.5, 0.8, 1],
                x: [-150, 50, 150, 0, 0],
                y: [-100, -150, -50, 50, 0],
                rotate: [0, 180, 360, 540, 720],
              }}
              transition={{
                delay: 1.2, // Wait for HRNT to load
                duration: 2.5,
                times: [0, 0.2, 0.5, 0.8, 1],
                ease: "easeInOut"
              }}
              style={{ textShadow: "0px 0px 30px rgba(34,211,238,1), 0px 0px 60px rgba(34,211,238,0.8)" }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-cyan-400 ml-1 relative z-20"
            >
              .
            </motion.span>
          </motion.div>

          {/* Brackets */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1, ease: cinematicEase }}
            className="absolute -right-8 md:-right-12 top-0 bottom-0 flex items-center text-4xl md:text-6xl text-cyan-500/20 font-light"
          >
            ]
          </motion.div>
        </div>

        {/* Loading Indicator Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-cyan-400/80 animate-pulse">
            Creative Developer
          </span>
        </motion.div>

      </div>

    </motion.div>
  );
};

export default React.memo(SplashScreen);