module.exports = function model(sequelize, Sequelize) {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {},
  );

  return Product;
};
