import { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import EducationCertifications from './components/EducationCertifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import SmoothScroll from './components/SmoothScroll';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load Three.js particle field for performance
const ParticleField = lazy(() => import('./components/ParticleField'));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Allow the loading screen to finish before rendering particles
    const timer = setTimeout(() => setIsLoaded(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LoadingScreen />
      <SmoothScroll>
        <div className="relative w-full min-h-screen bg-background text-text transition-colors duration-300">
          {/* 3D Particle background — only in the hero area */}
          {isLoaded && (
            <div className="particle-field-container">
              <Suspense fallback={null}>
                <ParticleField />
              </Suspense>
            </div>
          )}

          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <EducationCertifications />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
