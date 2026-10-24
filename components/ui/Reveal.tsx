'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * For blocks on the first screen: play the same entrance with CSS from the
   * first paint instead of waiting for scripts, so the largest paint is not
   * held back until hydration (it was, by seconds, on slow phones).
   */
  immediate?: boolean;
}

/** Longest entrance (last staggered child + its rise) before the styles are dropped. */
const SETTLE_MS = 1400;

/**
 * Shared-axis (Y) entrance for a zone: when the block scrolls into view its
 * direct children rise in one after another. The hidden state lives in CSS
 * under `html.js`, so the content is never lost if scripts fail; once the
 * entrance has played the rules are dropped and children keep their own
 * transitions.
 */
export default function Reveal({ immediate = false, ...rest }: RevealProps) {
  if (immediate) return <div data-reveal-load="" {...rest} />;
  return <ScrollReveal {...rest} />;
}

function ScrollReveal({ children, ...rest }: Omit<RevealProps, 'immediate'>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1, margin: '0px 0px -8% 0px' });
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setSettled(true), SETTLE_MS);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div
      ref={ref}
      data-reveal={settled ? undefined : ''}
      data-revealed={inView ? '' : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
