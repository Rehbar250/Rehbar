import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';

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
    <section id="education" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Education & <span className="text-primary">Certifications</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-primary" size={32} />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            
            <div className="bg-surface border border-gray-800 p-8 rounded-2xl shadow-lg hover:border-primary/40 transition-all">
              <h4 className="text-xl font-bold text-white mb-2">Bachelor of Computer Application (BCA)</h4>
              <h5 className="text-lg text-primary mb-4">Mahatma Jyotiba Phule Rohilkhand University</h5>
              <div className="flex items-center justify-between text-textSecondary text-sm mb-4">
                <span>Computer and Information Sciences</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Aug 2023 – Apr 2026</span>
              </div>
              <p className="text-sm text-textSecondary leading-relaxed">
                Focus on core computer science subjects, software engineering principles, and practical application development.
              </p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-primary" size={32} />
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>
            
            <div className="grid gap-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="bg-surface border border-gray-800 p-5 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-gray-800/50 hover:border-primary/30 transition-all shadow-sm"
                >
                  <Award className="text-primary shrink-0" size={20} />
                  <span className="text-text font-medium text-sm md:text-base leading-tight">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
