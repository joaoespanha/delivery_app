const { Sale, SalesProducts, Product, User } = require('../database/models');

const findByUserId = async (userId) => {
    const sales = await Sale.findAll({ where: { userId } });
    console.log('salessss', sales);
    if (sales.length <= 0) return { status: 404, message: 'sales not found' };
    return { status: 200, message: sales };
};

const findBySaleId = async (saleId) => {
    console.log('looooog', saleId);
    const sale = await Sale.findOne({ where: { saleId } });
    console.log('salessss', sale);
    if (sale.length <= 0) return { status: 404, message: 'sale not found' };

    return { status: 200, message: sale };
};
const updateStatus = async (saleId, status) => {
    const doesSaleExists = await findBySaleId(saleId);
    
    if (doesSaleExists.status === 200) {
        const [[updatedSale]] = await Sale.update({ status }, { where: { saleId } });
        console.log('updated saaaale', updatedSale);
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

module.exports = { findByUserId, updateStatus, createSale, getSaleById };