// ============================================
// EmproiumVipani – app.js (complete state management)
// Alpine.js data store + business logic
// ============================================

function appData() {
  return {
    // ============================================
    // STATE
    // ============================================

    store: {
      // Products catalog
      products: [
        // Stationery
        {
          id: 1,
          name: "Leather Bound Notebook",
          description: "Premium leather cover, 200 pages, hand-stitched binding",
          price: 1299,
          image: "📓",
          category: "Stationery",
          sellerId: 1,
          rating: 4.8,
          inStock: true,
          sku: "STAT-001"
        },
        {
          id: 2,
          name: "Fountain Pen Set",
          description: "German-engineered, smooth ink flow, includes 3 refills",
          price: 2499,
          image: "✒️",
          category: "Stationery",
          sellerId: 2,
          rating: 4.9,
          inStock: true,
          sku: "STAT-002"
        },
        {
          id: 3,
          name: "Washi Tape Collection",
          description: "12 designs, Japanese-made, acid-free adhesive",
          price: 599,
          image: "🎀",
          category: "Stationery",
          sellerId: 3,
          rating: 4.7,
          inStock: true,
          sku: "STAT-003"
        },
        {
          id: 4,
          name: "Wooden Desk Organizer",
          description: "Bamboo, 5 compartments, eco-friendly finish",
          price: 1899,
          image: "📦",
          category: "Stationery",
          sellerId: 1,
          rating: 4.6,
          inStock: true,
          sku: "STAT-004"
        },
        {
          id: 5,
          name: "Minimalist Planner",
          description: "365 days, grid layout, vegan leather cover",
          price: 899,
          image: "📅",
          category: "Stationery",
          sellerId: 2,
          rating: 4.8,
          inStock: true,
          sku: "STAT-005"
        },
        {
          id: 6,
          name: "Ink Bottle Set",
          description: "6 premium colors, archival quality, glass bottles",
          price: 1599,
          image: "🖌️",
          category: "Stationery",
          sellerId: 3,
          rating: 4.9,
          inStock: true,
          sku: "STAT-006"
        },

        // Natural Products
        {
          id: 7,
          name: "Organic Turmeric Powder",
          description: "High-curcumin, cold-pressed, FSSAI certified",
          price: 449,
          image: "🌾",
          category: "Natural Products",
          sellerId: 4,
          rating: 4.7,
          inStock: true,
          sku: "NATU-001"
        },
        {
          id: 8,
          name: "Ashwagandha Root Powder",
          description: "Stress relief, 100% pure, lab-tested",
          price: 549,
          image: "🌿",
          category: "Natural Products",
          sellerId: 5,
          rating: 4.8,
          inStock: true,
          sku: "NATU-002"
        },
        {
          id: 9,
          name: "Honey & Bee Pollen Jar",
          description: "Raw, unfiltered, direct from farmers, 500g",
          price: 799,
          image: "🍯",
          category: "Natural Products",
          sellerId: 4,
          rating: 4.9,
          inStock: true,
          sku: "NATU-003"
        },
        {
          id: 10,
          name: "Dried Flower Mix",
          description: "Potpourri, lavender-rose-jasmine blend, aromatic",
          price: 349,
          image: "🌸",
          category: "Natural Products",
          sellerId: 5,
          rating: 4.6,
          inStock: true,
          sku: "NATU-004"
        },
        {
          id: 11,
          name: "Herbal Tea Sampler",
          description: "5 varieties, organic certified, loose leaf",
          price: 699,
          image: "🍵",
          category: "Natural Products",
          sellerId: 4,
          rating: 4.8,
          inStock: true,
          sku: "NATU-005"
        },
        {
          id: 12,
          name: "Cold-Pressed Sesame Oil",
          description: "South Indian, rich aroma, glass bottle, 500ml",
          price: 399,
          image: "🫒",
          category: "Natural Products",
          sellerId: 5,
          rating: 4.7,
          inStock: true,
          sku: "NATU-006"
        },

        // Worksheets & Learning
        {
          id: 13,
          name: "Math Workbook Series (Grade 5)",
          description: "120 pages, problem sets + solutions, spiral-bound",
          price: 349,
          image: "📐",
          category: "Worksheets",
          sellerId: 6,
          rating: 4.8,
          inStock: true,
          sku: "LEARN-001"
        },
        {
          id: 14,
          name: "English Grammar Journal",
          description: "Interactive exercises, vocabulary building, 200 pages",
          price: 399,
          image: "📝",
          category: "Worksheets",
          sellerId: 7,
          rating: 4.7,
          inStock: true,
          sku: "LEARN-002"
        },
        {
          id: 15,
          name: "Science Lab Notebook",
          description: "Experiment logs, hypothesis templates, 100 pages",
          price: 299,
          image: "🔬",
          category: "Worksheets",
          sellerId: 6,
          rating: 4.9,
          inStock: true,
          sku: "LEARN-003"
        },
        {
          id: 16,
          name: "Drawing & Sketching Guide",
          description: "Techniques for beginners, 80 pages, pencil illustrations",
          price: 449,
          image: "🎨",
          category: "Worksheets",
          sellerId: 7,
          rating: 4.6,
          inStock: true,
          sku: "LEARN-004"
        },
        {
          id: 17,
          name: "History Timeline Poster",
          description: "Large format, educational, laminated, includes markers",
          price: 599,
          image: "📜",
          category: "Worksheets",
          sellerId: 6,
          rating: 4.8,
          inStock: true,
          sku: "LEARN-005"
        },
        {
          id: 18,
          name: "Digital Literacy Workbook",
          description: "For ages 8-12, digital safety + basic coding, 150 pages",
          price: 499,
          image: "💻",
          category: "Worksheets",
          sellerId: 7,
          rating: 4.7,
          inStock: true,
          sku: "LEARN-006"
        }
      ],

      // Sellers
      sellers: [
        { id: 1, name: "Artisan Desks Co.", email: "hello@artisandesks.com", category: "Stationery" },
        { id: 2, name: "Premium Writing Tools", email: "sales@premiumtools.com", category: "Stationery" },
        { id: 3, name: "Craft & Paper Co.", email: "info@craftpaper.com", category: "Stationery" },
        { id: 4, name: "Organic Wellness Labs", email: "contact@organicwell.com", category: "Natural Products" },
        { id: 5, name: "Ayurveda & Spices", email: "support@ayurspice.com", category: "Natural Products" },
        { id: 6, name: "Educational Publishers", email: "learning@edupub.com", category: "Worksheets" },
        { id: 7, name: "Knowledge & Growth", email: "engage@knowledge.com", category: "Worksheets" }
      ],

      // Cart
      cart: [],

      // Filters & Search
      filters: {
        category: "all",
        search: "",
        sortBy: "relevance"
      },

      filteredProducts: [],

      // Modals
      modals: {
        cart: false,
        checkout: false,
        seller: false,
        success: false
      },

      // Form errors
      errors: {},

      // Shipping & pricing
      shippingRates: {
        standard: 100,
        express: 200,
        free: 0
      },

      // Promo codes
      promoCodes: {
        WELCOME10: 0.10,
        FIRST20: 0.20
      },

      appliedPromo: null,

      // Orders (for backend integration)
      orders: []
    },

    // ============================================
    // INITIALIZATION
    // ============================================

    async init() {
      console.log("✨ EmproiumVipani initialized");
      this.applyFilters();
      await this.loadOrdersFromBackend();
    },

    // ============================================
    // FILTER & SEARCH
    // ============================================

    applyFilters() {
      let results = [...this.store.products];

      // Category filter
      if (this.store.filters.category !== "all") {
        results = results.filter(p => p.category === this.store.filters.category);
      }

      // Search filter
      if (this.store.filters.search.trim()) {
        const query = this.store.filters.search.toLowerCase();
        results = results.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      }

      // Sorting
      switch (this.store.filters.sortBy) {
        case "price-low":
          results.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          results.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          results.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          results.sort((a, b) => b.id - a.id);
          break;
        case "relevance":
        default:
          // Default order from products array
          break;
      }

      this.store.filteredProducts = results;
    },

    setCategory(category) {
      this.store.filters.category = category;
      this.applyFilters();
    },

    setSort(sortBy) {
      this.store.filters.sortBy = sortBy;
      this.applyFilters();
    },

    search(query) {
      this.store.filters.search = query;
      this.applyFilters();
    },

    // ============================================
    // CART OPERATIONS
    // ============================================

    addToCart(productId) {
      const product = this.store.products.find(p => p.id === productId);
      if (!product) return;

      const existingItem = this.store.cart.find(item => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.store.cart.push({
          ...product,
          quantity: 1
        });
      }

      this.showToast("success", `${product.name} added to cart`);
      console.log("Cart updated:", this.store.cart);
    },

    removeFromCart(productId) {
      this.store.cart = this.store.cart.filter(item => item.id !== productId);
      this.showToast("info", "Item removed from cart");
    },

    updateQuantity(productId, delta) {
      const item = this.store.cart.find(p => p.id === productId);
      if (!item) return;

      item.quantity += delta;

      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
    },

    getCartCount() {
      return this.store.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    getCartTotal() {
      return this.store.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // ============================================
    // PRICING & DISCOUNTS
    // ============================================

    getShipping() {
      const total = this.getCartTotal();
      if (total > 5000) return this.store.shippingRates.free;
      if (total > 2000) return this.store.shippingRates.standard;
      return this.store.shippingRates.express;
    },

    getDiscount() {
      if (!this.store.appliedPromo) return 0;
      const rate = this.store.promoCodes[this.store.appliedPromo];
      return rate ? Math.round(this.getCartTotal() * rate) : 0;
    },

    applyPromoCode(code) {
      if (this.store.promoCodes[code]) {
        this.store.appliedPromo = code;
        this.showToast("success", `Promo code "${code}" applied!`);
      } else {
        this.showToast("error", "Invalid promo code");
        this.store.appliedPromo = null;
      }
    },

    getFinalTotal() {
      return this.getCartTotal() + this.getShipping() - this.getDiscount();
    },

    // ============================================
    // MODAL MANAGEMENT
    // ============================================

    openCart() {
      this.store.modals.cart = true;
    },

    closeCart() {
      this.store.modals.cart = false;
    },

    openCheckoutModal() {
      this.store.modals.checkout = true;
      this.clearErrors();
    },

    closeCheckoutModal() {
      this.store.modals.checkout = false;
      this.clearErrors();
    },

    openSellerModal() {
      this.store.modals.seller = true;
      this.clearErrors();
    },

    closeSellerModal() {
      this.store.modals.seller = false;
      this.clearErrors();
    },

    // ============================================
    // FORM VALIDATION
    // ============================================

    clearErrors() {
      this.store.errors = {};
    },

    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    validatePhone(phone) {
      const phoneRegex = /^[+]?[0-9\s\-()]+$/;
      return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },

    async handleCheckout() {
      this.clearErrors();
      const errors = {};

      // Get form values
      const name = this.$refs.checkoutName?.value?.trim();
      const email = this.$refs.checkoutEmail?.value?.trim();
      const phone = this.$refs.checkoutPhone?.value?.trim();
      const address = this.$refs.checkoutAddress?.value?.trim();
      const payment = this.$refs.checkoutPayment?.value;
      const notes = this.$refs.checkoutNotes?.value?.trim();

      // Validation
      if (!name || name.length < 3) {
        errors.name = "Full name is required (min 3 characters)";
      }

      if (!email || !this.validateEmail(email)) {
        errors.email = "Valid email is required";
      }

      if (!phone || !this.validatePhone(phone)) {
        errors.phone = "Valid phone number is required";
      }

      if (!address || address.length < 10) {
        errors.address = "Delivery address is required (min 10 characters)";
      }

      if (this.store.cart.length === 0) {
        errors.cart = "Cart is empty";
      }

      // Show errors if any
      if (Object.keys(errors).length > 0) {
        this.store.errors = errors;
        this.shakeFormFields();
        this.showToast("error", "Please fix the errors below");
        return;
      }

      // If validation passes, create order
      const order = {
        id: `ORD-${Date.now()}`,
        customer: {
          name,
          email,
          phone,
          address
        },
        items: this.store.cart.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totals: {
          subtotal: this.getCartTotal(),
          shipping: this.getShipping(),
          discount: this.getDiscount(),
          final: this.getFinalTotal()
        },
        payment,
        notes,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      // Send to backend
      try {
        await this.submitOrderToBackend(order);
        this.store.orders.push(order);
        this.store.cart = [];
        this.closeCheckoutModal();
        this.openSuccessModal();
        this.showToast("success", "Order placed successfully!");
        console.log("Order created:", order);
      } catch (error) {
        console.error("Checkout error:", error);
        this.showToast("error", "Failed to place order. Please try again.");
      }
    },

    async handleSellerApplication() {
      this.clearErrors();
      const errors = {};

      const name = this.$refs.sellerName?.value?.trim();
      const desc = this.$refs.sellerDesc?.value?.trim();
      const email = this.$refs.sellerEmail?.value?.trim();

      if (!name || name.length < 3) {
        errors.sellerName = "Business name is required";
      }

      if (!desc || desc.length < 20) {
        errors.sellerDesc = "Description must be at least 20 characters";
      }

      if (!email || !this.validateEmail(email)) {
        errors.sellerEmail = "Valid email is required";
      }

      if (Object.keys(errors).length > 0) {
        this.store.errors = errors;
        this.shakeFormFields();
        return;
      }

      const application = {
        id: `APP-${Date.now()}`,
        name,
        description: desc,
        email,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      try {
        await this.submitSellerApplicationToBackend(application);
        this.closeSellerModal();
        this.showToast("success", "Application submitted! We'll review it soon.");
        console.log("Seller application:", application);
        this.$refs.sellerName.value = "";
        this.$refs.sellerDesc.value = "";
        this.$refs.sellerEmail.value = "";
      } catch (error) {
        console.error("Seller application error:", error);
        this.showToast("error", "Failed to submit application. Please try again.");
      }
    },

    shakeFormFields() {
      document.querySelectorAll("input, textarea").forEach(field => {
        if (this.store.errors[field.id]) {
          field.classList.add("field-error-shake", "field-error");
          setTimeout(() => field.classList.remove("field-error-shake"), 160);
        }
      });
    },

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    formatPrice(amount) {
      return `₹${Math.round(amount).toLocaleString("en-IN")}`;
    },

    formatNumber(num) {
      return num.toLocaleString("en-IN");
    },

    getSeller(sellerId) {
      return this.store.sellers.find(s => s.id === sellerId);
    },

    scrollTo(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },

    showToast(type, message) {
      // Create toast element
      const toast = document.createElement("div");
      toast.className = `toast toast-${type} fixed bottom-4 right-4 z-[999]`;
      toast.textContent = message;
      document.body.appendChild(toast);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 300ms ease";
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    },

    openSuccessModal() {
      this.store.modals.success = true;
      setTimeout(() => {
        this.store.modals.success = false;
      }, 4000);
    },

    // ============================================
    // BACKEND INTEGRATION
    // ============================================

    async submitOrderToBackend(order) {
      try {
        const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(order)
        });

        if (!response.ok) {
          throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Order response from backend:", data);
        return data;
      } catch (error) {
        console.warn("Backend unavailable, storing locally:", error.message);
        // Fallback: store locally if backend is down
        localStorage.setItem("order_" + order.id, JSON.stringify(order));
        return order;
      }
    },

    async submitSellerApplicationToBackend(application) {
      try {
        const response = await fetch("http://localhost:5000/api/seller-applications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(application)
        });

        if (!response.ok) {
          throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Seller application response:", data);
        return data;
      } catch (error) {
        console.warn("Backend unavailable, storing locally:", error.message);
        localStorage.setItem("seller_app_" + application.id, JSON.stringify(application));
        return application;
      }
    },

    async loadOrdersFromBackend() {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (response.ok) {
          const orders = await response.json();
          this.store.orders = orders;
          console.log("Orders loaded from backend:", orders);
        }
      } catch (error) {
        console.warn("Could not load orders from backend:", error.message);
        // Load from localStorage as fallback
        this.loadOrdersFromLocalStorage();
      }
    },

    loadOrdersFromLocalStorage() {
      const orders = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("order_")) {
          orders.push(JSON.parse(localStorage.getItem(key)));
        }
      }
      this.store.orders = orders;
      console.log("Orders loaded from localStorage:", orders);
    }
  };
}