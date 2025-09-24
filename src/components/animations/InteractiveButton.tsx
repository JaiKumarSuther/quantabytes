import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  glowEffect?: boolean;
  rippleEffect?: boolean;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
  type = 'button',
  glowEffect = true,
  rippleEffect = true
}) => {
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rippleEffect) {
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
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-block"
    >
      <Button
        type={type}
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={disabled}
        className={`relative overflow-hidden ${glowEffect ? 'hover:glow-primary' : ''} ${className}`}
      >
        {children}
        
        {/* Ripple effects */}
        {rippleEffect && ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
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
        
        {/* Glow effect overlay */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default InteractiveButton;
