const express = require('express');

const userController = require('../controller/user.controller');
const { validateTokenMiddle } = require('../middlewares/tokenValidation.middlewares');

const userRoute = express.Router();

userRoute.get('/', validateTokenMiddle, userController.findAll);
userRoute.get('/search', validateTokenMiddle, userController.getAllByRole);

module.exports = userRoute;