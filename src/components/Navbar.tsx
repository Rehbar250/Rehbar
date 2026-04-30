import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  const handleNavClick = () => setIsMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'navbar-glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-primary to-purple-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
        {/* Logo */}
        <motion.a 
          href="#" 
          className="text-2xl font-bold tracking-tighter"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          R<span className="text-primary">M</span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="nav-link"
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-textSecondary hover:text-primary backdrop-blur-sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>

          {/* CTA button */}
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-flex px-5 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl text-sm font-semibold border border-primary/20 hover:border-primary backdrop-blur-sm"
          >
            Hire Me
          </motion.a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-textSecondary"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden navbar-glass border-t border-white/5 mt-2 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-textSecondary hover:text-primary transition-colors text-sm font-medium tracking-wide py-2"
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={handleNavClick}
                className="mt-2 text-center px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold"
              >
                Hire Me
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
