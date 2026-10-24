'use client';

import { useEffect } from 'react';

/**
 * Feeds the pointer position to CSS (--mx / --my on <html>) so the hovered
 * bento surface can catch a faint tonal light that follows the cursor
 * (see "Cursor light" in globals.css). Fine pointers only; one write per frame.
 */
export default function CursorLight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const handleMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty('--mx', `${x}px`);
        root.style.setProperty('--my', `${y}px`);
      });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
