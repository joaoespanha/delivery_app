'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        name: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: 'trocar',
        role: 'admin',
      },
      {
        id: 2,
        name: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        password: 'trocar',
        role: 'sale',
      },
      {
        id: 3,
        name: 'Michael Jordan',
        email: 'MichaelJordan@gmail.com',
        password: 'trocar',
        role: 'client',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
