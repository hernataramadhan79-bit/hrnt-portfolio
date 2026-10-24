'use client';

import React from 'react';
import { LazyMotion, MotionConfig, domMax } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { spatial } from '../lib/motion';
import { useMediaQuery } from '../lib/useMediaQuery';

/**
 * One place for how the page moves: Lenis owns the window scroll, framer-motion
 * gets its feature bundle lazily and follows the visitor's reduced-motion choice.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  // Providers render no markup, so a server/client difference here is harmless
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const motion = (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user" transition={spatial.default}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );

  // Visitors who ask for less motion get the browser's own scroll, untouched.
  // (Lenis with smoothing off still clamped the wheel short of the footer.)
  if (reducedMotion) return motion;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: false, autoRaf: true }}>
      {motion}
    </ReactLenis>
  );
}
