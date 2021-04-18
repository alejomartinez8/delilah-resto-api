/* eslint-disable no-underscore-dangle */
const db = require('../models');

// create
async function create(params) {
  // Verifiy if exist

  console.log(params);

  const savedOrder = await db.Order.create(params);

  // params.products.forEach(async (item) => {
  //   const product = await db.Product.findByPk(item.id);
  //   if (!product) {
  //     throw new Error('Error product');
  //   }

  //   // Create a dictionary with which to create the ProductOrder
  //   const po = {
  //     orderId: savedOrder.id,
  //     productId: item.id,
  //     quantity: item.quantity,
  //   };

  //   // Create and save a productOrder
  //   const savedProductOrder = await db.ProductOrder.create(po, { w: 1 }, { returning: true });
  //   console.log(savedProductOrder);
  // });

  return savedOrder;
}

// getAll
async function getAll() {
  return db.Order.findAll({
    include: [db.Product],
  });
}

// getById
async function getById(id) {
  const orderDB = await db.Order.findByPk(id);
  if (!orderDB) throw new Error('Order not found');
  return orderDB;
}

// update
async function update(req) {
  const orderDB = await getById(req.params.id);
  if (!orderDB) throw new Error('Order not found');

  Object.assign(orderDB, req.body);
  await orderDB.save();
  return orderDB.get();
}

// _delete
async function _delete(req) {
  const orderDB = await getById(req.params.id);
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
