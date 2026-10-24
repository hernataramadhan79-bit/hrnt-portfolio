'use client';

import React, { useEffect, useRef, useState } from 'react';
import { m, useReducedMotion, useSpring, HTMLMotionProps } from 'framer-motion';
import { spatial } from '../../lib/motion';

/** How far a magnetic control leans toward the cursor, in px. */
const MAGNET_REACH = 6;
/** Corner radius a pill settles into while pressed (Material 3 Expressive shape morph). */
const PRESSED_RADIUS = 12;

const magnetSpring = { stiffness: 300, damping: 20, mass: 0.6 };

/**
 * Press feedback shared by every pill and round control: the shape morphs from
 * full round to a soft square and dips slightly while held, then springs back.
 * `magnetic` lets a primary action lean a few pixels toward a fine pointer.
 * The radius is measured from the element so the morph starts at once instead
 * of crawling down from 9999px.
 */
function usePressable<T extends HTMLElement>(magnetic: boolean) {
  const ref = useRef<T>(null);
  const [radius, setRadius] = useState<number>(9999);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, magnetSpring);
  const y = useSpring(0, magnetSpring);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setRadius(el.offsetHeight / 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pull = (event: React.PointerEvent<T>) => {
    if (!magnetic || reduceMotion || event.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((event.clientX - (r.left + r.width / 2)) / (r.width / 2)) * MAGNET_REACH);
    y.set(((event.clientY - (r.top + r.height / 2)) / (r.height / 2)) * MAGNET_REACH);
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: { borderRadius: radius, x, y },
    whileTap: { scale: 0.97, borderRadius: Math.min(PRESSED_RADIUS, radius) },
    transition: spatial.fast,
    pull,
    release,
  };
}

type PressableExtras = { magnetic?: boolean };

/** Lets a caller hold the element too, without taking it away from the radius measurement. */
function mergeRefs<T>(own: React.RefObject<T | null>, outer: React.Ref<T> | undefined) {
  return (node: T | null) => {
    own.current = node;
    if (typeof outer === 'function') outer(node);
    else if (outer) (outer as React.RefObject<T | null>).current = node;
  };
}

export function PressableButton({
  magnetic = false,
  style,
  onPointerMove,
  onPointerLeave,
  ref,
  ...rest
}: HTMLMotionProps<'button'> & PressableExtras) {
  const press = usePressable<HTMLButtonElement>(magnetic);
  return (
    <m.button
      ref={mergeRefs(press.ref, ref)}
      whileTap={press.whileTap}
      transition={press.transition}
      {...rest}
      style={{ ...press.style, ...style }}
      onPointerMove={(event) => {
        press.pull(event);
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        press.release();
        onPointerLeave?.(event);
      }}
    />
  );
}

export function PressableLink({
  magnetic = false,
  style,
  onPointerMove,
  onPointerLeave,
  ref,
  ...rest
}: HTMLMotionProps<'a'> & PressableExtras) {
  const press = usePressable<HTMLAnchorElement>(magnetic);
  return (
    <m.a
      ref={mergeRefs(press.ref, ref)}
      whileTap={press.whileTap}
      transition={press.transition}
      {...rest}
      style={{ ...press.style, ...style }}
      onPointerMove={(event) => {
        press.pull(event);
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        press.release();
        onPointerLeave?.(event);
      }}
    />
  );
}
