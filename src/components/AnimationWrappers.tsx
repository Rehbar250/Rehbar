import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Scroll-triggered reveal animation wrapper.
 * Provides fade-in, slide-up, and staggered animations for sections.
 */

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

const directionOffset = {
  up: { y: 60, x: 0 },
  down: { y: -60, x: 0 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
}: ScrollRevealProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Smooth easeOutQuad
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — animates children in sequence.
 */
interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function StaggerContainer({
  children,
  className = '',
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Magnetic hover effect — element follows cursor subtly on hover.
 */
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticHover({
  children,
  className = '',
  strength = 0.3,
}: MagneticProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400 * strength,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Text reveal animation - letters appear one by one
 */
export function GlowText({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    >
      {text}
    </motion.span>
  );
}
