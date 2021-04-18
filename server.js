require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgamorganMiddleware = require('./helpers/morgan');
const errorHandler = require('./middleware/errorHandler');
const db = require('./models');
const usersController = require('./controllers/users.controller');
const productsController = require('./controllers/products.controller');
const ordersController = require('./controllers/orders.controller');

// middlewares
app.use(morgamorganMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// api routes
app.use('/users', usersController);
app.use('/products', productsController);
app.use('/orders', ordersController);

// swagger docs route
app.use('/api-docs', require('./helpers/swagger'));

// global error handler
app.use(errorHandler);

// db connection
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Drop and re-sync db.');
    // start server
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => console.error(error));
