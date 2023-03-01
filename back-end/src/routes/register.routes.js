const express = require('express');

const registerController = require('../controller/register.controller');

const registerRoute = express.Router();

registerRoute.post('/', registerController.register);

module.exports = registerRoute;