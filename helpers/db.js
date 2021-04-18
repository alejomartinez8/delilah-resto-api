const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const User = require('../api/models/user.model');
const Product = require('../api/models/product.model');
const Order = require('../api/models/order.model');
// const ProductOrders = require('../api/models/productOrder.model');

const db = {};

async function dbInit() {
  // Create db if it doesn't already exist
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

  // Connect to DB
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // logging: false,
  });

  // Init Models
  db.User = User(sequelize);
  db.Product = Product(sequelize);
  db.Order = Order(sequelize);
  // db.ProductOrders = ProductOrders(sequelize);

  db.Product.belongsToMany(db.Order, {
    through: 'Product_Orders',
  });

  db.Order.belongsToMany(db.Product, {
    through: 'Product_Orders',
  });

  // Sync
  try {
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error({ error });
  }
}

dbInit();

module.exports = db;
