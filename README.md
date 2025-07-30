# 3D Design Store 🎨

A modern, React-based e-commerce platform for selling 3D models and CAD files with stunning 3D animations, secure PayPal integration, and no backend required - perfect for GitHub Pages hosting.

## ✨ Features

### 🎬 3D Animations & Modern UI
- **Interactive 3D Hero Section** with Three.js rotating models and particles
- **Product Cards** with 3D tilt effects and perspective transforms
- **Smooth Page Transitions** using Framer Motion
- **Dark/Light Theme** with seamless switching
- **Responsive Design** optimized for all devices

### 🛒 E-commerce Functionality
- **Product Catalog** with dynamic grid layout
- **Individual Product Pages** with detailed descriptions and pricing
- **PayPal Integration** for secure payments
- **Instant Download Delivery** after purchase verification
- **User Dashboard** with purchase history and re-download options

### 🔐 User Management
- **Secure Authentication** with bcrypt password hashing
- **User Registration/Login** with form validation
- **Admin Panel** for complete product management (CRUD operations)
- **Role-based Access Control** (admin/user permissions)

### 💾 Client-Side Database
- **SQLite3 via sql.js** - runs entirely in the browser
- **No Backend Required** - perfect for static hosting
- **Persistent Storage** using localStorage
- **Pre-populated Sample Data** for immediate testing

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with WebGL support
- PayPal developer account (for payment processing)

### Installation

#### Option 1: Automated Setup (Recommended)
```bash
# On Windows
setup.bat

# On macOS/Linux
chmod +x setup.sh
./setup.sh
```

#### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar/          # Navigation with theme toggle
│   ├── Footer/          # Footer with social links
│   ├── Hero3D/          # 3D animated hero section
│   ├── ProductGrid/     # Product display grid
│   ├── ProductCard/     # Individual product cards
│   └── ProtectedRoute/  # Authentication guard
├── pages/               # Main application pages
│   ├── Home/           # Homepage with 3D banner
│   ├── Product/        # Product detail pages
│   ├── Auth/           # Login/Register forms
│   ├── Dashboard/      # User dashboard
│   ├── Admin/          # Admin panel
│   ├── Contact/        # Contact information
│   └── ThankYou/       # Post-purchase page
├── contexts/           # React Context providers
│   ├── ThemeContext.js # Theme management
│   ├── AuthContext.js  # User authentication
│   └── DatabaseContext.js # SQLite database
└── styles/             # Global CSS files
```

## 🔧 Configuration

### 1. Database Setup
The SQLite database initializes automatically with sample data. Default admin credentials:
- **Email:** `admin@3dstore.com`
- **Password:** `admin123`

### 2. PayPal Integration
1. Create PayPal Buy Now buttons at [PayPal Developer](https://developer.paypal.com/)
2. Set return URL to: `https://yourdomain.com/thankyou?product_id=ID&email={{payer_email}}`
3. Add button IDs through the admin panel

### 3. Product Files
Place downloadable ZIP files in `public/assets/products/`:
```
public/assets/products/
├── 1.zip    # Product ID 1 files
├── 2.zip    # Product ID 2 files
└── ...
```

### 4. Contact Information
Update social links in `src/pages/Contact/Contact.js`:
```javascript
const socialLinks = [
  { href: 'https://github.com/YourUsername', label: 'GitHub' },
  { href: 'mailto:your-email@domain.com', label: 'Email' }
];
```

## 🎭 Customization

### Theme Colors
Edit `src/styles/index.css`:
```css
:root {
  --primary-color: #7461ff;    /* Main brand color */
  --accent-color: #06b6d4;     /* Secondary accent */
  --success-color: #10b981;    /* Success states */
}
```

### 3D Scene Customization
Modify `src/components/Hero3D/Hero3D.js`:
```javascript
// Change cube colors
<meshStandardMaterial color="#your-color" />

// Adjust animation speed
meshRef.current.rotation.y += 0.01; // Rotation speed
```

## 🚀 Deployment

### GitHub Pages
1. Update `package.json` homepage:
```json
"homepage": "https://yourusername.github.io/3d-design-store"
```

2. Deploy:
```bash
npm run deploy
```

### Other Platforms
- **Netlify:** Drag and drop the `build` folder
- **Vercel:** Connect your GitHub repository
- **Firebase Hosting:** Follow Firebase deployment guide

## 💡 Usage Guide

### For Customers
1. Browse products on the homepage
2. Click product cards to view details
3. Click "Order This" to proceed to PayPal
4. After payment, return to get download links
5. Register for purchase history tracking

### For Admins
1. Login with admin credentials
2. Access Admin Panel from user menu
3. Add/edit/delete products
4. Configure PayPal buttons and download links
5. Monitor user registrations (via database)

## 🛡️ Security Considerations

- **Client-side authentication** (not suitable for sensitive data)
- **Public file access** (consider obfuscated filenames)
- **localStorage data** (cleared when browser data is reset)
- For production: implement server-side verification

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires WebGL support for 3D animations.

## 📚 Technologies Used

- **React 18** - UI framework
- **Three.js & React Three Fiber** - 3D graphics
- **Framer Motion** - Animations
- **sql.js** - Client-side SQLite
- **bcrypt.js** - Password hashing
- **Lucide React** - Icons
- **CSS Custom Properties** - Theming

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation:** [dev_readme.md](dev_readme.md)
- **Issues:** Create a GitHub issue
- **Email:** your-email@domain.com

## 🔄 Changelog

### v1.0.0 (2025-01-30)
- Initial release
- 3D animated homepage with Three.js
- Complete e-commerce functionality
- PayPal integration
- Admin panel with CRUD operations
- Dark/light theme support
- Responsive design
- SQLite3 client-side database

---

**Made with ❤️ for the 3D design community**

### Demo Credentials
- **Admin:** admin@3dstore.com / admin123
- **Test PayPal:** Use PayPal sandbox for testing

### Live Demo
🌐 [View Live Demo](https://yourusername.github.io/3d-design-store)
