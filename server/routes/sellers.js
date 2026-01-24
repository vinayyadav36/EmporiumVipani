const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// ============================================
// POST /api/sellers/apply
// ============================================
router.post('/apply', verifyToken, async (req, res) => {
    try {
        const { businessName, description, businessType, gstNumber, panNumber } = req.body;
        const userId = req.user.id;

        // Validation
        if (!businessName || !description) {
            return res.status(400).json({
                success: false,
                message: 'Business name and description are required'
            });
        }

        const user = await User.findById(userId);

        // Check if already a seller
        if (user.role === 'seller') {
            return res.status(400).json({
                success: false,
                message: 'You are already a seller'
            });
        }

        // Update user with seller info
        user.role = 'seller';
        user.seller = {
            businessName,
            description,
            businessType,
            gstNumber,
            panNumber,
            status: 'pending',
            verified: false
        };

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Seller application submitted successfully',
            data: user.toJSON()
        });
    } catch (error) {
        console.error('❌ Seller apply error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit application'
        });
    }
});

// ============================================
// GET /api/sellers
// ============================================
router.get('/', async (req, res) => {
    try {
        const { status = 'approved' } = req.query;

        const sellers = await User.find({
            role: 'seller',
            'seller.status': status
        }).select('name seller email phone');

        res.json({
            success: true,
            data: sellers
        });
    } catch (error) {
        console.error('❌ Get sellers error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sellers'
        });
    }
});

// ============================================
// GET /api/sellers/:id
// ============================================
router.get('/:id', async (req, res) => {
    try {
        const seller = await User.findById(req.params.id).select('name seller email phone');

        if (!seller || seller.role !== 'seller') {
            return res.status(404).json({
                success: false,
                message: 'Seller not found'
            });
        }

        res.json({
            success: true,
            data: seller
        });
    } catch (error) {
        console.error('❌ Get seller error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch seller'
        });
    }
});

// ============================================
// GET /api/sellers/:id/products
// ============================================
router.get('/:id/products', async (req, res) => {
    try {
        const Product = require('../models/Product');
        
        const products = await Product.find({
            sellerId: req.params.id,
            status: 'active'
        });

        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('❌ Get seller products error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch seller products'
        });
    }
});

module.exports = router;
