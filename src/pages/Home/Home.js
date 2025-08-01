import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero3D from '../../components/Hero3D/Hero3D';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { useDatabase } from '../../contexts/DatabaseContext';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { db } = useDatabase();

  useEffect(() => {
    const loadProducts = () => {
      if (!db) return;

      try {
        const result = db.exec('SELECT * FROM products ORDER BY id DESC');
        if (result.length > 0) {
          const productsData = result[0].values.map(row => ({
            id: row[0],
            name: row[1],
            description: row[2],
            price: row[3],
            image_url: row[4],
            paypal_link: row[5],
            zip_path: row[6]
          }));
          setProducts(productsData);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [db]);

  return (
    <div className="home">
      {/* 3D Hero Section */}
      <Hero3D />
      
      {/* Featured Products Section */}
      <motion.section 
        className="featured-products"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2>Featured Products</h2>
            <p>Discover our premium collection of 3D models and digital assets</p>
          </motion.div>
          
          {loading ? (
            <div className="loading-container">
              <motion.div
                className="loading-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                🔄
              </motion.div>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="container">
          <motion.div 
            className="features-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div 
              className="feature-card"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">🎨</div>
              <h3>High Quality</h3>
              <p>Professional-grade 3D models with detailed textures and materials</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                rotateX: 5,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">⚡</div>
              <h3>Instant Download</h3>
              <p>Get your files immediately after purchase with secure download links</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Safe and secure transactions through PayPal with buyer protection</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
