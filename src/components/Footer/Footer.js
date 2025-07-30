import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: 'https://github.com/Laudarisd',
      label: 'GitHub'
    },
    {
      icon: <Mail size={20} />,
      href: 'mailto:sudiplaudari@gmail.com',
      label: 'Email'
    },
    {
      icon: <Linkedin size={20} />,
      href: 'https://www.linkedin.com/in/laudari-sudip',
      label: 'LinkedIn'
    },
    {
      icon: <Instagram size={20} />,
      href: 'https://instagram.com/your-profile',
      label: 'Instagram'
    }
  ];

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>3D Store</h3>
            <p>Premium 3D models and CAD files for your creative projects</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    title={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            &copy; {currentYear} 3D Design Store. All rights reserved.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
