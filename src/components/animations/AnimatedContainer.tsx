import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedContainerProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  distance?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 50,
  className = '',
  once = true,
  amount = 0.3
}) => {
  const getInitialAnimation = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'fade':
        return { opacity: 0 };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimateAnimation = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'fade':
        return { opacity: 1 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialAnimation()}
      whileInView={getAnimateAnimation()}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
      viewport={{
        once,
        amount
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
