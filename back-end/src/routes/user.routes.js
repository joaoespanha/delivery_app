const express = require('express');

const userController = require('../controller/user.controller');

const userRoute = express.Router();

userRoute.get('/', userController.findAll);

module.exports = userRoute;