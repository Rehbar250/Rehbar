import React from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from './Magnetic';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  enableMagnetic?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  icon,
  iconPosition = 'right',
  enableMagnetic = true,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 select-none overflow-hidden cursor-pointer";
  
  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2.5",
    lg: "text-base px-8 py-4 gap-3",
  };

  const variantStyles = {
    primary: "bg-[#181D24] text-[#D7E2EA] border border-[#BBCCD7]/20 hover:border-[#BBCCD7]/50 hover:shadow-[0_0_25px_rgba(187,204,215,0.15)] hover:text-white",
    ghost: "bg-transparent text-[#8A99AD] hover:text-[#D7E2EA] hover:bg-white/5",
    outline: "bg-black/30 backdrop-blur-md text-[#D7E2EA] border border-white/10 hover:border-white/30 hover:bg-white/10 hover:text-white",
    glow: "bg-gradient-to-r from-[#2B323D] to-[#1A1F26] text-[#D7E2EA] border border-[#9EABBA]/30 hover:border-[#BBCCD7] hover:shadow-[0_0_30px_rgba(187,204,215,0.25)] hover:scale-[1.02]",
  };

  const content = (
    <motion.span 
      className="relative z-10 flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon && iconPosition === 'left' && <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </motion.span>
  );

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} group ${className}`;

  const renderElement = () => {
    if (href) {
      return (
        <a 
          href={href} 
          target={target} 
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          className={combinedClass}
        >
          {content}
        </a>
      );
    }
    return (
      <button className={combinedClass} {...props}>
        {content}
      </button>
    );
  };

  if (enableMagnetic) {
    return <Magnetic>{renderElement()}</Magnetic>;
  }

  return renderElement();
};
