/* eslint-disable no-unused-vars */

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductOrder.init(
    {
      productId: DataTypes.UUID,
      orderId: DataTypes.INTEGER,
      quantity: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'ProductOrder',
    },
  );
  return ProductOrder;
};
