import React from 'react';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { GradientText } from './ui/GradientText';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';

interface ExperienceItem {
  id: string;
  type: string;
  role: string;
  company: string;
  location: string;
  date: string;
  description: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'freelance-cpp',
    type: 'Freelance Work',
    role: 'Freelance Software Engineer (C++)',
    company: 'Independent Client Projects',
    location: 'Remote',
    date: 'Recent',
    description: 'Developed and customized Chromium-based browser components using C++. Implemented new browser functionality adhering strictly to object-oriented design principles.',
    highlights: [
      'Customized Chromium C++ browser components',
      'Applied secure coding & OOP design patterns',
      'Executed performance code reviews & debugging'
    ],
  },
  {
    id: 'aws-simulation',
    type: 'Virtual Program & Assessment',
    role: 'Software Engineering Simulation',
    company: 'Amazon Web Services (AWS)',
    location: 'Virtual Program',
    date: 'Virtual Assessment',
    description: 'Designed scalable hosting architecture using AWS Elastic Beanstalk. Addressed real-world cloud latency and reliability challenges.',
    highlights: [
      'Architected cloud deployment via Elastic Beanstalk',
      'Optimized server latency & auto-scaling policies',
      'System design for high-traffic web applications'
    ],
  },
  {
    id: 'ea-simulation',
    type: 'Virtual Program & Assessment',
    role: 'Software Engineering Simulation',
    company: 'Electronic Arts (EA)',
    location: 'Virtual Program',
    date: 'Virtual Assessment',
    description: 'Designed C++ class structures and feature proposals for game systems. Analyzed key performance indicators (KPIs) to evaluate user engagement.',
    highlights: [
      'Designed complex C++ class structures for gaming engines',
      'Analyzed telemetry KPIs for player engagement',
      'Crafted technical feature documentation & proposals'
    ],
  },
  {
    id: 'tcs-simulation',
    type: 'Virtual Program & Assessment',
    role: 'Data & Digital Simulation',
    company: 'Tata Consultancy Services (TCS)',
    location: 'Virtual Program',
    date: 'Virtual Assessment',
    description: 'Built executive-level data visualizations and dashboards. Applied analytical frameworks to interpret multi-dimensional business datasets.',
    highlights: [
      'Created interactive executive data visualizations',
      'Analyzed business metrics for strategic decision-making',
      'Reported actionable insights via digital dashboards'
    ],
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-32 relative bg-[#0C0C0C] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#BBCCD7]/10 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-[#BBCCD7] mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#BBCCD7]" />
            <span>JOURNEY & MILESTONES</span>
          </div>
          <h2 className="text-fluid-title font-extrabold uppercase text-white">
            WORK <GradientText>EXPERIENCE</GradientText>
          </h2>
          <p className="text-[#8A99AD] text-fluid-sub mt-2 max-w-xl">
            A chronological timeline of freelance software engineering work, industry virtual programs, and technical simulations.
          </p>
        </div>

        {/* Animated Vertical Timeline */}
        <div className="relative border-l-2 border-white/10 pl-6 md:pl-12 space-y-16 max-w-4xl mx-auto">
          {experiences.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-5 h-5 rounded-full bg-[#0C0C0C] border-2 border-[#BBCCD7] group-hover:bg-[#BBCCD7] group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BBCCD7] group-hover:bg-[#0C0C0C]" />
              </div>

              {/* Card Container */}
              <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#BBCCD7]">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8A99AD]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Role Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#BBCCD7] transition-colors mb-1">
                  {item.role}
                </h3>

                <div className="text-sm font-semibold text-[#8A99AD] flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4 text-[#BBCCD7]" />
                  <span>{item.company}</span>
                  <span className="text-xs font-normal text-white/30">• {item.location}</span>
                </div>

                <p className="text-sm text-[#8A99AD] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#D7E2EA]">
                      <CheckCircle2 className="w-4 h-4 text-[#BBCCD7] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
