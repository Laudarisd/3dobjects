import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDatabase } from '../../contexts/DatabaseContext';
import './ThankYou.css';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const productId = searchParams.get('productId');
  const { getProductById } = useDatabase();
  
  const product = productId ? getProductById(parseInt(productId)) : null;

  const downloadProduct = () => {
    if (product) {
      // Create a dummy download link - in a real app, this would be a secure download URL
      const link = document.createElement('a');
      link.href = product.downloadUrl || '#';
      link.download = `${product.title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div 
      className="thank-you-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="thank-you-content">
          {/* Success Icon */}
          <motion.div 
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            <CheckCircle size={80} />
          </motion.div>

          {/* Thank You Message */}
          <motion.div 
            className="thank-you-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1>Payment Successful!</h1>
            <p>
              Thank you for your purchase. Your payment has been processed successfully,
              and you now have access to download your 3D model.
            </p>
          </motion.div>

          {/* Payment Details */}
          {paymentId && (
            <motion.div 
              className="payment-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Payment Details</h3>
              <div className="detail-item">
                <span>Payment ID:</span>
                <span>{paymentId}</span>
              </div>
              <div className="detail-item">
                <span>Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </motion.div>
          )}

          {/* Product Information */}
          {product && (
            <motion.div 
              className="product-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-details">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <div className="product-meta">
                    <span className="price">${product.price}</span>
                    <span className="category">{product.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Download Section */}
          <motion.div 
            className="download-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Your Download is Ready</h3>
            <p>
              Your 3D model files are ready for download. Click the button below to start downloading.
              You can also access your purchases anytime from your dashboard.
            </p>
            
            <div className="download-actions">
              <button 
                className="btn btn-primary download-btn"
                onClick={downloadProduct}
                disabled={!product}
              >
                <Download size={20} />
                Download Now
              </button>
              
              <Link to="/dashboard" className="btn btn-secondary">
                <Package size={20} />
                View All Purchases
              </Link>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div 
            className="additional-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="info-cards">
              <div className="info-card">
                <h4>Download Instructions</h4>
                <ul>
                  <li>Files are provided in multiple formats (.blend, .fbx, .obj)</li>
                  <li>Includes textures and materials</li>
                  <li>Compatible with Blender, Maya, 3ds Max, and more</li>
                  <li>Lifetime access to your downloads</li>
                </ul>
              </div>
              
              <div className="info-card">
                <h4>Need Help?</h4>
                <p>
                  If you have any questions about your purchase or need technical support,
                  please don't hesitate to contact us.
                </p>
                <Link to="/contact" className="help-link">
                  Contact Support
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Back to Store */}
          <motion.div 
            className="back-to-store"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/" className="back-link">
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThankYou;
