// ============================================
// FORM HANDLERS & EVENT LISTENERS
// ============================================

// Global form handlers for Alpine.js

window.handleCheckout = async function() {
    try {
        LoadingOverlay.show('Processing your order...');

        // Get form values
        const formData = {
            name: this.$refs.checkoutName?.value,
            email: this.$refs.checkoutEmail?.value,
            phone: this.$refs.checkoutPhone?.value,
            address: this.$refs.checkoutAddress?.value,
            paymentMethod: this.$refs.checkoutPayment?.value,
            notes: this.$refs.checkoutNotes?.value
        };

        // Validate
        const errors = UIComponents.FormValidator.validateOrderForm(formData);
        if (Object.keys(errors).length > 0) {
            LoadingOverlay.hide();
            Toast.show('Please fill all required fields correctly', 'error');
            return;
        }

        // Create order items
        const orderItems = store.state.cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        // Create order via API
        const orderResult = await api.createOrder({
            items: orderItems,
            deliveryAddress: {
                street: formData.address.split(',')[0],
                city: formData.address.split(',')[1] || '',
                state: formData.address.split(',')[2] || '',
                postalCode: formData.address.split(',')[3] || ''
            },
            payment: {
                method: formData.paymentMethod
            },
            notes: formData.notes
        });

        // Handle payment
        if (formData.paymentMethod !== 'COD') {
            // Redirect to Razorpay
            await handleRazorpayPayment(orderResult.data, formData);
        } else {
            // Direct order confirmation for COD
            LoadingOverlay.hide();
            Toast.show('✅ Order placed successfully!', 'success');
            store.clearCart();
            this.closeCheckoutModal();
            
            // Show order confirmation
            setTimeout(() => {
                showOrderConfirmation(orderResult.data);
            }, 1000);
        }

    } catch (error) {
        LoadingOverlay.hide();
        console.error('❌ Checkout error:', error);
        Toast.show(error.message || 'Checkout failed', 'error');
    }
};

window.handleSellerApplication = async function() {
    try {
        LoadingOverlay.show('Submitting your application...');

        const formData = {
            businessName: this.$refs.sellerName?.value,
            description: this.$refs.sellerDesc?.value,
            email: this.$refs.sellerEmail?.value,
            businessType: 'retail'
        };

        // Validation
        if (!formData.businessName || !formData.description || !formData.email) {
            LoadingOverlay.hide();
            Toast.show('Please fill all required fields', 'error');
            return;
        }

        // Submit application
        const result = await api.applySeller(formData);

        LoadingOverlay.hide();
        Toast.show('✅ Application submitted successfully! We will review within 24 hours.', 'success');
        
        this.closeSellerModal();
        
        // Reset form
        this.$refs.sellerName.value = '';
        this.$refs.sellerDesc.value = '';
        this.$refs.sellerEmail.value = '';

    } catch (error) {
        LoadingOverlay.hide();
        console.error('❌ Seller application error:', error);
        Toast.show(error.message || 'Application submission failed', 'error');
    }
};

window.handleRazorpayPayment = async function(order, formData) {
    try {
        // Create Razorpay order
        const razorpayOrder = await api.createRazorpayOrder(order.orderId, order.total);

        // Razorpay options
        const options = {
            key: import.meta.env?.VITE_RAZORPAY_KEY_ID,
            amount: order.total * 100,
            currency: 'INR',
            name: 'EmproiumVipani',
            description: `Order #${order.orderId}`,
            order_id: razorpayOrder.data.id,
            handler: async function(response) {
                try {
                    // Verify payment
                    const verifyResult = await api.verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        orderId: order._id
                    });

                    LoadingOverlay.hide();
                    Toast.show('✅ Payment successful! Order confirmed.', 'success');
                    store.clearCart();
                    window.closeCheckoutModal?.();
                    
                    setTimeout(() => {
                        showOrderConfirmation(verifyResult.data);
                    }, 1000);

                } catch (error) {
                    LoadingOverlay.hide();
                    Toast.show('Payment verification failed: ' + error.message, 'error');
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: '#16a34a'
            }
        };

        const razorpayWindow = new window.Razorpay(options);
        razorpayWindow.open();

    } catch (error) {
        LoadingOverlay.hide();
        console.error('❌ Razorpay error:', error);
        Toast.show('Payment initialization failed', 'error');
    }
};

window.showOrderConfirmation = function(order) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.72)] backdrop-blur-[10px] px-4';
    modal.innerHTML = `
        <div class="modal-panel w-full max-w-md">
            <div class="p-6 text-center space-y-4">
                <div class="text-4xl">✅</div>
                <div>
                    <h3 class="font-semibold text-lg text-slate-50">Order Confirmed!</h3>
                    <p class="text-xs text-slate-400 mt-1">Order ID: <span class="font-mono text-emeraldCore">#${order.orderId}</span></p>
                </div>
                <div class="bg-black/50 rounded-lg p-3 text-[11px] text-slate-300 space-y-1 text-left">
                    <div class="flex justify-between">
                        <span>Order Amount</span>
                        <span class="font-semibold">₹${order.total.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Estimated Delivery</span>
                        <span class="font-semibold">5-7 Business Days</span>
                    </div>
                </div>
                <p class="text-[11px] text-slate-400">
                    A confirmation email has been sent to ${order.customerEmail}
                </p>
                <button onclick="this.closest('.fixed').remove()" class="btn btn-primary w-full">
                    Continue shopping
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.handleLogin = async function() {
    try {
        const email = this.$refs.loginEmail?.value;
        const password = this.$refs.loginPassword?.value;

        if (!email || !password) {
            Toast.show('Email and password are required', 'error');
            return;
        }

        LoadingOverlay.show('Logging in...');

        const result = await api.login(email, password);

        LoadingOverlay.hide();
        Toast.show('✅ Logged in successfully!', 'success');
        
        store.setState({
            user: result.user,
            isLoggedIn: true
        });

        this.closeLoginModal?.();

    } catch (error) {
        LoadingOverlay.hide();
        console.error('❌ Login error:', error);
        Toast.show(error.message || 'Login failed', 'error');
    }
};

console.log('✅ Form handlers loaded');
