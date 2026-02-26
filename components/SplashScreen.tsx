import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // Fallback timer to ensure splash screen always completes even if animations hang
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 6000); // Wait for animation to complete (6s)
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Cinematic fluid easing
  const cinematicEase = [0.76, 0, 0.24, 1] as [number, number, number, number];

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Even faster stagger
        delayChildren: 0.2, // Reduced delay
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

  const text = ["H", "R", "N", "T"];

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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => {
            setTimeout(() => onComplete(), 2500); // Wait for user to see animation
          }}
          className="flex items-center gap-4 py-4 px-2 relative"
        >
          <div className="flex items-baseline">
            {text.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                style={{ textShadow: "0px 0px 20px rgba(255,255,255,0.5), 0px 0px 40px rgba(255,255,255,0.2)" }}
                className="text-6xl md:text-8xl font-black tracking-tighter text-white"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Cyan Square Icon (Matching Landing Page) */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [45, 225, 405],
            }}
            transition={{
              delay: 1.2,
              duration: 2.5,
              ease: cinematicEase,
              rotate: {
                delay: 2.5,
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className="w-8 h-8 md:w-12 md:h-12 border-[4px] md:border-[6px] border-cyan-400 bg-transparent rounded-sm rotate-45 shadow-[0_0_30px_rgba(34,211,238,0.6)] ml-2"
          />
        </motion.div>

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