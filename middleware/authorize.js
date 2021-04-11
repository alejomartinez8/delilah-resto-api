const db = require("../helpers/db");
const jwt = require("jsonwebtoken");

module.exports = authorize;

function authorize() {
  return [
    // jwt decode token
    (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ msg: "Unauthorized - No token provided" });
      }

      const token = authHeader.substring(7, authHeader.length);

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.sub };
        next();
      } catch (error) {
        return res.status(401).json({ msg: "Unauthorized - Token Invalid" });
      }
    },
    // Verify Role
    async (req, res, next) => {
      const roles = [...arguments];
      const user = await db.User.findByPk(req.user.id);

      if (!user) res.status(401).json({ msg: "Unauthorized - User no found" });

      if (roles.length && !roles.includes(user.role))
        return res
          .status(401)
          .json({ msg: "Unauthorized - Role not authorized" });

      req.user = user.get();
      next();
    },
  ];
}
