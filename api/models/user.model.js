const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    username: { type: DataTypes.STRING, allowNull: false },
    names: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: ["password"] },
    },
    scopes: {
      // include hash with this scope
      withPassword: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
}
