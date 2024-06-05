const jwt = require('jsonwebtoken');

// Import ENV variables
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;

const jwtTools = {};

// Create token
jwtTools.createToken = (email) => {
    return jwt.sign({ userId: email }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });
}

// Verify token
jwtTools.verifyToken = (token) => {
    try {
        return jwt.verify(token, TOKEN_SECRET);
    } catch {
        return false;
    }
}

module.exports = jwtTools;