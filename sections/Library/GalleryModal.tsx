'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import { GalleryItem } from '@/types';

interface GalleryModalProps {
  open: boolean;
  item: GalleryItem | null;
  onClose: () => void;
  mounted: boolean;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ open, item, onClose, mounted }) => {
  if (!mounted || !open || !item) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-6 pointer-events-auto" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title">
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
          className="relative max-w-4xl w-full bg-[#050508] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] z-[100001] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 z-20" aria-label="Close modal">
            <X size={16} />
          </button>

          <div className="relative w-full min-h-[250px] bg-black/40">
            <Image
              src={item.image}
              alt={`Dokumentasi galeri kegiatan ${item.title} di ${item.location}`}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 80vw"
              className="w-full h-auto max-h-[55vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
          </div>

          <div className="p-6 md:p-8 -mt-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em] rounded-lg mb-4">
              <Tag size={10} />
              {item.category}
            </span>

            <h3 id="gallery-modal-title" className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
              {item.title}
            </h3>

            <div className="flex flex-wrap items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar size={13} className="text-cyan-400" />
                <span className="text-xs font-mono">{item.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin size={13} className="text-purple-400" />
                <span className="text-xs font-mono">{item.location}</span>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-cyan-500/20 via-white/5 to-transparent mb-5" />

            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default GalleryModal;