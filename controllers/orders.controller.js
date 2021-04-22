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
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  orderService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

// function updateValidate(req, res, next) {
//   const schema = Joi.object({
//     name: Joi.string().required(),
//     price: Joi.number().required(),
//   });
//   validateRequest(req, next, schema);
// }

function update(req, res, next) {
  orderService
    .update(req, res)
    .then(() => res.json({ msg: 'Update order successfully' }))
    .catch(next);
}

function _delete(req, res, next) {
  orderService
    ._delete(req, res)
    .then(() => res.json({ msg: 'Delete order successfully' }))
    .catch(next);
}

router.get('/', authorize('user', 'admin'), getAll);
router.get('/:id', authorize('user', 'admin'), getById);
router.post('/create', authorize('user', 'admin'), create);
router.put('/update/:id', authorize('user', 'admin'), update);
router.delete('/delete/:id', authorize('user', 'admin'), _delete);

module.exports = router;
