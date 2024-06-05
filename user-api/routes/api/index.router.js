const express = require('express');
const router = express.Router();

// Import all routers
const userRouter = require('./user.router');

// Define all routes
router.use('/user', userRouter);

module.exports = router;