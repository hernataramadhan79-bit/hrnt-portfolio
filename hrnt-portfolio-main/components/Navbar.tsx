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

  // Ref for the entire navbar container including padding
  const navbarWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (isManualScroll.current) return;

      const sections = navItems.map(item => document.getElementById(item.sectionId));
      // Active section is determined when its top is within the top 40% of the viewport
      const triggerPoint = window.innerHeight / 2.5;

      // Loop from bottom to top to find the last section that passed the trigger point
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= triggerPoint) {
          if (activeTab !== navItems[i].id) {
            setActiveTab(navItems[i].id);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const scrollToSection = (id: string, sectionId: string) => {
    isManualScroll.current = true;
    setActiveTab(id);

    const element = document.getElementById(sectionId);
    if (element) {
      // Final attempt: Set offset to 0 to scroll the element to the very top of the viewport.
      const offset = 0;

      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });

      // Release the scroll lock after the smooth scroll animation is likely finished
      setTimeout(() => {
        isManualScroll.current = false;
      }, 800);
    } else {
      // If element not found, release the lock immediately
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
