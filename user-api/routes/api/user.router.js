const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user.controller');

// Imports Auth Middleware
const { authenticate } = require('../../middlewares/auth.middleware');

router.get('/all', authenticate, userController.getAllUsers);
router.post('/register', userController.register);

module.exports = router;