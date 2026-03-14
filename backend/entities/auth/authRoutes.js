// Auth entity - routes
const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { verifyToken } = require('../../middleware/authMiddleware');

// public endpoints
router.post('/login', authController.login);
router.post('/register', authController.register); // new user signup

// protected
router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
