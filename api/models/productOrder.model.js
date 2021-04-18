const { DataTypes } = require('sequelize');

module.exports = function model(sequelize) {
  return sequelize.define(
    'Product_Orders',
    {
      quantity: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {},
  );
};
