import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleCardClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div 
      className="product-card"
      onClick={handleCardClick}
      whileHover={{ 
        rotateY: 5,
        rotateX: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      style={{ perspective: 1000, cursor: 'pointer' }}
    >
      <div className="product-image-container">
        {!imageLoaded && (
          <div className="image-placeholder">
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              ⏳
            </motion.div>
          </div>
        )}
        
        {imageError ? (
          <div className="image-error">
            <div className="error-icon">🖼️</div>
            <p>Image not available</p>
          </div>
        ) : (
          <motion.img
            src={product.image_url}
            alt={product.name}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: imageLoaded ? 1 : 1.1, 
              opacity: imageLoaded ? 1 : 0 
            }}
            transition={{ duration: 0.5 }}
          />
        )}
        
        <motion.div 
          className="product-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="quick-view-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            👁️ Quick View
          </motion.button>
        </motion.div>
      </div>

      <div className="product-info">
        <motion.h3 
          className="product-name"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {product.name}
        </motion.h3>
        
        <motion.p 
          className="product-description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {product.description?.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </motion.p>
        
        <motion.div 
          className="product-footer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="product-price">
            <span className="currency">$</span>
            <span className="amount">{product.price}</span>
          </div>
          
          <motion.button
            className="btn btn-primary product-btn"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(116, 97, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </motion.div>
      </div>

      {/* 3D Card Effect Background */}
      <motion.div
        className="card-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProductCard;
