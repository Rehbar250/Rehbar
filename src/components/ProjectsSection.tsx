import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from './ui/Container';
import { GradientText } from './ui/GradientText';
import { Button } from './ui/Button';
import { Magnetic } from './ui/Magnetic';
import { Github, ExternalLink, Sparkles, FolderGit2, Terminal, Code2, ShieldAlert, Cpu, Layers } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  accentGradient: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 'inditech',
    name: 'IndiTech — AI-Powered Threat Detection System',
    category: 'AI & Machine Learning',
    description: 'AI-driven security system utilizing deep learning & computer vision for real-time threat analysis, object tracking, and anomaly detection.',
    tech: ['Python', 'FastAPI', 'Computer Vision', 'Deep Learning', 'OpenCV'],
    githubUrl: 'https://github.com/Rehbar250/IndiTech-AI-Powered-Threat-Detection-System',
    accentGradient: 'from-blue-600/20 via-indigo-600/10 to-cyan-500/20',
    icon: <ShieldAlert className="w-8 h-8 text-cyan-400" />,
  },
  {
    id: 'automate',
    name: 'AutoMate — Workflow Automation Engine',
    category: 'Automation & Systems',
    description: 'Intelligent task automation pipeline tool for workflow orchestration, task execution scheduling, and system health monitoring.',
    tech: ['TypeScript', 'Node.js', 'CLI Engine', 'SQLite', 'Workflow API'],
    githubUrl: 'https://github.com/Rehbar250/AutoMate',
    accentGradient: 'from-[#BBCCD7]/20 via-blue-500/10 to-[#646973]/20',
    icon: <Cpu className="w-8 h-8 text-[#BBCCD7]" />,
  },
  {
    id: '3d-gesture',
    name: '3D Hand Gesture Particles Simulation',
    category: 'Web Development & 3D',
    description: 'Interactive 3D particle simulation controlled via MediaPipe real-time hand gesture tracking and WebGL GPU particle shaders.',
    tech: ['Three.js', 'MediaPipe', 'WebGL', 'JavaScript', 'Canvas 2D/3D'],
    githubUrl: 'https://github.com/Rehbar250/3D-hand-gesture-particles',
    accentGradient: 'from-purple-600/20 via-[#BBCCD7]/10 to-indigo-500/20',
    icon: <Code2 className="w-8 h-8 text-purple-400" />,
  },
  {
    id: 'hireflow',
    name: 'HIREFLOW — Recruitment Analytics Dashboard',
    category: 'Full Stack & Analytics',
    description: 'Comprehensive hiring dashboard featuring candidate analytics, stage tracking, role management, and interactive metrics reporting.',
    tech: ['React 19', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Analytics UIs'],
    githubUrl: 'https://github.com/Rehbar250/HIREFLOW-DASHBOARD',
    accentGradient: 'from-[#646973]/20 via-blue-500/10 to-[#BBCCD7]/20',
    icon: <Layers className="w-8 h-8 text-blue-400" />,
  },
  {
    id: 'college-platform',
    name: 'Academic & Technical Assessment Platform',
    category: 'College / Academic',
    description: 'Academic evaluation platform designed for universities to manage student technical assessments, test submissions, and metrics.',
    tech: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'HTML/CSS'],
    githubUrl: 'https://github.com/Rehbar250',
    accentGradient: 'from-amber-600/20 via-[#BBCCD7]/10 to-blue-600/20',
    icon: <Terminal className="w-8 h-8 text-amber-400" />,
  },
  {
    id: 'ai-research',
    name: 'AI Company Research & Intelligence App',
    category: 'AI & Data Intelligence',
    description: 'AI-assisted research application that automatically gathers company profiles, market trends, and intelligence insights via LLMs.',
    tech: ['Python', 'LLM Prompt Engine', 'React', 'Tailwind CSS', 'REST APIs'],
    githubUrl: 'https://github.com/Rehbar250',
    accentGradient: 'from-emerald-600/20 via-cyan-600/10 to-[#BBCCD7]/20',
    icon: <FolderGit2 className="w-8 h-8 text-emerald-400" />,
  },
];

const ProjectCardItem: React.FC<{ project: Project; index: number; total: number }> = ({
  project,
  index,
  total,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.95', 'start 0.25'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <div ref={cardRef} className="my-8">
      <motion.div style={{ scale, opacity, y, willChange: 'transform, opacity' }}>
        <Magnetic intensity={0.08}>
          <div className="group cursor-pointer">
            <div className="relative rounded-3xl glass-card border border-white/15 p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500 hover:border-[#BBCCD7]/40">
              {/* Background Accent Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accentGradient} opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Side: Information & Links */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#BBCCD7]">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-white/30">
                      0{index + 1} / 0{total}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#BBCCD7] transition-colors mb-4">
                    {project.name}
                  </h3>

                  <p className="text-sm md:text-base text-[#8A99AD] leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#D7E2EA]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      size="md"
                      href={project.githubUrl}
                      target="_blank"
                      icon={<Github className="w-4 h-4" />}
                      iconPosition="left"
                    >
                      Source Code
                    </Button>

                    <Button
                      variant="outline"
                      size="md"
                      href={project.githubUrl}
                      target="_blank"
                      icon={<ExternalLink className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      View Repository
                    </Button>
                  </div>
                </div>

                {/* Right Side: Project Preview Illustration Card */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full aspect-[4/3] rounded-2xl bg-[#0C0C0C]/80 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-[#BBCCD7]/30 transition-colors">
                    {/* Inner Graphic Top Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[11px] font-mono text-[#8A99AD]">{project.id}.ts</span>
                    </div>

                    {/* Center Project Graphic Icon */}
                    <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-3 group-hover:scale-110 transition-transform duration-300">
                        {project.icon}
                      </div>
                      <span className="text-xs font-mono text-[#BBCCD7]">{project.category}</span>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8A99AD] pt-3 border-t border-white/10">
                      <span className="text-emerald-400">● Repository Live</span>
                      <span>GitHub Sync</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Magnetic>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-32 relative bg-[#0C0C0C]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-[#BBCCD7]/5 rounded-full blur-[180px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-[#BBCCD7] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#BBCCD7]" />
            <span>PORTFOLIO HIGHLIGHT</span>
          </div>

          <h2 className="text-fluid-title font-extrabold uppercase text-white">
            FEATURED <GradientText>PROJECTS</GradientText>
          </h2>

          <p className="text-[#8A99AD] text-fluid-sub mt-2 max-w-xl">
            A curated showcase of software engineering, AI automation, and full-stack development projects.
          </p>
        </div>

        {/* Dynamic Parallax Scroll Progress Cards */}
        <div className="flex flex-col space-y-6">
          {projects.map((project, index) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
