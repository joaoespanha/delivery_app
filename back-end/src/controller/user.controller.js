const userService = require('../services/user.services');

const findAll = async (_req, res) => {
    const { status, message } = await userService.findAll();
    return res.status(status).json(message);
};
const getAllByRole = async (req, res) => {
  const roleToSearch = req.query.role;
  
  const { message, status } = await userService.getAllByRole(roleToSearch);
  return res.status(status).json(message);
};

module.exports = {
    getAllByRole,
    findAll,
};