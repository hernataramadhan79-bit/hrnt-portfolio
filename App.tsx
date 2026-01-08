import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import Background from './components/Background';

// Lazy load sections for better initial performance
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Library from './sections/Library';
import Contact from './sections/Contact';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen key="splash" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="main" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <Background />
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Library />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;