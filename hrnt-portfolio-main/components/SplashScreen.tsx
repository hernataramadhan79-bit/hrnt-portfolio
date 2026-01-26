import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Simulate smooth loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        // Organic loading curve
        const increment = Math.max(0.5, (100 - prev) / 25);
        return prev + increment;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = () => {
    if (isReady) {
      onComplete();
    }
  };

  // Animation Variants for Text Reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each letter
        delayChildren: 0.3,    // Initial delay before starting
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(12px)",
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] // Cubic bezier for "cinematic" feel
      }
    },
  };

  const text = "HRNT".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] cursor-pointer selection:bg-cyan-500/30 overflow-hidden"
      onClick={handleInteraction}
    >
      {/* --- THEME ELEMENTS --- */}

      {/* 1. Ambient Nebula Glow (Matches Hero Section) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

      {/* 2. Noise Texture - Inline SVG for performance */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* --- CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[280px] md:max-w-[320px]">

        {/* Logo Reveal Container */}
        <div className="mb-10 md:mb-12 relative flex items-end justify-center">

          {/* Staggered Text Animation */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex text-7xl md:text-9xl font-black tracking-tighter leading-none"
          >
            {text.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 drop-shadow-sm"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Decorative Dot/Accent - Matches Hero Section Diamond */}
          <motion.div
            className="ml-2 md:ml-4 mb-3 md:mb-5 w-3 h-3 md:w-5 md:h-5 bg-cyan-400 rounded-sm shadow-[0_0_20px_rgba(34,211,238,0.8)]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.8], // Reveal then pulse
              scale: [0, 1, 1.2, 1],
              rotate: [45, 90, 45]
            }}
            transition={{
              delay: 1.2, // Wait for text to finish
              duration: 4,
              times: [0, 0.2, 0.5, 1], // Timing control
              repeat: Infinity,
              repeatDelay: 0,
              ease: "easeInOut",
            }}
            style={{ rotate: 45 }}
          />
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/5 rounded-full relative overflow-hidden backdrop-blur-sm">
          {/* Animated Fill - Cyan Accent */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-200"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
            style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.5)" }}
          />
        </div>

        {/* Status Text Area */}
        <div className="h-8 mt-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isReady ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                className="flex items-center gap-3"
              >
                <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-slate-500 uppercase">
                  System Loading
                </span>
                <span className="text-[10px] md:text-xs font-mono font-bold text-slate-400">
                  {Math.floor(loadingProgress)}%
                </span>
              </motion.div>
            ) : (
              <motion.button
                key="ready"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="group flex flex-col items-center gap-1"
              >
                <span className="text-xs md:text-sm font-medium tracking-[0.3em] text-white/90 uppercase group-hover:text-cyan-400 transition-colors duration-300">
                  Enter Portfolio
                </span>
                {/* Subtle underline animation */}
                <motion.div
                  className="h-[1px] bg-cyan-500/50"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subtle Copyright Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 text-[9px] text-slate-700 tracking-widest uppercase font-mono mix-blend-plus-lighter"
      >
        © 2025 Experience
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;