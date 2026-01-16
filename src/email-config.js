// ============================================
// EMPORIUMVIPANI - GMAIL ORDERS (EmailJS)
// ============================================
// REPLACE THESE 3 VALUES FROM emailjs.com Dashboard
// ✅ UPDATED email-config.js - ENV-Ready (Static + Vercel/Vite)

const EMAILJS_CONFIG = {
    // ✅ AUTO from environment (Vercel/Vite) or fallback
    publicKey: import.meta.env?.EMAILJS_PUBLIC_KEY || 'D1SnQI53Ye-_MeDVo',
    
    serviceId: import.meta.env?.EMAILJS_SERVICE_ID || 'service_0rmbq15',
    
    templateId: import.meta.env?.EMAILJS_TEMPLATE_ID || 'template_n4rs1ms'
};

// ✅ Validate config (production safety)
function validateConfig() {
    const missing = [];
    if (!EMAILJS_CONFIG.publicKey) missing.push('EMAILJS_PUBLIC_KEY');
    if (!EMAILJS_CONFIG.serviceId) missing.push('EMAILJS_SERVICE_ID');
    if (!EMAILJS_CONFIG.templateId) missing.push('EMAILJS_TEMPLATE_ID');
    
    if (missing.length > 0) {
        console.warn('⚠️ Missing EmailJS config:', missing.join(', '));
        console.warn('📋 Add to Vercel Dashboard → Environment Variables');
        console.warn('🔧 Or set in .env.local');
    }
}

// EmailJS Initialize
validateConfig();
emailjs.init(EMAILJS_CONFIG.publicKey);


// ============================================
// ORDER SUBMISSION FUNCTION
// ============================================
async function submitOrderToGmail(orderData) {
    try {
        // Generate unique Order ID
        const orderId = 'ORD' + Date.now().toString().slice(-6);
        
        // Format for Gmail parsing
        const formattedData = {
            orderId: orderId,
            customerName: orderData.customerName || 'Guest',
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone,
            customerAddress: orderData.customerAddress || 'Not provided',
            items: orderData.items.join('\n'),
            subtotal: orderData.subtotal,
            shipping: orderData.shipping || '₹50',
            discount: orderData.discount || '₹0',
            total: orderData.total,
            paymentMethod: orderData.paymentMethod || 'COD',
            timestamp: new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }),
            notes: orderData.notes || ''
        };

        // Send to Gmail
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            formattedData
        );

        // Success
        console.log('✅ Order sent!', response.status, response.text);
        return {
            success: true,
            orderId: formattedData.orderId,
            messageId: response.messageId
        };

    } catch (error) {
        console.error('❌ EmailJS Error:', error);
        throw new Error(`Order failed: ${error.text || error.message}`);
    }
}

// ============================================
// GMAIL-READY ORDER TEMPLATE (Copy to EmailJS)
// ============================================
// EmailJS Dashboard → Email Templates → New Template → Paste this:

/*
Subject: 🆕 NEW ORDER #orderId - EmproiumVipani ₹total

👋 New Order Received!

📋 ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━
Order ID: #orderId
Date: #timestamp
Customer: #customerName
Phone: #customerPhone
Email: #customerEmail
Address: #customerAddress

🛒 ITEMS ORDERED:
#items

💰 PAYMENT BREAKDOWN:
Subtotal: ₹#subtotal
Shipping: ₹#shipping
Discount: -₹#discount
━━━━━━━━━━━━━
TOTAL: ₹#total (#paymentMethod)

📝 Notes: #notes

━━━━━━━━━━━━━━━━━━━━━
ACTION REQUIRED:
1. ✅ Confirm receipt (reply to customer)
2. 📦 Check inventory (Google Sheets)
3. 💳 Verify payment (if prepaid)
4. 🚚 Prepare shipment

Auto-CC: inventory@yourdomain.com
Team EmproiumVipani
support@emproiumvipani.com
*/

// ============================================
// HELPER FUNCTIONS
// ============================================
function generateOrderSummary(cart) {
    return cart.map(item => 
        `${item.name} (x${item.quantity}) ₹${item.price * item.quantity}`
    );
}

function calculateOrderTotals(cart, shipping = 50, discount = 0) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return {
        subtotal: subtotal,
        shipping: shipping,
        discount: discount,
        total: subtotal + shipping - discount
    };
}

// ============================================
// EXPORTS (For app.js)
// ============================================
window.EmailManager = {
    submitOrderToGmail,
    generateOrderSummary,
    calculateOrderTotals
};

// Error-free validation
console.log('✅ EmailJS Config Loaded');
console.log('📧 Service ID:', EMAILJS_CONFIG.serviceId ? 'SET' : '🚨 MISSING');
console.log('📧 Template ID:', EMAILJS_CONFIG.templateId ? 'SET' : '🚨 MISSING');
console.log('🔑 Public Key:', EMAILJS_CONFIG.publicKey ? 'SET' : '🚨 MISSING');
