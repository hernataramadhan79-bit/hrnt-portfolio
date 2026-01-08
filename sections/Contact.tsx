import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative z-10 py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT: Info --- */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-[0.3em] mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"/>
                Open for Collaboration
              </div>
              
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Let's start a <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">conversation.</span>
              </h2>
              
              <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                Whether you need a complete platform overhaul or a touch of creative magic, I'm ready to engineer your vision into reality.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Direct Channel</p>
                <a href="mailto:hello@hrnt.dev" className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-medium text-white hover:text-cyan-400 transition-colors">
                  <Mail className="group-hover:scale-110 transition-transform duration-300" />
                  <span>hello@hrnt.dev</span>
                </a>
              </div>

              <div>
                 <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Social Connect</p>
                 <div className="flex gap-4">
                  {[
                    { icon: Github, href: '#' },
                    { icon: Linkedin, href: '#' },
                    { icon: Twitter, href: '#' }
                  ].map((item, idx) => (
                    <MagneticButton key={idx} className="w-14 h-14 rounded-2xl bg-[#0a0a0f] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300">
                      <item.icon size={20} />
                    </MagneticButton>
                  ))}
                 </div>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: 3D Form --- */}
          <div className="relative perspective-1000">
            <TiltCard className="rounded-[2.5rem] bg-[#050508]/80 backdrop-blur-xl border border-white/10 p-1 shadow-2xl">
              <div className="relative rounded-[2rem] overflow-hidden p-8 md:p-12" style={{ transformStyle: 'preserve-3d' }}>
                
                {/* Layer 0: Card Base */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" style={{ transform: "translateZ(0px)" }} />
                
                {/* Layer 1: Inputs (Mid Depth) */}
                <form className="space-y-8 relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                  
                  <div className="grid grid-cols-2 gap-6" style={{ transform: "translateZ(20px)" }}>
                    <div className="space-y-2 group">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#0a0a0f]/90 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all shadow-lg hover:translate-y-[-2px]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Email</label>
                      <input 
                        type="email" 
                        className="w-full bg-[#0a0a0f]/90 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all shadow-lg hover:translate-y-[-2px]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group relative" style={{ transform: "translateZ(30px)" }}>
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 group-focus-within:text-cyan-400 transition-colors">Message</label>
                    <div className="relative group-hover:scale-[1.01] transition-transform duration-500 ease-out">
                        <textarea 
                          rows={5}
                          className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all resize-none shadow-xl"
                          placeholder="Tell me about your project..."
                        />
                    </div>
                  </div>

                  {/* Layer 2: Button (Highest) */}
                  <div className="pt-6" style={{ transform: "translateZ(50px)" }}>
                    <button className="group relative w-full h-16 bg-white text-black rounded-2xl font-black uppercase tracking-wider overflow-hidden flex items-center justify-center transition-all hover:scale-[1.02] shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                      <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors text-lg">
                        Initiate Transmission <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </form>

                {/* Layer 3: Decor */}
                <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/10 rounded-tr-2xl pointer-events-none" style={{ transform: "translateZ(20px)" }} />
                <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/10 rounded-bl-2xl pointer-events-none" style={{ transform: "translateZ(20px)" }} />
                
                 <div className="absolute top-10 right-10" style={{ transform: "translateZ(40px)" }}>
                   <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e] animate-pulse"></div>
                </div>

              </div>
            </TiltCard>
            
            <div className="absolute -z-10 inset-6 bg-cyan-500/20 rounded-[3rem] blur-3xl opacity-20 transform translate-y-10" />
          </div>

        </div>

        <footer className="mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.2em]">
             © 2025 HRNT System. All rights reserved.
           </div>
           <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
             All Systems Operational
           </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;