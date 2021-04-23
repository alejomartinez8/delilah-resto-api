/* eslint-disable no-unused-vars */

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });

      Order.belongsToMany(models.Product, {
        through: 'ProductOrders',
        as: 'products',
        foreignKey: 'orderId',
        otherKey: 'productId',
      });
    }
  }
  Order.init(
    {
      orderDate: DataTypes.DATE,
      total: DataTypes.DECIMAL,
      paymentType: {
        type: DataTypes.ENUM('cash', 'transfer', 'credit_card'),
        defaultValue: 'cash',
      },
      status: {
        type: DataTypes.ENUM('new', 'confirmed', 'preparing', 'shipping', 'delivered', 'canceled'),
        defaultValue: 'new',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
