const db = require("../../helpers/db");

// create
async function create(params) {
  // Verifiy if exist
  if (await db.Product.findOne({ where: { name: params.name } })) {
    throw "Product already exists";
  }

  return await db.Product.create(params);
}

// getAll
async function getAll() {
  return await db.Product.findAll();
}

// getById
async function getById(id) {
  const productDB = await db.Product.findByPk(id);
  if (!productDB) throw "Product not found";
  return productDB;
}

// update
async function update(req, res) {
  const productDB = await getById(req.params.id);
  if (!productDB) throw "Product not found";

  Object.assign(productDB, req.body);
  await productDB.save();
  return await productDB.get();
}

// _delete
async function _delete(req, res) {
  const productDB = await getById(req.params.id);
  if (!productDB) throw "Product not found";

  return await productDB.destroy();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  _delete,
};
