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
  let error = '';
  const orderDB = await await db.Order.findByPk(req.params.id);

  if (!orderDB) throw new Error('Order not found');

  const newOrder = req.body;
  newOrder.id = req.params.id;
  newOrder.updatedAt = new Date();

  const { products } = newOrder;
  const productOrders = await db.ProductOrder.findAll({
    where: { orderId: newOrder.id },
  });

  // update or create new products
  if (products) {
    const subtotals = await Promise.all(
      products.map(async (product) => {
        const productDB = await db.Product.findByPk(product.id); // to get the prize

        if (!productDB) {
          error = 'Product not found';
          return new Error('Product not found');
        }

        const productUpdate = productOrders.find(
          (productOrder) => productOrder.productId === product.id,
        );

        if (productUpdate) {
          productUpdate.update({
            orderId: newOrder.id,
            productId: product.id,
            quantity: product.quantity,
          });
        } else {
          await db.ProductOrder.create(
            {
              orderId: newOrder.id,
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

    newOrder.total = subtotals.reduce((acc, cur) => acc + cur, 0);
  }

  if (error) {
    throw new Error(error);
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

  await orderDB.update(newOrder);
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
