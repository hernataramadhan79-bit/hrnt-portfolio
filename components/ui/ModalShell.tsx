'use client';

import React, { useEffect, useRef } from 'react';
import { m, useDragControls, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { X } from 'lucide-react';
import { effect, sheetContent, spatial } from '../../lib/motion';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { PressableButton } from './Pressable';

interface ModalShellProps {
  labelledBy: string;
  onClose: () => void;
  /** Shared layout id of the card this sheet grows out of (container transform). */
  layoutId?: string;
  /** Tailwind max-width class for the desktop sheet. */
  maxWidthClass: string;
  children: React.ReactNode;
}

const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 500;
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Dialog chrome shared by the project and certificate sheets. On desktop the
 * sheet grows out of its card (shared layoutId) and shrinks back on close; on
 * phones it is a bottom sheet that can be pulled down with momentum.
 * Mount it inside <AnimatePresence> so the exit animation runs.
 */
export default function ModalShell({
  labelledBy,
  onClose,
  layoutId,
  maxWidthClass,
  children,
}: ModalShellProps) {
  const isPhone = useMediaQuery('(max-width: 639px)');
  const lenis = useLenis();
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const dragY = useMotionValue(0);
  const backdropDim = useTransform(dragY, [0, 320], [1, 0.25]);

  // Freeze the page under the sheet and hand focus to it; give focus back on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    // focusVisible: false keeps the ring for keyboard users only (Chromium honours it)
    sheetRef.current
      ?.querySelector<HTMLElement>('[data-autofocus]')
      ?.focus({ preventScroll: true, focusVisible: false } as FocusOptions);

    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [lenis]);

  // Escape closes; Tab stays inside the sheet
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !sheetRef.current) return;
      const items = Array.from(sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.y > DISMISS_DISTANCE || info.velocity.y > DISMISS_VELOCITY) {
      onClose();
    }
  };

  // Without a card to grow from, the sheet rises in on its own
  const standalone = layoutId
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.97, y: 12, transition: effect.fast },
      };

  const radius = isPhone
    ? { borderTopLeftRadius: 28, borderTopRightRadius: 28, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
    : { borderRadius: 28 };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className={`fixed inset-0 z-[100] flex justify-center ${
        isPhone ? 'items-end' : 'items-center p-6 md:p-10'
      }`}
    >
      {/* Backdrop (Glass Dose #2 of 2 allowed by R-10) */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={effect.default}
        onClick={onClose}
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <m.div
          style={{ opacity: backdropDim }}
          className="absolute inset-0 bg-[#060709]/80 backdrop-blur-md"
        />
      </m.div>

      <m.div
        ref={sheetRef}
        layoutId={layoutId}
        layoutScroll
        data-lenis-prevent
        drag={isPhone ? 'y' : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.9 }}
        onDragEnd={handleDragEnd}
        transition={spatial.slow}
        style={{ ...radius, y: dragY }}
        {...standalone}
        className={`bento-outer relative w-full overflow-y-auto overscroll-contain shadow-2xl space-y-3 ${
          isPhone ? 'max-h-[92dvh] pb-6' : `${maxWidthClass} max-h-[90vh]`
        }`} // taste-skill-ignore: modal dialog overlay
      >
        {isPhone && (
          <div
            onPointerDown={(event) => {
              event.preventDefault(); // no text selection while pulling
              dragControls.start(event);
            }}
            className="flex justify-center pt-1 pb-2 -mb-1 cursor-grab active:cursor-grabbing touch-none"
            aria-hidden="true"
          >
            <span className="block w-10 h-1.5 rounded-full bg-[var(--surface-bright)]" />
          </div>
        )}

        <PressableButton
          type="button"
          data-autofocus
          variants={sheetContent}
          initial="hidden"
          animate="shown"
          exit="gone"
          onClick={onClose}
          className={`absolute top-7 right-7 w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] rounded-full transition-colors z-20`}
          aria-label="Close modal"
        >
          <X size={18} />
        </PressableButton>

        {children}
      </m.div>
    </div>
  );
}
