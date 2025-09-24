import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  distance?: number;
  interactive?: boolean;
  rippleEffect?: boolean;
  magneticEffect?: boolean;
  glowOnHover?: boolean;
  tiltOnHover?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  interactive = true,
  rippleEffect = true,
  magneticEffect = true,
  glowOnHover = true,
  tiltOnHover = true,
  size = 'md'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    setMousePosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rippleEffect) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.div
      initial={getInitialAnimation()}
      whileInView={getAnimateAnimation()}
      whileHover={
        interactive
          ? {
              y: -10,
              scale: 1.02,
              rotateX: tiltOnHover ? (mousePosition.y / 20) : 0,
              rotateY: tiltOnHover ? (mousePosition.x / 20) : 0,
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg ${getSizeClasses()} ${className} group cursor-pointer`}
      style={{
        transform: magneticEffect
          ? `perspective(1000px) rotateX(${mousePosition.y / 20}deg) rotateY(${mousePosition.x / 20}deg)`
          : undefined
      }}
    >
      {/* Animated Background */}
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

      {/* Floating Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-4 left-4 w-2 h-2 bg-primary/40 rounded-full" />
        <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-accent/60 rounded-full" />
        <div className="absolute bottom-6 left-8 w-1 h-1 bg-secondary/50 rounded-full" />
      </motion.div>

      {/* Ripple Effects */}
      {rippleEffect && ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/20 rounded-full pointer-events-none"
          initial={{
            width: 0,
            height: 0,
            left: ripple.x,
            top: ripple.y,
            x: '-50%',
            y: '-50%'
          }}
          animate={{
            width: 100,
            height: 100,
            opacity: 0
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut'
          }}
        />
      ))}

      {/* Glow Effect */}
      {glowOnHover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            boxShadow: '0 0 20px hsl(var(--primary) / 0.2)'
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor'
        }}
      />
    </motion.div>
  );
};

export default InteractiveCard;
