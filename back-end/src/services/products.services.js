const { Product } = require('../database/models');

const getAll = async () => {
    const products = await Product.findAll();

    return { type: null, message: products, status: 200 };
};

module.exports = {
    getAll,
};