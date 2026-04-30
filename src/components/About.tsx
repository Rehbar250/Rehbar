import { motion } from 'framer-motion';
import { ScrollReveal } from './AnimationWrappers';

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="section-heading">About <span className="text-primary">Me</span></h2>
            <div className="section-divider" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.div
            whileHover={{ borderColor: 'rgba(59, 130, 246, 0.4)', y: -4 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-8 md:p-12"
          >
            <p className="text-lg md:text-xl text-textSecondary leading-relaxed text-center">
              I am an entry-level Software Engineer currently pursuing a Bachelor of Computer Application. 
              With strong foundations in <strong className="text-text font-medium">C++</strong>, <strong className="text-text font-medium">Object-Oriented Programming</strong>, and <strong className="text-text font-medium">cloud-based system design</strong>, 
              I bring theoretical knowledge into practical application. 
              <br className="hidden md:block"/> <br className="hidden md:block"/>
              My hands-on experience stems from industry-recognized virtual programs at <span className="text-primary font-medium">AWS</span>, <span className="text-primary font-medium">Electronic Arts</span>, and <span className="text-primary font-medium">Tata Consultancy Services</span>. 
              I am deeply passionate about building scalable, secure, and efficient software solutions to solve real-world problems.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
