/* eslint-disable no-unused-vars */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderDate: {
        type: Sequelize.DATE,
      },
      total: {
        type: Sequelize.DECIMAL,
      },
      paymentType: {
        type: Sequelize.ENUM('cash', 'transfer', 'credit_card'),
        defaultValue: 'cash',
      },
      status: {
        type: Sequelize.ENUM('new', 'confirmed', 'preparing', 'shipping', 'delivered', 'cancelled'),
        defaultValue: 'new',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  },
};
