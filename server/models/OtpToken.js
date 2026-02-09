const mongoose = require('mongoose');

const otpTokenSchema = new mongoose.Schema(
    {
        identifier: {
            type: String,
            required: true, // email or phone
            index: true
        },
        purpose: {
            type: String,
            enum: ['login', 'signup', 'reset-key'],
            default: 'login'
        },
        codeHash: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 } // auto-remove after expiry
        },
        attempts: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('OtpToken', otpTokenSchema);

