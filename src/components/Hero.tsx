import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import ResumeModal from './ResumeModal';

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        resumeUrl={`${import.meta.env.BASE_URL}resume.pdf`}
      />

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-[1] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[160px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[140px] -z-10 animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 text-center md:text-left z-10 w-full items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            Available for new opportunities
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Hi, I'm{' '}
            <span className="hero-name-glow">Rehbar Miyan</span>
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl text-textSecondary font-medium mb-6"
          >
            Software Engineer{' '}
            <span className="text-primary/60">(Entry Level)</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-textSecondary mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            Passionate about building scalable, secure, and efficient software solutions. 
            Strong foundation in C++, Object-Oriented Programming, and cloud-based system design.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="hero-btn-primary"
            >
              Get in Touch <ArrowRight size={20} />
            </motion.a>
            <motion.button 
              whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsResumeOpen(true)}
              className="hero-btn-secondary"
            >
              <Eye size={20} /> View Resume
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Profile image with glassmorphism frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative hidden md:block"
        >
          <div className="profile-card-container">
            {/* Glowing border effect */}
            <div className="profile-glow-border" />
            <div className="aspect-[3/4] md:aspect-square rounded-2xl bg-surface/80 backdrop-blur-sm border border-white/10 shadow-2xl relative overflow-hidden group">
              <img 
                src={`${import.meta.env.BASE_URL}profile.jpg`} 
                alt="Rehbar Miyan" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="scroll-indicator">
          <div className="scroll-indicator-dot" />
        </div>
      </motion.div>
    </section>
  );
}
