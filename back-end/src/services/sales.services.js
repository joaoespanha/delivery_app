const { Sale, SalesProducts, Product, User } = require('../database/models');

const SALE_NOT_FOUND = 'sale not found';

const findByUserId = async (userId) => {
    const sales = await Sale.findAll({ where: { userId } });
    if (sales.length <= 0) return { status: 404, message: SALE_NOT_FOUND };
    return { status: 200, message: sales };
};

const findBySaleId = async (id) => {
    const sale = await Sale.findOne({ where: { id } });
    if (!sale) return { status: 404, message: SALE_NOT_FOUND };

    return { status: 200, message: sale };
};
const updateStatus = async (id, status) => {
    const doesSaleExists = await findBySaleId(id);
    
    if (doesSaleExists.status === 200) {
        const updatedSale = await Sale.update({ status }, { where: { id } });
        return { status: 204, message: updatedSale };
    }
    return { status: doesSaleExists.status, message: doesSaleExists.message };
};

const createSale = async ({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
    products,
  }) => {
      const newSale = await Sale.create(
        { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status },
      );
      await Promise.all(products.map(async (product) => SalesProducts.create(
          { productId: product.id, saleId: newSale.dataValues.id, quantity: product.quantity },
          )));
    return { status: 201, message: newSale };
  };

  const getSaleById = async (id) => {
    const sale = await Sale.findOne(
        { where: { id }, 
            include: [
                { model: User, as: 'seller', attributes: ['name'] },
                { model: Product, as: 'products', through: { attributes: ['quantity'] } },
            ],
            attributes: { exclude: ['deliveryAddress', 'deliveryNumber', 'sellerId'] },
        },
    );
    return { status: 201, message: sale };
  };

  const findBySellerId = async (sellerId) => {
    const sales = await Sale.findAll({ where: { sellerId } });
    if (sales.length <= 0) return { status: 404, message: SALE_NOT_FOUND };
    return { status: 200, message: sales };
};

module.exports = { findByUserId, updateStatus, createSale, getSaleById, findBySellerId };