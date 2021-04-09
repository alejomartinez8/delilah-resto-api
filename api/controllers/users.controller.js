const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../../helpers/validateRequest");
const userService = require("../services/user.service");

router.post("/login", loginValidate, login);
router.post("/register", registerValidate, register);

module.exports = router;

function loginValidate(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  validateRequest(req, next, schema);
}

function login(req, res, next) {
  userService
    .login(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function registerValidate(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    names: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phoneNumber: Joi.string(),
    address: Joi.string(),
    password: Joi.string().min(6).required(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ msg: "Register Successfully" }));
}
