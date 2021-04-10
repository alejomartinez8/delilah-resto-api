const { DataTypes } = require("sequelize");

module.exports = function model(sequelize) {
  return sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING, allowNull: false },
      names: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
    },
    {
      defaultScope: {
        // exclude hash by default
        attributes: { exclude: ["password"] },
      },
      scopes: {
        // include hash with this scope
        withPassword: { attributes: {} },
      },
    }
  );
};
