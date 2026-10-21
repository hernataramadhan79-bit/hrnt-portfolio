'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateModalProps {
  cert: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ cert, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (cert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#060709]/80 backdrop-blur-md -z-10"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }}
          className="bento-outer relative w-full max-w-2xl overflow-hidden shadow-2xl space-y-3" // taste-skill-ignore: modal dialog overlay
        >
          <div className="bento-inner p-4 sm:p-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-[12px] overflow-hidden bg-[var(--surface-1)] shrink-0">
                <Image
                  src={cert.image}
                  alt={cert.issuer}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--accent-pixel)] tabular-nums">
                  <ShieldCheck size={13} />
                  <span>{cert.issuer} • Issued {cert.date}</span>
                </div>
                <h3
                  id="cert-modal-title"
                  className="text-base sm:text-lg font-extrabold text-[#F1F5F9] tracking-tight truncate"
                >
                  {cert.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[#F1F5F9] bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] rounded-full transition-colors shrink-0 active:scale-95"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <div className="bento-inner p-3">
            <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[var(--surface-1)]">
              <Image
                src={cert.certificateImage}
                alt={cert.title}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 640px"
                priority
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-2 pt-1">
            <span className="text-xs font-medium text-[var(--text-muted)]">
              Apple Wallet Credential Sheet
            </span>
            <a
              href={cert.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--accent-pixel)] hover:bg-[var(--accent-pixel-bright)] text-[var(--on-accent-pixel)] text-xs font-bold px-5 py-2.5 rounded-full transition-transform active:scale-95"
            >
              <span>Open Full Resolution</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
