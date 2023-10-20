const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


// Rute untuk registrasi pengguna
router.post('/register', userController.registerUser);

// Rute untuk login pengguna
router.post('/login', userController.loginUser);

module.exports = router;