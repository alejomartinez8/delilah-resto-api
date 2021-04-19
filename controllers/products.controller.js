/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');
const authorize = require('../middleware/authorize');
const productService = require('../services/product.service');

module.exports = router;

function createValidate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  productService
    .create(req.body)
    .then((product) => res.json(product))
    .catch(next);
}

function getAll(req, res, next) {
  productService
    .getAll()
    .then((products) => res.json(products))
    .catch(next);
}

function getById(req, res, next) {
  productService
    .getById(req.params.id)
    .then((product) => res.json(product))
    .catch(next);
}

function updateValidate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    imageUrl: Joi.string(),
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
    .then(() => res.json({ msg: 'Delete Successfully' }))
    .catch(next);
}

router.post('/', authorize('admin'), createValidate, create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', authorize('admin'), updateValidate, update);
router.delete('/:id', authorize('admin'), _delete);
