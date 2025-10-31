import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Server, 
  Smartphone, 
  Brain, 
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  ShinyText, 
  AnimatedContainer, 
  AnimatedCard, 
  InteractiveButton, 
  FloatingElements,
  NeonText,
  WaveText,
  RevealText,
  GlitchText,
  BounceText,
  AdvancedCard,
  InteractiveCard,
  HolographicCard
} from '@/components/animations';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  technologies: string[];
  features: string[];
  color: string;
  gradient: string;
  bgPattern: string;
}

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const cardVariants = ['premium', 'glass', 'neon', 'gradient'];
  const cardVariant = cardVariants[index % cardVariants.length] as 'premium' | 'glass' | 'neon' | 'gradient';
  
  return (
    <AdvancedCard
      delay={index * 0.2}
      direction="up"
      distance={100}
      hoverEffect={true}
      glowEffect={true}
      tiltEffect={true}
      variant={cardVariant}
      size="lg"
      className={`h-full overflow-hidden ${service.bgPattern}`}
    >
        {/* Floating Icon */}
        <AnimatedContainer delay={index * 0.2 + 0.3} direction="scale">
          <motion.div
            whileHover={{ 
              y: -5, 
              rotate: 360,
              scale: 1.1
            }}
            className={`absolute top-[-12px] right-[-12px] p-3 rounded-xl ${service.color} transition-all duration-300`}
          >
            <service.icon size={28} className="text-white" />
          </motion.div>
        </AnimatedContainer>

        {/* Enhanced Floating Elements */}
        <FloatingElements 
          count={3} 
          className="absolute inset-0 pointer-events-none"
          colors={['primary', 'accent', 'secondary']}
          sizes={[2, 1.5, 1]}
        />

        {/* Service Title */}
        <AnimatedContainer delay={index * 0.2 + 0.5} direction="up" distance={20}>
          <h3 className="text-2xl font-bold mb-4 text-foreground relative z-10 group">
            <GlitchText 
              delay={index * 0.2 + 0.7} 
              intensity="low"
              className="text-2xl font-bold"
            >
              {service.title}
            </GlitchText>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </h3>
        </AnimatedContainer>

        {/* Description */}
        <AnimatedContainer delay={index * 0.2 + 0.7} direction="up" distance={20}>
          <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
            <RevealText 
              delay={index * 0.2 + 0.9} 
              direction="up" 
              color="primary"
              className="text-muted-foreground"
            >
              {service.description}
            </RevealText>
          </p>
        </AnimatedContainer>

        {/* Technologies */}
        <AnimatedContainer delay={index * 0.2 + 0.9} direction="up" distance={20}>
          <div className="mb-6 relative z-10">
            <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} />
              </motion.div>
              <ShinyText color="accent" speed={3} className="text-sm font-semibold">
                Technologies
              </ShinyText>
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, techIndex) => (
                <AnimatedContainer
                  key={tech}
                  delay={index * 0.2 + 1.1 + techIndex * 0.1}
                  direction="scale"
                >
                  <motion.span
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300"
                  >
                    {tech}
                  </motion.span>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </AnimatedContainer>

        {/* Features */}
        <motion.div 
          className="mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 1 }}
        >
          <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
            <CheckCircle size={16} />
            Key Features
          </h4>
          <ul className="space-y-2">
            {service.features.map((feature, featureIndex) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 1.1 + featureIndex * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full flex-shrink-0"
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTA Button */}
        <AnimatedContainer delay={index * 0.2 + 1.3} direction="up" distance={20}>
          <div className="mt-auto relative z-10">
            <Link to={`/services/${service.id}`}>
              <InteractiveButton
                className={`w-full glass-button group ${service.color} hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-white hover:text-white`}
                glowEffect={true}
                rippleEffect={true}
              >
                <span>Learn More</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.div>
              </InteractiveButton>
            </Link>
          </div>
        </AnimatedContainer>

      </AdvancedCard>
  );
};

