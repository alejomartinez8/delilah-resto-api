const { DataTypes } = require('sequelize');

module.exports = function model(sequelize) {
  const ProductOrder = sequelize.define(
    'ProductOrder',
    {
      uuid: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {},
  );

  return ProductOrder;
};
