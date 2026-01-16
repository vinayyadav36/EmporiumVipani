// ============================================
// EMPROIUMVIPANI - COMPLETE APP.JS
// Alpine.js Store + Logic (Production-Ready)
// ============================================

// Import Alpine (already loaded via CDN)
// window.Alpine is available globally

// ============================================
// 1. GLOBAL STORE (Redux-like State Management)
// ============================================
class AppStore {
    constructor() {
        this.state = {
            // User & Auth
            user: null,
            isLoggedIn: false,
            
            // Cart
            cart: [],
            cartOpen: false,
            
            // Products & Filters
            products: [],
            sellers: [],
            filteredProducts: [],
            filters: {
                category: 'all',
                search: '',
                sortBy: 'relevance'
            },
            
            // UI State
            modals: {
                seller: false,
                login: false,
                cart: false,
                checkout: false
            },
            
            // Loading States
            loading: {
                products: false,
                checkout: false,
                order: false
            },
            
            // Order Confirmation
            lastOrder: null,
            
            // Mobile
            mobileMenuOpen: false
        };
        
        this.listeners = [];
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.seedData();
    }
    
    // ========== Storage Management ==========
    loadFromStorage() {
        const saved = localStorage.getItem('emproium_cart');
        const userSaved = localStorage.getItem('emproium_user');
        
        if (saved) {
            try {
                this.state.cart = JSON.parse(saved);
            } catch (e) {
                console.error('Cart load error:', e);
            }
        }
        
        if (userSaved) {
            try {
                this.state.user = JSON.parse(userSaved);
                this.state.isLoggedIn = true;
            } catch (e) {
                console.error('User load error:', e);
            }
        }
    }
    
    saveToStorage() {
        localStorage.setItem('emproium_cart', JSON.stringify(this.state.cart));
        if (this.state.user) {
            localStorage.setItem('emproium_user', JSON.stringify(this.state.user));
        }
    }
    
    // ========== Data Seeding ==========
    seedData() {
        this.state.sellers = [
            { 
                id: 1, 
                name: 'Triu Naturals Pvt Ltd', 
                status: 'approved', 
                rating: 4.85, 
                desc: 'Premium herbal powders & spices',
                avatar: '👨‍🌾',
                verified: true,
                location: 'Delhi'
            },
            { 
                id: 2, 
                name: 'Aurora Quill Designs', 
                status: 'approved', 
                rating: 4.92, 
                desc: 'Luxury stationery collections',
                avatar: '✍️',
                verified: true,
                location: 'Mumbai'
            },
            { 
                id: 3, 
                name: 'EduSpark Worksheets', 
                status: 'approved', 
                rating: 4.76, 
                desc: 'STEM & skill-building resources',
                avatar: '📚',
                verified: true,
                location: 'Bangalore'
            },
            { 
                id: 4, 
                name: 'GreenLeaf Organics', 
                status: 'pending', 
                rating: 0, 
                desc: 'Organic superfoods',
                avatar: '🌱',
                verified: false,
                location: 'Pune'
            }
        ];
        
        this.state.products = [
            {
                id: 1,
                name: 'Organic Turmeric Powder 500g',
                price: 299,
                sellerId: 1,
                category: 'Natural Products',
                image: '🧂',
                stock: 124,
                rating: 4.9,
                sales: 567,
                description: 'Pure, organic turmeric powder from trusted farmers'
            },
            {
                id: 2,
                name: 'Premium Leather-Bound Diary',
                price: 1299,
                sellerId: 2,
                category: 'Stationery',
                image: '📓',
                stock: 43,
                rating: 4.95,
                sales: 234,
                description: 'Luxury leather diary for journaling and planning'
            },
            {
                id: 3,
                name: 'Math & Logic Worksheets (Grade 5)',
                price: 249,
                sellerId: 3,
                category: 'Worksheets',
                image: '📐',
                stock: 89,
                rating: 4.8,
                sales: 456,
                description: 'Comprehensive math worksheets for critical thinking'
            },
            {
                id: 4,
                name: 'Ashwagandha Root Powder 250g',
                price: 499,
                sellerId: 1,
                category: 'Natural Products',
                image: '🌿',
                stock: 76,
                rating: 4.85,
                sales: 345,
                description: 'Premium Ashwagandha for wellness'
            },
            {
                id: 5,
                name: 'Custom Monogram Notebook Set',
                price: 899,
                sellerId: 2,
                category: 'Stationery',
                image: '📔',
                stock: 21,
                rating: 4.9,
                sales: 167,
                description: 'Personalized notebook set with monogram'
            },
            {
                id: 6,
                name: 'Science Experiment Worksheets Bundle',
                price: 599,
                sellerId: 3,
                category: 'Worksheets',
                image: '🔬',
                stock: 45,
                rating: 4.7,
                sales: 234,
                description: 'Interactive science worksheets for hands-on learning'
            }
        ];
        
        this.state.filteredProducts = [...this.state.products];
        this.notify();
    }
    
