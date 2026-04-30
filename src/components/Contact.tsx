import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { ScrollReveal } from './AnimationWrappers';

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const contactMethods = [
  {
    icon: <Mail size={22} />,
    label: "Email",
    value: "mrehbar2153@gmail.com",
    href: "mailto:mrehbar2153@gmail.com",
  },
  {
    icon: <Phone size={22} />,
    label: "Phone",
    value: "+91 7499775471",
    href: "tel:+917499775471",
  },
  {
    icon: <LinkedinIcon size={22} />,
    label: "LinkedIn",
    value: "in/rehbar-miyan",
    href: "https://linkedin.com/in/rehbar-miyan-325498236",
    external: true,
  },
  {
    icon: <GithubIcon size={22} />,
    label: "GitHub",
    value: "Rehbar250",
    href: "https://github.com/Rehbar250",
    external: true,
  },
  {
    icon: <MapPin size={22} />,
    label: "Location",
    value: "Noida, Uttar Pradesh, India",
  },
];

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);

    // REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
    const SERVICE_ID = 'service_sylarzg';
    const TEMPLATE_ID = 'template_re2hgng';
    const PUBLIC_KEY = 'aNB5uiPw7ScQycJqP';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        form.current?.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setStatus({ type: null, message: '' }), 5000);
      });
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/8 rounded-full blur-[180px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="section-heading">Get in <span className="text-primary">Touch</span></h2>
            <div className="section-divider" />
            <p className="mt-6 text-textSecondary max-w-2xl mx-auto text-lg">
              I'm always open to discussing new opportunities, creative projects, or ways to be part of your vision. Let's connect!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <ScrollReveal direction="left">
            <div className="glass-card p-8 flex flex-col gap-5 h-full">
              {contactMethods.map((method, index) => {
                const Wrapper = method.href ? 'a' : 'div';
                const linkProps = method.href
                  ? {
                      href: method.href,
                      ...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                    }
                  : {};
                return (
                  <motion.div key={index} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Wrapper {...linkProps} className="flex items-start gap-4 group cursor-pointer">
                      <div className="contact-icon-box">
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="text-xs text-textSecondary font-medium mb-1 uppercase tracking-wider">{method.label}</h4>
                        <p className="text-white font-medium text-sm break-all">{method.value}</p>
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-2">
            <form ref={form} className="glass-card p-8 md:p-10 flex flex-col gap-5" onSubmit={sendEmail}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-textSecondary mb-2 uppercase tracking-wider">Your Name</label>
                  <input 
                    type="text" id="name" name="name" required 
                    className="form-input" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-textSecondary mb-2 uppercase tracking-wider">Your Email</label>
                  <input 
                    type="email" id="email" name="email" required 
                    className="form-input" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-textSecondary mb-2 uppercase tracking-wider">Subject</label>
                <input 
                  type="text" id="subject" name="subject" 
                  className="form-input" 
                  placeholder="Project Inquiry" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-textSecondary mb-2 uppercase tracking-wider">Message</label>
                <textarea 
                  id="message" name="message" rows={5} required 
                  className="form-input resize-none" 
                  placeholder="Hello Rehbar, I would like to talk about..."
                />
              </div>

              {status.type && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-sm font-medium ${
                    status.type === 'success' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold py-4 rounded-xl transition-all mt-1 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primaryDark'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
