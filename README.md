# 🎨 EmproiumVipani - Frontend Documentation

## Overview
Modern, responsive PWA (Progressive Web App) frontend built with Alpine.js, Tailwind CSS, and Vite.

## 🗂️ Project Structure

```
src/
├── index.html             # Main HTML structure
├── app.js                 # Alpine.js store & logic
├── components.js          # UI utilities (Toast, Modal, etc.)
├── email-config.js        # EmailJS configuration
├── api-service.js         # API client for backend
├── form-handlers.js       # Form submission handlers
├── styles.css             # Custom styles
├── public/
│   ├── sw.js             # Service Worker (PWA)
│   └── manifest.json     # PWA manifest
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 10.0.0

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env

# 3. Update API URL in .env
VITE_API_URL=http://localhost:5000/api

# 4. Start development server
npm run dev
```

## 📝 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
VITE_APP_NAME=EmproiumVipani
VITE_APP_URL=http://localhost:5173
```

## 🎯 Features

### ✅ Implemented
- Product catalog with filtering & search
- Shopping cart management
- User authentication
- Order placement (COD & Online)
- Seller registration & onboarding
- Responsive design (mobile-first)
- Dark theme UI
- Toast notifications
- Loading overlays
- PWA capabilities

### 🔄 Enhanced
- Real backend integration
- JWT authentication
- Razorpay payment processing
- Order tracking
- Seller dashboard ready
- Admin panel API

## 🛒 User Features

### 1. Shopping
```javascript
// Browse products
- Filter by category
- Search products
- Sort by price/rating/newest
- View product details

// Cart Management
- Add/remove items
- Update quantity
- Apply automatic discounts
- Calculate shipping

// Checkout
- Fill delivery address
- Select payment method
- Place order
- Track order status
```

### 2. Authentication
```javascript
// User Account
- Register new account
- Login with email/password
- View profile
- Update profile info
- Manage wishlist
```

### 3. Seller Features
```javascript
// Seller Registration
- Apply as seller
- Provide business details
- Admin verification
- Upload products
- Manage inventory
- View sales/orders
```

## 🏗️ Architecture

### State Management (Alpine.js)
```javascript
store = {
  user: null,
  cart: [],
  products: [],
  filters: {category, search, sortBy},
  modals: {cart, checkout, seller, login},
  isLoggedIn: false
}
```

### API Integration
```javascript
api = {
  register(name, email, phone, password)
  login(email, password)
  getProducts(filters)
  createOrder(orderData)
  applySeller(sellerData)
  // ... more endpoints
}
```

### Components
```javascript
Toast.show(message, type) // info, success, error, warning
LoadingOverlay.show(message)
ModalHelper.openById(id)
FormValidator.validateOrderForm(data)
```

## 📱 Responsive Design

- **Mobile** (< 640px): Single column, touch-optimized
- **Tablet** (640px - 1024px): Two-column layout
- **Desktop** (> 1024px): Three-column grid

## 🎨 Design System

### Colors
```
Primary: Emerald (#16a34a)
Secondary: Gold (#facc6b)
Background: Dark (#050509)
Text: Light (#f1f5f9)
```

### Typography
- Display: Playfair Display (serif)
- Body: Inter (sans-serif)
- Size scale: 11px - 32px

## 🔐 Security

- JWT token stored in localStorage
- CORS-protected API calls
- Input validation on all forms
- Password hashing on backend
- Rate limiting on API

## 🧪 Testing Features

### Test Account
```
Email: test@example.com
Password: test123
```

### Test Seller Application
```
Business Name: Test Shop
Email: seller@example.com
```

### Test Payment (COD)
- Select "Cash on Delivery"
- Complete checkout
- Order confirmation email

## 🚀 Build & Deploy

### Development
```bash
npm run dev
# Runs on http://localhost:5173
```

### Production Build
```bash
npm run build
# Creates optimized dist/ folder

npm run preview
# Preview production build
```

### Deploy to Vercel
```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
# 3. Set environment variables
# 4. Deploy automatically
```

## 📊 Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 🔧 Customization

### Change Theme Colors
Edit `index.html` Tailwind config:
```javascript
colors: {
  ink: { 900: '#050509', 800: '#060814' },
  emeraldCore: '#16a34a',
  goldSoft: '#facc6b'
}
```

### Add New Product Category
1. Update `Product` model in backend
2. Add category option in dropdown
3. Update filters in `app.js`

### Customize Email Template
1. Go to EmailJS dashboard
2. Update template variables
3. Update `email-config.js` template mapping

## 📚 API Integration Guide

### Making API Calls

```javascript
// Get products
const products = await api.getProducts({
  category: 'Stationery',
  search: 'notebook',
  sortBy: 'price-low'
});

// Create order
const order = await api.createOrder({
  items: [{productId: '123', quantity: 2}],
  deliveryAddress: {...},
  payment: {method: 'COD'}
});

// Verify payment
const verified = await api.verifyPayment({
  razorpay_order_id: '...',
  razorpay_payment_id: '...',
  razorpay_signature: '...'
});
```

## 🎯 Performance Optimization

- ✅ Code splitting with Vite
- ✅ Image lazy loading
- ✅ Minified bundle size < 100KB
- ✅ Fast production build
- ✅ Service Worker caching

## 📝 Form Validation

All forms validated before submission:
- Email format
- Phone number format
- Password strength
- Address completeness
- Required fields

## 🔔 Notifications

### Toast Types
```javascript
Toast.show('Success!', 'success') // Green
Toast.show('Error!', 'error')     // Red
Toast.show('Warning!', 'warning')  // Yellow
Toast.show('Info', 'info')         // Blue
```

## 🛠️ Troubleshooting

### API Connection Error
- Check backend is running on port 5000
- Verify `VITE_API_URL` in `.env`
- Check CORS settings in backend

### Payment Error
- Verify Razorpay key in `.env`
- Check test credentials
- Ensure backend payment route working

### Form Submission Error
- Check console for validation errors
- Verify all required fields filled
- Check API response in Network tab

## 📱 PWA Features

- Installable on mobile/desktop
- Works offline (cached pages)
- Push notifications ready
- Responsive design

## 🔄 Version & Updates

- Version: 1.0.0
- Last Updated: 2026
- Node: >= 18.0.0
- npm: >= 10.0.0

## 📧 Support

For issues:
- Email: support@emproiumvipani.com
- GitHub Issues: [EmproiumVipani](https://github.com/vinayyadav36/EmporiumVipani/issues)

---

**Built with ❤️ using Alpine.js + Tailwind CSS + Vite**
