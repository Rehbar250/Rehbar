import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({ children, className = '' }) => {
  return (
    <span className={`heading-gradient font-bold ${className}`}>
      {children}
    </span>
  );
};
