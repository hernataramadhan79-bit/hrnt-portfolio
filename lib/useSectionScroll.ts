'use client';

import { useCallback } from 'react';
import { useLenis } from 'lenis/react';
import { NAV_OFFSET, easeOutExpo } from './motion';

/**
 * Glides to a section through Lenis, so the move is eased, interruptible by the
 * visitor's own scroll, and clear of the floating navbar. Falls back to native
 * scrolling before Lenis is ready, and jumps straight there for reduced motion.
 */
/**
 * Page position from layout (offsetTop chain), which ignores transforms: a
 * section caught mid-entrance is still shifted 24px and would be overshot.
 */
function layoutTop(el: HTMLElement) {
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
}

export function useSectionScroll() {
  const lenis = useLenis();

  return useCallback(
    (sectionId: string) => {
      if (typeof window === 'undefined') return;
      const target = sectionId === 'dashboard' ? 0 : document.getElementById(sectionId);
      if (target === null) return;

      const y = Math.max(0, target === 0 ? 0 : layoutTop(target) + NAV_OFFSET);

      if (lenis) {
        lenis.scrollTo(y, { duration: 1.1, easing: easeOutExpo });
        return;
      }

      // No Lenis: before it is ready, or never when the visitor prefers reduced motion
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    },
    [lenis]
  );
}
