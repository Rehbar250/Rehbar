import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import resumePdf from '../assets/resume.pdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const resumeUrl = resumePdf;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-5xl h-[85vh] glass-card bg-[#12161E]/95 border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/15 text-[#BBCCD7]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">Rehbar Miyan — Resume</h3>
                  <p className="text-xs font-mono text-[#8A99AD]">Curriculum Vitae · Full Stack & AI Engineer</p>
                </div>
              </div>

              {/* Action Buttons Header */}
              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  download="Rehbar_Miyan_Resume.pdf"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-[#BBCCD7] hover:text-white bg-white/5 hover:bg-white/15 rounded-xl border border-white/15 transition-all"
                  title="Download PDF directly"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-[#BBCCD7] hover:text-white bg-white/5 hover:bg-white/15 rounded-xl border border-white/15 transition-all"
                  title="Open in new browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open Fullscreen</span>
                </a>

                <button
                  onClick={onClose}
                  className="p-2 text-[#8A99AD] hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  aria-label="Close resume viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Viewer Content Area */}
            <div className="flex-1 bg-[#090B0E] p-2 md:p-4 relative">
              <iframe
                src={`${resumeUrl}#toolbar=1`}
                className="w-full h-full rounded-xl border border-white/10 bg-white"
                title="Rehbar Miyan Resume PDF"
              />
            </div>

            {/* Bottom Footer Info */}
            <div className="px-6 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs font-mono text-[#8A99AD]">
              <span>PDF Viewer</span>
              <div className="flex items-center gap-4">
                <a
                  href={resumeUrl}
                  download="Rehbar_Miyan_Resume.pdf"
                  className="text-[#BBCCD7] hover:underline flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Direct Download Link
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
