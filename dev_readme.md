# GenMesh Studio - React Development Documentation

A complete React-based e-commerce platform for selling 3D models and digital assets with modern animations, 3D effects, and secure PayPal integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with WebGL support
- PayPal developer account (for payment integration)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd 3d-design-store

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
│   ├── Navbar/          # Navigation bar with theme toggle
│   ├── Footer/          # Footer with social links
│   ├── Hero3D/          # 3D animated hero section (Three.js)
│   ├── ProductGrid/     # Grid layout for products
│   ├── ProductCard/     # Individual product cards with 3D effects
│   └── ProtectedRoute/  # Route protection for auth
├── pages/               # Main page components
│   ├── Home/           # Homepage with 3D banner + products
│   ├── Product/        # Individual product details + PayPal
│   ├── Auth/           # Login/Register pages with bcrypt
│   ├── Dashboard/      # User dashboard with purchase history
│   ├── Admin/          # Admin panel with CRUD operations
│   ├── Contact/        # Contact page with form
│   └── ThankYou/       # Post-purchase confirmation + downloads
├── contexts/           # React Context providers
│   ├── ThemeContext.js # Dark/Light theme management
│   ├── AuthContext.js  # User authentication
│   └── DatabaseContext.js # SQLite database management
├── styles/             # Global CSS files
│   ├── index.css       # Global styles + CSS variables
│   └── App.css         # App-specific styles
└── App.js              # Main app component with routing
```

## 🎨 Features Overview

### 🌟 3D Animations & Effects
- **Hero Section**: Interactive 3D scene with rotating cubes and particles (Three.js)
- **Product Cards**: 3D tilt effects on hover with perspective transforms
- **Page Transitions**: Smooth fade/slide animations between routes (Framer Motion)
- **Animated Navigation**: Sliding underlines and smooth hover effects

### 🎯 Core Functionality
- **Product Catalog**: Dynamic product grid with search and filtering
- **User Authentication**: Secure login/register with bcrypt password hashing
- **PayPal Integration**: Direct payment processing with download delivery
- **Admin Panel**: Full CRUD operations for product management with modal interface
- **User Dashboard**: Purchase history, download access, and account management
- **Download System**: Secure file delivery after payment verification via ThankYou page
- **Contact System**: Professional contact page with form submission and support hours
- **Theme Switching**: Dark/Light mode toggle with smooth transitions

### 💾 Database (SQLite3 via sql.js)
- **Client-side storage**: No backend required, runs in browser
- **Persistent data**: Stored in localStorage between sessions
- **Sample data**: Pre-populated with demo products and admin user

## 🔧 Configuration Guide

### 1. Setting Up the Database

The database initializes automatically with sample data. To modify:

**File: `src/contexts/DatabaseContext.js`**
```javascript
// Add sample products
database.exec(`
  INSERT INTO products (name, description, price, image_url, paypal_link, zip_path) VALUES
  ('Your Product', 'Description', 29.99, 'image-url', 'paypal-link', 'assets/products/file.zip')
`);
```

### 2. Configuring PayPal Integration

**For each product, you need to:**
1. Create a PayPal Buy Now button at [PayPal Buttons](https://www.paypal.com/buttons)
2. Set the return URL to: `https://yourdomain.com/thankyou?product_id=PRODUCT_ID&email={{payer_email}}`
3. Copy the generated HTML code
4. Extract the `hosted_button_id` from the PayPal link
5. Add to admin panel or database

**Example PayPal link format:**
```
https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YOUR_BUTTON_ID&return=https://yourdomain.com/thankyou?product_id=1&email={{payer_email}}
```

### 3. Setting Up File Downloads

**File Structure:**
```
public/
└── assets/
    └── products/
        ├── 1.zip     # Product ID 1 files
        ├── 2.zip     # Product ID 2 files
        └── ...
```

**File: `src/pages/ThankYou/ThankYou.js`**
```javascript
const downloadFile = (zipPath) => {
  const link = document.createElement('a');
  link.href = zipPath;
  link.download = zipPath.split('/').pop();
  link.click();
};
```

### 4. Managing Admin Users

**Default Admin Credentials:**
- Email: `admin@3dstore.com`
- Password: `admin123`

**To create new admin users:**
```javascript
// In browser console or admin panel
const { db } = useDatabase();
const hashedPassword = await bcrypt.hash('newpassword', 10);
db.exec(`
  INSERT INTO users (email, password_hash, role) VALUES
  ('newemail@example.com', '${hashedPassword}', 'admin')
