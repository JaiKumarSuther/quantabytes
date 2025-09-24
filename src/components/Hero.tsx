import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Zap, Globe } from 'lucide-react';
import { 
  ShinyText, 
  AnimatedContainer, 
  InteractiveButton, 
  FloatingElements, 
  ParticleBackground,
  TypewriterText,
  WaveText,
  NeonText,
  RevealText,
  MorphingText,
  InteractiveCard,
  HolographicCard
} from '@/components/animations';

const Hero = () => {
  const features = [
    { icon: Code, text: "Cutting-edge Development" },
    { icon: Zap, text: "Lightning Fast Performance" },
    { icon: Globe, text: "Global Scale Solutions" },
  ];

  return (
    <section id="home" className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28">
      {/* Enhanced Particle Background */}
      <ParticleBackground particleCount={30} className="opacity-60" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Headline */}
          <AnimatedContainer delay={0.2} direction="up" distance={50}>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              <WaveText 
                delay={0.5} 
                color="primary" 
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              >
                Innovating the
              </WaveText>
              <br className="sm:hidden" />
              <span className="block sm:inline">
                <MorphingText
                  texts={["Future of Tech", "Digital Innovation", "Next Generation", "Tomorrow's Solutions"]}
                  delay={1}
                  color="accent"
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                />
              </span>
            </h1>
          </AnimatedContainer>

          {/* Subtitle */}
          <AnimatedContainer delay={0.4} direction="up" distance={30}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              <TypewriterText 
                delay={1.5} 
                speed={30} 
                color="white" 
                className="text-base sm:text-lg md:text-xl lg:text-2xl"
              >
                At Quantabytes, we transform ideas into extraordinary digital experiences
                with cutting-edge 3D interfaces and innovative solutions.
              </TypewriterText>
            </p>
          </AnimatedContainer>

          {/* Feature Pills */}
          <AnimatedContainer delay={0.6} direction="up" distance={20}>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-12 px-4">
              {features.map((feature, index) => (
                <InteractiveCard
                  key={index}
                  delay={0.8 + index * 0.1}
                  direction="scale"
                  interactive={true}
                  rippleEffect={true}
                  magneticEffect={true}
                  glowOnHover={true}
                  tiltOnHover={true}
                  size="sm"
                  className="w-full sm:w-auto min-w-0"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base group">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </motion.div>
                    <RevealText 
                      delay={0.8 + index * 0.1} 
                      direction="up" 
                      color="primary"
                      className="font-medium group-hover:text-primary transition-colors duration-300"
                    >
                      {feature.text}
                    </RevealText>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </AnimatedContainer>

          {/* CTA Buttons */}
          <AnimatedContainer delay={1} direction="up" distance={20}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 relative z-10 w-full max-w-md sm:max-w-none mx-auto">
              <InteractiveButton
                size="lg"
                className="glass-button group text-sm sm:text-base md:text-lg hover:text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 glow-primary animate-pulse-glow w-full sm:w-auto relative overflow-hidden min-h-[48px]"
                glowEffect={true}
                rippleEffect={true}
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
              </InteractiveButton>
              
              <InteractiveButton
                variant="outline"
                size="lg"
                className="border-primary/30 text-primary hover:text-white hover:bg-primary/10 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 hover:glow-primary transition-all duration-300 w-full sm:w-auto relative overflow-hidden min-h-[48px]"
                glowEffect={true}
                rippleEffect={true}
              >
                Get in Touch
              </InteractiveButton>
            </div>
          </AnimatedContainer>
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