@echo off
REM 3D Design Store - Windows Setup Script
REM This script initializes the React project and installs all dependencies

echo 🚀 Setting up 3D Design Store...

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node -v

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create sample product files
echo 📁 Creating sample product structure...

REM Create empty files for demo
type nul > public\assets\products\1.zip
type nul > public\assets\products\2.zip
type nul > public\assets\products\3.zip
type nul > public\assets\products\4.zip
type nul > public\assets\products\5.zip
type nul > public\assets\products\6.zip

echo ✅ Sample product files created

REM Display completion message
echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next Steps:
echo    1. Start development server: npm start
echo    2. Build for production: npm run build
echo    3. Deploy to GitHub Pages: npm run deploy
echo.
echo 🔧 Configuration:
echo    • Default admin: admin@3dstore.com / admin123
echo    • Add your PayPal button IDs in the admin panel
echo    • Replace sample product files in public/assets/products/
echo    • Update contact information in src/pages/Contact/
echo.
echo 📚 Documentation: See dev_readme.md for detailed instructions
echo.
echo 🌐 Access your app at: http://localhost:3000
echo.
pause
