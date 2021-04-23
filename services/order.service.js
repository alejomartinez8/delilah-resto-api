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
      attributes: ['quantity'],
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
  const newOrder = req.body;

  // Add the userId
  if (req.user.role === 'user' || !req.body.userId) {
    newOrder.userId = req.user.id;
  }

  // Verify the userId it's no void
  if (!newOrder.userId) {
    throw new Error('Please add an userId to create the order');
  }
  const { products } = newOrder;
  newOrder.orderDate = new Date();

  const savedOrder = await db.Order.create(newOrder, { w: 1 }, { returning: true });

  if (products) {
    const subtotals = await Promise.all(
      products.map(async (product) => {
        const productDB = await db.Product.findByPk(product.id);

        if (!productDB) throw new Error('Product not found');

        await db.ProductOrder.create(
          {
            orderId: savedOrder.id,
            productId: product.id,
            quantity: product.quantity,
          },
          { w: 1 },
          { returning: true },
        );

        return productDB.price * product.quantity;
      }),
    );

    savedOrder.total = subtotals.reduce((acc, cur) => acc + cur, 0);
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
  const orderDB = await getById(req.params.id, include);

  if (!orderDB) throw new Error('Order not found');

  if (req.user.role === 'user' && req.user.id !== orderDB.userId) {
    throw new Error('Unauthorized Order');
  }

  Object.assign(orderDB, req.body);
  const { products } = req.body;

  const productOrders = await db.ProductOrder.findAll({
    where: { orderId: orderDB.id },
  });

  // update or create new products
  if (products) {
    const subtotals = await Promise.all(
      products.map(async (product) => {
        const productDB = await db.Product.findByPk(product.id); // to get the prize

        if (!productDB) throw new Error('Product not found');

        const productUpdate = productOrders.find(
          (productOrder) => productOrder.productId === product.id,
        );

        if (productUpdate) {
          productUpdate.update({
            orderId: orderDB.id,
            productId: product.id,
            quantity: product.quantity,
          });
        } else {
          await db.ProductOrder.create(
            {
              orderId: orderDB.id,
              productId: product.id,
              quantity: product.quantity,
            },
            { w: 1 },
            { returning: true },
          );
        }

        return productDB.price * product.quantity;
      }),
    );

    orderDB.total = subtotals.reduce((acc, cur) => acc + cur, 0);
  }

  // Clean products no more nedeed on productsOrder
  if (productOrders) {
    const producstDelete = productOrders.filter((productOrder) => {
      if (products) {
        return !products.some((product) => product.id === productOrder.productId);
      }
      return true;
    });

    await Promise.all(producstDelete.filter((productOrder) => productOrder.destroy()));
  }

  await orderDB.update();
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
  _delete,
};