    // ========== State Management ==========
    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.saveToStorage();
        this.notify();
    }
    
    updateCart(cart) {
        this.state.cart = cart;
        this.saveToStorage();
        this.notify();
    }
    
    subscribe(callback) {
        this.listeners.push(callback);
    }
    
    notify() {
        this.listeners.forEach(cb => cb(this.state));
    }
    
    // ========== Cart Operations ==========
    addToCart(productId) {
        const product = this.state.products.find(p => p.id === productId);
        if (!product) return;
        
        const existing = this.state.cart.find(item => item.id === productId);
        
        if (existing) {
            existing.quantity += 1;
        } else {
            this.state.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.updateCart(this.state.cart);
        this.showToast('✅ Added to cart!', 'success');
    }
    
    removeFromCart(productId) {
        this.state.cart = this.state.cart.filter(item => item.id !== productId);
        this.updateCart(this.state.cart);
    }
    
    updateQuantity(productId, change) {
        const item = this.state.cart.find(item => item.id === productId);
        if (!item) return;
        
        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.updateCart(this.state.cart);
        }
    }
    
    clearCart() {
        this.state.cart = [];
        this.updateCart([]);
    }
    
    // ========== Product Filtering ==========
    filterProducts() {
        let filtered = [...this.state.products];
        
        // Category filter
        if (this.state.filters.category !== 'all') {
            filtered = filtered.filter(p => p.category === this.state.filters.category);
        }
        
        // Search filter
        if (this.state.filters.search) {
            const search = this.state.filters.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search)
            );
        }
        
        // Sort
        switch (this.state.filters.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            default: // relevance
                filtered.sort((a, b) => b.sales - a.sales);
        }
        
        this.state.filteredProducts = filtered;
        this.notify();
    }
    
    setFilter(filterName, value) {
        this.state.filters[filterName] = value;
        this.filterProducts();
    }
    
    // ========== Modal Management ==========
    openModal(modalName) {
        this.state.modals[modalName] = true;
        this.notify();
    }
    
    closeModal(modalName) {
        this.state.modals[modalName] = false;
        this.notify();
    }
    
    // ========== Calculations ==========
    getCartTotal() {
        return this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getCartCount() {
        return this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    getShipping() {
        return this.state.cart.length > 0 ? 50 : 0;
    }
    
    getDiscount() {
        const total = this.getCartTotal();
        return total > 1000 ? Math.floor(total * 0.05) : 0;
    }
    
    getFinalTotal() {
        return this.getCartTotal() + this.getShipping() - this.getDiscount();
    }
    
    getSeller(sellerId) {
        return this.state.sellers.find(s => s.id === sellerId);
    }
    
    // ========== Auth ==========
    login(email, password) {
        // Demo login (no real auth for static site)
        if (email && password) {
            this.state.user = {
                email,
                name: email.split('@')[0],
                loginTime: new Date()
            };
            this.state.isLoggedIn = true;
            this.saveToStorage();
            this.notify();
            this.showToast('✅ Logged in successfully!', 'success');
            return true;
        }
        return false;
    }
    
    logout() {
        this.state.user = null;
        this.state.isLoggedIn = false;
        localStorage.removeItem('emproium_user');
        this.notify();
        this.showToast('👋 Logged out', 'info');
    }
    
    // ========== Orders ==========
    async placeOrder(orderData) {
        this.state.loading.order = true;
        this.notify();
        
        try {
            // Send to EmailJS
            const result = await EmailManager.submitOrderToGmail({
                customerName: orderData.name,
                customerEmail: orderData.email,
                customerPhone: orderData.phone,
                customerAddress: orderData.address,
                items: EmailManager.generateOrderSummary(this.state.cart),
                subtotal: this.getCartTotal(),
                shipping: this.getShipping(),
                discount: this.getDiscount(),
                total: this.getFinalTotal(),
                paymentMethod: orderData.paymentMethod,
                notes: orderData.notes
            });
            
            // Save last order
            this.state.lastOrder = {
                orderId: result.orderId,
                orderData,
                timestamp: new Date(),
                total: this.getFinalTotal()
            };
            
            this.state.loading.order = false;
            this.clearCart();
            this.closeModal('checkout');
            this.notify();
            
            this.showToast('✅ Order placed successfully!', 'success');
            return result;
            
        } catch (error) {
            this.state.loading.order = false;
            this.notify();
            this.showToast('❌ ' + error.message, 'error');
            throw error;
        }
    }
    
    // ========== Seller Registration ==========
    async registerSeller(formData) {
        this.state.loading.checkout = true;
        this.notify();
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newSeller = {
                id: this.state.sellers.length + 1,
                name: formData.businessName,
                desc: formData.description,
                status: 'pending',
                verified: false,
                avatar: '🏪'
            };
            
            this.state.sellers.push(newSeller);
            this.state.loading.checkout = false;
            this.closeModal('seller');
            this.notify();
            
            this.showToast('✅ Application submitted! Admin will review within 24 hours.', 'success');
            return newSeller;
            
        } catch (error) {
            this.state.loading.checkout = false;
            this.notify();
            this.showToast('❌ Registration failed', 'error');
            throw error;
        }
    }
    
    // ========== Notifications ==========
    showToast(message, type = 'info') {
        const toast = {
            id: Date.now(),
            message,
            type,
            visible: true
        };
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            const el = document.querySelector(`[data-toast="${toast.id}"]`);
            if (el) el.remove();
        }, 4000);
        
        return toast;
    }
    
    // ========== Mobile Menu ==========
    toggleMobileMenu() {
        this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
        this.notify();
    }
    
    closeMobileMenu() {
        this.state.mobileMenuOpen = false;
        this.notify();
    }
}

