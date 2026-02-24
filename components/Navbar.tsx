'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Home, User, Code, BookOpen, Mail } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, sectionId: 'hero' },
  { id: 'about', label: 'About', icon: User, sectionId: 'about' },
  { id: 'skills', label: 'Skills', icon: Code, sectionId: 'skills' },
  { id: 'library', label: 'Library', icon: BookOpen, sectionId: 'library' },
  { id: 'contact', label: 'Contact', icon: Mail, sectionId: 'contact' },
];

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const isManualScroll = useRef(false);
  const navbarWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isManualScroll.current) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const navItem = navItems.find(item => item.sectionId === entry.target.id);
          if (navItem && activeTab !== navItem.id) {
            setActiveTab(navItem.id);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach(item => {
      const element = document.getElementById(item.sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  const scrollToSection = (id: string, sectionId: string) => {
    isManualScroll.current = true;
    setActiveTab(id);

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });

      setTimeout(() => {
        isManualScroll.current = false;
      }, 800);
    } else {
      isManualScroll.current = false;
    }
  };

  return (
    <div
      ref={navbarWrapperRef}
      className={`navbar fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ${isScrolled ? 'pt-4' : 'pt-8'}`}
    >
      <LayoutGroup>
        <motion.nav
          layout
          className="pointer-events-auto flex items-center gap-1 p-1.5 bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                layout
                onClick={() => scrollToSection(item.id, item.sectionId)}
                className={`relative flex items-center justify-center h-10 rounded-full text-sm font-medium transition-colors duration-300 ${isActive ? 'text-black px-4' : 'text-slate-400 hover:text-white px-3 hover:bg-white/5'
                  }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <item.icon size={18} strokeWidth={2.5} className={isActive ? "text-black" : "text-current"} />
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </motion.nav>
      </LayoutGroup>
    </div>
  );
};

export default React.memo(Navbar);
