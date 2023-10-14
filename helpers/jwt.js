const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return jwt.sign(payload, 'rahasianih', { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, 'rahasianih');
    } catch (error) {
        return null;
    }
}

module.exports = {generateToken, verifyToken};
