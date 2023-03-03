module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('SalesProducts',
  {
    saleId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    productId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true  },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  salesProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: salesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: salesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return salesProducts;
};