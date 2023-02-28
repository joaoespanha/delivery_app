const express = require('express');

const router = express.Router();

const loginController = require('../controller/login.controller');
const { validateTokenMiddle } = require('../middlewares/tokenValidation.middlewares');

router.post('/', validateTokenMiddle, loginController.login);

module.exports = router;
