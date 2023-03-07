const userService = require('../services/user.services');

const findAll = async (_req, res) => {
    const { status, message } = await userService.findAll();
    return res.status(status).json(message);
};

module.exports = {
  findAll,
};