const bcryptHelper = require('../helpers/bcrypt');
const User = require('../models/userModel');
const jwtHelper = require('../helpers/jwt');
const errorHandler = require('./errorHandling');

async function authenticateUser(req, res, next) {
    const {email, password} = req.body;

    try {
        const user = await User.getUserByEmail(email);

        if (!user) {
            throw new MyCustomError('Authentication failed');
        }

        const isPasswordValid = await bcryptHelper.comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new MyCustomError('Authentication failed');
        }

        // Jika otentikasi berhasil, hasilkan token JWT menggunakan jwtHelper
        const token = jwtHelper.generateToken({userId: user.id, email: user.email});

        // Menambahkan token ke respons
        res.status(200).json({message: 'Login successful', token});
    } catch (error) {
        next(error); // Mengirimkan kesalahan ke middleware penanganan kesalahan
    }
}

function checkAuthorization(role) {
    return (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            throw new MyCustomError('Access denied - Token is missing');
        }

        const decoded = jwtHelper.verifyToken(token);

        if (!decoded) {
            throw new MyCustomError('Access denied - Invalid token');
        }

        // Periksa peran pengguna dari data token
        if (decoded.role !== role) {
            throw new MyCustomError('Access denied - Unauthorized role');
        }

        next();
    };
}

module.exports = {authenticateUser, checkAuthorization};
