'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Instagram, Loader2 } from 'lucide-react';
import { WEB3FORMS_ACCESS_KEY } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Removed: useMotionValue + useMotionTemplate spotlight (was updating 2 radial-gradients
  // on every mousemove — major GPU bottleneck). Replaced with CSS hover transition.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setIsSuccess(false);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        // Auto-clear success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 min-h-screen flex flex-col justify-center w-full pt-16 sm:pt-20 lg:pt-20 pb-6 px-4 sm:px-6 overflow-hidden scroll-mt-0">
      {/* Full-bleed Ambient Background Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(34,211,238,0.06)_0%,rgba(168,85,247,0.05)_45%,transparent_100%)]" />
        <div className="absolute top-[20%] right-10 w-[350px] h-[350px] xl:w-[400px] xl:h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-10 w-[300px] h-[300px] xl:w-[350px] xl:h-[350px] bg-purple-500/10 rounded-full blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto relative w-full h-full flex flex-col lg:justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center flex-1 min-h-0">

          {/* --- LEFT: Info --- */}
          <div className="space-y-4 lg:space-y-5 xl:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[9px] xl:text-[10px] font-mono uppercase tracking-[0.3em] mb-3 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Open for Collaboration
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-5xl font-black text-white leading-[0.95] tracking-tighter mb-3">
                Let's start a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">conversation.</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                Whether you need a complete platform overhaul or a touch of creative magic, I'm ready to engineer your vision into reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4 lg:space-y-5"
            >
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">Direct Channel</p>
                <a href="mailto:hernataramadhan79@gmail.com" className="group inline-flex items-center gap-3 text-base sm:text-lg xl:text-xl font-medium text-white hover:text-cyan-400 transition-colors">
                  <Mail size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="truncate">hernataramadhan79@gmail.com</span>
                </a>
              </div>

                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Social Connect</p>
                  <div className="flex gap-2.5 sm:gap-3">
                    {[
                      { icon: Github, href: 'https://github.com/hernataramadhan79-bit', label: 'GitHub profile' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/in/hernata-ramadhan-176b68338', label: 'LinkedIn profile' },
                      { icon: Instagram, href: 'https://www.instagram.com/heropakentanq15_', label: 'Instagram profile' }
                    ].map((item, idx) => (
                      <motion.a
                        key={idx}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        whileHover={{ scale: 1.12, y: -4 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-xl bg-[#0a0a0f] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] transition-all duration-300 shadow-md"
                      >
                        <item.icon size={17} className="transition-transform group-hover:scale-110" />
                      </motion.a>
                    ))}
                  </div>
                </div>
            </motion.div>
          </div>

          {/* --- RIGHT: Contact Form --- */}
          <div className="relative">
            <div
              className="group relative rounded-2xl lg:rounded-[2rem] bg-[#050508] border border-white/5 hover:border-cyan-500/20 transition-all duration-500 hover:shadow-[0_0_60px_rgba(34,211,238,0.08)] overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 rounded-2xl lg:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" style={{ boxShadow: 'inset 0 0 60px rgba(34,211,238,0.06)' }} />

              <div className="relative h-full bg-[#050508] rounded-2xl lg:rounded-[2rem] overflow-hidden m-[1px] p-4 sm:p-6 xl:p-8 z-20">

                {/* Background Grid */}
                <div
                  className={`absolute inset-0 bg-grid-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none`}
                />

                {/* Outer Glow Orb */}
                <div
                  className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-cyan-500 pointer-events-none`}
                />

                {/* Layer 1: Inputs */}
                <form onSubmit={handleSubmit} className="space-y-4 xl:space-y-5 relative z-30">

                  <div className="grid grid-cols-2 gap-3 sm:gap-4" style={{ transform: "translateZ(20px)" }}>
                    <div className="space-y-1.5 group">
                      <label htmlFor="contact-name" className="text-[10px] uppercase tracking-wider text-slate-300 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        className="w-full bg-[#0a0a0f]/90 border border-white/15 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.06] transition-all shadow-md"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 group">
                      <label htmlFor="contact-email" className="text-[10px] uppercase tracking-wider text-slate-300 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={254}
                        className="w-full bg-[#0a0a0f]/90 border border-white/15 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.06] transition-all shadow-md"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 group relative" style={{ transform: "translateZ(30px)" }}>
                    <label htmlFor="contact-message" className="text-[10px] uppercase tracking-wider text-slate-300 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Message</label>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        rows={3}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        minLength={20}
                        maxLength={2000}
                        className="w-full bg-[#0a0a0f] border border-white/15 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.06] transition-all resize-none shadow-md"
                        placeholder="Tell me about your project goals or inquiries... (min. 20 characters)"
                        required
                      />
                    </div>
                  </div>

                  {/* Layer 2: Button (Highest) */}
                  <div className="pt-2" style={{ transform: "translateZ(50px)" }}>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative w-full h-11 sm:h-12 bg-white text-black rounded-xl font-black uppercase text-[10px] xl:text-xs tracking-wider overflow-hidden flex items-center justify-center transition-all hover:scale-[1.01] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                      <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors text-base">
                      {isLoading ? 'Sending...' : 'Send Message'}
                        {isLoading
                          ? <Loader2 size={18} className="animate-spin" />
                          : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        }
                      </span>
                    </button>
                  </div>

                  {/* Feedback Messages */}
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm text-center mt-4"
                      role="status"
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm text-center mt-4"
                      role="alert"
                    >
                      {error}
                    </motion.div>
                  )}
                </form>

                {/* Layer 3: Decor */}
                <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/10 rounded-tr-2xl pointer-events-none" style={{ transform: "translateZ(20px)" }} />
                <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/10 rounded-bl-2xl pointer-events-none" style={{ transform: "translateZ(20px)" }} />

                <div className="absolute top-10 right-10" style={{ transform: "translateZ(40px)" }}>
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e] animate-pulse"></div>
                </div>

              </div>
            </div>

            <div className="absolute -z-10 inset-6 bg-cyan-500/20 rounded-[3rem] blur-3xl opacity-20 transform translate-y-10" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default React.memo(Contact);