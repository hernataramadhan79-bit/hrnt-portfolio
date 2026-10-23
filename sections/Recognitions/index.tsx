'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Camera, ShieldCheck, Eye } from 'lucide-react';
import { certificates, galleryItems } from '../../constants';
import { Certificate } from '../../types';

interface RecognitionsProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export default function Recognitions({ onSelectCertificate }: RecognitionsProps) {
  const [activePassId, setActivePassId] = useState<number>(certificates[0]?.id ?? 1);

  const activeCert =
    certificates.find((c) => c.id === activePassId) || certificates[0];

  return (
    <section
      id="awards"
      aria-label="Zone 03: Professional Credentials"
      className="w-full max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-4"
    >
      {/* Zone Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F1F5F9] tracking-tight">
            Credentials &amp; Qualifications Wallet
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            National KKNI Level III competence certifications, software engineering credentials, and creative cohort documentation.
          </p>
        </div>
      </div>

      {/* Asymmetric Golden Ratio Split (62% Interactive Pass Inspector : 38% Cohort Passes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* LEFT (lg:col-span-7): Credentials & Qualifications Stack */}
        <div className="lg:col-span-7 bento-outer flex flex-col justify-between space-y-3">
          {/* Wallet Pass Selector Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {certificates.map((cert, idx) => {
              const isSelected = cert.id === activeCert.id;
              return (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setActivePassId(cert.id)}
                  className={`p-3.5 rounded-[16px] text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--surface-pill)] text-[#F1F5F9] scale-[1.01]'
                      : 'bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text-secondary)]'
                  }`}
                >
                  {/* Pass Header Bar with Issuer Logo */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[var(--surface-1)] shrink-0">
                        <Image
                          src={cert.image}
                          alt={cert.issuer}
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </div>
                      <span className="text-xs font-bold text-[#F1F5F9] truncate">
                        {cert.issuer}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--accent-pixel)] tabular-nums font-medium">
                      Verified Pass
                    </span>
                  </div>

                  {/* Pass Title & Year */}
                  <div>
                    <div className="text-xs font-bold text-[#F1F5F9] line-clamp-2 leading-snug">
                      {cert.title}
                    </div>
                    <div className="flex items-center justify-between mt-2.5 pt-1 text-[10px] font-medium text-[var(--text-muted)] tabular-nums">
                      <span>ISSUED {cert.date}</span>
                      <span className="text-[var(--accent-pixel)]">VERIFIED</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Wallet Pass Inline Preview (Zero Friction Inspection) */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeCert.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="bento-inner p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              <div
                onClick={() => onSelectCertificate(activeCert)}
                className="relative w-full sm:w-64 h-40 rounded-[14px] overflow-hidden bg-[var(--surface-1)] shrink-0 cursor-pointer group"
              >
                <Image
                  src={activeCert.certificateImage}
                  alt={activeCert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D]/70 via-transparent to-transparent" /> {/* taste-skill-ignore: neutral scrim over photo */}
                <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#111318]/90 text-[10px] font-medium text-[var(--accent-pixel)]">
                  Tap to Enlarge
                </span>
              </div>

              <div className="flex-1 space-y-2.5 w-full">
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden bg-[var(--surface-1)] shrink-0">
                    <Image
                      src={activeCert.image}
                      alt={activeCert.issuer}
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  </div>
                  <span className="text-xs text-[var(--accent-pixel)] font-semibold tabular-nums">
                    {activeCert.issuer} • {activeCert.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[#F1F5F9] leading-snug">
                  {activeCert.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                  <ShieldCheck size={14} className="text-[var(--accent-pixel)] shrink-0" />
                  <span>Authentic digital credential available for full-screen sheet inspection.</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectCertificate(activeCert)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent-pixel)] hover:bg-[var(--accent-pixel-bright)] text-[var(--on-accent-pixel)] text-xs font-bold transition-transform active:scale-95 cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>Open Credential Pass</span>
                  </button>
                  <a
                    href={activeCert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[#F1F5F9] text-xs font-semibold transition-colors"
                  >
                    <span>Raw Document</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT (lg:col-span-5): Creative Cohort & Field Documentation Passes */}
        <div className="lg:col-span-5 bento-outer flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between px-2 pt-1 shrink-0">
            <div className="flex items-center gap-2">
              <Camera size={15} className="text-[var(--accent-pixel)]" />
              <h3 className="text-sm font-bold text-[#F1F5F9]">
                UPTPTKK Cohort Passes
              </h3>
            </div>
            <span className="text-[11px] font-medium text-[var(--text-muted)]">Surabaya, ID</span>
          </div>

          <div className="gap-3 flex-1 flex flex-col">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="bento-inner p-4 flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
              >
                <div className="relative w-full sm:w-32 h-28 sm:h-full min-h-[96px] rounded-[12px] overflow-hidden bg-[var(--surface-1)] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 128px"
                  />
                </div>
                <div className="min-w-0 flex-1 flex flex-col justify-between h-full py-0.5">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[var(--accent-pixel)] tabular-nums mb-1 font-semibold">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#F1F5F9] leading-snug line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 sm:line-clamp-3 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block text-[10px] font-medium text-[var(--accent-pixel)] bg-[var(--surface-1)] px-2.5 py-0.5 rounded-full">
                      {item.category} • MJC Cohort 1
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
