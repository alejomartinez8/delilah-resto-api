/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const db = require('../helpers/db');

function authorize(...args) {
  return [
    // jwt decode token
    (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Unauthorized - No token' });
      }

      const token = authHeader.substring(7, authHeader.length);

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.sub };
        next();
      } catch (error) {
        return res.status(401).send({ error: 'Unauthorized - Token Invalid' });
      }
    },
    // Verify Role
    async (req, res, next) => {
      const roles = [...args];
      const user = await db.User.findByPk(req.user.id);

      if (!user) {
        return res.status(401).send({ error: 'Unauthorized - User no found' });
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(401).send({ error: 'Unauthorized - Role not authorized' });
      }

      req.user = user.get();
      next();
    },
  ];
}

module.exports = authorize;
