const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/paginate/:page', authMiddleware.authentication, movieController.getAllMovies);
router.get('/:id', authMiddleware.authentication, movieController.getMovieById);
router.post('/', authMiddleware.authentication, movieController.addMovie);
router.delete('/:id', authMiddleware.authentication, movieController.deleteMovie);
router.put('/:id', authMiddleware.authentication, movieController.updateMovie);

module.exports = router;