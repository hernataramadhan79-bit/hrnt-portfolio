'use client';

import React from 'react';
import { m, useReducedMotion, useSpring, useTransform, HTMLMotionProps } from 'framer-motion';

/** Largest lean toward the pointer, in degrees (tvOS focus tilt, kept subtle). */
const MAX_TILT = 3;
const tiltSpring = { stiffness: 260, damping: 22, mass: 0.6 };

type TiltProps =
  | ({ as?: 'div' } & HTMLMotionProps<'div'>)
  | ({ as: 'button' } & HTMLMotionProps<'button'>);

/**
 * A surface that leans a few degrees toward a fine pointer, like a focused
 * Apple TV card. It goes flat the moment it is pressed, so a card that opens
 * into a sheet is measured square.
 */
export default function Tilt({ as = 'div', style, ...rest }: TiltProps) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  // At rest the transform is none, so the surface leaves its 3D layer and text stays crisp
  const transform = useTransform([rotateX, rotateY], ([x, y]: number[]) =>
    Math.abs(x) < 0.01 && Math.abs(y) < 0.01
      ? 'none'
      : `perspective(900px) rotateX(${x}deg) rotateY(${y}deg)`
  );

  const handlers = {
    onPointerMove: (event: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion || event.pointerType !== 'mouse') return;
      const r = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - r.left) / r.width - 0.5;
      const py = (event.clientY - r.top) / r.height - 0.5;
      rotateY.set(px * 2 * MAX_TILT);
      rotateX.set(-py * 2 * MAX_TILT);
    },
    onPointerLeave: () => {
      rotateX.set(0);
      rotateY.set(0);
    },
    onPointerDown: () => {
      rotateX.jump(0);
      rotateY.jump(0);
    },
  };

  const tiltStyle = { transform, ...style };

  if (as === 'button') {
    return <m.button {...handlers} {...(rest as HTMLMotionProps<'button'>)} style={tiltStyle} />;
  }
  return <m.div {...handlers} {...(rest as HTMLMotionProps<'div'>)} style={tiltStyle} />;
}
