const { DataTypes } = require('sequelize');

module.exports = function model(sequelize) {
  return sequelize.define(
    'ProductOrder',
    {
      quantity: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {},
  );
};
