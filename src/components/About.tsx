import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About <span className="text-primary">Me</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-12"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-surface border border-gray-800 p-8 md:p-12 rounded-2xl shadow-xl hover:border-primary/30 transition-colors duration-300"
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
      </div>
    </section>
  );
}
