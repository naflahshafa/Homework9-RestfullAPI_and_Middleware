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

// router.get('/', auth, function (req, res) {
//     pool.query(
//       `SELECT * FROM movies ${
//         req.query.limit ? 'LIMIT ' + req.query.limit : ''
//       } `,
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         res.json(results.rows);
//       }
//     );
//   });
  
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


//   router.post('/', function (req, res) {
//     //   console.log(req.body);
//     pool.query(
//       `INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3);`,
//       [req.body.title, req.body.genres, req.body.year],
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         res.status(201).json({
//           status: 'success',
//         });
//       }
//     );
//   });

// delete
const deleteMovie = async (id) => {
    try {
        await pool.query(
            'DELETE FROM movies WHERE id = $1', [id]);
    } catch (error) {
        throw error;
    }
};

//   router.delete('/:id', function (req, res) {
//     //   console.log(req.body);
//     pool.query(
//       `DELETE FROM movies WHERE id = ${req.params.id}`,
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         res.status(201).json({
//           status: 'success',
//         });
//       }
//     );
//   });

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
  
//   router.put('/:id', function (req, res) {
//     //   console.log(req.body);
//     pool.query(
//       `UPDATE movies SET year = "${req.body.year}" WHERE id = ${req.params.id}`,
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         res.status(201).json({
//           status: 'success',
//         });
//       }
//     );
//   });
  

module.exports = {getAllMovie, getMovieById, addMovie, deleteMovie, updateMovie};
