import React from 'react';
import { motion, Variants } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import Marquee from '../components/Marquee';

const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 100, filter: 'blur(20px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 1.2, 
        ease: [0.2, 0.65, 0.3, 0.9] // Cinematic ease
      }
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    },
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Matching the Navbar offset for perfect alignment
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const text = "HRNT";

  return (
    <section id="hero" className="relative z-10 h-screen flex flex-col justify-center items-center overflow-hidden">
      <motion.div 
        className="px-6 w-full max-w-7xl mx-auto flex flex-col items-center text-center relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title - Split Text */}
        <div className="flex items-baseline mb-6 md:mb-8">
          {text.split("").map((char, index) => (
            <motion.h1 
              key={index}
              variants={letterVariants}
              className="text-8xl md:text-[12rem] font-black tracking-tighter leading-[0.8] text-white select-none"
            >
              {char}
            </motion.h1>
          ))}
          <motion.div 
            variants={letterVariants}
            className="w-4 h-4 md:w-8 md:h-8 bg-cyan-400 rounded-sm ml-2 md:ml-4 rotate-45 shadow-[0_0_30px_rgba(34,211,238,0.8)]"
          />
        </div>

        {/* Subtitle */}
        <motion.h2 
          variants={itemVariants} 
          className="text-xl md:text-3xl font-bold tracking-[0.3em] text-slate-400 uppercase mb-8"
        >
          Creative Developer
        </motion.h2>
        
        {/* Description */}
        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-12"
        >
          Engineering digital experiences with <span className="text-white border-b border-cyan-500/50">precision</span> and <span className="text-white border-b border-purple-500/50">imagination</span>.
        </motion.p>
        
        {/* Buttons */}
        <motion.div 
          variants={itemVariants} 
          className="flex gap-6 justify-center"
        >
          <MagneticButton 
            onClick={() => handleScroll('library')}
            className="px-10 py-5 bg-white text-black rounded-full font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] hover:shadow-cyan-400/50 transition-shadow"
          >
            View Work
          </MagneticButton>
          <MagneticButton 
            onClick={() => handleScroll('contact')}
            className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-colors"
          >
            Contact Me
          </MagneticButton>
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <Marquee />
      </div>
    </section>
  );
};

export default Hero;