function errorHandler(err, req, res) {
  console.log(('Error:', err));

  if (typeof err === 'string') {
    const is404 = err.toLowerCase().endsWith('not found');
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }
  return res.status(500).json({ msg: err.message });
}

module.exports = errorHandler;
