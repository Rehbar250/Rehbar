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
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primaryDark/20 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 text-center md:text-left z-10 w-full items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6"
          >
            Available for new opportunities
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Hi, I'm <span className="text-primary glow-text">Rehbar Miyan</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-textSecondary font-medium mb-6">
            Software Engineer (Entry Level)
          </h2>
          <p className="text-lg text-textSecondary mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Passionate about building scalable, secure, and efficient software solutions. 
            Strong foundation in C++, Object-Oriented Programming, and cloud-based system design.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primaryDark transition-colors shadow-lg hover:shadow-primary/30 glow"
            >
              Get in Touch <ArrowRight size={20} />
            </motion.a>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface text-text font-semibold rounded-lg hover:bg-gray-800 transition-colors border border-gray-700 hover:border-primary/50 shadow-lg"
            >
              <Eye size={20} /> View Resume
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden md:block"
        >
          <div className="aspect-[3/4] md:aspect-square rounded-2xl bg-surface border border-gray-800 shadow-2xl relative overflow-hidden group">
            <img 
              src={`${import.meta.env.BASE_URL}profile.jpg`} 
              alt="Rehbar Miyan" 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
