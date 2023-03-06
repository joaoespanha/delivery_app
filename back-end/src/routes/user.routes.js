const express = require('express');

const { validateTokenMiddle } = require('../middlewares/tokenValidation.middlewares');

const router = express.Router();

const userController = require('../controller/user.controller');

router.get('/search', validateTokenMiddle, userController.getAllByRole);

module.exports = router;
