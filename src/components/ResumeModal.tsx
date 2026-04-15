import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, resumeUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Accessibility: Focus the modal when it opens
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-5xl h-full max-h-[90vh] bg-surface/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-3xl flex flex-col overflow-hidden outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Resume Preview"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-text">Resume Preview</h3>
                <a
                  href={resumeUrl}
                  download="resume.pdf"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-sm font-semibold rounded-full border border-primary/30 transition-all hover:scale-105"
                  aria-label="Download resume"
                >
                  <Download size={16} /> Download
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  download="resume.pdf"
                  className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-textSecondary hover:text-text"
                  aria-label="Download resume"
                >
                  <Download size={22} />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-textSecondary hover:text-red-400"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Resume Viewer */}
            <div className="flex-1 relative bg-white/5 overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-primary bg-surface/50 z-10 px-6 text-center">
                  <Loader2 className="animate-spin" size={40} />
                  <div className="space-y-2">
                    <p className="text-sm font-medium animate-pulse">Initializing Preview Viewer...</p>
                    <p className="text-xs text-textSecondary max-w-xs mx-auto leading-relaxed">
                      If the preview doesn't appear within a few seconds, you can download the file using the button in the header.
                    </p>
                  </div>
                </div>
              )}
              {isOpen && (
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                  className="w-full h-full border-none"
                  onLoad={() => setIsLoading(false)}
                  title="Resume PDF Preview"
                />
              )}
            </div>

            {/* Footer / Mobile Hint */}
            <div className="p-3 text-center border-t border-white/10 md:hidden">
              <p className="text-xs text-textSecondary uppercase tracking-widest font-semibold">Scroll to view more</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
