'use client';

import React from 'react';

const SkipLink: React.FC = () => (
  <a
    href="#main-content"
    className="fixed top-0 left-0 z-[99999] -translate-y-full focus:translate-y-0 transition-transform duration-200 bg-cyan-400 text-black px-6 py-3 font-black uppercase text-[10px] tracking-widest rounded-br-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
  >
    Skip to main content
  </a>
);

export default SkipLink;