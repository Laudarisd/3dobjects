import React, { createContext, useContext, useState, useEffect } from 'react';
import initSqlJs from 'sql.js';

const DatabaseContext = createContext();

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        // Initialize sql.js
        const SQL = await initSqlJs({
          locateFile: file => `https://sql.js.org/dist/${file}`
        });

        // Check if database exists in localStorage
        const savedDb = localStorage.getItem('3d-store-db');
        let database;

        if (savedDb) {
          // Load existing database
          const dbData = new Uint8Array(JSON.parse(savedDb));
          database = new SQL.Database(dbData);
        } else {
          // Create new database
          database = new SQL.Database();
          
          // Create tables
          database.exec(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT UNIQUE NOT NULL,
              password_hash TEXT NOT NULL,
              role TEXT DEFAULT 'user'
            );

            CREATE TABLE IF NOT EXISTS products (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              description TEXT,
              price REAL NOT NULL,
              image_url TEXT,
              paypal_link TEXT,
              zip_path TEXT
            );

            CREATE TABLE IF NOT EXISTS orders (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_email TEXT NOT NULL,
              product_id INTEGER NOT NULL,
              timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (product_id) REFERENCES products (id)
            );
          `);

          // Insert sample data
          database.exec(`
            INSERT INTO products (name, description, price, image_url, paypal_link, zip_path) VALUES
            ('Futuristic Robot Model', 'High-quality 3D robot model with detailed textures and rigging. Perfect for games, animations, and renders.', 29.99, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SAMPLE1', 'assets/products/robot.zip'),
            ('Sci-Fi Spaceship Pack', 'Complete spaceship collection with 5 different models, materials, and blueprints included.', 49.99, 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SAMPLE2', 'assets/products/spaceship.zip'),
            ('Architectural Building Set', 'Modern architectural models including residential and commercial buildings with detailed interiors.', 39.99, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SAMPLE3', 'assets/products/building.zip'),
            ('Fantasy Character Pack', 'Collection of fantasy characters including warriors, mages, and mythical creatures.', 34.99, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SAMPLE4', 'assets/products/characters.zip'),
            ('Vehicle Collection', 'Sports cars, trucks, and military vehicles with high-detail models and textures.', 44.99, 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SAMPLE5', 'assets/products/vehicles.zip'),
            ('Weapon Arsenal', 'Complete weapon pack including medieval swords, modern firearms, and sci-fi energy weapons.', 24.99, 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SAMPLE6', 'assets/products/weapons.zip')
          `);

          // Create admin user (password: admin123)
          const adminHash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // bcrypt hash for 'admin123'
          database.exec(`
            INSERT INTO users (email, password_hash, role) VALUES
            ('admin@3dstore.com', '${adminHash}', 'admin')
          `);

          // Save database to localStorage
          saveDatabase(database);
        }

        setDb(database);
        setLoading(false);
      } catch (error) {
        console.error('Error initializing database:', error);
        setLoading(false);
      }
    };

    initDatabase();
  }, []);

  const saveDatabase = (database) => {
    if (database) {
      const data = database.export();
      localStorage.setItem('3d-store-db', JSON.stringify(Array.from(data)));
    }
  };

  const executeQuery = (query, params = []) => {
    if (!db) return [];
    try {
      const result = db.exec(query, params);
      saveDatabase(db); // Save after each query
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      return [];
    }
  };

  const value = {
    db,
    loading,
    executeQuery,
    saveDatabase: () => saveDatabase(db)
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};
