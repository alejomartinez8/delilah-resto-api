const { DataTypes } = require('sequelize');

module.exports = function model(sequelize) {
  return sequelize.define(
    'Product',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER },
    },
    {},
  );
};
