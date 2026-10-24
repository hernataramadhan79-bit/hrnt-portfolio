'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
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
import { PressableButton, PressableLink } from '../../components/ui/Pressable';
import { effect, spatial } from '../../lib/motion';

export default function Contact({ embedded = false }: { embedded?: boolean }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  // The send button tells the story by changing shape: pill → spinner → check → pill
  const [sendPhase, setSendPhase] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('hernataramadhan79@gmail.com');
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSendPhase('sending');
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
        setSendPhase('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSendPhase('idle'), 1800);
        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        throw new Error('Failed to dispatch inquiry. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Transmission failed. Please reach out directly via email.');
      setSendPhase('failed');
      setTimeout(() => setSendPhase('idle'), 650);
    }
  };

  const channels = [
    {
      title: 'GitHub',
      value: '@hernataramadhan79-bit',
      href: 'https://github.com/hernataramadhan79-bit',
      icon: Github,
    },
    {
      title: 'LinkedIn',
      value: 'Hernata Ramadhan',
      href: 'https://www.linkedin.com/in/hernata-ramadhan-614725350/',
      icon: Linkedin,
    },
    {
      title: 'Instagram',
      value: '@heropakentanq15_',
      href: 'https://www.instagram.com/heropakentanq15_/',
      icon: Instagram,
    },
    {
      title: 'Direct Mail',
      value: 'hernataramadhan79',
      href: 'mailto:hernataramadhan79@gmail.com',
      icon: Mail,
    },
  ];

  const innerPanel = (
    <div id="contact" className="bento-outer space-y-3 h-full flex flex-col justify-between">
      {/* Top Direct Channel Card with Interactive Feedback */}
      <div className="bento-inner p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[var(--accent-pixel)]">
              Direct Engineering Channel
            </span>
            <h3 className="text-lg sm:text-xl font-black text-[#F1F5F9] tracking-tight mt-0.5">
              Instant Dispatch &amp; Socials
            </h3>
          </div>
          <PressableLink
            href="/Hernata CV.pdf"
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[#F1F5F9] text-xs font-semibold transition-colors"
          >
            <Download size={13} className="text-[var(--accent-pixel)]" />
            <span>CV.pdf</span>
          </PressableLink>
        </div>

        {/* One-Click Copy Email Pill with State Feedback */}
        <PressableButton
          type="button"
          onClick={handleCopyEmail}
          className={`transition-colors w-full py-3 px-4 rounded-full text-xs font-medium flex items-center justify-between cursor-pointer ${
            copiedEmail
              ? 'bg-[var(--accent-pixel)] text-[var(--on-accent-pixel)] font-bold'
              : 'bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[#F1F5F9]'
          }`}
        >
          <span className="flex items-center gap-2 truncate">
            <Mail size={14} className={copiedEmail ? 'text-[var(--on-accent-pixel)]' : 'text-[var(--accent-pixel)]'} />
            <span className="truncate">hernataramadhan79@gmail.com</span>
          </span>
          <AnimatePresence mode="wait" initial={false}>
            {copiedEmail ? (
              <m.span
                key="copied"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: effect.fast }}
                transition={spatial.fast}
                className="inline-flex items-center gap-1 shrink-0"
              >
                <Check size={13} />
                <span>Copied to clipboard</span>
              </m.span>
            ) : (
              <m.span
                key="copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: effect.fast }}
                transition={spatial.fast}
                className="inline-flex items-center gap-1 text-[var(--accent-pixel)] shrink-0"
              >
                <Copy size={13} />
                <span>Copy Email</span>
              </m.span>
            )}
          </AnimatePresence>
        </PressableButton>

        {/* Tonal Social Pills Grid */}
        <div className="grid grid-cols-2 gap-2">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.title}
                href={ch.href}
                target={ch.title === 'Direct Mail' ? undefined : '_blank'}
                rel={ch.title === 'Direct Mail' ? undefined : 'noopener noreferrer'}
                className="p-3 rounded-[14px] bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] transition-colors group flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon size={14} className="text-[var(--accent-pixel)] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#F1F5F9] truncate">{ch.title}</div>
                    <div className="text-[10px] text-[var(--text-secondary)] truncate">{ch.value}</div>
                  </div>
                </div>
                <ArrowUpRight
                  size={13}
                  className="text-[var(--text-muted)] group-hover:text-[#F1F5F9] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom Direct Inquiry Form (Honest Placeholders per R-23/R-38) */}
      <div className="bento-inner p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between shrink-0">
          <h4 className="text-sm font-bold text-[#F1F5F9]">Direct Email Dispatch</h4>
          <span className="text-[10px] font-medium text-[var(--accent-pixel)] bg-[var(--surface-1)] px-2.5 py-0.5 rounded-full">
            Web3Forms API
          </span>
        </div>

        <AnimatePresence initial={false}>
          {isSuccess && (
            <m.div
              key="sent"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, transition: effect.default }}
              transition={spatial.default}
              className="overflow-hidden shrink-0"
            >
              <div className="p-3 rounded-[12px] bg-[var(--surface-1)] flex items-center gap-2.5 text-xs text-[var(--accent-pixel-bright)]">
                <CheckCircle2 size={16} className="text-[var(--accent-pixel)] shrink-0" />
                <span>Inquiry dispatched. Expect a direct response within 24 hours.</span>
              </div>
            </m.div>
          )}

          {error && (
            <m.div
              key="error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, transition: effect.default }}
              transition={spatial.default}
              className="overflow-hidden shrink-0"
            >
              <div className="p-3 rounded-[12px] bg-rose-500/10 flex items-center gap-2.5 text-xs text-rose-300">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0">
            <div>
              <label
                className="text-[11px] font-semibold text-[var(--text-secondary)] block mb-1 ml-1"
                htmlFor="contact-name"
              >
                Your Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full bg-[var(--surface-1)] rounded-[12px] px-3.5 py-2.5 text-xs text-[#F1F5F9] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-pixel)]"
              />
            </div>

            <div>
              <label
                className="text-[11px] font-semibold text-[var(--text-secondary)] block mb-1 ml-1"
                htmlFor="contact-email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
                className="w-full bg-[var(--surface-1)] rounded-[12px] px-3.5 py-2.5 text-xs text-[#F1F5F9] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-pixel)]"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-[100px]">
            <label
              className="text-[11px] font-semibold text-[var(--text-secondary)] block mb-1 ml-1"
              htmlFor="contact-message"
            >
              Project Scope or Role Details
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Drop your message here..."
              className="w-full flex-1 min-h-[96px] bg-[var(--surface-1)] rounded-[12px] px-3.5 py-2.5 text-xs text-[#F1F5F9] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-pixel)] resize-none leading-relaxed"
            />
          </div>

          {/* A failed send shakes its head; the button itself morphs between states */}
          <m.div
            className="flex justify-center shrink-0"
            animate={sendPhase === 'failed' ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <PressableButton
              magnetic={sendPhase === 'idle'}
              layout
              type="submit"
              disabled={sendPhase === 'sending' || sendPhase === 'sent'}
              aria-label={
                sendPhase === 'sending'
                  ? 'Sending inquiry'
                  : sendPhase === 'sent'
                    ? 'Inquiry sent'
                    : undefined
              }
              transition={spatial.default}
              className={`transition-colors h-11 ${
                sendPhase === 'sending' || sendPhase === 'sent' ? 'w-11' : 'w-full'
              } rounded-full bg-[var(--accent-pixel)] hover:bg-[var(--accent-pixel-bright)] text-[var(--on-accent-pixel)] text-xs font-bold flex items-center justify-center overflow-hidden cursor-pointer disabled:cursor-default`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <m.span
                  key={sendPhase === 'failed' ? 'idle' : sendPhase}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6, transition: effect.fast }}
                  transition={spatial.fast}
                  className="inline-flex items-center gap-2 whitespace-nowrap"
                >
                  {sendPhase === 'sending' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : sendPhase === 'sent' ? (
                    <Check size={18} strokeWidth={2.6} />
                  ) : (
                    <>
                      <span>Send Direct Inquiry</span>
                      <Send size={13} />
                    </>
                  )}
                </m.span>
              </AnimatePresence>
            </PressableButton>
          </m.div>
        </form>
      </div>
    </div>
  );

  if (embedded) {
    return innerPanel;
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {innerPanel}
    </section>
  );
}
