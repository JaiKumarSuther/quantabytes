import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Zap, Globe } from 'lucide-react';

const Hero = () => {
  const features = [
    { icon: Code, text: "Cutting-edge Development" },
    { icon: Zap, text: "Lightning Fast Performance" },
    { icon: Globe, text: "Global Scale Solutions" },
  ];

  return (
    <section id="home" className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2"
          >
            Innovating the
            <br className="sm:hidden" />
            <span className="block sm:inline">
              <span className="gradient-text">Future of Tech</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
          >
            At Quantabytes, we transform ideas into extraordinary digital experiences
            with cutting-edge 3D interfaces and innovative solutions.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-12 px-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card px-4 sm:px-6 py-3 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base w-full sm:w-auto min-w-0"
              >
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 relative z-10 w-full max-w-md sm:max-w-none mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="glass-button group text-sm sm:text-base md:text-lg hover:text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 glow-primary animate-pulse-glow w-full sm:w-auto relative overflow-hidden min-h-[48px]"
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Explore Our Work
                </motion.span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                >
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 text-primary hover:text-white hover:bg-primary/10 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 hover:glow-primary transition-all duration-300 w-full sm:w-auto relative overflow-hidden min-h-[48px]"
              >
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator with enhanced animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-primary/50 rounded-full flex justify-center relative overflow-hidden"
          >
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="w-1 h-3 sm:w-1.5 sm:h-4 bg-gradient-to-b from-primary to-accent rounded-full mt-1 sm:mt-2"
            />
            {/* Glow effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="absolute inset-0 border-2 border-primary/30 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;