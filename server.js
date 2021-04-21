require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const chalk = require('chalk');

const app = express();

const errorHandler = require('./middleware/errorHandler');
const db = require('./models');
const usersController = require('./controllers/users.controller');
const productsController = require('./controllers/products.controller');
const ordersController = require('./controllers/orders.controller');
const swaggerController = require('./helpers/swagger');

// middlewares
app.use(morgan(chalk`:method :url {green :status} :response-time ms - :res[content-length]`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// api routes
app.use('/users', usersController);
app.use('/products', productsController);
app.use('/orders', ordersController);

// swagger docs route
app.use('/api-docs', swaggerController);

// global error handler
app.use(errorHandler);

// db connection
db.sequelize
  .sync()
  .then(() => {
    console.log(chalk.yellow('Drop and re-sync db'));
    // start server
    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(chalk.green(`******* Server listening on port ${port} ******`));
    });
  })
  .catch((error) => console.error(error));
