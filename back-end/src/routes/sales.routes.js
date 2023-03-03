const express = require('express');

const salesController = require('../controller/sales.controller');
const { validateTokenMiddle } = require('../middlewares/tokenValidation.middlewares');

const salesRoute = express.Router();

salesRoute.get('/:userId', validateTokenMiddle, salesController.findByUserId);

module.exports = salesRoute;