const Services = () => {
  const services: Service[] = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'Create stunning, responsive user interfaces with modern frameworks and cutting-edge design patterns.',
      icon: Code,
      technologies: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
      features: [
        'Responsive Design',
        'Performance Optimization',
        'Modern UI/UX',
        'Cross-browser Compatibility'
      ],
      color: 'bg-gradient-to-br from-gray-700 to-gray-800',
      gradient: 'from-gray-700 to-gray-800',
      bgPattern: 'bg-[radial-gradient(circle_at_20%_80%,rgba(55,65,81,0.1),transparent_50%)]'
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Build robust, scalable server-side applications with enterprise-grade architecture and security.',
      icon: Server,
      technologies: ['Node.js', 'Express', 'Django', 'Spring Boot', 'Python', 'Java'],
      features: [
        'RESTful APIs',
        'Database Design',
        'Authentication & Security',
        'Microservices Architecture'
      ],
      color: 'bg-gradient-to-br from-gray-600 to-gray-700',
      gradient: 'from-gray-600 to-gray-700',
      bgPattern: 'bg-[radial-gradient(circle_at_80%_20%,rgba(75,85,99,0.1),transparent_50%)]'
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      description: 'Develop native and cross-platform mobile applications that deliver exceptional user experiences.',
      icon: Smartphone,
      technologies: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Dart', 'Java'],
      features: [
        'Cross-platform Development',
        'Native Performance',
        'App Store Optimization',
        'Push Notifications'
      ],
      color: 'bg-gradient-to-br from-gray-800 to-gray-900',
      gradient: 'from-gray-800 to-gray-900',
      bgPattern: 'bg-[radial-gradient(circle_at_50%_50%,rgba(31,41,55,0.1),transparent_50%)]'
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      description: 'Leverage AI and machine learning to create intelligent solutions that transform your business.',
      icon: Brain,
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Machine Learning', 'Deep Learning'],
      features: [
        'Machine Learning Models',
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics'
      ],
      color: 'bg-gradient-to-br from-gray-500 to-gray-600',
      gradient: 'from-gray-500 to-gray-600',
      bgPattern: 'bg-[radial-gradient(circle_at_30%_70%,rgba(107,114,128,0.1),transparent_50%)]'
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedContainer delay={0} direction="up" distance={50}>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <AnimatedContainer delay={0.2} direction="scale">
              <div className="inline-block mb-6">
                <div className="px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-primary font-semibold flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap size={20} />
                    </motion.div>
                    <ShinyText color="primary" speed={2} className="text-primary font-semibold">
                      Our Services
                    </ShinyText>
                  </span>
                </div>
              </div>
            </AnimatedContainer>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <RevealText 
                delay={0.5} 
                direction="left" 
                color="primary"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
              >
                Comprehensive
              </RevealText>
              <span className="block sm:inline">
                <BounceText 
                  delay={1} 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                >
                  <ShinyText 
                    color="accent" 
                    speed={2.5}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                  >
                    Solutions
                  </ShinyText>
                </BounceText>
              </span>
            </h2>
            
            <AnimatedContainer delay={0.4} direction="up" distance={30}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 px-4">
                From frontend to backend, mobile to AI - we deliver end-to-end technology solutions 
                that drive innovation and business growth.
              </p>
            </AnimatedContainer>
          </div>
        </AnimatedContainer>

            {/* Stats */}
            <AnimatedContainer delay={0.4} direction="up" distance={30}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto px-4">
                {[
                  { label: 'Projects Completed', value: '500+' },
                  { label: 'Technologies', value: '20+' },
                  { label: 'Years Experience', value: '8+' },
                  { label: 'Happy Clients', value: '100+' }
                ].map((stat, index) => (
                  <AnimatedContainer
                    key={stat.label}
                    delay={0.6 + index * 0.1}
                    direction="scale"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  </AnimatedContainer>
                ))}
              </div>
            </AnimatedContainer>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 my-16 px-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <AnimatedContainer delay={0.4} direction="up" distance={50}>
          <div className="text-center">
            <InteractiveCard
              delay={0.6}
              direction="scale"
              interactive={true}
              rippleEffect={true}
              magneticEffect={true}
              glowOnHover={true}
              tiltOnHover={true}
              size="lg"
              className="max-w-3xl mx-auto"
            >
              <AnimatedContainer delay={0.6} direction="scale">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  <ShinyText color="primary" speed={2.5} className="text-2xl sm:text-3xl font-bold">
                    Ready to Transform Your Ideas?
                  </ShinyText>
                </h3>
              </AnimatedContainer>
              
              <AnimatedContainer delay={0.8} direction="up" distance={20}>
                <p className="text-muted-foreground mb-8 text-base sm:text-lg">
                  Let's discuss your project and create something extraordinary together.
                </p>
              </AnimatedContainer>
              
              <AnimatedContainer delay={1} direction="up" distance={20}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <InteractiveButton
                    size="lg"
                    className="glass-button text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                    glowEffect={true}
                    rippleEffect={true}
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </InteractiveButton>
                  
                  <InteractiveButton
                    variant="outline"
                    size="lg"
                    className="border-primary/30 text-primary hover:text-white hover:bg-primary/10 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                    glowEffect={true}
                    rippleEffect={true}
                  >
                    View Portfolio
                  </InteractiveButton>
                </div>
              </AnimatedContainer>
            </InteractiveCard>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default Services;
