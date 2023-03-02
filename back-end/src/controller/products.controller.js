const productsService = require('../services/products.services');

const getAll = async (_req, res) => {
    try {
    const { message, status } = await productsService.getAll();
        return res.status(status).json(message);
    } catch (e) {
    return res.status(404).json('database error');
    }
};

module.exports = {
    getAll,
};