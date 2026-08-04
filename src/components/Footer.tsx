import React from 'react';
import { Container } from './ui/Container';
import { Github, Linkedin, Mail, MessageCircle, ArrowUp } from 'lucide-react';
import { Magnetic } from './ui/Magnetic';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0C0C0C] text-[#8A99AD] pt-12 pb-16 overflow-hidden">
      {/* Animated Gradient Divider Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#BBCCD7]/30 to-transparent mb-12" />

      <Container className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
        <div>
          © {new Date().getFullYear()} Rehbar Miyan. All rights reserved.
        </div>

        {/* Social Icons Bar */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Rehbar250"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-[#D7E2EA] hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://linkedin.com/in/rehbar-miyan-325498236"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-[#0A66C2] transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="mailto:mrehbar2153@gmail.com"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-[#BBCCD7] transition-colors"
            aria-label="Email Me"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/917499775471"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-emerald-400 transition-colors"
            aria-label="WhatsApp Direct"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        {/* Back to Top Button */}
        <Magnetic intensity={0.2}>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 text-xs font-mono text-[#BBCCD7] hover:text-white hover:border-[#BBCCD7]/50 transition-all"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </Magnetic>
      </Container>
    </footer>
  );
};
