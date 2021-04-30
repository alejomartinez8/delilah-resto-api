/* eslint-disable no-underscore-dangle */
const db = require('../models');

const include = [
  {
    model: db.Product,
    as: 'products',
    required: false,
    // Pass in the Product attributes that you want to retrieve
    attributes: ['id', 'name'],
    through: {
      // This block of code allows you to retrieve the properties of the join table
      model: db.ProductOrder,
      as: 'productOrders',
      attributes: ['quantity', 'price'],
    },
  },
  {
    model: db.User,
    attributes: ['id', 'names', 'address'],
  },
];

/**
 * Get an order by ID
 * @param {*} id
 * @returns
 */
async function getById(id) {
  const orderDB = await db.Order.findByPk(id, {
    include,
  });

  if (!orderDB) throw new Error('Order not found');
  return orderDB;
}

/**
 * Create an order
 * @param {*} req
 * @returns
 */
const create = async (req) => {
  let error = '';
  const newOrder = req.body;

  // Add the userId
  if (!newOrder.userId) {
    newOrder.userId = req.user.id;
  }

  const userDB = db.User.findByPk(newOrder.userId);
  if (!userDB) throw new Error('User not found');

  // Verify the userId it's no void
  if (!newOrder.userId) {
    throw new Error('Please add an userId to create the order');
  }
  const { products } = newOrder;
  newOrder.orderDate = new Date();
  newOrder.total = 0;

  const savedOrder = await db.Order.create(newOrder, { w: 1 }, { returning: true });

  if (products) {
    const subtotals = await Promise.all(
      products.map(async (product) => {
        const productDB = await db.Product.findByPk(product.id);

        if (!productDB) {
          error = 'Product not found';
          return new Error('Product not found');
        }

        await db.ProductOrder.create(
          {
            orderId: savedOrder.id,
            productId: product.id,
            quantity: product.quantity,
            price: productDB.price,
          },
          { w: 1 },
          { returning: true },
        );

        return productDB.price * product.quantity;
      }),
    );

    savedOrder.total = subtotals.reduce((acc, cur) => acc + cur, 0);
  }

  if (error) {
    await savedOrder.destroy();
    throw new Error(error);
  }

  await savedOrder.save();
  return getById(savedOrder.id, { include });
};

/**
 * get all orders filter by user
 * @param {*} req
 * @returns
 */
async function getAll(req) {
  const paramsQuery = {
    include,
  };

  // filter user order
  if (req.user.role === 'user') {
    paramsQuery.where = { userId: req.user.id };
  }

  const allOrders = await db.Order.findAll(paramsQuery);

  // If everything goes well respond with the orders
  return allOrders;
}

/**
 * Update an order
 * @param {*} req
 * @returns
 */
async function update(req) {
  const orderDB = await await db.Order.findByPk(req.params.id);
  if (!orderDB) throw new Error('Order not found');
  await orderDB.update(req.body);
  return getById(orderDB.id, { include });
}

function calcSubtotal(productsOrder) {
  return productsOrder.map((item) => item.quantity * item.price).reduce((acc, cur) => acc + cur, 0);
}

async function getOrder(id) {
  const orderDB = await db.Order.findByPk(id, { include: 'products' });
  if (!orderDB) throw new Error('Order not found');
  return orderDB;
}

function validateProduct(products, product) {
  if (!products.find((productDB) => productDB.id === product.id)) {
    throw new Error('Product is not in the order');
  }
}

/**
 * Add product to Order
 * @param {*} req
 * @returns
 */
async function addProduct(req) {
  const orderDB = await getOrder(req.params.id);
  const product = req.body;

  if (orderDB.products.find((productDB) => productDB.id === product.id)) {
    throw new Error('Product is in the order');
  }

  const productDB = await db.Product.findByPk(product.id);
  if (!productDB) throw new Error('Product not found in data base');

  // add productOrder
  await db.ProductOrder.create({
    orderId: orderDB.id,
    productId: product.id,
    quantity: product.quantity,
    price: productDB.price,
  });

  // calc subtotal & update order
  const productsOrder = await db.ProductOrder.findAll({ where: { orderId: orderDB.id } });
  orderDB.total = calcSubtotal(productsOrder);
  await orderDB.save();
  return getById(orderDB.id, { include });
}

/**
 * Update Product in Order
 * @param {*} req
 * @returns
 */
async function updateProduct(req) {
  const orderDB = await getOrder(req.params.id);
  const product = req.body;
  validateProduct(orderDB.products, product);

  // update productOrder
  const productOrder = await db.ProductOrder.findOne({
    where: { productId: product.id, orderId: orderDB.id },
  });
  await productOrder.update({
    productId: product.id,
    orderId: orderDB.id,
    quantity: product.quantity,
    price: product.price,
  });

  // calc subtotal & update order
  const productsOrder = await db.ProductOrder.findAll({ where: { orderId: orderDB.id } });
  orderDB.total = calcSubtotal(productsOrder);
  await orderDB.save();
  return getById(orderDB.id, { include });
}

/**
 * Delete Product in Order
 * @param {*} req
 * @returns
 */
async function deleteProduct(req) {
  const orderDB = await getOrder(req.params.id);
  const product = req.body;
  validateProduct(orderDB.products, product);

  // delete productOrder
  const productOrder = await db.ProductOrder.findOne({
    where: { productId: product.id, orderId: orderDB.id },
  });
  await productOrder.destroy();

  // calc subtotal & update order
  const productsOrder = await db.ProductOrder.findAll({ where: { orderId: orderDB.id } });
  orderDB.total = calcSubtotal(productsOrder);
  await orderDB.save();
  return getById(orderDB.id, { include });
}

/**
 * Delete an oder, only admin user
 * @param {*} req
 * @returns
 */
async function _delete(req) {
  const orderDB = await getById(req.params.id, include);

  if (!orderDB) throw new Error('Order not found');

  const productOrders = await db.ProductOrder.findAll({ where: { orderId: orderDB.id } });
  await Promise.all(productOrders.map(async (item) => item.destroy()));
  return orderDB.destroy(include);
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  addProduct,
  updateProduct,
  deleteProduct,
  _delete,
};
