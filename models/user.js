/* eslint-disable no-unused-vars */

'use strict';

const { v4: uuidv4 } = require('uuid');

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
      User.hasMany(models.Order, {
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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

  User.beforeCreate((user) => {
    // eslint-disable-next-line no-param-reassign
    user.id = uuidv4();
  });

  return User;
};
