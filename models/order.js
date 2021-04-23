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
      paymentType: DataTypes.STRING,
      total: DataTypes.DECIMAL,
      status: DataTypes.STRING,
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
