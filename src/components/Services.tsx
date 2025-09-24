import { motion } from 'framer-motion';
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group perspective-1000"
    >
      <div className={`relative glass-card p-8 h-full overflow-hidden transition-all duration-500 group-hover:glow-primary ${service.bgPattern}`}>
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.6 }}
        />

        {/* Floating Icon */}
        <motion.div
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 + 0.3 }}
          whileHover={{ 
            y: -5, 
            rotate: 360,
            scale: 1.1
          }}
          className={`absolute top-6 right-6 p-3 rounded-xl ${service.color} transition-all duration-300`}
        >
          <service.icon size={28} className="text-white" />
        </motion.div>

        {/* Floating Particles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-4 left-4 w-2 h-2 bg-primary/40 rounded-full" />
          <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-accent/60 rounded-full" />
          <div className="absolute bottom-6 left-8 w-1 h-1 bg-secondary/50 rounded-full" />
        </motion.div>

        {/* Service Title */}
        <motion.h3 
          className="text-2xl font-bold mb-4 text-foreground relative z-10"
          whileHover={{ scale: 1.05 }}
        >
          {service.title}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-muted-foreground mb-6 leading-relaxed relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          {service.description}
        </motion.p>

        {/* Technologies */}
        <motion.div 
          className="mb-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.7 }}
        >
          <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
            <Sparkles size={16} />
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + 0.8 + techIndex * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 1.3 }}
          className="mt-auto relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className={`w-full glass-button group ${service.color} hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-white hover:text-white`}
            >
              <span>Learn More</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          initial={{ scale: 0.8, rotate: -45 }}
          whileHover={{ scale: 1.2, rotate: 0 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-primary font-semibold flex items-center gap-2">
                <Zap size={20} />
                Our Services
              </span>
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Comprehensive
            <span className="gradient-text"> Solutions</span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 px-4">
            From frontend to backend, mobile to AI - we deliver end-to-end technology solutions 
            that drive innovation and business growth.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto px-4"
          >
            {[
              { label: 'Projects Completed', value: '500+' },
              { label: 'Technologies', value: '20+' },
              { label: 'Years Experience', value: '8+' },
              { label: 'Happy Clients', value: '100+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 px-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-6 sm:p-8 max-w-3xl mx-auto">
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold mb-4 gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Ready to Transform Your Ideas?
            </motion.h3>
            <motion.p 
              className="text-muted-foreground mb-8 text-base sm:text-lg"
              whileHover={{ scale: 1.02 }}
            >
              Let's discuss your project and create something extraordinary together.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="glass-button text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/30 text-primary hover:text-white hover:bg-primary/10 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                >
                  View Portfolio
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
