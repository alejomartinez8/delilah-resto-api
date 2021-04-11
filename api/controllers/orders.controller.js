const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../../helpers/validateRequest");
const authorize = require("../../middleware/authorize");
const orderService = require("../services/order.service");

router.post("/", authorize("user, admin"), createValidate, create);
router.get("/", authorize("admin"), getAll);
router.get("/:id", authorize("user", "admin"), getById);
router.put("/:id", authorize("user", "admin"), updateValidate, update);
router.delete("/:id", authorize("user", "admin"), _delete);

module.exports = router;

function createValidate(req, res, next) {
  // TODO
  console.log(req, res, next);
}

function create(req, res, next) {
  orderService
    .create(req.body)
    .then(() => res.json({ msg: "Order created successfully" }))
    .catch(next);
}

function getAll(req, res, next) {
  orderService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  orderService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function updateValidate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  orderService
    .update(req, res)
    .then(() => res.json({ msg: "Update order successfully" }))
    .catch(next);
}

function _delete(req, res, next) {
  orderService
    ._delete(req, res)
    .then(() => res.json({ msg: "Delete order successfully" }))
    .catch(next);
}
