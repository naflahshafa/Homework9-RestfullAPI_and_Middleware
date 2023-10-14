function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Tangani kesalahan-kesalahan tertentu
    if (err instanceof MyCustomError) {
        res.status(400).json({ error: err.message });
    } else {
        // Tangani kesalahan internal server (500)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = errorHandler;
