import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position relative to center (for rotation)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse position in pixels (for spotlight/glare)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics configuration: Higher stiffness/damping ratio for "heavy/premium" feel
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }; 
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useMotionTemplate`${ySpring}deg`;
  const rotateY = useMotionTemplate`${xSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;

    // Calculate percentage (-0.5 to 0.5)
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;

    // Increased rotation to ~20 degrees for slightly more tilt freedom
    x.set(xPct * 20); 
    y.set(yPct * -20);
    
    mouseX.set(mX);
    mouseY.set(mY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px', // Natural perspective
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className={`relative group ${className}`}
    >
      {/* 3D Content Container */}
      <div 
        style={{ transformStyle: 'preserve-3d' }}
        className="relative z-10 h-full w-full rounded-[inherit] transition-transform duration-200 ease-linear"
      >
        {children}
      </div>
      
      {/* 1. Dynamic Spotlight (Follows Mouse) */}
      <motion.div 
         className="absolute inset-0 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] pointer-events-none"
         style={{
            background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`,
            transform: "translateZ(1px)" // Sit just above background
         }}
      />

      {/* 2. Glassy Sheen (Diagonal reflection) */}
      <div className="absolute inset-0 z-50 rounded-[inherit] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: 'translateZ(20px)' }} />
      </div>
      
      {/* 3. Border Highlight (Edging) */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" style={{ transform: "translateZ(20px)" }} />

      {/* 4. Dynamic Drop Shadow (Moves opposite to light source) */}
      <div className="absolute inset-4 -z-10 bg-black/60 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]" 
           style={{ transform: "translateZ(-40px) scale(0.9)" }} />
    </motion.div>
  );
};

export default TiltCard;