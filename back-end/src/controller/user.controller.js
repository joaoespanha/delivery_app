const userService = require('../services/user.services');

const getAllByRole = async (req, res) => {
  const roleToSearch = req.query.role;
  
  const { message, status } = await userService.getAllByRole(roleToSearch)
  return res.status(status).json(message);
};

module.exports = {
    getAllByRole,
};