const expressJWT = require("express-jwt");
const db = require("../helpers/db");

module.exports = authorize;

function authorize(roles = []) {
  return [
    expressJWT({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), // Middleware
    async (req, res, next) => {
      const user = await db.User.findByPk(req.user.sub);

      if (!user || (roles.length && !roles.includes(user.role)))
        return res.status(401).json({ msg: "Unauthorized" });

      req.user = user.get();
      next();
    },
  ];
}
