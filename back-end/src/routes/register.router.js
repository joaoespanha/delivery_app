const express = require('express');

const registerController = require('../controllers/loginController');

const registerRoute = express.Router();

loginRoute.post('/', registerRoute.register);

module.exports = registerRoute;