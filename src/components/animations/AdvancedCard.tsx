import React from 'react';
import { motion } from 'framer-motion';

interface AdvancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  tiltEffect?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  distance?: number;
  variant?: 'default' | 'premium' | 'glass' | 'neon' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const AdvancedCard: React.FC<AdvancedCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowEffect = true,
  tiltEffect = true,
  delay = 0,
  direction = 'up',
  distance = 50,
  variant = 'default',
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

  const getVariantClasses = () => {
    switch (variant) {
      case 'premium':
        return 'bg-gradient-to-br from-card via-card/95 to-card/90 border-2 border-primary/20 shadow-2xl';
      case 'glass':
        return 'bg-card/80 border border-glass-border shadow-xl';
      case 'neon':
        return 'bg-card border border-primary/30 shadow-lg';
      case 'gradient':
        return 'bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-primary/20 shadow-xl';
      default:
        return 'bg-card border border-border shadow-lg';
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
      whileHover={
        hoverEffect
          ? {
              y: -15,
              scale: 1.03,
              rotateX: tiltEffect ? 8 : 0,
              rotateY: tiltEffect ? 8 : 0,
              transition: { duration: 0.4, ease: 'easeOut' }
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut'
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={`relative overflow-hidden rounded-2xl ${getVariantClasses()} ${getSizeClasses()} ${className} group`}
    >
      {/* Animated Background Layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0.8, rotate: -45 }}
        whileHover={{ scale: 1.1, rotate: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Floating Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-4 left-4 w-2 h-2 bg-primary/40 rounded-full" />
        <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-accent/60 rounded-full" />
        <div className="absolute bottom-6 left-8 w-1 h-1 bg-secondary/50 rounded-full" />
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-primary/30 rounded-full" />
      </motion.div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Hover Glow Effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 pointer-events-none rounded-2xl"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Premium Variant Extra Effects */}
      {variant === 'premium' && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </>
      )}

      {/* Neon Variant Effects */}
      {variant === 'neon' && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            boxShadow: '0 0 20px hsl(var(--primary) / 0.3), 0 0 40px hsl(var(--primary) / 0.2)'
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default AdvancedCard;
