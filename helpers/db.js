const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

module.exports = db = {};

dbInit();

async function dbInit() {
  // Create db if it doesn't already exist
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
    );
  } catch (error) {
    console.log({ error });
  }

  // Connect to DB
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    { host: process.env.DB_HOST, dialect: "mysql" }
  );

  // Init Models
  db.User = require("../api/models/user.model")(sequelize);

  // Sync
  try {
    await sequelize.sync();
  } catch (error) {
    console.error({ error });
  }
}
