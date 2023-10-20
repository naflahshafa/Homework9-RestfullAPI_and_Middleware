// const {DB_USER, HOST, NAME, PASSWORD, PORT} = process.env;
// const {Pool} = require('pg');
// const pool = new Pool({
//     user: DB_USER,
//     host: HOST,
//     database: NAME,
//     password: PASSWORD,
//     port: PORT,
// });


const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movies_database',
    password: 'postgres',
    port: 5432,
});

module.exports = pool;