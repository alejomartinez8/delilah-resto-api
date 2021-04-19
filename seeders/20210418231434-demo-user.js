/* eslint-disable no-unused-vars */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        names: 'Admin Profile',
        email: 'admin@example.com',
        phone: '555 555 555',
        address: 'Address admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user',
        names: 'User Profile',
        email: 'user@example.com',
        phone: '555 555 555',
        address: 'Address user',
        password: 'password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
