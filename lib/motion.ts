import type { Transition, Variants } from 'framer-motion';

/**
 * Motion tokens after Material 3 Expressive springs, converted to
 * framer-motion's damping: damping = ζ × 2√(stiffness × mass).
 *
 * spatial: position, size and layout; may overshoot slightly.
 * effect:  opacity and colour; never overshoots.
 */
export const spatial = {
  fast: { type: 'spring', stiffness: 800, damping: 34, mass: 1 },
  default: { type: 'spring', stiffness: 380, damping: 31, mass: 1 },
  slow: { type: 'spring', stiffness: 200, damping: 23, mass: 1 },
} as const satisfies Record<string, Transition>;

export const effect = {
  fast: { type: 'spring', stiffness: 3800, damping: 123, mass: 1 },
  default: { type: 'spring', stiffness: 1600, damping: 80, mass: 1 },
  slow: { type: 'spring', stiffness: 800, damping: 57, mass: 1 },
} as const satisfies Record<string, Transition>;

/** Delay between siblings when a zone arrives. */
export const STAGGER = 0.06;

/** Expo-out for programmatic scrolls (Lenis) and long reveals. */
export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Offset that keeps a scrolled-to section clear of the floating navbar. */
export const NAV_OFFSET = -84;

/**
 * Container-transform content: it waits for the container to finish growing,
 * then rises in; on close it leaves at once so the container can shrink clean.
 */
export const sheetContent: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...spatial.default, delay: 0.18 + i * STAGGER },
  }),
  gone: { opacity: 0, transition: { duration: 0.12 } },
};

/** Shared layout ids: an element on the page and the copy it turns into elsewhere. */
export const layoutIds = {
  projectCard: (id: number) => `project-card-${id}`,
  projectImage: (id: number) => `project-image-${id}`,
  certImage: (id: number) => `cert-image-${id}`,
  techChip: (name: string) => `tech-chip-${name}`,
};
