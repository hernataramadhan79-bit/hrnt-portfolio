import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import Background from './components/Background';

// Lazy load sections for better initial performance
const Hero = React.lazy(() => import('./sections/Hero'));
const About = React.lazy(() => import('./sections/About'));
const Skills = React.lazy(() => import('./sections/Skills'));
const Library = React.lazy(() => import('./sections/Library'));
const Contact = React.lazy(() => import('./sections/Contact'));

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
            <Suspense fallback={null}>
              <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Library />
                <Contact />
              </main>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;