import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Futuristic loading screen with neon spinner and smooth fade-out.
 * Shows before the main website content loads.
 */
export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerating progress
        const increment = Math.max(1, Math.floor((100 - prev) / 8));
        return Math.min(prev + increment, 100);
      });
    }, 60);

    // Minimum display time for smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="loading-screen"
        >
          {/* Ambient glow orbs */}
          <div className="loading-orb loading-orb-1" />
          <div className="loading-orb loading-orb-2" />

          {/* Central content */}
          <div className="loading-content">
            {/* Neon spinner rings */}
            <div className="spinner-container">
              <div className="spinner-ring spinner-ring-outer" />
              <div className="spinner-ring spinner-ring-middle" />
              <div className="spinner-ring spinner-ring-inner" />
              <div className="spinner-core" />
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="loading-brand"
            >
              <span className="loading-brand-r">R</span>
              <span className="loading-brand-m">M</span>
            </motion.div>

            {/* Progress bar */}
            <div className="loading-progress-container">
              <motion.div
                className="loading-progress-bar"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              className="loading-status-text"
            >
              {progress < 100 ? 'Initializing experience...' : 'Ready'}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
