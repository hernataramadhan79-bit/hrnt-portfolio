import React, { useState, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import Background from './components/Background';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-cyan-500 rounded-full hover:bg-cyan-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load sections for better initial performance
const Hero = React.lazy(() => import('./sections/Hero'));
const About = React.lazy(() => import('./sections/About'));
const Skills = React.lazy(() => import('./sections/Skills'));
const Library = React.lazy(() => import('./sections/Library'));
const Contact = React.lazy(() => import('./sections/Contact'));

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ErrorBoundary>
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
            <Suspense fallback={<div className="min-h-screen" />}>
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
    </ErrorBoundary>
  );
};

export default App;