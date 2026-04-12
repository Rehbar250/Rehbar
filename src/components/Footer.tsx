import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface/50 border-t border-gray-800 py-8 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-textSecondary text-sm">
          © {new Date().getFullYear()} Rehbar Miyan. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="https://linkedin.com/in/rehbar-miyan-325498236" className="text-textSecondary hover:text-primary transition-colors text-sm font-medium">LinkedIn</a>
          <a href="mailto:mrehbar2153@gmail.com" className="text-textSecondary hover:text-primary transition-colors text-sm font-medium">Email</a>
        </div>
        <button 
          onClick={scrollToTop}
          className="absolute right-6 -top-5 md:-top-6 bg-primary p-3 rounded-full text-white shadow-lg hover:bg-primaryDark hover:-translate-y-1 transition-all glow"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}
