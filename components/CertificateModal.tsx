'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ExternalLink } from 'lucide-react';
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#090A0F]/85 backdrop-blur-xl -z-10"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 6 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card relative w-full max-w-2xl bg-[#0d0e13]/95 border border-white/15 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#c4c7c8] hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors z-20"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <Award size={20} />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                {cert.issuer} • {cert.date}
              </span>
              <h3 className="text-xl font-bold text-white leading-tight">
                {cert.title}
              </h3>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black/50 mb-6">
            <Image
              src={cert.certificateImage}
              alt={cert.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 640px"
              priority
            />
          </div>

          <div className="flex justify-end">
            <a
              href={cert.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-sky-400 text-black text-xs font-bold px-5 py-2.5 rounded-full hover:brightness-110 shadow-lg transition-transform hover:scale-105"
            >
              <span>View Credential / Full Image</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
