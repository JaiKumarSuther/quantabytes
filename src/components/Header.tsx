import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  InteractiveButton, 
  AnimatedContainer,
  BounceText
} from '@/components/animations';

// Try importing the logo - fallback to public path if import fails
const logoPath = '/assets/header-logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  const navItems = [
    { name: 'Home', href: '/', isHash: false },
    { name: 'Services', href: '#services', isHash: true },
    { name: 'Team', href: '#team', isHash: true },
    { name: 'Testimonials', href: '#testimonials', isHash: true },
    { name: 'Contact', href: '#contact', isHash: true },
    { name: 'Careers', href: '/careers', isHash: false },
  ];

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent, closeMenu: boolean = false) => {
    // If it's a hash link and we're not on home page, navigate to home with hash
    if (item.isHash && !isHomePage) {
      e.preventDefault();
      navigate(`/${item.href}`);
    }
    // For mobile menu
    if (closeMenu) {
      setIsOpen(false);
    }
  };

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
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 header-logo flex items-center cursor-pointer"
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
              </motion.div>
            </Link>
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
                {item.isHash && isHomePage ? (
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
                ) : item.isHash ? (
                  <motion.a
                    href={`/${item.href}`}
                    onClick={(e) => handleNavClick(item, e)}
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
                ) : (
                  <Link to={item.href}>
                    <motion.div
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
                    </motion.div>
                  </Link>
                )}
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
                item.isHash && isHomePage ? (
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
                ) : item.isHash ? (
                  <motion.a
                    key={item.name}
                    href={`/${item.href}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block py-3 px-2 text-foreground/80 hover:text-primary transition-colors duration-300 text-center font-medium min-h-[44px] flex items-center justify-center"
                    onClick={(e) => handleNavClick(item, e, true)}
                  >
                    {item.name}
                  </motion.a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block py-3 px-2 text-foreground/80 hover:text-primary transition-colors duration-300 text-center font-medium min-h-[44px] flex items-center justify-center"
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                )
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