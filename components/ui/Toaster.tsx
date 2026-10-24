'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, m, PanInfo } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { effect, spatial } from '../../lib/motion';

type Tone = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  tone: Tone;
}

/** How long a toast stays when nobody is looking at it. */
const LIFETIME_MS = 3600;
/** Toasts kept on screen at once; older ones leave. */
const MAX_VISIBLE = 3;

// A tiny external store, so any component can call toast() without a provider
let items: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export function toast(message: string, tone: Tone = 'info') {
  items = [{ id: nextId++, message, tone }, ...items].slice(0, MAX_VISIBLE);
  emit();
}

function dismiss(id: number) {
  items = items.filter((item) => item.id !== id);
  emit();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => items;
const getServerSnapshot = (): ToastItem[] => [];

const ICONS: Record<Tone, React.ElementType> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

function Toast({ item, index, paused }: { item: ToastItem; index: number; paused: boolean }) {
  const remaining = useRef(LIFETIME_MS);
  const Icon = ICONS[item.tone];

  // Count down only while the stack is not hovered or focused
  useEffect(() => {
    if (paused) return;
    const started = Date.now();
    const timer = setTimeout(() => dismiss(item.id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - started;
    };
  }, [paused, item.id]);

  const handleDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.y > 40 || info.velocity.y > 400) dismiss(item.id);
  };

  // Stacked like Sonner: the newest in front, older ones tucked behind it;
  // the stack fans open into a list while the pointer rests on it
  const behind = paused ? 0 : index;
  return (
    <m.li
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: -behind * 10, scale: 1 - behind * 0.05 }}
      exit={{ opacity: 0, y: 16, scale: 0.96, transition: effect.fast }}
      transition={spatial.default}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.1, bottom: 0.7 }}
      onDragEnd={handleDragEnd}
      style={{ zIndex: MAX_VISIBLE - index, transformOrigin: 'bottom center' }}
      className={`${paused || index === 0 ? 'relative' : 'absolute bottom-0 inset-x-0'} pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-[18px] bg-[var(--surface-bright)] text-[#F1F5F9] text-xs font-medium shadow-[0_12px_32px_rgba(0,0,0,0.45)] cursor-grab active:cursor-grabbing touch-none`} // taste-skill-ignore: floating toast overlay
    >
      <Icon
        size={16}
        className={`shrink-0 ${item.tone === 'error' ? 'text-rose-300' : 'text-[var(--accent-pixel)]'}`}
      />
      <span className="leading-snug">{item.message}</span>
    </m.li>
  );
}

/** Where toasts appear: bottom centre, above everything but dialogs. */
export default function Toaster() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [paused, setPaused] = useState(false);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 inset-x-0 z-[90] flex justify-center px-4 pointer-events-none"
    >
      <ul
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative w-full max-w-sm flex flex-col-reverse gap-2"
      >
        <AnimatePresence initial={false}>
          {list.map((item, index) => (
            <Toast key={item.id} item={item} index={index} paused={paused} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
