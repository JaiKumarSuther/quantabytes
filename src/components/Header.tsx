import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { 
  InteractiveButton, 
  AnimatedContainer,
  BounceText
} from '@/components/animations';

// Try importing the logo - fallback to public path if import fails
const logoPath = '/assets/header-logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border header-mobile-fix"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 header-container">
        <div className="flex items-center justify-between min-h-[60px]">
          {/* Logo */}
          <AnimatedContainer delay={0.2} direction="left" distance={30}>
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 header-logo flex items-center"
            >
              <img 
                src={logoPath} 
                alt="Quantabytes Logo" 
                className="h-10 sm:h-12 md:h-14 w-auto max-w-[200px] sm:max-w-[250px] md:max-w-[300px] object-contain block"
                loading="eager"
                style={{ display: 'block', maxWidth: '100%' }}
                onError={(e) => {
                  console.error('Logo image failed to load:', logoPath);
                }}
              />
            </motion.a>
          </AnimatedContainer>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <AnimatedContainer
                key={item.name}
                delay={index * 0.1 + 0.5}
                direction="down"
                distance={20}
              >
                <motion.a
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <BounceText 
                    delay={index * 0.1 + 0.7} 
                    className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </BounceText>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </AnimatedContainer>
            ))}
          </nav>

          {/* CTA Button */}
          <AnimatedContainer delay={0.8} direction="right" distance={30} className="hidden md:block">
            <InteractiveButton
              variant="default"
              className="glass-button font-medium"
              glowEffect={true}
              rippleEffect={true}
            >
              Get Started
            </InteractiveButton>
          </AnimatedContainer>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2 relative z-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden mt-4 pb-4 border-t border-glass-border pt-4 transition-all duration-300 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block py-3 px-2 text-foreground/80 hover:text-primary transition-colors duration-300 text-center font-medium min-h-[44px] flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            <AnimatedContainer delay={0.4} direction="left" distance={20} className="mt-4">
              <InteractiveButton
                variant="default"
                className="glass-button w-full min-h-[48px] text-center"
                glowEffect={true}
                rippleEffect={true}
              >
                Get Started
              </InteractiveButton>
            </AnimatedContainer>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;