`);
```

## 🎭 Theme Customization

**File: `src/styles/index.css`**

### Color Variables:
```css
:root {
  --primary-color: #7461ff;      /* Main brand color */
  --accent-color: #06b6d4;       /* Secondary accent */
  --success-color: #10b981;      /* Success states */
  --warning-color: #f59e0b;      /* Warning states */
  --error-color: #ef4444;        /* Error states */
}
```

### Theme Switching:
```css
[data-theme="dark"] {
  --bg-primary: #1a202c;
  --text-color: #f7fafc;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-color: #2d3748;
}
```

## 🎬 Animation Configuration

### Three.js Scene (Hero3D)
**File: `src/components/Hero3D/Hero3D.js`**

**To modify the 3D scene:**
```javascript
// Change cube colors
<meshStandardMaterial
  color="#your-color"
  metalness={0.8}
  roughness={0.2}
/>

// Adjust animation speed
useFrame((state) => {
  meshRef.current.rotation.y += 0.01; // Rotation speed
});

// Modify camera position
<PerspectiveCamera makeDefault fov={75} position={[0, 0, 8]} />
```

### Framer Motion Animations
**File: `src/App.js`**

**Page transition variants:**
```javascript
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};
```

### GSAP Integration (Optional)
To add GSAP animations:
```bash
npm install gsap
```

```javascript
import { gsap } from 'gsap';

useEffect(() => {
  gsap.from('.product-card', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.1
  });
}, []);
```

## 📞 Contact Information Setup

**File: `src/pages/Contact/Contact.js`**

Update social links:
```javascript
const socialLinks = [
  {
    icon: <Github size={20} />,
    href: 'https://github.com/YourUsername',
    label: 'GitHub'
  },
  {
    icon: <Mail size={20} />,
    href: 'mailto:your-email@domain.com',
    label: 'Email'
  }
];
```

## 💬 Chat Widget Integration

