import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimationWrappers';

const certifications = [
  "Software Engineering Job Simulation – Electronic Arts (Forage)",
  "Cybersecurity Job Simulation – Mastercard (Forage)",
  "Cybersecurity Analyst (IAM) – Forage",
  "Data Visualization – Tata Group (Forage)",
  "Generative AI Fundamentals – LinkedIn Learning",
  "Explore Digital Technology – GE Aerospace"
];

export default function EducationCertifications() {
  return (
    <section id="education" className="py-28 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="section-heading">Education & <span className="text-primary">Certifications</span></h2>
            <div className="section-divider" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <ScrollReveal direction="left">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.4)' }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8"
            >
              <h4 className="text-xl font-bold text-white mb-2">Bachelor of Computer Application (BCA)</h4>
              <h5 className="text-lg text-primary mb-4">Mahatma Jyotiba Phule Rohilkhand University</h5>
              <div className="flex items-center justify-between text-textSecondary text-sm mb-4">
                <span>Computer and Information Sciences</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">Aug 2023 – Apr 2026</span>
              </div>
              <p className="text-sm text-textSecondary leading-relaxed">
                Focus on core computer science subjects, software engineering principles, and practical application development.
              </p>
            </motion.div>
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Award size={28} />
              </div>
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>
            
            <StaggerContainer className="grid gap-3">
              {certifications.map((cert, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    whileHover={{ x: 4, borderColor: 'rgba(59, 130, 246, 0.3)' }}
                    transition={{ duration: 0.2 }}
                    className="glass-card p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                  >
                    <Award className="text-primary shrink-0" size={18} />
                    <span className="text-text font-medium text-sm md:text-base leading-tight">
                      {cert}
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
