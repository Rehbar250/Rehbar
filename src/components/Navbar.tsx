import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { Container } from './ui/Container';
import { Magnetic } from './ui/Magnetic';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 glass-nav shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Logo */}
        <Magnetic intensity={0.2}>
          <a
            href="#hero"
            className="group relative flex items-center gap-1 text-2xl font-bold tracking-tight text-[#D7E2EA] hover:text-white transition-colors"
          >
            <span className="font-kanit tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D7E2EA] to-[#BBCCD7]">
              REHBAR
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#646973] to-[#BBCCD7] group-hover:scale-125 transition-transform duration-300" />
          </a>
        </Magnetic>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 glass-card px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative px-4 py-1.5 text-sm font-medium text-[#8A99AD] hover:text-white transition-colors duration-200 rounded-full group"
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
          ))}
          
          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#BBCCD7] hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-[#BBCCD7]/20 hover:border-[#BBCCD7]/50 transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5 text-[#BBCCD7]" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </nav>

        {/* Mobile Menu Trigger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-50 p-2.5 rounded-full glass-card border border-white/10 text-[#D7E2EA] hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Animated Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#0C0C0C]/95 backdrop-blur-2xl z-40 flex flex-col justify-between p-8 md:hidden"
          >
            <div className="mt-20 flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + 0.1, duration: 0.3 }}
                  className="text-3xl font-bold text-[#8A99AD] hover:text-[#D7E2EA] hover:translate-x-2 transition-all flex items-center justify-between border-b border-white/5 pb-4"
                >
                  <span>{item.name}</span>
                  <span className="text-xs font-mono text-white/30">0{index + 1}</span>
                </motion.a>
              ))}

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.08 + 0.1, duration: 0.3 }}
                className="mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#181D24] text-white border border-[#BBCCD7]/30 text-lg font-semibold shadow-lg"
              >
                <FileText className="w-5 h-5 text-[#BBCCD7]" />
                <span>View Resume</span>
                <ArrowUpRight className="w-5 h-5" />
              </motion.a>
            </div>

            <div className="text-center text-xs text-[#8A99AD] pb-6 border-t border-white/5 pt-4">
              © {new Date().getFullYear()} Rehbar Miyan. All rights reserved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
