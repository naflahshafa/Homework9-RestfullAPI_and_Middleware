const pool = require('../config/dbconfig'); // Import koneksi database (dbconfig.js)


const getUserByEmailId = async (id, email) => {
    const query = 'SELECT * FROM users WHERE id = $1 OR email = $2';
    const values = [id, email];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const createUser = async (id, email, gender, password, role) => {
    try {
        // Mengecek apakah id atau email user sudah terdaftar atau ada dalam database
        const checkResult = await pool.query('SELECT * FROM users WHERE id = $1 OR email = $2', [id, email]);

        if (checkResult.rowCount > 0) {
            return { success: false, message: 'User with the same ID or email already exists!' };
        }

        // Jika id atau email belum ada, lakukan penambahan data baru (registerasi)
        const insertResult = await pool.query(
            'INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)',
            [id, email, gender, password, role]
        );
        const newUser = insertResult.rows[0];

        if (insertResult.rowCount > 0) {
            return { success: true, user: newUser, message: 'User is registered successfully!' };
        } else {
            return { success: false, message: 'Failed to register!' };
        }
    } catch (error) {
        throw error;
    };
};

const loginUser = async (email, password) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        const user = result.rows[0];
        console.log('User:', user);

        if (user) {
            return { success: true, user: user, message: 'User successfully login!' };
        } else {
            return { success: false, message: 'Failed to login!' };
        }
    } catch (error) {
        throw error;
    };
};

module.exports = {getUserByEmailId, createUser, loginUser};
