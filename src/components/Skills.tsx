import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Programming Languages & Core",
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
    skills: [
      { name: "AWS General", level: 80 },
      { name: "Elastic Beanstalk", level: 75 },
    ]
  },
  {
    category: "Cybersecurity",
    skills: [
      { name: "Security Fundamentals", level: 70 },
      { name: "IAM Basics", level: 75 },
    ]
  },
  {
    category: "Data & Analytics",
    skills: [
      { name: "KPI Analysis", level: 80 },
      { name: "Data Visualization", level: 85 },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Core <span className="text-primary">Skills</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-surface rounded-2xl p-8 border border-gray-800 shadow-lg hover:border-primary/40 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-3">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-textSecondary">{skill.name}</span>
                      <span className="text-sm font-bold text-primary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="bg-primary h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
