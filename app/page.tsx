'use client';

import React, { useState, useEffect, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import SplashScreen from '@/components/SplashScreen';
import Background from '@/components/Background';

// Error Boundary Component
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
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
const Landing = React.lazy(() => import('@/sections/Landing'));
const Experience = React.lazy(() => import('@/sections/Experience'));
const Skills = React.lazy(() => import('@/sections/Skills'));
const Performance = React.lazy(() => import('@/sections/Performance'));
const Library = React.lazy(() => import('@/sections/Library'));
const Contact = React.lazy(() => import('@/sections/Contact'));
const Forum = React.lazy(() => import('@/sections/Forum'));

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (['home', 'experience', 'skills', 'performance', 'library', 'contact', 'forum'].includes(hash)) {
                setActiveTab(hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        if (window.location.hash) {
            handleHashChange();
        }
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        if (loading) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        const handleResize = () => lenis.resize();
        window.addEventListener('resize', handleResize);

        const resizeInterval = setInterval(() => lenis.resize(), 1000);
        setTimeout(() => clearInterval(resizeInterval), 5000);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', handleResize);
            clearInterval(resizeInterval);
        };
    }, [loading]);

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
                        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
                        <Suspense fallback={
                            <div className="min-h-screen flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                    <span className="text-cyan-400 font-mono text-sm">Loading...</span>
                                </div>
                            </div>
                        }>
                            <main className={`relative z-10 w-full overflow-hidden min-h-screen ${activeTab === 'home' ? '' : 'pt-16 md:pt-24'}`}>
                                <AnimatePresence mode="wait">
                                    {activeTab === 'home' && (
                                        <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                            <Landing />
                                        </motion.div>
                                    )}
                                    {activeTab === 'experience' && (
                                        <motion.div key="experience" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                            <Experience />
                                        </motion.div>
                                    )}
                                    {activeTab === 'skills' && (
                                        <motion.div key="skills" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                            <Skills />
                                        </motion.div>
                                    )}
                                    {activeTab === 'performance' && (
                                        <motion.div key="performance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                            <Performance />
                                        </motion.div>
                                    )}
                                    {activeTab === 'library' && (
                                        <motion.div key="library" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                            <Library />
                                        </motion.div>
                                    )}
                                    {activeTab === 'contact' && (
                                        <motion.div key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                            <Contact />
                                        </motion.div>
                                    )}
                                    {activeTab === 'forum' && (
                                        <motion.div key="forum" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                            <Forum />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </main>
                        </Suspense>
                    </motion.div>
                )}
            </AnimatePresence>
        </ErrorBoundary>
    );
}
