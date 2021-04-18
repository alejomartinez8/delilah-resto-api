const { DataTypes } = require('sequelize');

module.exports = function model(sequelize) {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {},
  );

  Product.associate = (models) => {
    Product.belognsTo(models.Order, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Product;
};
