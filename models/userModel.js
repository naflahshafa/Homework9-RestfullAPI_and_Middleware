const pool = require('../config/dbconfig'); // Import koneksi database (dbconfig.js)


const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER,
        email VARCHAR(50) NOT NULL,
        gender VARCHAR(50),
        password VARCHAR(50) NOT NULL,
        role VARCHAR(50) 
    )
`;

pool.query(createUserTable, (err, res) => {
    if (err) {
        console.error(err);
    }
});

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const createUser = async (id, email, gender, password, role) => {
  const query = 'INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)';
  const values = [id, email, gender, password, role];

  try {
      await pool.query(query, values);
  } catch (error) {
      throw error;
  }
};

module.exports = {getUserByEmail, createUser};




// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   username: 'postgres',
//   password: 'postgres',
//   host: 'localhost',
//   database: 'movies_database',
// });

// const User = sequelize.define('users', {
//   id: {
//     type: DataTypes.INTEGER,
//     unique: true,
//     primaryKey: true,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: true,
//     },
//   },
//   gender: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// (async () => {
//   await sequelize.sync(); // Membuat tabel User jika belum ada
//   console.log('Tabel users telah dibuat atau sudah ada.');
// })();

// module.exports = User;



// // get
// const getAllUser = async () => {
//     try {
//         const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
//         return result.rows;
//     } catch (error) {
//         throw error;
//     }
// };

// const getUserById = async (id) => {
//     try {
//         const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//         return result.rows;
//     } catch (error) {
//         throw error;
//     }
// };

// // post
// const loginUser = async (email, password) => {
//     try {
//         const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };


// module.exports = {getAllUser, getUserById, loginUser};