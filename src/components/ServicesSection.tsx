import React from 'react';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { Magnetic } from './ui/Magnetic';
import { Bot, Layout, BarChart3, Globe, Layers, MessageSquareCode, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: 'ai-automation',
    icon: <Bot className="w-8 h-8 text-blue-600" />,
    title: 'AI Automation',
    description: 'Intelligent automation systems, automated workflow pipelines, and custom script orchestration to streamline operations.',
    features: ['Workflow Orchestration', 'Task Execution Scripts', 'Process Optimization'],
  },
  {
    id: 'fullstack-dev',
    icon: <Layout className="w-8 h-8 text-indigo-600" />,
    title: 'Full Stack Development',
    description: 'End-to-end web application development using React 19, Next.js, TypeScript, and robust Node.js backend services.',
    features: ['React & Next.js Architecture', 'TypeScript Type Safety', 'Scalable Backend APIs'],
  },
  {
    id: 'dashboards',
    icon: <BarChart3 className="w-8 h-8 text-emerald-600" />,
    title: 'Dashboard Development',
    description: 'Executive-level analytics dashboards featuring real-time data visualizations, metric tracking, and intuitive user interfaces.',
    features: ['Interactive Data Visualizations', 'Real-Time Metrics', 'Recruitment & Business Analytics'],
  },
  {
    id: 'portfolio-sites',
    icon: <Globe className="w-8 h-8 text-purple-600" />,
    title: 'Portfolio Websites',
    description: 'Awwwards-inspired modern portfolio & landing sites with high-impact typography, glassmorphism, and fluid animations.',
    features: ['Fluid Clamp Typography', 'Framer Motion Animations', 'Dark Mode & Glassmorphism'],
  },
  {
    id: 'api-integration',
    icon: <Layers className="w-8 h-8 text-cyan-600" />,
    title: 'API Integration',
    description: 'Clean RESTful API endpoint development, third-party service connections, and secure data exchange layers.',
    features: ['RESTful Endpoint Design', 'Secure Data Ingestion', 'Third-Party Webhooks'],
  },
  {
    id: 'ai-chatbots',
    icon: <MessageSquareCode className="w-8 h-8 text-rose-600" />,
    title: 'AI Chatbots',
    description: 'LLM-powered conversational agents, custom prompt pipelines, and intelligent chat assistants tailored for web interfaces.',
    features: ['LLM Prompt Engineering', 'Interactive Chat Modals', 'Generative Response Pipelines'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#F8FAFC] text-[#0F172A] rounded-t-[40px] md:rounded-t-[60px] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/80 border border-slate-300 text-xs font-mono text-slate-700 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>WHAT I OFFER</span>
          </div>
          
          <h2 className="text-fluid-title font-extrabold uppercase text-[#0F172A] tracking-tight">
            SERVICES
          </h2>
          
          <p className="text-slate-600 text-fluid-sub mt-2 max-w-xl">
            High-impact software engineering services tailored to bring intelligent automation, modern web design, and scalable applications to life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <Magnetic intensity={0.12}>
                <div className="relative h-full p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                  
                  {/* Subtle hover gradient sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 rounded-2xl bg-slate-100/80 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">
                        {service.icon}
                      </div>
                      <a
                        href="#contact"
                        className="p-2 rounded-full text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all"
                        aria-label={`Inquire about ${service.title}`}
                      >
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>

                    <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors mb-3">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="relative z-10 pt-4 border-t border-slate-100 space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
