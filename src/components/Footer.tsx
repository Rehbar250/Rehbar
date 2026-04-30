import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 py-10">
      {/* Subtle gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-textSecondary text-sm">
          © {new Date().getFullYear()} <span className="text-text font-medium">Rehbar Miyan</span>. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="https://linkedin.com/in/rehbar-miyan-325498236" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-primary transition-colors text-sm font-medium">LinkedIn</a>
          <a href="https://github.com/Rehbar250" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-primary transition-colors text-sm font-medium">GitHub</a>
          <a href="mailto:mrehbar2153@gmail.com" className="text-textSecondary hover:text-primary transition-colors text-sm font-medium">Email</a>
        </div>
        <motion.button 
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-6 -top-5 md:-top-6 bg-primary p-3 rounded-full text-white shadow-lg transition-all"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
}
