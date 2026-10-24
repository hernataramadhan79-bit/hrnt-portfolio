'use client';

import React, { useEffect, useRef } from 'react';
import { animate, m, useInView, useMotionValue, useReducedMotion } from 'framer-motion';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
/** Odometer spring: slower than UI moves so the digits read as turning wheels. */
const rollSpring = { type: 'spring', stiffness: 140, damping: 22, mass: 1 } as const;
/** Each column to the left starts a beat later, like a counter carrying over. */
const COLUMN_STAGGER = 0.05;
/** Past this point after navigation the first-sight spin from zero is skipped. */
const LATE_HYDRATION_MS = 1500;

function DigitColumn({ digit, active, delay }: { digit: number; active: boolean; delay: number }) {
  const reduceMotion = useReducedMotion();
  // Starts on the real digit, so server HTML and no-JS visitors read the right value
  const y = useMotionValue(`${-digit * 10}%`);
  const hasRolled = useRef(false);

  useEffect(() => {
    if (!active) return;
    const target = `${-digit * 10}%`;
    if (reduceMotion) {
      y.set(target);
      return;
    }
    if (!hasRolled.current) {
      hasRolled.current = true;
      // First sight: spin up from zero while the card is still fading in. If the
      // page hydrated late (slow phone) the real value has been on screen a while,
      // so leave it be rather than snap it to zero and count again.
      if (performance.now() < LATE_HYDRATION_MS) y.jump('0%');
    }
    const controls = animate(y, target, { ...rollSpring, delay });
    return () => controls.stop();
  }, [active, digit, delay, reduceMotion, y]);

  return (
    // clip-path rather than overflow:hidden keeps the column on the text baseline
    <span className="relative inline-block" style={{ clipPath: 'inset(0)' }}>
      <span className="invisible">{digit}</span>
      <m.span style={{ y }} className="absolute inset-x-0 top-0 flex flex-col items-center">
        {DIGITS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </m.span>
    </span>
  );
}

interface RollingNumberProps {
  value: string | number;
  className?: string;
}

/**
 * Text whose digits roll like an odometer: once when it first scrolls into
 * view, and again whenever the value changes (live WakaTime / GitHub data,
 * the clock). Letters and symbols stay still. Screen readers get the plain value.
 */
export default function RollingNumber({ value, className }: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const chars = String(value).split('');

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {chars.map((char, index) => {
          // Keyed from the right so units, tens… keep their wheel when the length changes
          const place = chars.length - 1 - index;
          return /\d/.test(char) ? (
            <DigitColumn key={`d${place}`} digit={Number(char)} active={inView} delay={place * COLUMN_STAGGER} />
          ) : (
            <span key={`c${place}-${char}`}>{char}</span>
          );
        })}
      </span>
    </span>
  );
}
