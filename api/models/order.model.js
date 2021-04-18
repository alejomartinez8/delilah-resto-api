module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('Order', {
    paymentType: {
      type: Sequelize.STRING,
    },
  });

  return Order;
};
