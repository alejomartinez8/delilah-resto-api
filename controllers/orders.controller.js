/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');
const authorize = require('../middleware/authorize');
const orderService = require('../services/order.service');

function createValidate(req, res, next) {
  const schema = Joi.object({
    status: Joi.string().required(),
    paymentType: Joi.string().required(),
    userId: Joi.number(),
    products: Joi.array().items(
      Joi.object().keys({ id: Joi.number().required(), quantity: Joi.number().required() }),
    ),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  orderService
    .create(req)
    .then((order) => res.json(order))
    .catch(next);
}

function getAll(req, res, next) {
  orderService
    .getAll(req)
    .then((orders) => res.json(orders))
    .catch(next);
}

function getById(req, res, next) {
  orderService
    .getById(req.params.id)
    .then((order) => res.json(order))
    .catch(next);
}

function updateValidate(req, res, next) {
  const schema = Joi.object({
    status: Joi.string(),
    paymentType: Joi.string(),
    userId: Joi.number(),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  orderService
    .update(req, res)
    .then((order) => res.json({ message: 'Order added', order }))
    .catch(next);
}

function validateAddProduct(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required(),
    quantity: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function addProduct(req, res, next) {
  orderService
    .addProduct(req)
    .then((order) => res.json({ message: 'Product added', order }))
    .catch(next);
}

function validateUpdateProduct(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function updateProduct(req, res, next) {
  orderService
    .updateProduct(req)
    .then((order) => res.json({ message: 'Product updated', order }))
    .catch(next);
}

function validateDeleteProduct(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function deleteProduct(req, res, next) {
  orderService
    .deleteProduct(req)
    .then((order) => res.json({ message: 'Product deleted', order }))
    .catch(next);
}

function _delete(req, res, next) {
  orderService
    ._delete(req, res)
    .then(() => res.json({ message: 'Order deleted' }))
    .catch(next);
}

router.get('/', authorize('user', 'admin'), getAll);
router.get('/:id', authorize('user', 'admin'), getById);
router.post('/create', authorize('user', 'admin'), createValidate, create);
router.put('/update/:id', authorize('admin'), updateValidate, update);
router.post('/addProduct/:id', authorize('admin'), validateAddProduct, addProduct);
router.put('/updateProduct/:id', authorize('admin'), validateUpdateProduct, updateProduct);
router.delete('/deleteProduct/:id', authorize('admin'), validateDeleteProduct, deleteProduct);
router.delete('/delete/:id', authorize('admin'), _delete);

module.exports = router;
