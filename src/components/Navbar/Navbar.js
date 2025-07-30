import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, User, LogOut, ShoppingBag, Settings } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/">
            <h2>3D Store</h2>
          </Link>
        </motion.div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                className="nav-item"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                  <motion.div
                    className="nav-underline"
                    layoutId="underline"
                    initial={false}
                    animate={{
                      scaleX: location.pathname === item.path ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="nav-actions">
            {user ? (
              <div className="user-menu">
                <motion.div
                  className="user-dropdown"
                  whileHover={{ scale: 1.05 }}
                >
                  <button className="user-button">
                    <User size={20} />
                    <span>{user.email}</span>
                  </button>
                  <div className="dropdown-content">
                    <Link to="/dashboard" className="dropdown-item">
                      <ShoppingBag size={16} />
                      Dashboard
                    </Link>
                    {isAdmin() && (
                      <Link to="/admin" className="dropdown-item">
                        <Settings size={16} />
                        Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="auth-links">
                <motion.div 
                  className="auth-link-item"
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/login" className="nav-link">Login</Link>
                </motion.div>
                <motion.div 
                  className="auth-link-item"
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/register" className="nav-link register">Register</Link>
                </motion.div>
              </div>
            )}

            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </div>

        <button
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
