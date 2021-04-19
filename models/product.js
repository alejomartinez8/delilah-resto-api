/* eslint-disable no-unused-vars */

'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: 'ProductOrders',
        as: 'orders',
        foreignKey: 'productId',
        otherKey: 'orderId',
      });
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      imageURL: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );

  Product.beforeCreate((user) => {
    // eslint-disable-next-line no-param-reassign
    user.id = uuidv4();
  });
  return Product;
};
