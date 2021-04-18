/* eslint-disable no-underscore-dangle */
const db = require('../models');

// create
async function create(params) {
  // Verifiy if exist
  console.log(params);

  const saveOrder = await db.Order.create(params, { include: [{ association: db.Order.User }] });

  // if (params.products) {
  //   params.products.forEach(async (element) => {
  //     const product = await db.Product.findByPk(element.id);

  //     if (!product) {
  //       return new Error('Product Invalid');
  //     }

  //     const productOrder = {
  //       orderId: saveOrder.id,
  //       productId: product.id,
  //     };

  //     const saveProductOrder = await db.ProductOrder.create(
  //       productOrder,
  //       { w: 1 },
  //       { returning: true },
  //     );

  //     console.log({ saveProductOrder });
  //   });
  // }

  return saveOrder;
}

// getAll
async function getAll() {
  return db.Order.findAll();
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
