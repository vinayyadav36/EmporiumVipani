const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// ============================================
// GET /api/users/profile
// ============================================
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.json({
            success: true,
            data: user.toJSON()
        });
    } catch (error) {
        console.error('❌ Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile'
        });
    }
});

// ============================================
// PUT /api/users/profile
// ============================================
router.put('/profile', verifyToken, async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone, address },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: user.toJSON()
        });
    } catch (error) {
        console.error('❌ Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile'
        });
    }
});

// ============================================
// GET /api/users/wishlist
// ============================================
router.get('/wishlist', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');

        res.json({
            success: true,
            data: user.wishlist
        });
    } catch (error) {
        console.error('❌ Get wishlist error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wishlist'
        });
    }
});

// ============================================
// POST /api/users/wishlist/:productId
// ============================================
router.post('/wishlist/:productId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user.wishlist.includes(req.params.productId)) {
            // Remove from wishlist
            user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
        } else {
            // Add to wishlist
            user.wishlist.push(req.params.productId);
        }

        await user.save();

        res.json({
            success: true,
            message: 'Wishlist updated',
            data: user.wishlist
        });
    } catch (error) {
        console.error('❌ Wishlist error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update wishlist'
        });
    }
});

module.exports = router;
