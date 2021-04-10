const db = require("../../helpers/db");

// create
async function create(params) {
  // Verifiy if exist
  if (await db.Order.findOne({ where: { name: params.name } })) {
    throw "Order already exists";
  }

  return await db.Order.create(params);
}

// getAll
async function getAll() {
  return await db.Order.findAll();
}

// getById
async function getById(id) {
  const orderDB = await db.Order.findByPk(id);
  if (!orderDB) throw "Order not found";
  return orderDB;
}

// update
async function update(req, res) {
  const orderDB = await getById(req.params.id);
  if (!orderDB) throw "Order not found";

  Object.assign(orderDB, req.body);
  await orderDB.save();
  return await orderDB.get();
}

// _delete
async function _delete(req, res) {
  const orderDB = await getById(req.params.id);
  if (!orderDB) throw "Order not found";

  return await orderDB.destroy();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  _delete,
};
