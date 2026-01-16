// ============================================
// EmproiumVipani – email-config.js
// Email service configuration (NO secrets here)
// All API keys are handled by backend from .env
// ============================================

/**
 * EMAIL SERVICE CONFIGURATION
 * Frontend only defines endpoints and helper functions
 * Backend handles all EmailJS/Nodemailer with .env keys
 */

const EmailConfig = {
  // Backend API base URL
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',

  // Email service endpoints (backend handles auth internally)
  endpoints: {
    sendOrderConfirmation: '/emails/send-order-confirmation',
    sendSellerNotification: '/emails/send-seller-notification',
    sendAdminNotification: '/emails/send-admin-notification',
    sendOrderShipped: '/emails/send-order-shipped',
    sendWelcomeEmail: '/emails/send-welcome',
    subscribeNewsletter: '/emails/subscribe-newsletter',
    submitContactForm: '/emails/contact'
  },

  /**
   * SEND ORDER CONFIRMATION EMAIL
   * Called after successful order placement
   */
  async sendOrderConfirmation(order, customerEmail) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${this.endpoints.sendOrderConfirmation}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: order.id,
            customerName: order.customer.name,
            customerEmail: customerEmail,
            customerPhone: order.customer.phone,
            deliveryAddress: order.customer.address,
            items: order.items,
            totals: order.totals,
            paymentMethod: order.payment,
            orderNotes: order.notes,
            createdAt: order.createdAt
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✉️ Order confirmation email sent:', result);
      Toast.success('Confirmation email sent!');
      return true;
    } catch (error) {
      console.error('Failed to send order confirmation:', error);
      Toast.error('Could not send confirmation email');
      return false;
    }
  },

  /**
   * SEND SELLER APPLICATION CONFIRMATION
   */
  async sendSellerApplicationConfirmation(application, sellerEmail) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${this.endpoints.sendSellerNotification}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            applicationId: application.id,
            businessName: application.name,
            businessDescription: application.description,
            sellerEmail: sellerEmail,
            submissionDate: application.createdAt
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✉️ Seller application confirmation sent:', result);
      Toast.success('Application confirmation sent!');
      return true;
    } catch (error) {
      console.error('Failed to send seller application email:', error);
      Toast.error('Could not send confirmation email');
      return false;
    }
  },

  /**
   * NOTIFY ADMIN OF NEW ORDER
   */
  async notifyAdminNewOrder(order) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${this.endpoints.sendAdminNotification}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            notificationType: 'new_order',
            orderId: order.id,
            customerName: order.customer.name,
            customerEmail: order.customer.email,
            customerPhone: order.customer.phone,
            deliveryAddress: order.customer.address,
            itemsCount: order.items.length,
            items: order.items,
            totalAmount: order.totals.final,
            paymentMethod: order.payment,
            orderNotes: order.notes,
            createdAt: order.createdAt
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const result = await response.json();
      console.log('📧 Admin notification sent:', result);
      return true;
    } catch (error) {
      console.error('Failed to notify admin:', error);
      return false;
    }
  },

  /**
   * SEND WELCOME EMAIL (New customer)
   */
  async sendWelcomeEmail(customerEmail, customerName) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${this.endpoints.sendWelcomeEmail}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            customerEmail,
            customerName,
            welcomeDiscount: 'WELCOME10',
            discountPercentage: '10%'
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✉️ Welcome email sent:', result);
      return true;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return false;
    }
  },

  /**
   * SEND ORDER SHIPPED NOTIFICATION
   */
  async sendOrderShippedEmail(order, trackingData) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${this.endpoints.sendOrderShipped}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: order.id,
            customerEmail: order.customer.email,
            customerName: order.customer.name,
            trackingNumber: trackingData.trackingNumber,
            courierName: trackingData.courierName,
            courierLink: trackingData.courierLink,
            estimatedDelivery: trackingData.estimatedDelivery
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✉️ Order shipped email sent:', result);
      return true;
    } catch (error) {
      console.error('Failed to send shipped notification:', error);
      return false;
    }
  },

  /**
   * SUBSCRIBE TO NEWSLETTER
   */
  async subscribeToNewsletter(email) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${this.endpoints.subscribeNewsletter}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, subscribedAt: new Date().toISOString() })
        }
      );

      if (response.ok) {
        Toast.success('Subscribed to newsletter!');
        return true;
      } else {
        Toast.error('Subscription failed');
        return false;
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      Toast.error('Could not subscribe');
      return false;
    }
  },

  /**
   * CONTACT FORM SUBMISSION
   */
  async submitContactForm(formData) {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}${this.endpoints.submitContactForm}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            submittedAt: new Date().toISOString()
          })
        }
      );

      if (response.ok) {
        Toast.success('Message sent! We\'ll get back to you soon.');
        return true;
      } else {
        Toast.error('Failed to send message');
        return false;
      }
    } catch (error) {
      console.error('Contact form error:', error);
      Toast.error('Could not send message');
      return false;
    }
  }
};

// Export for use in other files
window.EmailConfig = EmailConfig;

console.log('✉️ EmailConfig initialized (backend handles all secrets)');
