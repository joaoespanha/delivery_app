'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [{
        id: 1,
        user_id: 3,
        seller_id: 2,
        total_price: 10.50,
        delivery_address: 'Rua Carimbo, 15, Nova Lima',
        delivery_number: '125',
        sale_date: new Date('2011-08-01T19:58:00.000Z'),
        status: 'finalizado'
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
