import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glowing effects */}
       <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get in <span className="text-primary">Touch</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-textSecondary max-w-2xl mx-auto text-lg">
            I'm always open to discussing new opportunities, creative projects, or ways to be part of your vision. Let's connect!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-surface border border-gray-800 p-8 rounded-2xl shadow-xl hover:border-primary/30 transition-all flex flex-col gap-6">
              
              <a href="mailto:mrehbar2153@gmail.com" className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-4 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors glow">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-textSecondary font-medium mb-1">Email</h4>
                  <p className="text-white font-medium break-all">mrehbar2153@gmail.com</p>
                </div>
              </a>

              <a href="tel:+917499775471" className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-4 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors glow">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-textSecondary font-medium mb-1">Phone</h4>
                  <p className="text-white font-medium">+91 7499775471</p>
                </div>
              </a>

              <a href="https://linkedin.com/in/rehbar-miyan-325498236" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-4 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors glow">
                  <LinkedinIcon size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-textSecondary font-medium mb-1">LinkedIn</h4>
                  <p className="text-white font-medium truncate">in/rehbar-miyan</p>
                </div>
              </a>

              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-4 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors glow">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-textSecondary font-medium mb-1">Location</h4>
                  <p className="text-white font-medium">Noida, Uttar Pradesh, India</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Contact Form (UI only to match premium aesthetic) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form className="bg-surface border border-gray-800 p-8 md:p-12 rounded-2xl shadow-xl flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-textSecondary mb-2">Your Name</label>
                  <input type="text" id="name" className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="John Doe"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-2">Your Email</label>
                  <input type="email" id="email" className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="john@example.com"/>
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-textSecondary mb-2">Subject</label>
                <input type="text" id="subject" className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Project Inquiry"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-textSecondary mb-2">Message</label>
                <textarea id="message" rows={5} className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" placeholder="Hello Rehbar, I would like to talk about..."></textarea>
              </div>
              <button className="flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-4 rounded-lg hover:bg-primaryDark transition-all glow mt-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
