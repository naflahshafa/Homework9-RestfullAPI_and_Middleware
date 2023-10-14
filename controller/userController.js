const User = require('../models/userModel');
const bcryptHelper = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
   const {id, email, gender, password, role} = req.body;

   try {
       const user = await User.getUserByEmail(email);

       if (user) {
           return res.status(400).json({ error: 'Username already exists' });
       }

       const hashedPassword = await bcryptHelper.hashPassword(password);
       await User.createUser(id, email, gender, hashedPassword, role);

       res.status(201).json({ message: 'User registered successfully' });
   } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
   }
};

const loginUser = async (req, res) => {
   // Di sini, pengguna sudah diotentikasi oleh middleware authenticateUser
   // Anda dapat mengakses pengguna yang diotentikasi melalui req.user
   const user = req.user;

   res.status(200).json({ message: 'Login successful', user });
};

module.exports = {registerUser, loginUser};



// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("../models/userModel");

// exports.register = (req, res) => {
//   const user = new User({
//     id: req.body.id,
//     email: req.body.email,
//     gender: req.body.gender,
//     password: bcrypt.hashSync(req.body.password, 8),
//     role: req.body.role,
//   });

//   user.save((err, user) => {
//     if (err) {
//       res.status(500)
//         .send({
//           message: err
//         });
//       return;
//     } else {
//       res.status(200)
//         .send({
//           message: "User Registered successfully"
//         })
//     }
//   });
// };

// exports.login = (req, res) => {
//   User.findOne({
//       email: req.body.email
//     })
//     .exec((err, user) => {
//       if (err) {
//         res.status(500)
//           .send({
//             message: err
//           });
//         return;
//       }
//       if (!user) {
//         return res.status(404)
//           .send({
//             message: "User Not found."
//           });
//       }

//       //comparing passwords
//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );
//       // checking if password was valid and send response accordingly
//       if (!passwordIsValid) {
//         return res.status(401)
//           .send({
//             accessToken: null,
//             message: "Invalid Password!"
//           });
//       }
//       //signing token with user id
//       var token = jwt.sign({
//         id: user.id
//       }, process.env.API_SECRET, {
//         expiresIn: 86400
//       });

//       //responding to client request with user profile success message and  access token .
//       res.status(200)
//         .send({
//           user: {
//             id: user._id,
//             email: user.email,
//           },
//           message: "Login successfull",
//           accessToken: token,
//         });
//     });
// };