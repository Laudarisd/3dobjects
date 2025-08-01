import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useDatabase } from '../../contexts/DatabaseContext';
import { useAuth } from '../../contexts/AuthContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const { products } = useDatabase();
  const { user } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', 'Characters', 'Architecture', 'Vehicles', 'Furniture', 'Nature', 'Abstract'];

  useEffect(() => {
    // Check if products is available and is an array
    if (!products || !Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products]; // Create a copy to avoid mutating original array

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.title || '').localeCompare(b.title || '');
        case 'price_low':
          return (a.price || 0) - (b.price || 0);
        case 'price_high':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
          return (b.id || 0) - (a.id || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (!user) {
    return (
      <motion.div 
        className="products-page login-required"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="login-prompt">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              className="login-icon"
            >
              🔒
            </motion.div>
            <h1>Login Required</h1>
            <p>Please log in to view our products and access exclusive 3D models.</p>
            <motion.a 
              href="/login"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Login
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="products-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        {/* Header */}
        <motion.div 
          className="products-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1>3D Model Collection</h1>
          <p>Discover premium 3D models, digital assets, and creative resources for your projects</p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          className="products-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-section">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-group">
              <Filter size={20} />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <div className="sort-group">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <div className="view-toggle">
              <button 
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button 
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Sections */}
        <div className="products-content">
          {categories.filter(cat => cat !== 'all').map(category => {
            const categoryProducts = filteredProducts.filter(product => 
              selectedCategory === 'all' || selectedCategory === category
            ).filter(product => product.category === category);

            if (categoryProducts.length === 0) return null;

            return (
              <motion.section 
                key={category} 
                className="category-section"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 
                  className="category-title"
                  variants={itemVariants}
                >
                  {category}
                  <span className="category-count">({categoryProducts.length})</span>
                </motion.h2>
                
                <motion.div 
                  className={`products-grid ${viewMode}`}
                  variants={containerVariants}
                >
                  {categoryProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div 
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p>No products found matching your criteria.</p>
          </motion.div>
        )}
      </div>

      {/* Side Animations */}
      <div className="side-animations">
        <motion.div 
          className="side-element left"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="floating-cube"></div>
        </motion.div>
        
        <motion.div 
          className="side-element right"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="floating-sphere"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Products;
