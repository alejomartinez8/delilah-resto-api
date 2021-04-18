module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      names: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      defaultScope: {
        // exclude hash by default
        attributes: { exclude: ['password'] },
      },
      scopes: {
        // include hash with this scope
        withPassword: { attributes: {} },
      },
    },
  );

  return User;
};
