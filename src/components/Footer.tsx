import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: '3D Web Development', href: '#' },
      { name: 'Interactive Interfaces', href: '#' },
      { name: 'Performance Optimization', href: '#' },
      { name: 'Custom Solutions', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#team' },
      { name: 'Our Work', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Email' }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-background/95" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-xl sm:text-2xl font-bold gradient-text font-mono mb-4"
              >
                Quantabytes
              </motion.h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                Transforming ideas into extraordinary digital experiences with 
                cutting-edge 3D interfaces and innovative solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="sm:w-5 sm:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (categoryIndex + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-4 capitalize">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex + 1) * 0.1 + index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5, color: 'hsl(var(--primary))' }}
                        className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border">
          <div className="container mx-auto px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-xs sm:text-sm"
              >
                © 2024 Quantabytes. All rights reserved.
              </motion.p>
              
              <div className="flex items-center gap-4 sm:gap-6">
                <motion.a
                  href="#"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  Terms of Service
                </motion.a>
                <motion.a
                  href="#"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-colors"
                >
                  Privacy Policy
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 p-2 sm:p-3 rounded-full glass-button glow-primary z-50"
          aria-label="Back to top"
        >
          <ArrowUp size={18} className="sm:w-5 sm:h-5" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;