const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure this path is correct
const authenticateToken = require('../middleware/authenticateToken');

// Get user profile
router.get('/user', authenticateToken, async (req, res) => { // Ensure the endpoint is /api/user
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ userName: user.userName, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
