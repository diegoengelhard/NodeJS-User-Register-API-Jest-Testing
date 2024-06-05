// Import User model
const User = require('../models/user.model');

// Import jwt tools
const { verifyToken } = require('../utils/jwtTools');

const authMiddleware = {};

authMiddleware.authenticate = async (req, res, next) => {
    try {
        // Obtain token from request header
        const authHeader = req.header('Authorization');

        // Check if authHeader exists and starts with 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).send({ message: "Access denied" });

        // Extract the token from the authHeader
        const token = authHeader.slice(7); // Remove 'Bearer ' from the token

        // Check if token exists
        if (!token) return res.status(401).send({ message: "Access denied, missing token" });

        // Verify token
        const verified = verifyToken(token);

        // If token is invalid, send error response
        if (!verified) return res.status(401).send({ message: "Invalid token" });

        console.log(verified);

        // Obtain user from token
        const user = await User.findOne({ where: { email: verified.userId } });

        // If user does not exist, send error response
        if (!user) return res.status(401).send({ message: "User does not exist" });

        // Add user to request object
        req.user = user;

        // Move to next middleware
        next();
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = authMiddleware;