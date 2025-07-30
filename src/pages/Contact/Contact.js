import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Simulate form submission
    setTimeout(() => {
      setMessage({ 
        type: 'success', 
        text: 'Thank you for your message! We\'ll get back to you soon.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'sudiplaudari@gmail.com',
      link: 'mailto:sudiplaudari@gmail.com'
    },
    {
      icon: <Github size={24} />,
      title: 'GitHub',
      value: 'github.com/Laudarisd',
      link: 'https://github.com/Laudarisd'
    },
    {
      icon: <Linkedin size={24} />,
      title: 'LinkedIn',
      value: 'LinkedIn Profile',
      link: 'https://www.linkedin.com/in/laudari-sudip'
    },
    {
      icon: <Instagram size={24} />,
      title: 'Instagram',
      value: '@your_profile',
      link: 'https://instagram.com/your-profile'
    }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Get In Touch</h1>
          <p>Have questions about our 3D models or need custom designs? We'd love to hear from you!</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2>Contact Information</h2>
            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-details">
                    <h3>{info.title}</h3>
                    <p>{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="support-hours"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3>Support Hours</h3>
              <div className="hours-info">
                <div className="hours-item">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="hours-item">
                  <span>Weekend</span>
                  <span>10:00 AM - 4:00 PM PST</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {message.text && (
                <motion.div
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.text}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                <Send size={20} />
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>

            <div className="form-note">
              <p>
                <strong>Quick Response:</strong> Use the chat widget below for immediate assistance with orders or technical questions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tawk.to Chat Widget */}
      <script type="text/javascript">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/YOUR_TAWK_TO_ID/1234567890';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </script>
    </div>
  );
};

export default Contact;
