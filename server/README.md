# 🚀 EmproiumVipani - Complete Backend Setup Guide

## Overview
Production-ready Node.js/Express/MongoDB backend for the EmproiumVipani e-commerce platform.

## 🗂️ Project Structure

```
server/
├── server.js                 # Main entry point
├── package.json             # Dependencies
├── .env.example             # Environment template
├── models/
│   ├── User.js             # User schema with seller info
│   ├── Product.js          # Product schema
│   └── Order.js            # Order schema
├── routes/
│   ├── auth.js             # Authentication (register/login)
│   ├── products.js         # Product management
│   ├── orders.js           # Order management
│   ├── sellers.js          # Seller operations
│   ├── users.js            # User profile
│   ├── payments.js         # Payment processing
│   └── admin.js            # Admin operations
├── middleware/
│   └── auth.js             # JWT verification & role checks
└── utils/
    └── validators.js       # Input validation helpers
```

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 10.0.0
- MongoDB (local or Atlas)

### Steps

```bash
# 1. Install dependencies
cd server
npm install

# 2. Create .env file
cp .env.example .env

# 3. Configure environment variables (see below)
# Edit .env with your actual values

# 4. Start development server
npm run dev

# 5. For production
npm start
```

## 🔐 Environment Variables

Create `server/.env` with these variables:

```env
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/emproiumvipani
DB_NAME=emproiumvipani

# Server
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173

# JWT
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRE=7d

# EmailJS (for order notifications)
EMAILJS_SERVICE_ID=service_xxx
EMAILJS_TEMPLATE_ID=template_xxx
EMAILJS_PUBLIC_KEY=your_public_key

# Razorpay (for payments)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key

# Admin email
ADMIN_EMAIL=admin@emproiumvipani.com
SUPPORT_EMAIL=support@emproiumvipani.com
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Add IP whitelist (0.0.0.0/0 for development)
5. Create database user
6. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/emproiumvipani`
7. Update `MONGODB_URI` in `.env`

### Local MongoDB

```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install -y mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community

# Connection string
MONGODB_URI=mongodb://localhost:27017/emproiumvipani
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/verify-token` - Verify JWT token

### Products
- `GET /api/products` - List products (filters, search, sort)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (seller only)
- `PUT /api/products/:id` - Update product (seller only)
- `DELETE /api/products/:id` - Delete product (seller only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

### Sellers
- `POST /api/sellers/apply` - Apply as seller
- `GET /api/sellers` - List approved sellers
- `GET /api/sellers/:id` - Get seller details
- `GET /api/sellers/:id/products` - Get seller products

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/wishlist` - Get wishlist
- `POST /api/users/wishlist/:productId` - Toggle wishlist

### Payments
- `POST /api/payments/razorpay/create` - Create Razorpay order
- `POST /api/payments/razorpay/verify` - Verify Razorpay payment

### Admin
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/sellers/pending` - Pending seller applications
- `PUT /api/admin/sellers/:id/approve` - Approve seller
- `PUT /api/admin/sellers/:id/reject` - Reject seller

## 🔐 Authentication

All endpoints except `/auth/*`, `/products`, and `/sellers/*` require JWT token in header:

```
Authorization: Bearer <token>
```

## 🚀 Running the Server

### Development
```bash
npm run dev
```
- Runs on http://localhost:5000
- Auto-restarts on file changes
- Console logs all requests

### Production
```bash
npm start
```
- Optimized for production
- Set `NODE_ENV=production`

### Testing
```bash
npm test
```

## 📝 Data Models

### User
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: 'customer' | 'seller' | 'admin',
  seller: {
    businessName: String,
    verified: Boolean,
    status: 'pending' | 'approved' | 'rejected'
  },
  address: {
    street, city, state, postalCode, country
  },
  orders: [ObjectId],
  wishlist: [ObjectId]
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [{url, alt}],
  stock: Number,
  sellerId: ObjectId,
  rating: {average, count},
  status: 'active' | 'inactive' | 'archived'
}
```

### Order
```javascript
{
  orderId: String (unique),
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    sellerId: ObjectId,
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered',
  payment: {
    method: 'COD' | 'UPI' | 'Card',
    status: 'pending' | 'completed'
  }
}
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Role-based access control
- ✅ Input validation
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Environment variable isolation

## 🧪 Testing API Endpoints

### Using curl
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phone":"9999999999","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'

# Get products
curl http://localhost:5000/api/products
```

### Using Postman
1. Import the API collection from `server/postman_collection.json`
2. Set `{{token}}` variable from login response
3. Test endpoints

## 🚀 Deployment

### Vercel (Recommended)
```bash
# 1. Connect GitHub repo to Vercel
# 2. Set environment variables in Vercel dashboard
# 3. Configure production domain
# 4. Deploy automatically on push
```

### Railway/Render
```bash
# 1. Create account on Railway.app or Render.com
# 2. Connect GitHub repo
# 3. Set environment variables
# 4. Deploy
```

### Docker
```bash
# Create Dockerfile
docker build -t emproiumvipani-backend .
docker run -p 5000:5000 emproiumvipani-backend
```

## 📊 Monitoring & Logging

- All API calls logged to console
- Errors include stack traces in development
- Production errors suppressed for security

## 🔧 Troubleshooting

### MongoDB connection error
- Check `MONGODB_URI` in `.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure database credentials are correct

### JWT token errors
- Verify token format: `Bearer <token>`
- Check `JWT_SECRET` matches frontend
- Token may be expired

### CORS errors
- Update `CLIENT_URL` in `.env`
- Ensure frontend URL matches

## 📚 Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT Docs](https://jwt.io/)
- [Razorpay API](https://razorpay.com/docs/)

## 📧 Support

For issues or questions:
- Email: support@emproiumvipani.com
- GitHub: [EmproiumVipani](https://github.com/vinayyadav36/EmporiumVipani)

---

**Created with ❤️ by Vipani Team**
