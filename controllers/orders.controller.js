/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
// const Joi = require('joi');
// const validateRequest = require('../middleware/validateRequest');
const authorize = require('../middleware/authorize');
const orderService = require('../services/order.service');

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

function update(req, res, next) {
  orderService
    .update(req, res)
    .then((order) => res.json({ message: 'Order added', order }))
    .catch(next);
}

function addProduct(req, res, next) {
  orderService
    .addProduct(req)
    .then((order) => res.json({ message: 'Product added', order }))
    .catch(next);
}

function updateProduct(req, res, next) {
  orderService
    .updateProduct(req)
    .then((order) => res.json({ message: 'Product updated', order }))
    .catch(next);
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
router.post('/create', authorize('user', 'admin'), create);
router.post('/update/product/:id', authorize('admin'), addProduct);
router.put('/update/product/:id', authorize('admin'), updateProduct);
router.put('/update/:id', authorize('admin'), update);
router.delete('/update/product/:id', authorize('admin'), deleteProduct);
router.delete('/delete/:id', authorize('admin'), _delete);

module.exports = router;
