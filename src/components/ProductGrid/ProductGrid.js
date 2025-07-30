import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="no-products-content"
        >
          <div className="no-products-icon">📦</div>
          <h3>No Products Available</h3>
          <p>Check back later for new additions to our collection!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="product-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          whileHover={{ y: -8 }}
          className="product-grid-item"
        >
          <Link to={`/product/${product.id}`} className="product-link">
            <ProductCard product={product} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
