const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

// PUBLIC ROUTES
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

// PROTECTED ROUTES (đã được verify ở API Gateway)
router.get('/profile', authenticate, authController.getProfile);
router.post('/set-password', authenticate, authController.setPassword);

module.exports = router;
