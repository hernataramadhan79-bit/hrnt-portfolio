import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Check if device is mobile/touch
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX - 16);
    cursorY.set(e.clientY - 16);
  }, [cursorX, cursorY]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('.group') ||
      target.classList.contains('cursor-pointer')
    ) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, []);

  useEffect(() => {
    if (isMobile) return; // Don't add listeners on mobile

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [moveCursor, handleMouseOver, isMobile]);

  if (isMobile) return null; // Don't render on mobile

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'transparent',
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
        duration: 0.15
      }}
    >
      {/* Inner Dot */}
      <motion.div
        className="w-1 h-1 bg-white rounded-full"
        style={{ backfaceVisibility: 'hidden' }}
        animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  );
};

export default React.memo(CustomCursor);