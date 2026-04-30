import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimationWrappers';

const skillsData = [
  {
    category: "Programming Languages & Core",
    icon: "💻",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGlow: "hover:shadow-blue-500/10",
    skills: [
      { name: "C / C++", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "Object-Oriented Programming (OOP)", level: 85 },
      { name: "Data Structures", level: 75 },
      { name: "System Design Fundamentals", level: 70 },
    ]
  },
  {
    category: "Cloud Technologies",
    icon: "☁️",
    gradient: "from-cyan-500/20 to-teal-500/20",
    borderGlow: "hover:shadow-cyan-500/10",
    skills: [
      { name: "AWS General", level: 80 },
      { name: "Elastic Beanstalk", level: 75 },
    ]
  },
  {
    category: "Cybersecurity",
    icon: "🔒",
    gradient: "from-purple-500/20 to-pink-500/20",
    borderGlow: "hover:shadow-purple-500/10",
    skills: [
      { name: "Security Fundamentals", level: 70 },
      { name: "IAM Basics", level: 75 },
    ]
  },
  {
    category: "Data & Analytics",
    icon: "📊",
    gradient: "from-amber-500/20 to-orange-500/20",
    borderGlow: "hover:shadow-amber-500/10",
    skills: [
      { name: "KPI Analysis", level: 80 },
      { name: "Data Visualization", level: 85 },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="section-heading">Core <span className="text-primary">Skills</span></h2>
            <div className="section-divider" />
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {skillsData.map((category, catIndex) => (
            <StaggerItem key={catIndex}>
              <motion.div
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className={`skill-card glass-card p-8 h-full ${category.borderGlow}`}
              >
                {/* Gradient overlay that intensifies on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 skill-card-glow transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-3">
                    <motion.span 
                      className="text-2xl"
                      whileHover={{ scale: 1.3, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {category.icon}
                    </motion.span>
                    {category.category}
                  </h3>
                  <div className="space-y-5">
                    {category.skills.map((skill, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="group/skill"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-textSecondary group-hover/skill:text-text transition-colors duration-200">
                            {skill.name}
                          </span>
                          <span className="text-sm font-bold text-primary">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden group-hover/skill:bg-white/10 transition-colors duration-300">
                          <motion.div
                            className="skill-bar-fill h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
