const salesService = require('../services/sales.services');

const findByUserId = async (req, res) => {
  const { id } = req.params;

  const { message, status } = await salesService.findByUserId(+id);
  return res.status(status).json(message);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedSale = await salesService.updateStatus(id, status);

  return res.status(updatedSale.status).json(updatedSale.message);
};

const createSale = async (req, res) => {
  const createdSale = await salesService.createSale(req.body);
  return res.status(createdSale.status).json(createdSale.message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sale = await salesService.getSaleById(Number(id));
  return res.status(sale.status).json(sale.message);
}

module.exports = {
    findByUserId,
    updateStatus,
    createSale,
    getSaleById,
};