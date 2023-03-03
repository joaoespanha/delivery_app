const { Sale } = require('../database/models');

const findByUserId = async (userId) => {
    console.log('looooog', userId);
    const sales = await Sale.findAll({ where: { userId } });
    console.log('salessss', sales);
    if (sales.length <= 0) return { status: 404, message: 'sales not found' };
    return { status: 200, message: sales };
};

module.exports = { findByUserId };