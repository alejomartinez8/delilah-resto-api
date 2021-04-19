/* eslint-disable no-unused-vars */

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      names: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: 'user' },
    },
    {
      sequelize,
      modelName: 'User',
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