// ============================================
// 2. INITIALIZE GLOBAL STORE
// ============================================
const store = new AppStore();

// ============================================
// 3. ALPINE.JS APP INITIALIZATION
// ============================================
function appData() {
    return {
        // Expose store state
        store: store.state,
        
        // Cart methods
        addToCart(productId) {
            store.addToCart(productId);
        },
        
        removeFromCart(productId) {
            store.removeFromCart(productId);
        },
        
        updateQuantity(productId, change) {
            store.updateQuantity(productId, change);
        },
        
        clearCart() {
            store.clearCart();
        },
        
        // Filter methods
        setCategory(category) {
            store.setFilter('category', category);
        },
        
        setSort(sortBy) {
            store.setFilter('sortBy', sortBy);
        },
        
        search(term) {
            store.setFilter('search', term);
        },
        
        // Modal methods
        openCart() {
            store.openModal('cart');
        },
        
        closeCart() {
            store.closeModal('cart');
        },
        
        openSellerModal() {
            store.openModal('seller');
        },
        
        closeSellerModal() {
            store.closeModal('seller');
        },
        
        openLoginModal() {
            store.openModal('login');
        },
        
        closeLoginModal() {
            store.closeModal('login');
        },
        
        openCheckoutModal() {
            store.openModal('checkout');
        },
        
        closeCheckoutModal() {
            store.closeModal('checkout');
        },
        
        // Calculations
        getCartTotal() {
            return store.getCartTotal();
        },
        
        getCartCount() {
            return store.getCartCount();
        },
        
        getShipping() {
            return store.getShipping();
        },
        
        getDiscount() {
            return store.getDiscount();
        },
        
        getFinalTotal() {
            return store.getFinalTotal();
        },
        
        getSeller(sellerId) {
            return store.getSeller(sellerId);
        },
        
        // Order methods
        async placeOrder(formData) {
            await store.placeOrder(formData);
        },
        
        // Auth methods
        login(email, password) {
            return store.login(email, password);
        },
        
        logout() {
            store.logout();
        },
        
        // Seller registration
        async registerSeller(formData) {
            await store.registerSeller(formData);
        },
        
        // Mobile menu
        toggleMobileMenu() {
            store.toggleMobileMenu();
        },
        
        closeMobileMenu() {
            store.closeMobileMenu();
        },
        
        // Scroll utilities
        scrollTo(elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        
        // Format currency
        formatPrice(price) {
            return '₹' + price.toLocaleString('en-IN');
        },
        
        // Format number
        formatNumber(num) {
            return num.toLocaleString('en-IN');
        },
        
        // Subscribe to store updates
        init() {
            store.subscribe((newState) => {
                this.$data.store = newState;
            });
        }
    };
}

// ============================================
// 4. DOCUMENT READY - Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Alpine if not already done
    if (window.Alpine && !window.appInitialized) {
        console.log('✅ EmproiumVipani App Initialized');
        console.log('🛒 Products:', store.state.products.length);
        console.log('👥 Sellers:', store.state.sellers.length);
        console.log('📧 EmailJS Configured:', !!window.EmailManager);
        window.appInitialized = true;
    }
});

// ============================================
// 5. SERVICE WORKER REGISTRATION (PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(err => console.log('⚠️ Service Worker error:', err));
    });
}

// ============================================
// 6. EXPORT FOR GLOBAL ACCESS
// ============================================
window.AppStore = AppStore;
window.store = store;
window.appData = appData;

console.log('🚀 App.js loaded successfully');
