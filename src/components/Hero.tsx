import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, FileText, Mail, ArrowDown, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { Magnetic } from './ui/Magnetic';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  // Mouse Parallax Physics tuned for 120 FPS / 120Hz Displays
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-8deg', '8deg']);
  const glowX = useTransform(smoothX, [-0.5, 0.5], ['-20%', '20%']);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ['-20%', '20%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-[#0C0C0C]">
      {/* Background Mesh Glow Ambient Effects */}
      <motion.div
        style={{ x: glowX, y: glowY, willChange: 'transform' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#646973]/20 via-[#9EABBA]/15 to-[#BBCCD7]/20 rounded-full blur-[140px] pointer-events-none"
      />
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <Container className="relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1"
          >
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-[#BBCCD7] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AVAILABLE FOR NEW OPPORTUNITIES</span>
            </motion.div>

            {/* Main Name Heading */}
            <h1 className="text-fluid-hero font-extrabold tracking-tight text-white mb-4 uppercase">
              REHBAR <br />
              <span className="heading-gradient">MIYAN</span>
            </h1>

            {/* Subheading / Roles */}
            <div className="flex flex-wrap items-center gap-3 text-fluid-sub font-mono text-[#BBCCD7] mb-6">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#BBCCD7]" /> Software Engineer
              </span>
              <span className="text-[#646973]">•</span>
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-[#BBCCD7]" /> Full Stack Developer
              </span>
              <span className="text-[#646973]">•</span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#BBCCD7]" /> C++ & Systems
              </span>
            </div>

            {/* Short Bio */}
            <p className="text-[#8A99AD] text-fluid-sub font-normal max-w-xl mb-10 leading-relaxed">
              Pursuing BCA with deep foundations in C++, object-oriented design, cloud architectures, and modern web applications.
            </p>

            {/* Action Buttons & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary Contact CTA */}
              <Button
                variant="glow"
                size="lg"
                href="#contact"
                icon={<Mail className="w-4 h-4" />}
                iconPosition="left"
              >
                Get In Touch
              </Button>

              {/* GitHub Button */}
              <Button
                variant="outline"
                size="lg"
                href="https://github.com/rehbar250"
                target="_blank"
                icon={<Github className="w-4 h-4" />}
                iconPosition="left"
              >
                GitHub
              </Button>

              {/* LinkedIn Button */}
              <Button
                variant="outline"
                size="lg"
                href="https://linkedin.com/in/rehbar-miyan-325498236"
                target="_blank"
                icon={<Linkedin className="w-4 h-4 text-[#0A66C2]" />}
                iconPosition="left"
              >
                LinkedIn
              </Button>

              {/* Resume Button */}
              <Button
                variant="ghost"
                size="lg"
                href="./resume.pdf"
                target="_blank"
                onClick={(e) => {
                  if (onOpenResume) {
                    e.preventDefault();
                    onOpenResume();
                  }
                }}
                icon={<FileText className="w-4 h-4 text-[#BBCCD7]" />}
                iconPosition="left"
              >
                Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: GPU Hardware Accelerated Image Frame for 120 FPS / 120Hz */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            className="lg:col-span-5 relative flex justify-center items-center order-1 lg:order-2"
          >
            {/* Ambient Particles & Background Glow */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#646973]/20 via-[#BBCCD7]/25 to-[#646973]/20 blur-3xl opacity-60 animate-pulse-slow pointer-events-none" />

            <Magnetic intensity={0.2}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ willChange: 'transform' }}
                className="relative group cursor-pointer"
              >
                {/* Animated Gradient Border Frame */}
                <div className="p-[2px] rounded-[26px] bg-gradient-to-b from-[#BBCCD7]/40 via-[#646973]/20 to-[#BBCCD7]/40 shadow-[0_0_40px_rgba(187,204,215,0.15)] group-hover:shadow-[0_0_60px_rgba(187,204,215,0.3)] transition-all duration-500">
                  
                  {/* Portrait Card Frame */}
                  <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[24px] overflow-hidden bg-[#12151B] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group-hover:scale-[1.03] transition-transform duration-500 ease-out">
                    
                    {/* 3D Holographic Workstation Image (GPU Accelerated 120 FPS) */}
                    <img
                      src="./hologram_laptop.png"
                      alt="Rehbar Miyan - 3D Holographic Developer Workstation"
                      loading="eager"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ willChange: 'transform' }}
                    />

                    {/* Light Reflection / Shimmer Sweep Effect */}
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                      style={{ willChange: 'transform' }}
                    />

                    {/* Subtle Ambient Bottom Shadow Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </Magnetic>
          </motion.div>

        </div>
      </Container>

      {/* Bottom Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center justify-center pt-12"
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-2 text-xs font-mono text-[#8A99AD] hover:text-[#BBCCD7] transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="p-2 rounded-full glass-card border border-white/10 group-hover:border-[#BBCCD7]/30"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#BBCCD7]" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
