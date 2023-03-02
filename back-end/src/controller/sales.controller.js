const salesService = require('../services/sales.services');

const findByUserId = async (req, res) => {
  const { userId } = req.params;

  const { message, status } = await salesService.findByUserId(+userId);
  return res.status(status).json(message);
};

module.exports = {
    findByUserId,
};