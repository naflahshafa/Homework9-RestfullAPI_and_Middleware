const express = require('express');
const router = express.Router();
const authController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');


// Rute untuk registrasi pengguna
router.post('/user/register', authMiddleware.authenticateUser, authMiddleware.checkAuthorization, authController.registerUser);

// Rute untuk login pengguna
router.post('/user/login', authMiddleware.authenticateUser, authMiddleware.checkAuthorization, authController.loginUser);

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const userController = require('../controller/userController');

// router.post('/user/register', userController.registerUser);
// router.post('/user/login', userController.loginUser);

// module.exports = router;


// const express = require("express"),
//   router = express.Router(),
//   verifyToken = require('../middleware/authJWT'),
//   {
//     register,
//     login
//   } = require("../controller/authController.js");

// router.post("/register", register, function (req, res) {

// });

// router.post("/login", login, function (req, res) {

// });

// router.get("/hiddencontent", verifyToken, function (req, res) {
//   if (!user) {
//     res.status(403)
//       .send({
//         message: "Invalid JWT token"
//       });
//   }
//   if (req.user == "admin") {
//     res.status(200)
//       .send({
//         message: "Congratulations! but there is no hidden content"
//       });
//   } else {
//     res.status(403)
//       .send({
//         message: "Unauthorised access"
//       });
//   }
// });

// module.exports = router;