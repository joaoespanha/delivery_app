const express = require('express');

const loginRouter = require('./login.routes');
const registerRouter = require('./register.routes');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);


module.exports = router;
