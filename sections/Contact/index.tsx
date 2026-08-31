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
  Copy,
  Check,
} from 'lucide-react';
import { WEB3FORMS_ACCESS_KEY } from '../../constants';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hernataramadhan79@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
      href: 'https://www.linkedin.com/in/hernata-ramadhan-614725350/',
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
      <div className="mb-10">
        <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-[0.25em] mb-2 block">
          06 / CONTACT &amp; CHANNELS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Get In Touch &amp; Collaborate
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-xl">
          Available for software engineering roles, full-stack projects, and direct technical consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Channels & Download CV (Span 5 - 38.2%) */}
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
                  className="glass-card p-5 rounded-2xl flex flex-col justify-between group hover:border-neutral-700 hover:bg-neutral-850 transition-all border-neutral-800/80"
                >
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-4">
                    <span>{ch.num}</span>
                    <Icon size={16} className="text-neutral-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{ch.title}</span>
                      <ArrowUpRight
                        size={14}
                        className="text-neutral-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </h3>
                    <p className="text-xs text-neutral-400 truncate mt-1">{ch.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Quick Copy & Resume Banner Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden border-neutral-800/80 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Direct Communication &amp; Resume
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Reach out directly via email or inspect detailed qualifications in my Curriculum Vitae.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold px-4 py-2.5 rounded-full border border-neutral-700 transition-colors active:scale-[0.98]"
              >
                {copiedEmail ? <Check size={14} className="text-cyan-400" /> : <Copy size={14} />}
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
              </button>

              <a
                href="/Hernata CV.pdf"
                download
                className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 text-xs font-bold px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all active:scale-[0.98]"
              >
                <Download size={14} />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Minimalist Glass Inquiry Form (Span 7 - 61.8%) */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 glass-card p-6 sm:p-8 lg:p-10 rounded-3xl border-neutral-800/80"
        >
          <div className="mb-6 border-b border-neutral-800 pb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Direct Message</h3>
            <span className="text-xs text-cyan-400 font-mono">Web3Forms Endpoint</span>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3 text-xs text-cyan-400">
              <CheckCircle2 size={18} />
              <span>Thank you! Your message has been sent successfully. I will respond promptly.</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-400">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono text-neutral-400 uppercase tracking-wider block" htmlFor="contact-name">
                Your Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Alex Mercer"
                className="form-input w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold font-mono text-neutral-400 uppercase tracking-wider block" htmlFor="contact-email">
                Your Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g. alex@company.com"
                className="form-input w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold font-mono text-neutral-400 uppercase tracking-wider block" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Share your inquiry, engineering scope, or role..."
                className="form-input w-full resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-150 active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Dispatching Message...</span>
                </>
              ) : (
                <>
                  <span>Dispatch Message</span>
                  <Send size={13} />
                </>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}

