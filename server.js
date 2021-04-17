require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgamorganMiddleware = require('./helpers/morgan');
const errorHandler = require('./middleware/errorHandler');
const usersController = require('./api/controllers/users.controller');
const productsController = require('./api/controllers/products.controller');

app.use(morgamorganMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// api routes
app.use('/users', usersController);
app.use('/products', productsController);

// swagger docs route
app.use('/api-docs', require('./helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