### Tawk.to Setup:
1. Create account at [Tawk.to](https://tawk.to)
2. Get your widget code
3. Replace in `src/pages/Contact/Contact.js` and `src/pages/ThankYou/ThankYou.js`:

```javascript
// Replace YOUR_TAWK_TO_ID with your actual ID
s1.src='https://embed.tawk.to/YOUR_TAWK_TO_ID/1234567890';
```

### Crisp Chat Alternative:
```javascript
window.$crisp=[];window.CRISP_WEBSITE_ID="YOUR_CRISP_ID";
(function(){
  d=document;s=d.createElement("script");
  s.src="https://client.crisp.chat/l.js";
  s.async=1;d.getElementsByTagName("head")[0].appendChild(s);
})();
```

## 🚀 Deployment to GitHub Pages

### 1. Update package.json:
```json
{
  "homepage": "https://yourusername.github.io/3d-design-store",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 2. Deploy:
```bash
npm run deploy
```

### 3. Configure PayPal return URLs:
Update all PayPal buttons to use your GitHub Pages URL:
```
https://yourusername.github.io/3d-design-store/thankyou?product_id=1&email={{payer_email}}
```

## 🔐 Security Considerations

### Password Hashing:
- Uses bcrypt with salt rounds of 10
- Passwords never stored in plain text
- Client-side hashing (not ideal for production)

### File Protection:
- Files in `/public/assets/products/` are publicly accessible
- Consider obfuscated filenames: `a8f3d92b.zip` instead of `product1.zip`
- Implement time-limited download tokens for production

### Data Storage:
- SQLite database stored in localStorage
- Clear browser data will reset all user accounts
- Consider cloud storage for production

## 🐛 Troubleshooting

### Common Issues:

**1. 3D Scene Not Loading:**
```javascript
// Check WebGL support
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
if (!gl) {
  console.error('WebGL not supported');
}
```

**2. Database Errors:**
```javascript
// Reset database
localStorage.removeItem('genmesh-studio-db');
// Refresh page to reinitialize
```

**3. PayPal Integration Issues:**
- Verify return URL format
- Check hosted_button_id is correct
- Test in PayPal sandbox first

**4. Animation Performance:**
```javascript
// Reduce animation complexity for slower devices
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

## 📈 Performance Optimization

### Code Splitting:
```javascript
import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./pages/Admin/Admin'));

<Suspense fallback={<div>Loading...</div>}>
  <Admin />
</Suspense>
```

### Image Optimization:
- Use WebP format when possible
- Implement lazy loading
- Add loading states

### Bundle Analysis:
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

## 🔄 Updates & Maintenance

### Adding New Products:
1. Use admin panel at `/admin`
2. Upload product images to public folder
3. Create ZIP files with product assets
4. Configure PayPal button with correct return URL

### Database Schema Changes:
Update `src/contexts/DatabaseContext.js` with migration logic:
```javascript
// Add new column
database.exec(`ALTER TABLE products ADD COLUMN category TEXT DEFAULT 'general'`);
```

### Updating Dependencies:
```bash
npm update
npm audit fix
```

## 📚 Additional Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [React Context API](https://reactjs.org/docs/context.html)
- [PayPal Developer Docs](https://developer.paypal.com/)
- [SQL.js Documentation](https://sql.js.org/)

## 🛠️ Recent Updates & Fixes (Latest Session)

### ✅ Successfully Resolved All Compilation Errors!

**The application now compiles and runs successfully at http://localhost:3000/3d-design-store**

### 🎨 UI/UX Improvements Made:

#### 1. **✅ Fixed Text Alignment Issues**
- **Files Modified**: `src/components/Navbar/Navbar.css` (lines 17-60)
- **Changes**: 
  - Fixed navbar height to 70px for consistent alignment
  - All menu items now align perfectly in the same horizontal line
  - Added flexbox alignment with proper height inheritance
  - Updated font to Inter with better weight and spacing
- **How to Edit**: Modify `.nav-container`, `.nav-item`, and `.nav-link` classes for layout adjustments

#### 2. **✅ Fixed Products Page Error**
- **Files Modified**: `src/pages/Products/Products.js` (lines 20-48)
- **Issue Fixed**: "Cannot read properties of undefined (reading 'sort')" error
- **Solution**: Added null checking and array validation before operations
- **Changes Made**:
  - Check if products exists and is an array before processing
  - Create copy of products array to avoid mutation
  - Add optional chaining (?.) for property access
  - Handle undefined values in sorting functions
- **How to Edit**: Error handling is in the useEffect hook starting at line 20

#### 3. **✅ Updated Font Family**
- **Files Modified**: 
  - `src/styles/index.css` (lines 1-3, 81-85) - Added Google Fonts import and font smoothing
  - `src/components/Navbar/Navbar.css` (multiple lines) - Updated all text elements to use Inter font
- **Changes**: 
  - Imported Google Fonts Inter with multiple weights (300-800)
  - Applied Inter font family consistently across all components
  - Added font smoothing for better rendering (-webkit-font-smoothing, -moz-osx-font-smoothing)
- **How to Edit**: Change font family in CSS custom properties or individual component classes

#### 2. **Added Authentication Protection for Product Details**
- **Files Modified**: 
  - `src/App.js` (lines 67-80) - Wrapped Product route with ProtectedRoute
  - `src/components/ProductCard/ProductCard.js` (lines 6-25) - Added login redirect on card click
- **How to Edit**: Modify ProtectedRoute wrapper in App.js or handleCardClick function in ProductCard.js

#### 3. **Created Products Page with Category Sections**
- **Files Created**: 
  - `src/pages/Products/Products.js` - Main products listing with categories
  - `src/pages/Products/Products.css` - Styling for product grid and filters
- **How to Edit Categories**: Modify `categories` array in Products.js (line 13)
- **How to Add Filters**: Edit filter controls in Products.js (lines 85-130)

#### 4. **Enhanced 3D Animations**
- **Files Modified**: `src/components/Hero3D/Hero3D.js` (lines 8-85)
- **Improvements**: 
  - Added 8 orbiting cubes (was 6)
  - More dynamic rotations with sine wave patterns
  - Added floating geometric shapes (sphere, tetrahedron, octahedron)
  - Enhanced emissive lighting effects
- **How to Edit Animations**: 
  - Change rotation speed: Modify `meshRef.current.rotation.y += 0.01` (line 13)
  - Add more shapes: Add new `<Float>` components after line 46
  - Change colors: Modify `color` and `emissive` properties in meshStandardMaterial

#### 5. **Added Side Animations to Products Page**
- **Files**: `src/pages/Products/Products.css` (lines 285-320)
- **Features**: Floating cube and sphere on left/right sides with motion animation
- **How to Edit**: Modify `.side-element`, `.floating-cube`, and `.floating-sphere` classes

### 🔧 File Editing Guide for Common Customizations:

#### **Adding New Products**
- **File**: `src/contexts/DatabaseContext.js` (lines 45-60)
- **How**: Add to the INSERT statement in initializeDatabase function
```javascript
('Product Name', 'Description', 29.99, 'image-url', 'Category', 'paypal-link', 'download-path')
```

#### **Changing Navigation Menu**
- **File**: `src/components/Navbar/Navbar.js` (lines 15-19)
- **How**: Modify the `navItems` array
```javascript
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/custom', label: 'Custom Page' },
  { path: '/contact', label: 'Contact' }
];
```

#### **Modifying Product Grid Layout**
- **File**: `src/pages/Products/Products.css` (lines 160-175)
- **Grid View**: Change `grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))`
- **List View**: Modify `.products-grid.list` class for horizontal layout

#### **Uploading New Products via Admin**
- **File**: `src/pages/Admin/Admin.js` (lines 90-150)
- **Form Fields**: Modify the form inputs in the modal
- **Validation**: Add validation in `handleSubmit` function (line 45)

#### **Making Grid More Dense/Sparse**
- **File**: `src/pages/Products/Products.css` (line 165)
- **Dense Grid**: Change `minmax(350px, 1fr)` to `minmax(280px, 1fr)`
- **Sparse Grid**: Change to `minmax(400px, 1fr)`
- **Mobile**: Adjust responsive breakpoints (lines 195-220)

#### **Color Theme Customization**
- **File**: `src/styles/index.css` (lines 1-30)
- **Primary Colors**: Modify CSS custom properties under `:root`
- **Dark/Light Themes**: Edit `[data-theme="dark"]` and `[data-theme="light"]` sections

#### **3D Animation Speed/Intensity**
- **File**: `src/components/Hero3D/Hero3D.js`
- **Rotation Speed**: Lines 13-16 - change the increment values (0.01, etc.)
- **Float Intensity**: Lines 20, 48, 58, 68, 78 - modify `speed`, `rotationIntensity`, `floatIntensity` props
- **Wave Motion**: Lines 14-15 - adjust the multipliers in `Math.sin()` functions

#### **Side Animation Customization**
- **File**: `src/pages/Products/Products.css` (lines 285-320)
- **Position**: Change `left: 2rem` and `right: 2rem` values
- **Size**: Modify `width` and `height` of `.floating-cube` and `.floating-sphere`
- **Animation**: Edit the motion values in `src/pages/Products/Products.js` (lines 210-235)

### Created Missing Components
- **Dashboard.js** & **Dashboard.css**: User dashboard with purchase history, download links, and admin detection
- **Admin.js** & **Admin.css**: Complete admin panel with CRUD operations, modal interface, and product management
- **Contact.js** & **Contact.css**: Contact page with form, social links, and support hours
- **ThankYou.js** & **ThankYou.css**: Post-payment confirmation page with download functionality

### Webpack Configuration for sql.js
- **craco.config.js**: Added webpack polyfills for Node.js modules (path, crypto, stream, vm)
- **package.json**: Updated scripts to use CRACO instead of react-scripts
- **.env**: Environment configuration for webpack settings

**Installed dependencies:**
```bash
npm install --save-dev @craco/craco path-browserify crypto-browserify stream-browserify
```

### Fixed Import/Export Issues
- Resolved unused import warnings in Hero3D.js and Product.js
- Fixed missing component exports and imports
- Addressed ESLint warnings for unused variables

### Webpack Polyfill Configuration
```javascript
// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        "fs": false,
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        // ... other polyfills
      };
      return webpackConfig;
    },
  },
};
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 🔍 File Relationship Map

```
App.js (Main Router)
├── Navbar.js (Navigation + Theme Toggle)
├── Home.js (Homepage)
│   ├── Hero3D.js (3D Banner with Three.js)
│   └── ProductGrid.js (Product Display)
│       └── ProductCard.js (Individual Cards)
├── Product.js (Product Details + PayPal)
├── ThankYou.js (Post-Purchase + Download)
├── Auth/ (Login/Register)
├── Dashboard.js (User Orders)
├── Admin.js (Product Management)
├── Contact.js (Contact Info + Chat)
└── Footer.js (Social Links)

Contexts:
├── ThemeContext.js → Used by all components
├── AuthContext.js → Used by protected routes
└── DatabaseContext.js → Used by all data operations
```

This documentation provides everything needed to understand, modify, and deploy the GenMesh Studio React application!
