const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');

router.get('/movies/paginate/:page', movieController.getAllMovie);
router.get('/movies/show/:id', movieController.getMovieById);
router.post('/movies/add', movieController.addMovie);
router.delete('/movies/delete/:id', movieController.deleteMovie);
router.put('/movies/update/:year/:id', movieController.updateMovie);

module.exports = router;