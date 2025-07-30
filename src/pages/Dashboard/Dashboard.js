import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Download, Clock, Package } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDatabase } from '../../contexts/DatabaseContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const { db } = useDatabase();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserOrders = () => {
      if (!db || !user) return;

      try {
        const result = db.exec(`
          SELECT o.*, p.name, p.price, p.image_url, p.zip_path 
          FROM orders o 
          JOIN products p ON o.product_id = p.id 
          WHERE o.user_email = ?
          ORDER BY o.timestamp DESC
        `, [user.email]);

        if (result.length > 0) {
          const ordersData = result[0].values.map(row => ({
            id: row[0],
            user_email: row[1],
            product_id: row[2],
            timestamp: row[3],
            product_name: row[4],
            price: row[5],
            image_url: row[6],
            zip_path: row[7]
          }));
          setOrders(ordersData);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserOrders();
  }, [db, user]);

  const handleDownload = (zipPath, productName) => {
    const link = document.createElement('a');
    link.href = zipPath;
    link.download = `${productName}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard">
      <div className="container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="user-welcome">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div className="user-info">
              <h1>Welcome back!</h1>
              <p>{user?.email}</p>
              {isAdmin() && <span className="admin-badge">Admin</span>}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="stat-card">
            <Package size={24} />
            <div className="stat-info">
              <h3>{orders.length}</h3>
              <p>Total Purchases</p>
            </div>
          </div>
          
          <div className="stat-card">
            <Download size={24} />
            <div className="stat-info">
              <h3>{orders.length}</h3>
              <p>Available Downloads</p>
            </div>
          </div>
          
          {isAdmin() && (
            <motion.div
              className="admin-quick-access"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a href="/admin" className="btn btn-primary">
                Admin Panel
              </a>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="orders-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Your Purchase History</h2>
          
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
          ) : orders.length === 0 ? (
            <div className="no-orders">
              <Package size={48} />
              <h3>No purchases yet</h3>
              <p>Start exploring our collection of premium 3D models!</p>
              <a href="/" className="btn btn-primary">Browse Products</a>
            </div>
          ) : (
            <div className="orders-grid">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  className="order-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="order-image">
                    <img src={order.image_url} alt={order.product_name} />
                  </div>
                  
                  <div className="order-info">
                    <h4>{order.product_name}</h4>
                    <div className="order-meta">
                      <span className="order-price">${order.price}</span>
                      <span className="order-date">
                        <Clock size={14} />
                        {formatDate(order.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="order-actions">
                    <motion.button
                      className="btn btn-success download-btn"
                      onClick={() => handleDownload(order.zip_path, order.product_name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download size={16} />
                      Download
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
