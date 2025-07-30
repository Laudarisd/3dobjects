import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDatabase } from '../../contexts/DatabaseContext';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const { db, saveDatabase } = useDatabase();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    paypal_link: '',
    zip_path: ''
  });

  useEffect(() => {
    loadProducts();
  }, [db]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        // Update existing product
        db.exec(`
          UPDATE products 
          SET name = ?, description = ?, price = ?, image_url = ?, paypal_link = ?, zip_path = ?
          WHERE id = ?
        `, [
          formData.name,
          formData.description,
          parseFloat(formData.price),
          formData.image_url,
          formData.paypal_link,
          formData.zip_path,
          editingProduct.id
        ]);
      } else {
        // Create new product
        db.exec(`
          INSERT INTO products (name, description, price, image_url, paypal_link, zip_path)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [
          formData.name,
          formData.description,
          parseFloat(formData.price),
          formData.image_url,
          formData.paypal_link,
          formData.zip_path
        ]);
      }

      saveDatabase();
      loadProducts();
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      paypal_link: product.paypal_link,
      zip_path: product.zip_path
    });
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        db.exec('DELETE FROM products WHERE id = ?', [productId]);
        saveDatabase();
        loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const openModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      image_url: '',
      paypal_link: '',
      zip_path: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-error">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Admin Panel</h1>
          <p>Manage your product catalog</p>
          <motion.button
            className="btn btn-primary"
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Add New Product
          </motion.button>
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
          <motion.div
            className="products-table-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="table-responsive">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <td>{product.id}</td>
                      <td>
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="product-thumbnail"
                        />
                      </td>
                      <td>
                        <div className="product-name">{product.name}</div>
                        <div className="product-description">
                          {product.description?.substring(0, 50)}...
                        </div>
                      </td>
                      <td className="product-price">${product.price}</td>
                      <td>
                        <div className="actions">
                          <motion.button
                            className="btn-icon edit"
                            onClick={() => handleEdit(product)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            className="btn-icon delete"
                            onClick={() => handleDelete(product.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Modal */}
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button className="modal-close" onClick={closeModal}>
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="image_url">Image URL</label>
                  <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="zip_path">ZIP File Path</label>
                  <input
                    type="text"
                    id="zip_path"
                    name="zip_path"
                    value={formData.zip_path}
                    onChange={handleInputChange}
                    placeholder="assets/products/product.zip"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="paypal_link">PayPal Buy Now Link</label>
                  <textarea
                    id="paypal_link"
                    name="paypal_link"
                    value={formData.paypal_link}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YOUR_BUTTON_ID"
                    required
                  />
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;
