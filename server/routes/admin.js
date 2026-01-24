const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// ============================================
// GET /api/admin/dashboard
// ============================================
router.get('/dashboard', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);

        res.json({
            success: true,
            data: {
                users: totalUsers,
                products: totalProducts,
                orders: totalOrders,
                revenue: totalRevenue[0]?.total || 0
            }
        });
    } catch (error) {
        console.error('❌ Dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard data'
        });
    }
});

// ============================================
// GET /api/admin/sellers/pending
// ============================================
router.get('/sellers/pending', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const sellers = await User.find({
            role: 'seller',
            'seller.status': 'pending'
        });

        res.json({
            success: true,
            data: sellers
        });
    } catch (error) {
        console.error('❌ Get pending sellers error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sellers'
        });
    }
});

// ============================================
// PUT /api/admin/sellers/:id/approve
// ============================================
router.put('/sellers/:id/approve', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                'seller.status': 'approved',
                'seller.verified': true
            },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Seller approved successfully',
            data: user
        });
    } catch (error) {
        console.error('❌ Approve seller error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to approve seller'
        });
    }
});

// ============================================
// PUT /api/admin/sellers/:id/reject
// ============================================
router.put('/sellers/:id/reject', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { 'seller.status': 'rejected' },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Seller rejected',
            data: user
        });
    } catch (error) {
        console.error('❌ Reject seller error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reject seller'
        });
    }
});

module.exports = router;
