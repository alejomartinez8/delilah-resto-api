const { DataTypes } = require('sequelize');

const Order = function model(sequelize) {
  return sequelize.define(
    'Order',
    {
      productList: { type: DataTypes.STRING, allowNull: false },
      paymentType: { type: DataTypes.STRING },
      paymentValue: { type: DataTypes.INTEGER },
      address: { type: DataTypes.STRING },
      // TODO - links with anothers tables
      hour: { type: DataTypes.NOW },
      orderId: {},
      user: {},
    },
    {},
  );
};

module.exports = Order;
