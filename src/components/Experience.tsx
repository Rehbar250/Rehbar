import { motion } from 'framer-motion';

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
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience & <span className="text-primary">Projects</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 glow">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-6 rounded-2xl border border-gray-800 shadow hover:border-primary/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-white">{exp.title}</h3>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap md:ml-4 mt-2 md:mt-0">
                    {exp.date}
                  </span>
                </div>
                <h4 className="text-sm text-textSecondary mb-4 font-medium">{exp.company}</h4>
                <ul className="list-disc list-outside ml-4 text-textSecondary text-sm space-y-2">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
