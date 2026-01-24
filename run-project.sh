#!/bin/bash

# ============================================
# EMPROIUMVIPANI - Project Run Script
# ============================================

echo "🚀 Starting EmproiumVipani Project..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd /workspaces/EmporiumVipani/server
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "⚠️ Warning: Backend dependencies installation had issues"
fi
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd /workspaces/EmporiumVipani
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️ Warning: Frontend dependencies installation had issues"
fi
echo ""

echo "================================================"
echo "🎯 READY TO START!"
echo "================================================"
echo ""
echo "📝 IMPORTANT: Before running the servers:"
echo ""
echo "1️⃣  Make sure MongoDB is running locally:"
echo "   brew services start mongodb-community  (Mac)"
echo "   or"
echo "   mongod  (Any OS - run in separate terminal)"
echo ""
echo "2️⃣  Then run these commands in separate terminals:"
echo ""
echo "   Terminal 1 (Backend - Port 5000):"
echo "   cd /workspaces/EmporiumVipani/server && npm run dev"
echo ""
echo "   Terminal 2 (Frontend - Port 5173):"
echo "   cd /workspaces/EmporiumVipani && npm run dev"
echo ""
echo "3️⃣  The frontend will auto-open in your browser"
echo "   If not, manually visit: http://localhost:5173"
echo ""
echo "================================================"
