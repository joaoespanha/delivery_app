const express = require('express');

const salesController = require('../controller/sales.controller');
const { validateTokenMiddle } = require('../middlewares/tokenValidation.middlewares');

const salesRoute = express.Router();

salesRoute.get('/customer/:id', validateTokenMiddle, salesController.findByUserId);
salesRoute.get('/seller/:id', validateTokenMiddle, salesController.findBySellerId);
salesRoute.get('/:id', validateTokenMiddle, salesController.getSaleById);
salesRoute.patch('/:id', validateTokenMiddle, salesController.updateStatus);
salesRoute.post('/', validateTokenMiddle, salesController.createSale);

module.exports = salesRoute;