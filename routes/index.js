const express = require('express');
const router = express.Router();
const movieRouter = require('./movieRouter');
const userRouter = require('./userRouter');

router.use('/api_open', movieRouter);
router.use('/api_open', userRouter);

module.exports = router;