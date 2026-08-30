'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  Download,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { WEB3FORMS_ACCESS_KEY } from '../../constants';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsLoading(true);
    setError('');
    setIsSuccess(false);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        throw new Error('Failed to dispatch inquiry. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Transmission failed. Please reach out directly via email.');
    } finally {
      setIsLoading(false);
    }
  };

  const channels = [
    {
      num: '01',
      title: 'Email',
      value: 'hernataramadhan79@gmail.com',
      href: 'mailto:hernataramadhan79@gmail.com',
      icon: Mail,
    },
    {
      num: '02',
      title: 'GitHub',
      value: '@hernataramadhan79-bit',
      href: 'https://github.com/hernataramadhan79-bit',
      icon: Github,
    },
    {
      num: '03',
      title: 'LinkedIn',
      value: 'Hernata Ramadhan',
      href: 'https://www.linkedin.com/in/hernata-ramadhan-176b68338',
      icon: Linkedin,
    },
    {
      num: '04',
      title: 'Instagram',
      value: '@heropakentanq15_',
      href: 'https://www.instagram.com/heropakentanq15_/',
      icon: Instagram,
    },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          07 / CONTACT &amp; CHANNELS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Get In Touch &amp; Collaborate
        </h2>
        <p className="text-sm text-[#8e9192] mt-2 max-w-xl">
          Available for software engineering roles, full-stack projects, and direct technical consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Channels & Download CV (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.title}
                  href={ch.href}
                  target={ch.title === 'Email' ? undefined : '_blank'}
                  rel={ch.title === 'Email' ? undefined : 'noopener noreferrer'}
                  className="glass-card p-5 rounded-2xl flex flex-col justify-between group hover:border-cyan-400/30 hover:bg-white/[0.04] transition-colors duration-200"
                >
                  <div className="flex items-center justify-between text-xs text-[#8e9192] font-mono mb-4">
                    <span>{ch.num}</span>
                    <Icon size={16} className="text-[#c4c7c8] group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{ch.title}</span>
                      <ArrowUpRight
                        size={14}
                        className="text-[#8e9192] group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                      />
                    </h3>
                    <p className="text-xs text-[#8e9192] truncate mt-1">{ch.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Download Resume Banner Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-2">
              Engineering Credentials &amp; Background
            </h3>
            <p className="text-xs text-[#8e9192] leading-relaxed mb-6 font-normal">
              Download my official Curriculum Vitae detailing academic foundations, production architectures,
              and full-stack achievements.
            </p>
            <a
              href="/Hernata CV.pdf"
              download
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-cyan-400 to-sky-400 text-black text-xs font-bold px-6 py-3 rounded-full hover:brightness-110 shadow-[0_0_15px_rgba(34,211,238,0.35)] transition-transform duration-200 hover:scale-105"
            >
              <span>Download Official CV (PDF)</span>
              <Download size={15} />
            </a>
          </div>
        </div>

        {/* Right Column: Minimalist Glass Inquiry Form (Span 7) */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 glass-card p-6 sm:p-8 lg:p-10 rounded-3xl"
        >
          <div className="mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Direct Message</h3>
            <span className="text-xs text-cyan-400 font-mono">Web3Forms Endpoint</span>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center gap-3 text-xs text-cyan-300">
              <CheckCircle2 size={18} />
              <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-300">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono text-[#8e9192] uppercase tracking-wider block" htmlFor="contact-name">
                Your Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. John Doe"
                className="form-input w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold font-mono text-[#8e9192] uppercase tracking-wider block" htmlFor="contact-email">
                Your Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g. john@company.com"
                className="form-input w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold font-mono text-[#8e9192] uppercase tracking-wider block" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Share your message, project scope, or inquiry..."
                className="form-input w-full resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
