import React, { useState } from 'react';
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
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => setIsResumeOpen(true);
  const handleCloseResume = () => setIsResumeOpen(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit selection:bg-[#BBCCD7]/30 selection:text-white relative">
        <Navbar onOpenResume={handleOpenResume} />
        <main>
          <Hero onOpenResume={handleOpenResume} />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ServicesSection />
          <ExperienceSection />
          <GitHubSection />
          <EducationSection />
          <ContactSection onOpenResume={handleOpenResume} />
        </main>
        <Footer />

        {/* Global Interactive Resume Viewer Modal */}
        <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
      </div>
    </SmoothScroll>
  );
};

export default App;
