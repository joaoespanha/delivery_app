const express = require('express');

const userController = require('../controller/user.controller');
const { validateTokenMiddle } = require('../middlewares/tokenValidation.middlewares');

const userRoute = express.Router();

userRoute.get('/', validateTokenMiddle, userController.findAll);
userRoute.get('/search', validateTokenMiddle, userController.getAllByRole);
userRoute.delete('/:id', validateTokenMiddle, userController.deleteUser);

module.exports = userRoute;