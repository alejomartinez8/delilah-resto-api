const { DataTypes } = require('sequelize');

module.exports = function model(sequelize) {
  return sequelize.define(
    'Order',
    {
      paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );
};
