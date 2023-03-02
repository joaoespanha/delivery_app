const express = require('express');

const loginRouter = require('./login.routes');
const registerRouter = require('./register.routes');
const productsRouter = require('./products.routes');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/products', productsRouter);

module.exports = router;
