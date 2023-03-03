const salesService = require('../services/sales.services');

const findByUserId = async (req, res) => {
  const { userId } = req.params;

  const { message, status } = await salesService.findByUserId(+userId);
  return res.status(status).json(message);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } =req.body;

  const updatedSale = await salesService.updateStatus(id, status);

  return res.status(updatedSale.status).json(updatedSale.message);
}

module.exports = {
    findByUserId,
    updateStatus,
};