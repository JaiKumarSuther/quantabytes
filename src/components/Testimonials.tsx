import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';
import { useMousePosition } from '../hooks/use-mouse-position';

// Enhanced Testimonial Card with 3D Mouse Interactions
const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group perspective-1000"
    >
      <div className="glass-card p-8 h-full relative overflow-hidden hover:glow-secondary transition-all duration-700 preserve-3d">
        {/* Dynamic Background Glow that follows mouse */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1.5, rotate: 180 }}
          transition={{ duration: 1 }}
          style={{
            background: `radial-gradient(circle at ${mouseX.get() + 150}px ${mouseY.get() + 150}px, hsl(var(--primary) / 0.1), transparent 50%)`,
            transform: `translateZ(-10px) translate(${mouseX.get() * 0.1}px, ${mouseY.get() * 0.1}px)`
          }}
        />

        {/* Parallax background elements */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
          style={{
            background: `conic-gradient(from ${mouseX.get() * 0.1}deg at 50% 50%, transparent, hsl(var(--accent) / 0.1), transparent)`,
            transform: `translateZ(-5px) translate(${mouseX.get() * 0.05}px, ${mouseY.get() * 0.05}px)`
          }}
        />

        {/* Interactive Quote Icon */}
        <motion.div 
          className="absolute top-4 right-4 text-secondary/20 group-hover:text-secondary/40 transition-colors duration-300"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.3,
            rotate: 360,
            transition: { duration: 0.6 }
          }}
        >
          <Quote size={32} />
        </motion.div>

        {/* Enhanced Rating with mouse-reactive animation */}
        <div className="flex space-x-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                delay: index * 0.15 + i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
              whileHover={{ 
                scale: 1.4, 
                rotate: 360,
                y: -3,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              style={{
                transform: `translateZ(${i * 2}px)`
              }}
            >
              <Star className="w-5 h-5 fill-accent text-accent drop-shadow-lg" />
            </motion.div>
          ))}
        </div>

        {/* Content with enhanced mouse interactions */}
        <motion.blockquote 
          className="text-foreground/90 mb-8 leading-relaxed italic relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: index * 0.15 + 0.5, duration: 1.5 }}
            viewport={{ once: true }}
            className="inline-block overflow-hidden"
          >
            "{testimonial.content}"
          </motion.span>
        </motion.blockquote>

        {/* Enhanced Author Info with 3D effects */}
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 + 0.8 }}
          viewport={{ once: true }}
          style={{
            transform: `translateZ(20px)`
          }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.2, 
              rotate: [0, -10, 10, 0],
              boxShadow: "0 0 30px hsl(var(--primary) / 0.6)"
            }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-background font-bold shadow-lg relative overflow-hidden"
            style={{
              transform: `translateZ(30px)`
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <span className="relative z-10">{testimonial.avatar}</span>
          </motion.div>
          <div className="flex-1">
            <motion.p 
              className="font-semibold text-foreground relative"
              whileHover={{ x: 5 }}
            >
              {testimonial.name}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.p>
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 1 }}
            >
              {testimonial.role}
            </motion.p>
            <motion.p 
              className="text-sm text-primary font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 1.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {testimonial.company}
            </motion.p>
          </div>
        </motion.div>

        {/* Interactive border effect */}
        <motion.div
          className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-lg"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Mouse cursor effect */}
        <motion.div
          className="absolute w-4 h-4 bg-primary/30 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            left: `${mouseX.get() + 150}px`,
            top: `${mouseY.get() + 150}px`,
            transform: `translateZ(50px) translate(-50%, -50%)`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "David Park",
      role: "CTO, TechCorp",
      company: "TechCorp",
      content: "Quantabytes transformed our vision into reality with their exceptional 3D interfaces. The attention to detail and innovative approach exceeded all our expectations.",
      rating: 5,
      avatar: "DP"
    },
    {
      name: "Lisa Zhang",
      role: "Product Manager, InnovateCo",
      company: "InnovateCo", 
      content: "Working with Quantabytes was a game-changer. Their technical expertise and creative solutions helped us launch a product that truly stands out in the market.",
      rating: 5,
      avatar: "LZ"
    },
    {
      name: "Michael Ross",
      role: "Founder, StartupX",
      company: "StartupX",
      content: "The team at Quantabytes doesn't just deliver code – they deliver experiences. Their 3D implementations brought our brand to life in ways we never imagined.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Amanda Foster",
      role: "Creative Director, DesignHub",
      company: "DesignHub",
      content: "Incredible work from start to finish. Quantabytes understood our creative vision and enhanced it with cutting-edge technology. Absolutely phenomenal results.",
      rating: 5,
      avatar: "AF"
    },
    {
      name: "James Wilson",
      role: "VP Engineering, CloudTech",
      company: "CloudTech",
      content: "The performance and quality of Quantabytes' work is unmatched. They delivered a complex 3D application that runs smoothly across all platforms.",
      rating: 5,
      avatar: "JW"
    },
    {
      name: "Sofia Martinez",
      role: "CEO, FutureSoft",
      company: "FutureSoft",
      content: "Quantabytes helped us reimagine user interaction with our platform. Their innovative 3D solutions increased user engagement by 300%.",
      rating: 5,
      avatar: "SM"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Our
            <span className="gradient-text"> Clients Say</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4">
            Don't just take our word for it. Here's what industry leaders 
            have to say about our work.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.name}
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass-card p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
              {[
                { value: "100+", label: "Projects Delivered" },
                { value: "50+", label: "Happy Clients" },
                { value: "99%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.p
                    whileHover={{ scale: 1.1 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;