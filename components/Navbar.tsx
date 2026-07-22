'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="glass border-b border-cyan-500/10 px-6 py-3 mx-4 mt-2 rounded-xl flex items-center justify-between"
        style={{ backdropFilter: 'blur(20px)' }}>
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full border border-cyan-400 flex items-center justify-center
            group-hover:shadow-[0_0_12px_rgba(0,245,255,0.6)] transition-all duration-300"
            style={{ background: 'rgba(0,245,255,0.1)' }}>
            <span className="text-cyan-400 text-xs font-bold">A</span>
          </div>
          <span className="text-white text-sm font-light tracking-widest">ARYA<span className="text-cyan-400">.VP</span></span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className="nav-link text-xs tracking-widest uppercase text-slate-400 hover:text-cyan-400 transition-colors duration-300">
              {link}
            </button>
          ))}
        </div>

        {/* Status + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 border border-cyan-400/30 rounded-full px-3 py-1.5"
            style={{ background: 'rgba(0,245,255,0.05)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: 'pulse-cyan 2s infinite' }} />
            <span className="text-cyan-400 text-xs font-mono tracking-wider">AVAILABLE</span>
          </div>
          <button className="md:hidden text-cyan-400" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className="w-5 h-px bg-current mb-1" />
            <div className="w-5 h-px bg-current mb-1" />
            <div className="w-5 h-px bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-4 mt-1 rounded-xl border border-cyan-500/10 p-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                className="text-left text-slate-400 hover:text-cyan-400 text-sm tracking-widest uppercase transition-colors">
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
