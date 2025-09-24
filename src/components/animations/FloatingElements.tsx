import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  amplitude?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 3,
  delay = 0,
  amplitude = 20,
  className = ''
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface FloatingElementsProps {
  count?: number;
  className?: string;
  elementClassName?: string;
  colors?: string[];
  sizes?: number[];
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 5,
  className = '',
  elementClassName = '',
  colors = ['primary', 'accent', 'secondary'],
  sizes = [4, 6, 8]
}) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: sizes[Math.floor(Math.random() * sizes.length)],
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2
  }));

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/40';
      case 'accent':
        return 'bg-accent/40';
      case 'secondary':
        return 'bg-secondary/40';
      default:
        return 'bg-primary/40';
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full ${getColorClass(element.color)} ${elementClassName}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export { FloatingElement, FloatingElements };
