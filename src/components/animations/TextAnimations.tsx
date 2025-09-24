import React from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  children: string;
  speed?: number;
  delay?: number;
  className?: string;
  color?: 'primary' | 'accent' | 'secondary' | 'white' | 'black';
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  children,
  speed = 50,
  delay = 0,
  className = '',
  color = 'primary'
}) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < children.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + children[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, children, speed]);

  const colorClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    secondary: 'text-secondary',
    white: 'text-white',
    black: 'text-black'
  };

  return (
    <span className={`${colorClasses[color]} ${className}`}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-current ml-1"
      />
    </span>
  );
};

interface BounceTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const BounceText: React.FC<BounceTextProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = ''
}) => {
  return (
    <motion.span
      initial={{ y: 0 }}
      animate={{ y: [-10, 0, -10] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

interface WaveTextProps {
  children: string;
  delay?: number;
  className?: string;
  color?: 'primary' | 'accent' | 'secondary';
}

export const WaveText: React.FC<WaveTextProps> = ({
  children,
  delay = 0,
  className = '',
  color = 'primary'
}) => {
  const letters = children.split('');

  const colorClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    secondary: 'text-secondary'
  };

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            delay: delay + index * 0.1,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`inline-block ${colorClasses[color]}`}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

interface GlitchTextProps {
  children: string;
  delay?: number;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  delay = 0,
  className = '',
  intensity = 'medium'
}) => {
  const intensityMap = {
    low: { duration: 0.1, frequency: 0.1 },
    medium: { duration: 0.05, frequency: 0.2 },
    high: { duration: 0.02, frequency: 0.3 }
  };

  const { duration, frequency } = intensityMap[intensity];

  return (
    <motion.span
      className={`relative ${className}`}
      animate={{
        x: [0, -2, 2, 0],
        y: [0, 1, -1, 0],
        skewX: [0, -2, 2, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: frequency
      }}
    >
      {children}
      <motion.span
        className="absolute inset-0 text-primary/50"
        animate={{
          x: [0, 2, -2, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
};

interface MorphingTextProps {
  texts: string[];
  delay?: number;
  className?: string;
  color?: 'primary' | 'accent' | 'secondary';
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  delay = 0,
  className = '',
  color = 'primary'
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  const colorClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    secondary: 'text-secondary'
  };

  return (
    <motion.span
      key={currentIndex}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      transition={{ duration: 0.5, delay }}
      className={`${colorClasses[color]} ${className}`}
    >
      {texts[currentIndex]}
    </motion.span>
  );
};

interface NeonTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  color?: 'primary' | 'accent' | 'secondary';
  intensity?: 'low' | 'medium' | 'high';
}

export const NeonText: React.FC<NeonTextProps> = ({
  children,
  delay = 0,
  className = '',
  color = 'primary',
  intensity = 'medium'
}) => {
  const intensityMap = {
    low: '0 0 3px',
    medium: '0 0 6px, 0 0 12px',
    high: '0 0 3px, 0 0 6px, 0 0 9px, 0 0 12px'
  };

  const colorMap = {
    primary: 'hsl(var(--primary))',
    accent: 'hsl(var(--accent))',
    secondary: 'hsl(var(--secondary))'
  };

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={`${className} relative`}
      style={{
        textShadow: `${intensityMap[intensity]} ${colorMap[color]}`,
        color: colorMap[color],
        filter: 'none'
      }}
    >
      {children}
      <motion.span
        className="absolute inset-0"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          textShadow: `${intensityMap[intensity]} ${colorMap[color]}`,
          color: colorMap[color],
          filter: 'none'
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
};

interface FloatingTextProps {
  children: React.ReactNode;
  delay?: number;
  amplitude?: number;
  duration?: number;
  className?: string;
}

export const FloatingText: React.FC<FloatingTextProps> = ({
  children,
  delay = 0,
  amplitude = 10,
  duration = 3,
  className = ''
}) => {
  return (
    <motion.span
      initial={{ y: 0 }}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

interface RevealTextProps {
  children: string;
  delay?: number;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  color?: 'primary' | 'accent' | 'secondary';
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  color = 'primary'
}) => {
  const letters = children.split('');

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -50, y: 0 };
      case 'right': return { x: 50, y: 0 };
      case 'up': return { x: 0, y: 50 };
      case 'down': return { x: 0, y: -50 };
      default: return { x: 0, y: 50 };
    }
  };

  const colorClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    secondary: 'text-secondary'
  };

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ ...getInitialPosition(), opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.05,
            ease: 'easeOut'
          }}
          className={`inline-block ${colorClasses[color]}`}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};
