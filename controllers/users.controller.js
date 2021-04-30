/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');
const authorize = require('../middleware/authorize');
const userService = require('../services/user.service');

function loginValidate(req, res, next) {
  const schema = Joi.object({
    username: Joi.alternatives()
      .try(Joi.string().email(), Joi.string().alphanum().min(3).max(30))
      .required(),
    password: Joi.string().required(),
  });

  validateRequest(req, next, schema);
}

function login(req, res, next) {
  userService
    .login(req.body)
    .then((token) => res.json(token))
    .catch(next);
}

function registerValidate(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    names: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    phone: Joi.string(),
    address: Joi.string(),
    password: Joi.string().min(6).required(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ msg: 'Register Successfully' }))
    .catch(next);
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getProfile(req, res, next) {
  userService
    .getProfile(req.user.id)
    .then((user) => res.json(user))
    .catch(next);
}

function getById(req, res, next) {
  userService
    .getProfile(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function updateValidate(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    names: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.string(),
    address: Joi.string(),
    password: Joi.string().min(6),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  userService
    .update(req, res)
    .then((user) => res.json(user))
    .catch(next);
}

function _delete(req, res, next) {
  userService
    ._delete(req, res)
    .then(() => res.json({ msg: 'Delete Successfully' }))
    .catch(next);
}

router.post('/login', loginValidate, login);
router.post('/register', registerValidate, register);
router.get('/', authorize('admin'), getAll);
router.get('/getProfile', authorize('admin', 'user'), getProfile);
router.get('/:id', authorize('admin'), getById);
router.put('/:id', authorize(), updateValidate, update);

router.delete('/:id', authorize(), _delete);

module.exports = router;
