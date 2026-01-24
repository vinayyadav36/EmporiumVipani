// ============================================
// Validation Utilities
// ============================================

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // At least 6 characters
    return password && password.length >= 6;
};

const validatePhone = (phone) => {
    const phoneRegex = /^[0-9+\-\s]{7,15}$/;
    return phoneRegex.test(phone);
};

const validateGSTNumber = (gst) => {
    // Indian GST format: 15 alphanumeric characters
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
};

const validatePANNumber = (pan) => {
    // Indian PAN format: 10 alphanumeric characters
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
};

module.exports = {
    validateEmail,
    validatePassword,
    validatePhone,
    validateGSTNumber,
    validatePANNumber
};
