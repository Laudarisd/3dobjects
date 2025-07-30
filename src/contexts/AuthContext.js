import React, { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { useDatabase } from './DatabaseContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { db } = useDatabase();

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    if (db) {
      checkAuth();
    }
  }, [db]);

  const register = async (email, password) => {
    try {
      if (!db) throw new Error('Database not initialized');

      // Check if user already exists
      const existingUser = db.exec(`SELECT * FROM users WHERE email = ?`, [email]);
      if (existingUser.length > 0 && existingUser[0].values.length > 0) {
        throw new Error('User already exists with this email');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      const insertStmt = db.prepare(`
        INSERT INTO users (email, password_hash, role) 
        VALUES (?, ?, 'user')
      `);
      insertStmt.run([email, hashedPassword]);
      insertStmt.free();

      // Get the created user
      const result = db.exec(`SELECT id, email, role FROM users WHERE email = ?`, [email]);
      const userData = {
        id: result[0].values[0][0],
        email: result[0].values[0][1],
        role: result[0].values[0][2]
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      if (!db) throw new Error('Database not initialized');

      // Get user from database
      const result = db.exec(`SELECT * FROM users WHERE email = ?`, [email]);
      if (result.length === 0 || result[0].values.length === 0) {
        throw new Error('Invalid email or password');
      }

      const userData = result[0].values[0];
      const [id, userEmail, hashedPassword, role] = userData;

      // Verify password
      const isValid = await bcrypt.compare(password, hashedPassword);
      if (!isValid) {
        throw new Error('Invalid email or password');
      }

      const user = { id, email: userEmail, role };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAdmin,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
