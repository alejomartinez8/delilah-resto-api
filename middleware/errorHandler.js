/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  console.log({ err });
  return res.status(400).send({ error: err.message });
}

module.exports = errorHandler;
