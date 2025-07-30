import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Shield, Star, ShoppingBag } from 'lucide-react';
import { useDatabase } from '../../contexts/DatabaseContext';
import { useAuth } from '../../contexts/AuthContext';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { db } = useDatabase();
  const { user } = useAuth();

  useEffect(() => {
    const loadProduct = () => {
      if (!db || !id) return;

      try {
        const result = db.exec('SELECT * FROM products WHERE id = ?', [parseInt(id)]);
        if (result.length > 0 && result[0].values.length > 0) {
          const productData = result[0].values[0];
          setProduct({
            id: productData[0],
            name: productData[1],
            description: productData[2],
            price: productData[3],
            image_url: productData[4],
            paypal_link: productData[5],
            zip_path: productData[6]
          });
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setError('Error loading product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [db, id]);

  const handleOrderClick = () => {
    if (!product.paypal_link) {
      alert('PayPal link not configured for this product');
      return;
    }

    // Add user email to PayPal return URL if logged in
    let paypalUrl = product.paypal_link;
    if (user) {
      const returnUrl = `${window.location.origin}/thankyou?product_id=${product.id}&email=${user.email}`;
      paypalUrl += `&return=${encodeURIComponent(returnUrl)}`;
    } else {
      const returnUrl = `${window.location.origin}/thankyou?product_id=${product.id}`;
      paypalUrl += `&return=${encodeURIComponent(returnUrl)}`;
    }

    window.location.href = paypalUrl;
  };

  if (loading) {
    return (
      <div className="product-loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          🔄
        </motion.div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-error">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <motion.button
          className="btn btn-primary"
          onClick={() => window.history.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          Go Back
        </motion.button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <motion.button
          className="back-button"
          onClick={() => window.history.back()}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft size={20} />
          Back to Products
        </motion.button>

        <div className="product-content">
          <motion.div
            className="product-image-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="product-image-container">
              <motion.img
                src={product.image_url}
                alt={product.name}
                className="product-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="image-overlay">
                <div className="image-badge">
                  <Star size={16} />
                  Premium Quality
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="product-info-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1
              className="product-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {product.name}
            </motion.h1>

            <motion.div
              className="product-price-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="price-display">
                <span className="currency">$</span>
                <span className="amount">{product.price}</span>
              </div>
              <div className="price-note">One-time purchase • Instant download</div>
            </motion.div>

            <motion.div
              className="product-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3>Description</h3>
              <p>{product.description}</p>
            </motion.div>

            <motion.div
              className="product-features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3>What's Included</h3>
              <ul>
                <li><Download size={16} /> High-resolution 3D model files</li>
                <li><Download size={16} /> Textures and materials</li>
                <li><Download size={16} /> Documentation and usage guide</li>
                <li><Shield size={16} /> Commercial license included</li>
              </ul>
            </motion.div>

            <motion.div
              className="product-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.button
                className="btn btn-primary order-button"
                onClick={handleOrderClick}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(116, 97, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} />
                Order This
              </motion.button>
              
              <div className="secure-note">
                <Shield size={16} />
                Secure payment via PayPal
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Product;
