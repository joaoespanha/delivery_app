module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.DOUBLE,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
    Sale.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'seller' });
    Sale.hasMany(models.SalesProducts, 
      { foreignKey: 'saleId', as: 'productsSold'});
  };


  return Sale;
};

