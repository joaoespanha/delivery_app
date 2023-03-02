const express = require('express');

const router = express.Router();

const productsController = require('../controller/products.controller');
const { validateTokenMiddle } = require('../middlewares/tokenValidation.middlewares');

router.get('/', validateTokenMiddle, productsController.getAll);

module.exports = router;
