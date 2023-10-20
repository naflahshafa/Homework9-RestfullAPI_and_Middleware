const userModel = require('../models/userModel');
// const bcryptHelper = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt');

const registerUser = async (req, res) => {
   const {id, email, gender, password, role} = req.body;

   try {
       const user = await userModel.getUserByEmailId(id, email);

       if (user) {
           return res.status(400).json({ error: 'ID or Email already exists' });
       }

    //    const hashedPassword = await bcryptHelper.hashPassword(password);
       const userRegister = await userModel.createUser(id, email, gender, password, role);

       res.status(201).json({ userRegister });
   } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
   }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userLogin = await userModel.loginUser(email, password);
        const token = generateToken(userLogin)
        res.status(200).json({userLogin, access_token: token});
    } catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {registerUser, loginUser};

