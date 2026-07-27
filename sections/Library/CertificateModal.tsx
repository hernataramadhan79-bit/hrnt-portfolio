'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Certificate } from '@/types';

interface CertificateModalProps {
  open: boolean;
  cert: Certificate | null;
  onClose: () => void;
  mounted: boolean;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ open, cert, onClose, mounted }) => {
  if (!mounted || !open || !cert) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-8 pointer-events-auto" role="dialog" aria-modal="true" aria-labelledby="cert-modal-title">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
        />
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative max-w-3xl w-full bg-[#050508] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] z-[100001]"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-white/20 z-10" aria-label="Close modal">
            <X size={16} />
          </button>
          <div className="p-4 md:p-6 flex items-center justify-center bg-black/50">
            <img src={cert.certificateImage} alt={cert.title} className="w-full h-auto max-h-[65vh] object-contain rounded-lg" />
          </div>
          <div className="px-6 pb-6">
            <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em] rounded-lg">
              {cert.issuer} • {cert.date}
            </span>
            <h3 id="cert-modal-title" className="text-xl md:text-2xl font-black text-white mt-3 uppercase tracking-tighter leading-none">
              {cert.title}
            </h3>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default CertificateModal;