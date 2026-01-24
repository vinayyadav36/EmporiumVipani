const jwt = require('jsonwebtoken');

// ============================================
// Verify JWT Token
// ============================================
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.userId
        };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

// ============================================
// Verify Admin Role
// ============================================
const verifyAdmin = async (req, res, next) => {
    try {
        const User = require('../models/User');
        const user = await User.findById(req.user.id);

        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        req.user.role = 'admin';
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Authorization check failed'
        });
    }
};

// ============================================
// Verify Seller Role
// ============================================
const verifySeller = async (req, res, next) => {
    try {
        const User = require('../models/User');
        const user = await User.findById(req.user.id);

        if (user.role !== 'seller' || !user.seller.verified) {
            return res.status(403).json({
                success: false,
                message: 'Seller access required'
            });
        }

        req.user.role = 'seller';
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Authorization check failed'
        });
    }
};

module.exports = { verifyToken, verifyAdmin, verifySeller };
