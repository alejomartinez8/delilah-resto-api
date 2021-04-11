const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../helpers/db");

// login
async function login({ username, password }) {
  const user = await db.User.scope("withPassword").findOne({
    where: { username },
  });

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw "Username or password is incorrect";

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token };
}

// create
async function create(params) {
  if (await db.User.findOne({ where: { username: params.username } })) {
    throw "You are already registered";
  }

  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  return await db.User.create(params);
}

async function getAll() {
  return await db.User.findAll();
}

// getUser
async function getUser(id) {
  const userDB = await db.User.findByPk(id);
  if (!userDB) throw "User not found";
  return userDB;
}

// update
async function update(req, res) {
  const userDB = await getUser(req.params.id);
  if (!userDB) throw "User not found";

  // Only can modify to self or admin role
  if (req.user.id !== userDB.id && req.user.role === "user")
    return res.status(401).json({ msg: "Unauthorized" });

  // validate change username
  if (req.body.username && req.body.username !== userDB.username) {
    // find if another exist
    if (await db.User.findOne({ where: { username: req.body.username } })) {
      throw `Username ${req.body.username} already exists`;
    }
  }

  // validate change email
  if (req.body.email && req.body.email !== userDB.email) {
    // find if another exist
    if (await db.User.findOne({ where: { email: req.body.email } })) {
      throw `Username ${req.body.email} already exists`;
    }
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  Object.assign(userDB, req.body);
  await userDB.save();

  const newUser = userDB.get();
  delete newUser.password;

  return newUser;
}

// _delete
async function _delete(req, res) {
  const userDB = await getUser(req.params.id);
  if (!userDB) throw "User not found";

  // Only can modify to self or admin role
  if (req.user.id !== userDB.id && req.user.role === "user")
    return res.status(401).json({ msg: "Unauthorized" });

  return await userDB.destroy();
}

module.exports = {
  login,
  create,
  getAll,
  getUser,
  update,
  _delete,
};
