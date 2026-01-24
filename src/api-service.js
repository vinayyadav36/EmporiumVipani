// ============================================
// FRONTEND API SERVICE
// ============================================

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

class APIService {
    constructor() {
        this.token = localStorage.getItem('emproium_token');
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('emproium_token', token);
    }

    getToken() {
        return localStorage.getItem('emproium_token');
    }

    clearToken() {
        localStorage.removeItem('emproium_token');
        this.token = null;
    }

    async request(method, endpoint, data = null) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...( this.getToken() && { 'Authorization': `Bearer ${this.getToken()}` })
            }
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, options);
            const result = await response.json();

            if (!response.ok) {
                const error = new Error(result.message || `HTTP ${response.status}`);
                error.status = response.status;
                error.data = result;
                throw error;
            }

            return result;
        } catch (error) {
            console.error(`❌ API Error [${method} ${endpoint}]:`, error);
            throw error;
        }
    }

    // ========== AUTH ENDPOINTS ==========
    async register(name, email, phone, password, passwordConfirm) {
        const result = await this.request('POST', '/auth/register', {
            name,
            email,
            phone,
            password,
            passwordConfirm
        });
        this.setToken(result.token);
        return result;
    }

    async login(email, password) {
        const result = await this.request('POST', '/auth/login', {
            email,
            password
        });
        this.setToken(result.token);
        return result;
    }

    logout() {
        this.clearToken();
    }

    async verifyToken() {
        return this.request('POST', '/auth/verify-token');
    }

    // ========== PRODUCTS ENDPOINTS ==========
    async getProducts(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request('GET', `/products?${params}`);
    }

    async getProduct(id) {
        return this.request('GET', `/products/${id}`);
    }

    async createProduct(productData) {
        return this.request('POST', '/products', productData);
    }

    async updateProduct(id, productData) {
        return this.request('PUT', `/products/${id}`, productData);
    }

    // ========== ORDERS ENDPOINTS ==========
    async createOrder(orderData) {
        return this.request('POST', '/orders', orderData);
    }

    async getOrders(status = null) {
        const endpoint = status ? `/orders?status=${status}` : '/orders';
        return this.request('GET', endpoint);
    }

    async getOrder(id) {
        return this.request('GET', `/orders/${id}`);
    }

    async cancelOrder(id) {
        return this.request('PUT', `/orders/${id}/cancel`);
    }

    // ========== SELLERS ENDPOINTS ==========
    async applySeller(sellerData) {
        return this.request('POST', '/sellers/apply', sellerData);
    }

    async getSellers(status = 'approved') {
        return this.request('GET', `/sellers?status=${status}`);
    }

    async getSeller(id) {
        return this.request('GET', `/sellers/${id}`);
    }

    async getSellerProducts(id) {
        return this.request('GET', `/sellers/${id}/products`);
    }

    // ========== USERS ENDPOINTS ==========
    async getProfile() {
        return this.request('GET', '/users/profile');
    }

    async updateProfile(profileData) {
        return this.request('PUT', '/users/profile', profileData);
    }

    async getWishlist() {
        return this.request('GET', '/users/wishlist');
    }

    async toggleWishlist(productId) {
        return this.request('POST', `/users/wishlist/${productId}`);
    }

    // ========== PAYMENTS ENDPOINTS ==========
    async createRazorpayOrder(orderId, amount) {
        return this.request('POST', '/payments/razorpay/create', {
            orderId,
            amount
        });
    }

    async verifyPayment(paymentData) {
        return this.request('POST', '/payments/razorpay/verify', paymentData);
    }

    // ========== ADMIN ENDPOINTS ==========
    async getAdminDashboard() {
        return this.request('GET', '/admin/dashboard');
    }

    async getPendingSellers() {
        return this.request('GET', '/admin/sellers/pending');
    }

    async approveSeller(id) {
        return this.request('PUT', `/admin/sellers/${id}/approve`);
    }

    async rejectSeller(id) {
        return this.request('PUT', `/admin/sellers/${id}/reject`);
    }
}

// Create global instance
window.api = new APIService();

console.log('✅ API Service initialized');
