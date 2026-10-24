'use client';

import React from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Certificate } from '../types';
import ModalShell from './ui/ModalShell';
import { layoutIds, sheetContent, spatial } from '../lib/motion';
import { PressableLink } from './ui/Pressable';

interface CertificateModalProps {
  cert: Certificate;
  onClose: () => void;
}

/**
 * Credential sheet. The certificate picture flies in from the inline preview
 * (shared layoutId) while the sheet rises around it.
 */
export default function CertificateModal({ cert, onClose }: CertificateModalProps) {
  return (
    <ModalShell labelledBy="cert-modal-title" onClose={onClose} maxWidthClass="max-w-2xl">
      <m.div
        variants={sheetContent}
        custom={0}
        initial="hidden"
        animate="shown"
        exit="gone"
        className="bento-inner p-4 sm:p-5 pr-16 flex items-center gap-3 min-w-0"
      >
        <div className="relative w-11 h-11 rounded-[12px] overflow-hidden bg-[var(--surface-1)] shrink-0">
          <Image src={cert.image} alt={cert.issuer} fill className="object-cover" sizes="44px" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--accent-pixel)] tabular-nums">
            <ShieldCheck size={13} />
            <span>
              {cert.issuer} • Issued {cert.date}
            </span>
          </div>
          <h3
            id="cert-modal-title"
            className="text-base sm:text-lg font-extrabold text-[#F1F5F9] tracking-tight truncate"
          >
            {cert.title}
          </h3>
        </div>
      </m.div>

      <div className="bento-inner p-3">
        <m.div
          layoutId={layoutIds.certImage(cert.id)}
          transition={spatial.slow}
          style={{ borderRadius: 16 }}
          className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--surface-1)]"
        >
          <Image
            src={cert.certificateImage}
            alt={cert.title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 640px"
            priority
          />
        </m.div>
      </div>

      <m.div
        variants={sheetContent}
        custom={1}
        initial="hidden"
        animate="shown"
        exit="gone"
        className="flex items-center justify-between gap-3 px-2 pt-1"
      >
        <span className="text-xs font-medium text-[var(--text-muted)]">
          Verified Professional Credential
        </span>
        <PressableLink
          href={cert.credentialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors inline-flex items-center gap-2 bg-[var(--accent-pixel)] hover:bg-[var(--accent-pixel-bright)] text-[var(--on-accent-pixel)] text-xs font-bold px-5 py-2.5 rounded-full"
        >
          <span>Open Full Resolution</span>
          <ExternalLink size={14} />
        </PressableLink>
      </m.div>
    </ModalShell>
  );
}
