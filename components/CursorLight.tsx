'use client';

import { useEffect } from 'react';

/**
 * Feeds the pointer position to CSS (--mx / --my) so the hovered bento surface
 * can catch a faint tonal light that follows the cursor (see "Cursor light" in
 * globals.css). Fine pointers only; one write per frame.
 *
 * The variables live on the hovered card, not on <html>: a custom property that
 * changes on the root restyles the whole page every frame, on a card only that
 * card's subtree. The gradient is fixed to the viewport, so nested surfaces
 * still share the same light.
 */
export default function CursorLight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    let card: HTMLElement | null = null;

    const moveTo = (next: HTMLElement | null) => {
      if (next === card) return;
      card?.style.removeProperty('--mx');
      card?.style.removeProperty('--my');
      card = next;
    };

    const paint = () => {
      frame = 0;
      // :hover also follows a card that scrolls under a still pointer
      moveTo(document.querySelector<HTMLElement>('.bento-outer:hover'));
      if (!card) return;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const handleMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      schedule();
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
      moveTo(null);
    };
  }, []);

  return null;
}
