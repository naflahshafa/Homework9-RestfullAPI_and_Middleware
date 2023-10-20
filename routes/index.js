const express = require('express');
const router = express.Router();
const movieRouter = require('./movieRouter');
const userRouter = require('./userRouter');

router.use('/api-v2/movies', movieRouter);
router.use('/api-v2/users', userRouter);

module.exports = router;