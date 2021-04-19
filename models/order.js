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
      paymentType: DataTypes.STRING,
      total: DataTypes.DECIMAL,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
