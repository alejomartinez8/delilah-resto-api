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

// getById
async function getById(id) {
  const orderDB = await db.Order.findByPk(id, {
    include,
  });

  if (!orderDB) throw new Error('Order not found');
  return orderDB;
}

// create
const create = async (req) => {
  let newOrder = req.body;

  // Add the userId
  if (req.user.role === 'user' || !req.body.userId) {
    newOrder.userId = req.user.id;
  }

  // Verify the userId it's no void
  if (!newOrder.userId) {
    throw new Error('Please add an userId to create the order');
  }

  // Create and save the order
  const savedOrder = await db.Order.create(newOrder, { w: 1 }, { returning: true });

  const promisesSubtotal = req.body.products.map(async (item) => {
    const productDB = await db.Product.findByPk(item.id);

    await db.ProductOrder.create(
      {
        orderId: savedOrder.id,
        productId: item.id,
        quantity: item.quantity,
      },
      { w: 1 },
      { returning: true },
    );

    return productDB.price * item.quantity;
  });

  const subtotals = await Promise.all(promisesSubtotal);

  savedOrder.total = subtotals.reduce((acc, cur) => acc + cur, 0);

  await savedOrder.save();
  newOrder = await getById(savedOrder.id, { include });
  return newOrder;
};

// getAll
async function getAll() {
  const allOrders = await db.Order.findAll({
    // Make sure to include the products
    include,
  });

  console.log({ allOrders });

  // If everything goes well respond with the orders
  return allOrders;
}

// update - TODO:
async function update(req) {
  const orderDB = await getById(req.params.id);
  if (!orderDB) throw new Error('Order not found');

  Object.assign(orderDB, req.body);
  await orderDB.save();
  return orderDB.get();
}

// _delete - TODO:
async function _delete(req) {
  const orderDB = await getById(req.params.id, {
    // Make sure to include the products
    include: [
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
    ],
  });
  if (!orderDB) throw new Error('Order not found');

  return orderDB.destroy();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  _delete,
};
