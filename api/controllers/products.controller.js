const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../../helpers/validateRequest");
const authorize = require("../../middleware/authorize");
const productService = require("../services/product.service");

router.post("/", [createValidate, ...authorize()], create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", authorize(), updateValidate, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function createValidate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  productService
    .create(req.body)
    .then(() => res.json({ msg: "Product created successfully" }))
    .catch(next);
}

function getAll(req, res, next) {
  productService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  productService
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
  productService
    .update(req, res)
    .then((product) => res.json(product))
    .catch(next);
}

function _delete(req, res, next) {
  productService
    ._delete(req, res)
    .then(() => res.json({ msg: "Delete Successfully" }))
    .catch(next);
}
