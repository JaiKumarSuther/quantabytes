import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Star, Award, Zap, LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useRef, useState, useEffect } from 'react';

// 3D Card Component with cursor tracking
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialty: string;
  experience: string;
  projects: string;
  rating: number;
  color: string;
  icon: LucideIcon;
  image?: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

const Card3D = ({ member, index, size = 'normal', opacity = 1 }: { member: TeamMember; index: number; size?: 'small' | 'normal'; opacity?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 150,
    damping: 15
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 150,
    damping: 15
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
        damping: 20
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
      className="group perspective-2000 card-3d-cursor"
    >
      <div 
        className={`relative glass-card text-center h-full overflow-hidden group-hover:glow-primary transition-all duration-700 transform-gpu flex flex-col ${size === 'small' ? 'p-6' : 'p-8'}`}
        style={{ 
          transform: 'translateZ(10px)',
          opacity: opacity
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ duration: 0.8 }}
        />

        {/* Floating Icon */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.5 }}
          whileHover={{ y: -5, rotate: 360 }}
          className="absolute top-4 right-4 text-primary/30 group-hover:text-primary/60 transition-colors duration-300"
        >
          <member.icon size={24} />
        </motion.div>

        {/* Animated Avatar with Neon Border */}
        <motion.div
          whileHover={{ 
            scale: 1.15, 
            rotateY: 10,
            rotateX: -10,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative mx-auto mb-6 ${size === 'small' ? 'w-24 h-24' : 'w-32 h-32'}`}
        >
          {/* Dark Gradient Border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-1 group-hover:scale-110 transition-all duration-500">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 p-0.5 transition-all duration-500">
              {/* Inner Avatar Circle */}
              <div className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Glowing Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-600/20 via-gray-700/20 to-gray-800/20 blur-lg transition-all duration-500" />
          
          {/* Floating particles around avatar */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-gray-600/80 rounded-full -translate-x-1/2 shadow-lg shadow-gray-600/70 group-hover:shadow-gray-600/90 group-hover:scale-125 transition-all duration-500" />
            <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-gray-700/80 rounded-full -translate-y-1/2 shadow-lg shadow-gray-700/70 group-hover:shadow-gray-700/90 group-hover:scale-125 transition-all duration-500" />
            <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-gray-800/80 rounded-full -translate-x-1/2 shadow-lg shadow-gray-800/70 group-hover:shadow-gray-800/90 group-hover:scale-125 transition-all duration-500" />
          </motion.div>
        </motion.div>

        {/* Name with animated underline */}
        <motion.h3 
          className={`font-bold mb-2 text-foreground relative ${size === 'small' ? 'text-lg' : 'text-xl'}`}
          whileHover={{ scale: 1.05 }}
        >
          {member.name}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>

        {/* Role with typing animation */}
        <motion.p 
          className={`text-primary font-medium mb-4 ${size === 'small' ? 'text-sm' : ''}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.8 }}
        >
          {member.role}
        </motion.p>

        {/* Specialty Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.2 + 1, type: "spring" }}
          className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
        >
          {member.specialty}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-center"
          >
            <p className="text-lg font-bold gradient-text">{member.experience}</p>
            <p className="text-xs text-muted-foreground">Experience</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-center"
          >
            <p className="text-lg font-bold gradient-text">{member.projects}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </motion.div>
        </div>

        {/* Rating Stars */}
        <div className="flex justify-center space-x-1 mb-6">
          {[...Array(member.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                delay: index * 0.2 + 1.2 + i * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.3, rotate: 360 }}
            >
              <Star className="w-4 h-4 fill-accent text-accent" />
            </motion.div>
          ))}
        </div>

        {/* Bio */}
        <motion.p 
          className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 1.5 }}
        >
          {member.bio}
        </motion.p>

        {/* Social Links with enhanced animations - positioned at bottom */}
        <div className="flex justify-center space-x-4 mt-auto">
          {Object.entries(member.social).map(([platform, url], socialIndex) => {
            const icons = {
              github: Github,
              linkedin: Linkedin,
              twitter: Twitter
            };
            const Icon = icons[platform as keyof typeof icons];
            
            return (
              <motion.a
                key={platform}
                href={url}
                initial={{ opacity: 0, y: 20, rotate: -90 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ 
                  delay: index * 0.2 + 1.8 + socialIndex * 0.1,
                  type: "spring"
                }}
                whileHover={{ 
                  scale: 1.3, 
                  y: -5,
                  rotate: 360,
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--background))"
                }}
                whileTap={{ scale: 0.8 }}
                className="p-3 rounded-xl bg-primary/10 text-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// 3D Join Team Card Component
const JoinTeamCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), {
    stiffness: 150,
    damping: 15
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), {
    stiffness: 150,
    damping: 15
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="text-center mt-16"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="perspective-2000 card-3d-cursor"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        <div 
          className="glass-card p-8 max-w-2xl mx-auto group-hover:glow-primary transition-all duration-700 transform-gpu" 
          style={{ transform: 'translateZ(10px)' }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-4 gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            Join Our Team
          </motion.h3>
          <motion.p 
            className="text-muted-foreground mb-6"
            whileHover={{ scale: 1.02 }}
          >
            We're always looking for talented individuals who share our passion 
            for innovation and excellence.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="glass-button">
              View Open Positions
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Team Slideshow Component
const TeamSlideshow = ({ teamMembers }: { teamMembers: TeamMember[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalSlides = teamMembers.length;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentMember = teamMembers[currentSlide];
  const prevMember = teamMembers[(currentSlide - 1 + totalSlides) % totalSlides];
  const nextMember = teamMembers[(currentSlide + 1) % totalSlides];

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300 group"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 transition-all duration-300 group"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
          </motion.button>
        </>
      )}

      {/* Three Card Layout */}
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-8">
          {/* Previous Card (Left) */}
          <motion.div
            key={`prev-${currentSlide}`}
            initial={{ opacity: 0, x: -50, scale: 0.7 }}
            animate={{ opacity: 0.4, x: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-shrink-0 cursor-pointer"
            onClick={prevSlide}
          >
            <div className="w-48 sm:w-64 md:w-72">
              <Card3D 
                member={prevMember} 
                index={-1}
                size="small"
                opacity={0.6}
              />
            </div>
          </motion.div>

          {/* Current Card (Center) */}
          <motion.div
            key={`current-${currentSlide}`}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex-shrink-0 z-10"
          >
            <div className="w-64 sm:w-80 md:w-96">
              <Card3D 
                member={currentMember} 
                index={0}
                size="normal"
                opacity={1}
              />
            </div>
          </motion.div>

          {/* Next Card (Right) */}
          <motion.div
            key={`next-${currentSlide}`}
            initial={{ opacity: 0, x: 50, scale: 0.7 }}
            animate={{ opacity: 0.4, x: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-shrink-0 cursor-pointer"
            onClick={nextSlide}
          >
            <div className="w-48 sm:w-56 md:w-64">
              <Card3D 
                member={nextMember} 
                index={1}
                size="small"
                opacity={0.6}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Counter and Indicators */}
      {totalSlides > 1 && (
        <div className="flex flex-col items-center space-y-4 mt-8">
          {/* Slide Counter */}
          <motion.div 
            className="text-sm text-muted-foreground"
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentSlide + 1} of {totalSlides}
          </motion.div>
          
          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Auto-play Toggle */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-4">
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 rounded-full transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? 'Pause' : 'Play'} Auto-advance
          </motion.button>
        </div>
      )}
    </div>
  );
};

const Team = () => {
  const teamMembers = [
    
    {
      name: "Talha Satii",
      role: "Cofounder",
      bio: "Co-founder and technical visionary, leading innovation and building the foundation of our technology platform.",
      specialty: "Innovation & Architecture",
      experience: "9+ Years",
      projects: "180+ Solutions",
      rating: 5,
      color: "from-secondary to-primary",
      icon: Star,
      image: "/assets/team/talha_satii.png",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Zohaib Malik",
      role: "CEO",
      bio: "Visionary leader and CEO driving the company's strategic direction and innovation in technology solutions.",
      specialty: "Leadership & Strategy",
      experience: "10+ Years",
      projects: "200+ Solutions",
      rating: 5,
      color: "from-primary to-accent",
      icon: Award,
      image: "/assets/team/zohaib_malik.jpg",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Jai Kumar",
      role: "Full Stack Developer",
      bio: "Experienced full-stack developer with expertise in modern web technologies and innovative solutions.",
      specialty: "Full-Stack Development",
      experience: "8+ Years",
      projects: "120+ Applications",
      rating: 5,
      color: "from-accent to-secondary",
      icon: Zap,
      image: "/assets/team/jai_kumar.jpg",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <section id="team" className="py-24 relative overflow-hidden">
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
            Meet Our
            <span className="gradient-text"> Team</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4">
            Passionate innovators dedicated to pushing the boundaries of technology
            and creating extraordinary digital experiences.
          </p>
        </motion.div>

        {/* Team Slideshow */}
        <TeamSlideshow teamMembers={teamMembers} />

        {/* Join Team CTA */}
        <JoinTeamCard />
      </div>
    </section>
  );
};

export default Team;