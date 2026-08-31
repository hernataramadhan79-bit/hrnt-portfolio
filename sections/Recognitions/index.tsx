'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, ExternalLink } from 'lucide-react';
import { certificates, galleryItems } from '../../constants';
import { Certificate } from '../../types';

interface RecognitionsProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export default function Recognitions({ onSelectCertificate }: RecognitionsProps) {
  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          05 / CREDENTIALS &amp; ACCOMPLISHMENTS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Recognitions &amp; Verified Credentials
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-xl">
          National competence qualifications, certified engineering specializations, and creative cohorts.
        </p>
      </div>

      {/* Top Section: Verified Certificates Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onSelectCertificate(cert)}
            className="glass-card p-6 flex flex-col justify-between group cursor-pointer hover:border-neutral-700 transition-colors duration-200 rounded-3xl"
          >
            <div>
              {/* Certificate Image Preview */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 bg-neutral-900 border border-neutral-800">
                <Image
                  src={cert.certificateImage}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                  <ExternalLink size={13} />
                </div>
              </div>

              {/* Issuer Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="glass-badge px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/20">
                  {cert.issuer}
                </span>
                <span className="text-xs text-neutral-500 font-mono">{cert.date}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {cert.title}
              </h3>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Verified Credential</span>
              <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                Inspect Image →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section: Media Documentation Gallery */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-neutral-800/80">
        <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Camera size={18} className="text-cyan-400" />
              <span>Creative Industry Cohort &amp; Media Acceleration</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              UPTPTKK East Java acceleration sessions in visual design and digital media production.
            </p>
          </div>
          <span className="text-xs text-neutral-500 font-mono hidden sm:inline-block">Surabaya, ID</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex flex-col justify-between group hover:border-neutral-700 transition-colors"
            >
              <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-4 bg-neutral-900 border border-neutral-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
