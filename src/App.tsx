import React from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { GitHubSection } from './components/GitHubSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit selection:bg-[#BBCCD7]/30 selection:text-white relative">
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ServicesSection />
          <ExperienceSection />
          <GitHubSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;
