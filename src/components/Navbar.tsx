import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
        <a href="#" className="text-2xl font-bold tracking-tighter">
          R<span className="text-primary">M</span>
        </a>
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-textSecondary hover:text-primary transition-colors text-sm font-medium tracking-wide"
            >
              {item.name}
            </a>
          ))}
        </nav>
        {/* Mobile menu could be added here later */}
        <a 
          href="#contact"
          className="hidden md:inline-flex px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded-md text-sm font-semibold border border-primary/20 hover:border-primary"
        >
          Hire Me
        </a>
      </div>
    </header>
  );
}
