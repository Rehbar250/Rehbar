import React from 'react';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { GradientText } from './ui/GradientText';
import { Magnetic } from './ui/Magnetic';
import { Sparkles } from 'lucide-react';

const skills = [
  { name: 'C / C++', icon: '💻', level: 'Expert' },
  { name: 'JavaScript', icon: '🟨', level: 'Advanced' },
  { name: 'TypeScript', icon: '🔷', level: 'Advanced' },
  { name: 'React', icon: '⚛️', level: 'Advanced' },
  { name: 'Next.js', icon: '🔺', level: 'Advanced' },
  { name: 'Node.js', icon: '🗄️', level: 'Advanced' },
  { name: 'CSS / Tailwind', icon: '🎨', level: 'Expert' },
  { name: 'MongoDB', icon: '🍃', level: 'Intermediate' },
  { name: 'Git', icon: '🌿', level: 'Expert' },
  { name: 'Security / IAM', icon: '🔒', level: 'Intermediate' },
  { name: 'Data Visualization', icon: '📊', level: 'Advanced' },
  { name: 'OOP / DSA', icon: '🧠', level: 'Advanced' },
];

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-32 relative bg-[#0C0C0C]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BBCCD7]/5 rounded-full blur-[160px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-[#BBCCD7] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#BBCCD7]" />
            <span>TECH STACK</span>
          </div>
          <h2 className="text-fluid-title font-extrabold uppercase text-white">
            SKILLS & <GradientText>EXPERTISE</GradientText>
          </h2>
          <p className="text-[#8A99AD] text-fluid-sub mt-2 max-w-xl">
            My core technical capabilities, programming languages, and engineering focus areas.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04, duration: 0.4 }}
            >
              <Magnetic intensity={0.15}>
                <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 flex items-center gap-4 group cursor-pointer h-full">
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#D7E2EA] group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>
                    <span className="inline-block text-[11px] font-mono text-[#8A99AD] mt-0.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                      {skill.level}
                    </span>
                  </div>
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
