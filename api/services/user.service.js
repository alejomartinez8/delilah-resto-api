const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../helpers/db");

module.exports = {
  login,
  create,
};

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function login({ username, password }) {
  const user = await db.User.scope("withPassword").findOne({
    where: { username },
  });

  console.log(user);

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw "Username or password is incorrect";

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { ...omitPassword(user.get()), token };
}

async function create(params) {
  if (await db.User.findOne({ where: { username: params.username } })) {
    throw "You are already registered";
  }

  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  await db.User.create(params);
}
