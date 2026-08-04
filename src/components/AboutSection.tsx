import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Container } from './ui/Container';
import { GradientText } from './ui/GradientText';
import { Button } from './ui/Button';
import { Magnetic } from './ui/Magnetic';
import { ArrowRight, Sparkles, Cpu, ShieldCheck, Activity, Terminal, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const paragraphText = "I am an entry-level Software Engineer currently pursuing a Bachelor of Computer Application. With strong foundations in C++, Object-Oriented Programming, and cloud-based system design, I bring theoretical knowledge into practical application. My hands-on experience stems from industry-recognized virtual programs at AWS, Electronic Arts, and Tata Consultancy Services. I am deeply passionate about building scalable, secure, and efficient software solutions to solve real-world problems.";

  // Mouse Parallax Physics tuned for 120 FPS High Refresh Displays
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-10deg', '10deg']);
  const parallaxShiftX = useTransform(smoothX, [-0.5, 0.5], ['-12px', '12px']);
  const parallaxShiftY = useTransform(smoothY, [-0.5, 0.5], ['-12px', '12px']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Character-by-character animation variants
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.012,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    { num: '6+', label: 'Certifications' },
    { num: '5+', label: 'Projects Built' },
    { num: '10+', label: 'Technologies' },
    { num: '∞', label: 'Curiosity' },
  ];

  return (
    <section id="about" className="py-32 relative bg-[#0C0C0C] overflow-hidden">
      {/* Ambient Holographic Background Glow */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/10 via-[#BBCCD7]/15 to-blue-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-gradient-to-br from-[#646973]/15 via-purple-500/10 to-[#BBCCD7]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle Digital Grid Pattern in Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d405_1px,transparent_1px),linear-gradient(to_bottom,#06b6d405_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: About Text & Character Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-[#BBCCD7] mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>WHO I AM · HOLOGRAM BIOGRAPHY</span>
            </div>

            {/* Large Gradient Heading: ABOUT ME */}
            <h2 className="text-fluid-title font-extrabold uppercase text-white mb-8">
              <GradientText className="text-[#646973] via-[#9EABBA] to-[#BBCCD7]">ABOUT ME</GradientText>
            </h2>

            {/* Character-by-Character Text Reveal Animation */}
            <motion.p
              variants={sentenceVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[#D7E2EA]/90 text-fluid-sub font-normal leading-relaxed mb-10 max-w-2xl"
            >
              {paragraphText.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-10">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10 text-center group"
                >
                  <div className="text-3xl font-extrabold text-[#BBCCD7] group-hover:scale-110 transition-transform duration-300">{stat.num}</div>
                  <div className="text-xs text-[#8A99AD] font-mono mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Contact Button */}
            <Button
              variant="glow"
              size="lg"
              href="#contact"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Right Side: Futuristic 3D Hologram Identity Profile System (Hardware Accelerated for 120 FPS) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            className="lg:col-span-5 relative flex justify-center items-center py-16 cursor-pointer group select-none"
          >
            <Magnetic intensity={0.25}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ willChange: 'transform' }}
                className="relative flex items-center justify-center"
              >
                {/* Background Hexadecimal Floating Stream Text */}
                <div className="absolute -inset-16 flex items-center justify-between text-[10px] font-mono text-cyan-500/20 pointer-events-none select-none">
                  <div className="flex flex-col gap-4">
                    <span>0x7F4A</span>
                    <span>1011001</span>
                    <span>REHBAR_OS</span>
                  </div>
                  <div className="flex flex-col gap-4 text-right">
                    <span>SYS_99%</span>
                    <span>AI_CORE</span>
                    <span>0x00FF88</span>
                  </div>
                </div>

                {/* Outer Glowing Holographic Aura */}
                <div className="absolute -inset-12 rounded-full bg-gradient-to-tr from-cyan-500/25 via-[#BBCCD7]/35 to-blue-600/25 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Outer Rotating HUD Ring 1 (Clockwise) */}
                <div
                  className="absolute -inset-14 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow pointer-events-none"
                  style={{ willChange: 'transform' }}
                />

                {/* Middle Rotating HUD Ring 2 (Counter-Clockwise) */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  style={{ willChange: 'transform' }}
                  className="absolute -inset-8 rounded-full border-2 border-transparent border-t-[#BBCCD7]/60 border-b-cyan-400/60 pointer-events-none"
                />

                {/* Pulsing Energy Scanner Ring */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ willChange: 'transform, opacity' }}
                  className="absolute -inset-3 rounded-full border border-[#BBCCD7]/50 shadow-[0_0_30px_rgba(187,204,215,0.4)] pointer-events-none"
                />

                {/* Centerpiece: Circular Professional Photo with Holographic Glass Frame & Scan Beam */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1.5 bg-gradient-to-tr from-white/20 via-[#BBCCD7]/50 to-white/20 backdrop-blur-md shadow-[0_0_60px_rgba(187,204,215,0.4)] overflow-hidden">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0C0C0C]">
                    {/* User's Professional Photograph Avatar */}
                    <img
                      src="/rehbar_avatar.png"
                      alt="Rehbar Miyan - 3D Hologram Profile"
                      loading="eager"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      style={{ willChange: 'transform' }}
                    />

                    {/* Animated Holographic AI Scanning Beam Traveling Vertically */}
                    <motion.div
                      animate={{ y: ['-100%', '300%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      style={{ willChange: 'transform' }}
                      className="absolute inset-x-0 h-14 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent pointer-events-none z-10"
                    />

                    {/* Image Glow Flash Syncing with Scanner */}
                    <motion.div
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ willChange: 'opacity' }}
                      className="absolute inset-0 bg-cyan-400/10 pointer-events-none"
                    />

                    {/* Holographic Radial Tint */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(12,12,12,0.6)_100%)] pointer-events-none" />
                  </div>
                </div>

                {/* Orbiting Floating Panel 1: Identity Card (Top Left) */}
                <motion.div
                  style={{ x: parallaxShiftX, y: parallaxShiftY, willChange: 'transform' }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-12 -left-12 sm:-left-16 z-20"
                >
                  <div className="glass-card p-3.5 rounded-2xl border border-cyan-400/40 bg-black/75 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.25)] text-left">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" /> IDENTITY
                    </div>
                    <div className="text-sm font-bold text-white mt-1">REHBAR MIYAN</div>
                    <div className="text-[11px] font-mono text-[#8A99AD]">Software Engineer · Full Stack</div>
                  </div>
                </motion.div>

                {/* Orbiting Floating Panel 2: Status Card (Top Right) */}
                <motion.div
                  style={{ x: parallaxShiftX, y: parallaxShiftY, willChange: 'transform' }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-10 -right-12 sm:-right-16 z-20"
                >
                  <div className="glass-card p-3.5 rounded-2xl border border-emerald-400/40 bg-black/75 backdrop-blur-md shadow-[0_0_20px_rgba(52,211,153,0.25)] text-left">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> STATUS: ONLINE
                    </div>
                    <div className="text-xs font-bold text-white mt-1">AVAILABLE FOR WORK</div>
                    <div className="text-[10px] font-mono text-emerald-300/80">BUILD MODE ACTIVE</div>
                  </div>
                </motion.div>

                {/* Orbiting Floating Panel 3: Skills Matrix (Bottom Right) */}
                <motion.div
                  style={{ x: parallaxShiftX, y: parallaxShiftY, willChange: 'transform' }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-10 -right-10 sm:-right-14 z-20 hidden sm:block"
                >
                  <div className="glass-card p-3.5 rounded-2xl border border-[#BBCCD7]/40 bg-black/75 backdrop-blur-md shadow-[0_0_20px_rgba(187,204,215,0.25)] text-left max-w-[210px]">
                    <div className="text-[10px] font-mono text-[#BBCCD7] uppercase tracking-widest flex items-center gap-1 mb-1.5">
                      <Cpu className="w-3 h-3 text-[#BBCCD7]" /> TECH MATRIX
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#D7E2EA]">React</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#D7E2EA]">TS</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#D7E2EA]">Node</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#D7E2EA]">C++</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#D7E2EA]">AI</span>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            </Magnetic>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};
