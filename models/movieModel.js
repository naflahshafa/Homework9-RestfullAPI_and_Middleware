const pool = require('../config/dbconfig.js'); // Import koneksi database (dbconfig.js)

// get
const getAllMovie = async (page) => {
    try {
        const itemsPerPage = 10;
        const offset = (page - 1) * itemsPerPage;
        
        const result = await pool.query('SELECT * FROM movies ORDER BY id OFFSET $1 LIMIT $2', [offset, itemsPerPage]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};


const getMovieById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};
  
// post
const addMovie = async (id, title, genres, year) => {
    try {
        const result = await pool.query(
            'INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)',
            [id, title, genres, year]
        );

        if (result.rowCount > 0) {
            return { success: true, message: 'Movie added successfully' };
        } else {
            return { success: false, message: 'Failed to add movie' };
        }
    } catch (error) {
        throw error;
    }
};

// delete
const deleteMovie = async (id) => {
    try {
        await pool.query(
            'DELETE FROM movies WHERE id = $1', [id]);
    } catch (error) {
        throw error;
    }
};

// put
const updateMovie = async (year, id) => {
    try {
        const result = await pool.query(
            'UPDATE movies SET year = $1 WHERE id = $2', [year, id]);
        return result;
    } catch (error) {
        throw error;
    }
};
  

module.exports = {getAllMovie, getMovieById, addMovie, deleteMovie, updateMovie};
