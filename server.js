require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgamorganMiddleware = require('./helpers/morgan');
const errorHandler = require('./middleware/errorHandler');
const db = require('./api/models');
const usersController = require('./api/controllers/users.controller');
const productsController = require('./api/controllers/products.controller');
const ordersController = require('./api/controllers/orders.controller');

// middlewares
app.use(morgamorganMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// db connection
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Drop and re-sync db.');
  })
  .catch((error) => console.error(error));

// api routes
app.use('/users', usersController);
app.use('/products', productsController);
app.use('/orders', ordersController);

// swagger docs route
app.use('/api-docs', require('./helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
