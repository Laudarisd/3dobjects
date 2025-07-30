#!/bin/bash

# 3D Design Store - Setup Script
# This script initializes the React project and installs all dependencies

echo "🚀 Setting up 3D Design Store..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create sample product files (empty ZIP files for demo)
echo "📁 Creating sample product structure..."

# Create sample ZIP files (empty for demo purposes)
touch public/assets/products/1.zip
touch public/assets/products/2.zip
touch public/assets/products/3.zip
touch public/assets/products/4.zip
touch public/assets/products/5.zip
touch public/assets/products/6.zip

echo "✅ Sample product files created"

# Display setup completion message
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "   1. Start development server: npm start"
echo "   2. Build for production: npm run build"
echo "   3. Deploy to GitHub Pages: npm run deploy"
echo ""
echo "🔧 Configuration:"
echo "   • Default admin: admin@3dstore.com / admin123"
echo "   • Add your PayPal button IDs in the admin panel"
echo "   • Replace sample product files in public/assets/products/"
echo "   • Update contact information in src/pages/Contact/"
echo ""
echo "📚 Documentation: See dev_readme.md for detailed instructions"
echo ""
echo "🌐 Access your app at: http://localhost:3000"
