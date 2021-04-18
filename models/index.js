require('dotenv').config();
const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');
const User = require('./user.model');
const Product = require('./product.model');
const Order = require('./order.model');
// const ProductOrder = require('./productOrder.model');

// Create DB if it doesn't already exist
async function dbInit() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  } catch (error) {
    console.log({ error });
  }
}

dbInit();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  //   logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize);
db.Product = Product(sequelize);
db.Order = Order(sequelize);
// db.ProductOrder = ProductOrder(sequelize);

// db.Product.belongsToMany(db.Order, {
//   through: 'ProductOrder',
//   as: 'orders',
// });

// db.Order.belongsToMany(db.Product, {
//   through: 'ProductOrder',
//   as: 'products',
// });

module.exports = db;
