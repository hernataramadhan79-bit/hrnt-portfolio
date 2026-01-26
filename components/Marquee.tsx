import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden flex items-center bg-[#020205]/30 border-y border-white/10 backdrop-blur-md py-6 select-none z-20">
      <motion.div
        className="flex whitespace-nowrap gap-12 min-w-full"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        style={{ willChange: 'transform' }}
      >
        {Array(10).fill("Creative Developer • Fullstack • UI/UX • ").map((item, i) => (
          <span key={i} className="text-4xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5 tracking-tighter">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default React.memo(Marquee);