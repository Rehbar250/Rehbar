import { motion } from 'framer-motion';
import { ScrollReveal } from './AnimationWrappers';

const experienceData = [
  {
    title: "Freelance Software Engineer (C++)",
    company: "Independent",
    date: "Recent",
    points: [
      "Developed and customized Chromium-based browser components using C++.",
      "Implemented new features following object-oriented design principles.",
      "Performed code reviews and applied secure coding practices."
    ]
  },
  {
    title: "Software Engineering Virtual Experience",
    company: "Amazon Web Services (AWS)",
    date: "Virtual Program",
    points: [
      "Designed scalable hosting architecture using AWS Elastic Beanstalk.",
      "Improved performance by addressing latency and scalability challenges."
    ]
  },
  {
    title: "Software Engineering Virtual Experience",
    company: "Electronic Arts (EA)",
    date: "Virtual Program",
    points: [
      "Designed C++ class structures and feature proposals for game systems.",
      "Analyzed KPIs to evaluate engagement and product performance."
    ]
  },
  {
    title: "Data & Digital Virtual Experience",
    company: "Tata Consultancy Services (TCS)",
    date: "Virtual Program",
    points: [
      "Built data visualizations for executive-level decision-making."
    ]
  },
  {
    title: "Portfolio Website",
    company: "React, Tailwind CSS, JavaScript",
    date: "Personal Project",
    points: [
      "Developed a personal portfolio website to showcase projects, skills, and experience with a responsive and user-friendly interface.",
      "Fully responsive design optimized for all screen sizes.",
      "Resume download and preview functionality.",
      "Contact form integration for direct communication."
    ]
  },
  {
    title: "AI Automation Dashboard",
    company: "React, Node.js / FastAPI, REST APIs",
    date: "Personal Project",
    points: [
      "Built an AI-powered dashboard to automate workflows, manage APIs, and monitor processes in real time.",
      "API integrations for automation tasks.",
      "Real-time monitoring dashboard with live data updates.",
      "Secure authentication and token management.",
      "Error handling and logging system."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[130px] -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="section-heading">Experience & <span className="text-primary">Projects</span></h2>
            <div className="section-divider" />
          </div>
        </ScrollReveal>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
          {experienceData.map((exp, index) => {
            const isOdd = index % 2 === 1;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className={`relative flex items-center justify-between md:justify-normal ${isOdd ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot with glow */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary/50 bg-background shadow-lg shadow-primary/20 shrink-0 md:order-1 z-10 ${isOdd ? 'md:-translate-x-1/2' : 'md:translate-x-1/2'}`}>
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.4)' }}
                    transition={{ duration: 0.3 }}
                    className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="font-bold text-xl text-white">{exp.title}</h3>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap md:ml-4 mt-2 md:mt-0 border border-primary/20">
                        {exp.date}
                      </span>
                    </div>
                    <h4 className="text-sm text-textSecondary mb-4 font-medium">{exp.company}</h4>
                    <ul className="list-disc list-outside ml-4 text-textSecondary text-sm space-y-2">
                      {exp.points.map((point, idx) => (
                        <li key={idx} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
