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
      <div className="mb-12">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          05 / CREDENTIALS &amp; ACCOMPLISHMENTS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Recognitions &amp; Verified Credentials
        </h2>
        <p className="text-sm text-[#8e9192] mt-2 max-w-xl">
          National competence qualifications, certified engineering specializations, and creative cohorts.
        </p>
      </div>

      {/* Top Section: Verified Certificates Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onSelectCertificate(cert)}
            className="glass-card p-6 flex flex-col justify-between group cursor-pointer hover:border-cyan-400/30 transition-colors duration-200 rounded-3xl"
          >
            <div>
              {/* Certificate Image Preview */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 bg-black/40 border border-white/10">
                <Image
                  src={cert.certificateImage}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-500/30 group-hover:border-cyan-400/80 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all duration-200">
                  <ExternalLink size={14} className="text-cyan-300" />
                </div>
              </div>

              {/* Issuer Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="tech-badge text-[10px] text-cyan-300 border-cyan-400/30">
                  {cert.issuer}
                </span>
                <span className="text-xs text-[#8e9192] font-mono">{cert.date}</span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {cert.title}
              </h3>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#8e9192]">
              <span>Verified Credential</span>
              <span className="text-cyan-400 font-semibold">Inspect Image →</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section: Media Documentation Gallery */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Camera size={20} className="text-cyan-400" />
              <span>Creative Industry Cohort &amp; Media Acceleration</span>
            </h3>
            <p className="text-xs text-[#8e9192] mt-1">
              UPTPTKK East Java acceleration sessions in visual design and digital media production.
            </p>
          </div>
          <span className="text-xs text-cyan-400 font-mono hidden sm:inline-block">Surabaya, ID</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between group hover:border-cyan-400/30 transition-colors"
            >
              <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-4 bg-black/40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-[#8e9192] font-mono mb-1.5">
                  <span>{item.location}</span>
                  <span>{item.date}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-[#8e9192] leading-relaxed font-normal">
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
