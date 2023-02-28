const express = require('express');

const loginRouter = require('./login.router');
// const registerRouter = require('./register.router');

const router = express.Router();

router.use('/login', loginRouter);
// router.use('/register', registerRouter);

module.exports = router;