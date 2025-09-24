import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  tiltEffect?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  distance?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowEffect = true,
  tiltEffect = true,
  delay = 0,
  direction = 'up',
  distance = 50
}) => {
  const getInitialAnimation = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, rotateX: -15 };
      case 'down':
        return { opacity: 0, y: -distance, rotateX: 15 };
      case 'left':
        return { opacity: 0, x: distance, rotateY: -15 };
      case 'right':
        return { opacity: 0, x: -distance, rotateY: 15 };
      case 'fade':
        return { opacity: 0 };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      default:
        return { opacity: 0, y: distance, rotateX: -15 };
    }
  };

  const getAnimateAnimation = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0, rotateX: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0, rotateY: 0 };
      case 'fade':
        return { opacity: 1 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, y: 0, rotateX: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialAnimation()}
      whileInView={getAnimateAnimation()}
      whileHover={
        hoverEffect
          ? {
              y: -10,
              scale: 1.02,
              rotateX: tiltEffect ? 5 : 0,
              rotateY: tiltEffect ? 5 : 0,
              transition: { duration: 0.3 }
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut'
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={`glass-card perspective-1000 ${className}`}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 ${
          glowEffect ? 'group-hover:opacity-100' : ''
        }`}
        initial={{ scale: 0.8, rotate: -45 }}
        whileHover={glowEffect ? { scale: 1.2, rotate: 0 } : {}}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedCard;
