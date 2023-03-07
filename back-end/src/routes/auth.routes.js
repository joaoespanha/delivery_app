const express = require('express');

const router = express.Router();

const authController = require('../controller/auth.controller');
const { validateTokenMiddle } = require('../middlewares/tokenValidation.middlewares');

router.get('/', validateTokenMiddle, authController.checkIfLogged);

module.exports = router;
