import React from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  fontSize?: string;
  className?: string;
  delay?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  children,
  color = 'primary',
  speed = 2,
  fontSize = 'inherit',
  className = '',
  delay = 0
}) => {
  const colorClasses = {
    primary: 'from-primary via-accent to-secondary',
    secondary: 'from-secondary via-primary to-accent',
    accent: 'from-accent via-secondary to-primary',
    white: 'from-white via-gray-200 to-white',
    black: 'from-black via-gray-800 to-black'
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`relative inline-block ${className}`}
      style={{ fontSize }}
    >
      <motion.span
        className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} bg-clip-text text-transparent`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundSize: '200% 200%'
        }}
      >
        {children}
      </motion.span>
      
      {/* Shine overlay effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: speed * 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + 0.5
        }}
        style={{
          clipPath: 'polygon(0 0, 30% 0, 50% 100%, 0% 100%)'
        }}
      />
    </motion.span>
  );
};

export default ShinyText;
