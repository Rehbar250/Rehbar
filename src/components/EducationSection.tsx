import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './ui/Container';
import { GradientText } from './ui/GradientText';
import { GraduationCap, Award, ExternalLink, X, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Cert {
  id: string;
  icon: string;
  name: string;
  issuer: string;
  year: string;
  skillsCovered: string[];
  credentialDetails: string;
}

const certs: Cert[] = [
  {
    id: 'eab-ai',
    icon: '🧠',
    name: 'EAB – Generative AI for Proposal Generation',
    issuer: 'EAB Enterprise',
    year: '2024',
    skillsCovered: ['Generative AI', 'Prompt Engineering', 'Proposal Automation'],
    credentialDetails: 'Demonstrates practical application of Generative AI models in streamlining enterprise proposal workflows and prompt architecture.',
  },
  {
    id: 'ea-swe',
    icon: '🏅',
    name: 'Electronic Arts – Software Engineering Simulation',
    issuer: 'Electronic Arts (EA)',
    year: '2024',
    skillsCovered: ['C++ Systems', 'Game Engine Class Design', 'KPI Analysis'],
    credentialDetails: 'Hands-on simulation designing complex C++ class structures for gaming features and analyzing key telemetry metrics.',
  },
  {
    id: 'linkedin-genai',
    icon: '⚡',
    name: 'LinkedIn – Generative AI Certified',
    issuer: 'LinkedIn Learning',
    year: '2024',
    skillsCovered: ['LLMs', 'AI Applications', 'Workflow Integration'],
    credentialDetails: 'Fundamental and advanced principles of Generative AI models, neural architecture concepts, and professional integration.',
  },
  {
    id: 'explore-tech',
    icon: '🚀',
    name: 'Explore Digital Technology',
    issuer: 'Industry Virtual Program',
    year: '2023',
    skillsCovered: ['Cloud Computing', 'Digital Architecture', 'Cybersecurity'],
    credentialDetails: 'Overview of modern digital infrastructure, cloud computing paradigms, and cybersecurity principles.',
  },
  {
    id: 'llm-intro',
    icon: '📖',
    name: 'Introduction to Large Language Models (LLM)',
    issuer: 'Google Cloud / Tech Simulation',
    year: '2024',
    skillsCovered: ['Transformers', 'LLM Fine-tuning', 'Prompting'],
    credentialDetails: 'Comprehensive coverage of Transformer architecture, tokenization, fine-tuning methodologies, and prompt design.',
  },
];

export const EducationSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);

  return (
    <section id="education" className="py-32 relative bg-[#0C0C0C]">
      <Container>
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-[#BBCCD7] mb-3">
            <Award className="w-3.5 h-3.5 text-[#BBCCD7]" />
            <span>CREDENTIALS & ACADEMICS</span>
          </div>
          <h2 className="text-fluid-title font-extrabold uppercase text-white">
            EDUCATION & <GradientText>CERTIFICATIONS</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#181D24] border border-[#BBCCD7]/30 text-3xl">🎓</div>
                <div>
                  <h3 className="text-xl font-bold text-white">Bachelor of Computer Application (BCA)</h3>
                  <p className="text-xs font-mono text-[#8A99AD] mt-1">Mahatma Jyotiba Phule Rohilkhand University · 2023 — 2026</p>
                </div>
              </div>
              <p className="text-sm text-[#8A99AD] leading-relaxed">
                Computer and Information Sciences — Specializing in core computer science subjects, software engineering principles, algorithms, data structures, databases, and practical application design.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 rounded-3xl border border-white/10 space-y-4"
            >
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-sm font-semibold text-white">Class XII — Uttar Pradesh Board</span>
                <span className="text-xs font-mono text-[#8A99AD]">2022 — 2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white">Class X — Uttar Pradesh Board</span>
                <span className="text-xs font-mono text-[#8A99AD]">2020 — 2021</span>
              </div>
            </motion.div>
          </div>

          {/* Certifications Column with Lightbox Preview Trigger */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A99AD] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Certificates (Click to Preview)</span>
            </h3>

            {certs.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                onClick={() => setSelectedCert(cert)}
                className="glass-card glass-card-hover p-4 rounded-2xl border border-white/10 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{cert.icon}</span>
                  <div>
                    <h4 className="text-xs font-semibold text-[#D7E2EA] group-hover:text-white transition-colors">{cert.name}</h4>
                    <p className="text-[11px] font-mono text-[#8A99AD] mt-0.5">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#8A99AD] group-hover:text-[#BBCCD7] group-hover:translate-x-0.5 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      {/* Lightbox Modal Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass-card rounded-3xl p-8 border border-white/20 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 text-[#8A99AD] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedCert.icon}</span>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Credential
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedCert.name}</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono text-[#8A99AD] border-t border-b border-white/10 py-4 my-4">
                <div className="flex justify-between">
                  <span>Issuing Organization:</span>
                  <span className="text-white font-semibold">{selectedCert.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Year Issued:</span>
                  <span className="text-white font-semibold">{selectedCert.year}</span>
                </div>
              </div>

              <p className="text-sm text-[#8A99AD] leading-relaxed mb-4">
                {selectedCert.credentialDetails}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedCert.skillsCovered.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#BBCCD7]">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
