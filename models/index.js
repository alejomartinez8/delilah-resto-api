/* eslint-disable global-require */
/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
/* eslint-disable lines-around-directive */
/* eslint-disable strict */
/* eslint-disable import/no-dynamic-require */
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const chalk = require('chalk');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

let sequelize;

config.logging = (...msg) => console.log(chalk.cyan(msg));

if (config.DATABASE_URL) {
  sequelize = new Sequelize(process.env[config.DATABASE_URL], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
