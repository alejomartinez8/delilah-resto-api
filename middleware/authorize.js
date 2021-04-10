const expressJWT = require("express-jwt");
const db = require("../helpers/db");

module.exports = authorize;

function authorize(role) {
  return [
    expressJWT({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), // Middleware
    async (req, res, next) => {
      const user = await db.User.findByPk(req.user.sub);
      console.log(user);

      if (!user || user.role !== role)
        return res.status(401).json({ msg: "Unauthorized" });

      req.user = user.get();
      next();
    },
  ];
}
