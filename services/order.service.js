/* eslint-disable no-underscore-dangle */
const db = require('../models');

// create
async function create(req) {
  // Create and save the order
  const savedOrder = await db.Order.create(req.body, { w: 1 }, { returning: true });

  // Loop through all the items in req.products
  req.body.products.forEach(async (item) => {
    // Search for the product with the givenId and make sure it exists.
    // If it doesn't, respond with status 400.
    const product = await db.Product.findByPk(item.id);
    if (!product) {
      throw new Error("Product doesn't exist");
    }

    // Create a dictionary with which to create the ProductOrder
    const po = {
      orderId: savedOrder.id,
      productId: item.id,
      quantity: item.quantity,
    };

    // Create and save a productOrder
    await db.ProductOrder.create(po, { w: 1 }, { returning: true });
  });

  // If everything goes well, respond with the order
  return savedOrder;
}

// getAll
async function getAll() {
  const allOrders = await db.Order.findAll({
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

  console.log({ allOrders });

  // If everything goes well respond with the orders
  return allOrders;
}

// getById
async function getById(id) {
  console.log({ id });
  const orderDB = await db.Order.findByPk(id, {
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
  return orderDB;
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
