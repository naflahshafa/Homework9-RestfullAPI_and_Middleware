const movieModel = require('../models/movieModel'); // Import model (movieModel.js)


const getAllMovie = async (request, response) => {
    const page = parseInt(request.params.page);
    try {
        const movies = await movieModel.getAllMovie(page);
        response.status(200).json(movies);
    } catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const getMovieById = async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const movie = await movieModel.getMovieById(id);
        response.status(200).json(movie);
    } catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const addMovie = async (request, response) => {
    const { id, title, genres, year } = request.body;

    try {
        const insertMovie = await movieModel.addMovie(id, title, genres, year);
        response.status(200).json(insertMovie);
    } catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteMovie = async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const delMovie = await movieModel.deleteMovie(id);
        response.status(200).json(delMovie);
    } catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateMovie = async (request, response) => {
    const year = parseInt(request.body.year);
    const id = parseInt(request.params.id);
    try {
        const changeMovie = await movieModel.updateMovie(year, id);
        response.status(200).json(changeMovie);
    } catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {getAllMovie, getMovieById, addMovie, deleteMovie, updateMovie};

