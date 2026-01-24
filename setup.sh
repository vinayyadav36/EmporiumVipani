#!/bin/bash

# ============================================
# EMPROIUMVIPANI - COMPLETE SETUP SCRIPT
# ============================================

echo "
╔════════════════════════════════════════════════════════╗
║  🚀 EmproiumVipani - Complete Setup                    ║
║  Production-Ready E-Commerce PWA                       ║
╚════════════════════════════════════════════════════════╝
"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ============================================
# 1. INSTALL DEPENDENCIES
# ============================================

echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
npm install

echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
cd server
npm install
cd ..

# ============================================
# 2. SETUP ENVIRONMENT FILES
# ============================================

echo -e "${BLUE}🔧 Setting up environment files...${NC}"

if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Created .env from .env.example${NC}"
    echo -e "${YELLOW}   Please update with your actual values${NC}"
fi

if [ ! -f server/.env ]; then
    cp server/.env.example server/.env
    echo -e "${YELLOW}⚠️  Created server/.env from .env.example${NC}"
    echo -e "${YELLOW}   Please update with your actual values${NC}"
fi

# ============================================
# 3. DATABASE SETUP
# ============================================

echo -e "${BLUE}💾 Database Setup Instructions:${NC}"
echo "   1. Install MongoDB locally or use MongoDB Atlas"
echo "   2. Update MONGODB_URI in server/.env"
echo "   3. Format: mongodb+srv://user:pass@cluster.mongodb.net/emproiumvipani"

# ============================================
# 4. ENVIRONMENT CONFIGURATION
# ============================================

echo -e "${BLUE}🔑 Required Configuration:${NC}"
echo ""
echo "   📧 EmailJS Setup:"
echo "      1. Go to https://www.emailjs.com"
echo "      2. Create account and get:"
echo "         - Service ID"
echo "         - Template ID"
echo "         - Public Key"
echo "      3. Update in server/.env"
echo ""
echo "   💳 Razorpay Setup (Optional):"
echo "      1. Go to https://razorpay.com"
echo "      2. Create account and get:"
echo "         - Key ID"
echo "         - Key Secret"
echo "      3. Update in server/.env and .env"
echo ""
echo "   🔐 JWT Secret:"
echo "      - Update JWT_SECRET in server/.env"
echo "      - Use: $(openssl rand -base64 32)"
echo ""

# ============================================
# 5. FINAL SETUP
# ============================================

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "   1. Update all .env files with your credentials"
echo "   2. Start backend: npm run dev --prefix server"
echo "   3. Start frontend: npm run dev"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "   - Backend: server/README.md"
echo "   - Frontend: README.md"
echo "   - API Docs: server/API_DOCS.md"
echo ""

echo -e "${GREEN}🎉 Happy coding!${NC}"
