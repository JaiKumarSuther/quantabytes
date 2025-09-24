import React from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  distance?: number;
  intensity?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  intensity = 'medium',
  size = 'md'
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

  const getIntensityClasses = () => {
    switch (intensity) {
      case 'low':
        return 'from-primary/10 via-accent/5 to-secondary/10';
      case 'medium':
        return 'from-primary/20 via-accent/10 to-secondary/20';
      case 'high':
        return 'from-primary/30 via-accent/20 to-secondary/30';
      default:
        return 'from-primary/20 via-accent/10 to-secondary/20';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-6';
      case 'lg':
        return 'p-8';
      case 'xl':
        return 'p-10';
      default:
        return 'p-6';
    }
  };

  return (
    <motion.div
      initial={getInitialAnimation()}
      whileInView={getAnimateAnimation()}
      whileHover={{
        y: -15,
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.4, ease: 'easeOut' }
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut'
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={`relative overflow-hidden rounded-2xl bg-card border border-primary/20 shadow-xl ${getSizeClasses()} ${className} group`}
    >
      {/* Holographic Background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getIntensityClasses()} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Animated Scan Lines */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        animate={{
          background: [
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
          ],
          backgroundPosition: ['-100% 0%', '100% 0%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Floating Holographic Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute top-4 left-4 w-3 h-3 bg-primary/40 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute top-8 right-12 w-2 h-2 bg-accent/60 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-secondary/50 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </motion.div>

      {/* Holographic Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          boxShadow: `
            0 0 20px hsl(var(--primary) / 0.3),
            0 0 40px hsl(var(--primary) / 0.2),
            0 0 60px hsl(var(--accent) / 0.1)
          `
        }}
        animate={{
          boxShadow: [
            '0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.2), 0 0 60px hsl(var(--accent) / 0.1)',
            '0 0 30px hsl(var(--accent) / 0.4), 0 0 50px hsl(var(--accent) / 0.3), 0 0 70px hsl(var(--secondary) / 0.2)',
            '0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.2), 0 0 60px hsl(var(--accent) / 0.1)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        animate={{
          borderImage: [
            'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary))) 1',
            'linear-gradient(45deg, hsl(var(--secondary)), hsl(var(--primary)), hsl(var(--accent))) 1',
            'linear-gradient(45deg, hsl(var(--accent)), hsl(var(--secondary)), hsl(var(--primary))) 1'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  );
};

export default HolographicCard;
