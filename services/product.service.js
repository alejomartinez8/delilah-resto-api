/* eslint-disable no-underscore-dangle */
const db = require('../models');

// create
async function create(params) {
  // Verifiy if exist
  if (await db.Product.findOne({ where: { name: params.name } })) {
    throw new Error('Product already exists');
  }

  return db.Product.create(params);
}

// getAll
async function getAll() {
  return db.Product.findAll();
}

// getById
async function getById(id) {
  const productDB = await db.Product.findByPk(id);
  if (!productDB) throw new Error('Product not found');
  return productDB;
}

// update
async function update(req) {
  const productDB = await getById(req.params.id);
  if (!productDB) throw new Error('Product not found');

  Object.assign(productDB, req.body);
  await productDB.save();
  return productDB.get();
}

// _delete
async function _delete(req) {
  const productDB = await getById(req.params.id);
  if (!productDB) throw new Error('Product not found');

  return productDB.destroy();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  _delete,
};
