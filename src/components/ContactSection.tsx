import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './ui/Container';
import { GradientText } from './ui/GradientText';
import { Button } from './ui/Button';
import { Mail, Phone, Github, Linkedin, FileText, Send, MessageCircle, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3500);
    }, 1200);
  };

  return (
    <section id="contact" className="py-32 relative bg-[#0C0C0C] overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-extrabold text-white/[0.02] select-none pointer-events-none tracking-widest font-kanit whitespace-nowrap">
        LET'S CONNECT
      </div>

      {/* Ambient background glow */}
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-[#BBCCD7]/10 rounded-full blur-[160px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Contact Info */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-[#BBCCD7] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#BBCCD7]" />
              <span>GET IN TOUCH</span>
            </div>

            {/* Large Gradient Heading: LET'S BUILD SOMETHING AMAZING */}
            <h2 className="text-fluid-title font-extrabold uppercase text-white mb-6 tracking-tight">
              LET'S BUILD <br />
              <GradientText>SOMETHING AMAZING</GradientText>
            </h2>

            <p className="text-[#8A99AD] text-fluid-sub leading-relaxed mb-8">
              I am open to software engineering roles, full-stack development projects, and AI system integrations. Reach out directly or send a message below!
            </p>

            {/* Contact Badges Grid */}
            <div className="space-y-4 w-full mb-8">
              <a
                href="mailto:mrehbar2153@gmail.com"
                className="glass-card glass-card-hover p-4 rounded-2xl border border-white/10 flex items-center gap-4 text-sm font-medium text-[#D7E2EA] hover:text-white"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#BBCCD7]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#8A99AD]">Email</div>
                  <div>mrehbar2153@gmail.com</div>
                </div>
              </a>

              <a
                href="https://wa.me/917499775471"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover p-4 rounded-2xl border border-white/10 flex items-center gap-4 text-sm font-medium text-[#D7E2EA] hover:text-white"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#8A99AD]">WhatsApp / Call</div>
                  <div>+91 7499775471</div>
                </div>
              </a>

              <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-4 text-sm font-medium text-[#D7E2EA]">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#8A99AD]">Location</div>
                  <div>Uttar Pradesh, India · Remote & Onsite</div>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/Rehbar250"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card border border-white/10 text-[#D7E2EA] hover:text-white hover:border-white/30 transition-all"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://linkedin.com/in/rehbar-miyan-325498236"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card border border-white/10 text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card border border-white/10 text-[#BBCCD7] hover:border-[#BBCCD7]/50 transition-all flex items-center gap-1.5 px-4 text-xs font-mono"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: Premium Animated Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 rounded-3xl border border-white/15 shadow-2xl relative"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-xs font-mono text-[#8A99AD] mb-8">Fill out the form below and I'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#8A99AD] mb-2 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-[#BBCCD7] focus:bg-white/10 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8A99AD] mb-2 uppercase tracking-wider">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-[#BBCCD7] focus:bg-white/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8A99AD] mb-2 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-[#BBCCD7] focus:bg-white/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8A99AD] mb-2 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Rehbar, I would like to discuss a project..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-[#BBCCD7] focus:bg-white/10 outline-none transition-all resize-none"
                  />
                </div>

                {/* Animated Submit Feedback */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Thank you! Your message has been sent successfully. Rehbar will contact you soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  variant="glow"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-base font-semibold"
                  icon={<Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
};
