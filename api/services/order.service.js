/* eslint-disable no-underscore-dangle */
const db = require('../../helpers/db');

// create
async function create(params) {
  // Verifiy if exist
  if (await db.Order.findOne({ where: { name: params.name } })) {
    throw new Error('Order already exists');
  }

  return db.Order.create(params);
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
